import _ from 'lodash';
import path from 'path';
import bluebird from 'bluebird';

import linksDB from './../services/links';
import logger from './../libs/logger';

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
  rebuild(parts, replacements) {
    return parts.reduce((result, part, index) => {
      result = result + part;

      if(_.isString(replacements[index])) {
        result = result + replacements[index];
      }

      return result;
    }, '');
  },
  findMatches(str) {
    const matches = [];
    let match = [];
    while ((match = this.regex.exec(str)) !== null) {
      matches.push({
        match:match[0],
        capture:match[1].trim(),
        index:match.index,
        input:match.input
      });
    }

    return matches;
  },
  splitTemplate(str, matches) {
    const parts = [];
    const promises = [];
    let offset = 0;
    matches.forEach(({ match, capture, index }) => {
      const part = str.slice(offset, index);
      offset = index + match.length;
      parts.push(part);

      const test = this.keywords[capture];
      if(this.keywords[capture]) {
        const promise = Promise.resolve(this.keywords[capture]);
        promises.push(promise);
        return true;
      } else {
        for(let action in this.actions) {
          if(capture.indexOf(`${action}:`) !== -1) {
            const tag = capture.replace(`${action}:`, '').trim();
            const promise = this.actions[action](tag);
            promises.push(promise);
            return true;
          }
        }
      }

      logger.error(`Unknown injection encountered: ${match}`);
    });
    parts.push(str.slice(offset, str.length));

    return { parts, promises };
  },
  render(str) {
    const matches = this.findMatches(str);
    const { parts, promises } = this.splitTemplate(str, matches);

    return bluebird.all(promises).then(results => {
      return this.rebuild(parts, results);
    });
  }
};

export default Injector;
