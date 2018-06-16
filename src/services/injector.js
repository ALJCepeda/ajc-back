import _ from 'lodash';
import path from 'path';
import bluebird from 'bluebird';

import linksDB from './../dbs/links';
import logger from './../services/logger';

const Injector = {
  regex:/{{\s?([\w\s\.\:\\\/]+)\s?}}/g,
  keywords: {
    "flex.css": `${process.env.STATIC_URL}/ajc-toolbelt/css/flex.css`,
    "display.css": `${process.env.STATIC_URL}/ajc-toolbelt/css/display.css`
  },
  actions: {
    links(tag) {
      return linksDB.get(tag).then(link => link.url);
    },
    image(tag) {
      return bluebird.resolve(`${process.env.STATIC_URL}/images/${path.normalize(tag)}`);
    }
  },
  inject(action, tag) {
    return this.actions[action](tag);
  },
  render(str) {
    const promises = [];
    const unknowns = [];
    let injected = str.replace(this.regex, (match, capture, index) => {
      capture = capture.trim();
      if(this.keywords[capture]) {
        return bluebird.resolve(this.keywords[capture]);
      }

      for(let action in this.actions) {
        if(capture.indexOf(`${action}:`) !== -1) {
          const tag = capture.replace(`${action}:`, '').trim();
          const promise = this.inject(action, tag).then(replace => {
            return { match, capture, action, replace, index };
          });
          promises.push(promise);
          return match;
        }
      }

      logger.error(`Unknown injection encountered: ${match}`);
      return match;
    });

    if(promises.length > 0) {
      return bluebird.all(promises).then(results => {
        let offset = 0;
        results.forEach(result => {
          const start = injected.slice(0, result.index + offset + 1);
          const end = injected.slice(result.index + result.match.length + offset + 1, injected.length + offset);
          offset += result.replace.length - result.match.length;
          injected = start + result.replace + end;
        });

        return injected;
      });
    }

    return bluebird.resolve(injected);
  }
};

export default Injector;
