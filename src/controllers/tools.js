import _ from 'lodash';
import * as crypto from 'crypto';
import { promisify } from 'bluebird';
import { Readable } from 'stream';

import logger from './../services/logger';

const randomBytes = promisify(crypto.randomBytes);

const ToolsController = {
  addRoutes: (app) => {
    app.get('/tools/secureKey/:length', ToolsController.secureKey);
    app.get('/tools/fileSized/:bytes', ToolsController.fileSized);
  },
  secureKey: (req, res) => {
    req.params = _.pick(req.params, [ 'length' ]);
    logger.access('tools.secureKey', req);

    const length = parseInt(req.params.length);

    if(!_.isNumber(length)) {
      logger.error(`tools.secureKey: length is not numeric`);
      return res.status(422).send('Length must be numeric');
    }

    return randomBytes(length).then((key) => {
      res.send(key.toString('hex').substring(0, length));
    }).catch(logger.internalError('tools.secureKey', res));
  },
  fileSized: (req, res) => {
    req.params = _.pick(req.params, [ 'bytes' ]);
    logger.access('tools.fileSized', req);

    const bytes = parseInt(req.params.bytes);
    const chunkSize = 1000;

    if(!_.isNumber(bytes)) {
      logger.error(`tools.fileSized: bytes is not numeric`);
      return res.status(422).send('Bytes must be numeric');
    }

    res.setHeader('Content-disposition', 'attachment; filename=file.txt');
    res.setHeader('Content-type', 'text/plain');
    const chunks = Math.floor(bytes/chunkSize);
    const remaining = bytes % chunkSize;

    const stream = new Readable;
    stream.pipe(res);
    stream._read = () => {};

    const promises = [];

    for(var i=0; i<chunks; i++) {
      const promise = randomBytes(chunkSize).then((chars) => {
        stream.push(chars);
      });

      promises.push(promise);
    }

    if(remaining > 0) {
      const promise = randomBytes(remaining).then((chars) => {
        stream.push(chars);
      });

      promises.push(promise);
    }

    Promise.all(promises).then(() => {
      stream.push(null);
    }, logger.internalError('tools.secureKey', res));
  }
};

export default ToolsController;
