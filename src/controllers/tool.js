import fs from 'fs';
import _ from 'lodash';
import crypto from 'crypto';
import Promise from 'bluebird';
import { Readable } from 'stream';

import winston from './../services/winston';

const randomBytes = Promise.promisify(crypto.randomBytes);

const ToolController = {
  addRoutes: (app) => {
    app.get('/tools/secureKey/:length', ToolController.secureKey);
    app.get('/tools/fileSized/:bytes', ToolController.fileSized);
  },
  secureKey: (req, res) => {
    const length = parseInt(req.params.length);

    if(!_.isNumber(length)) {
      winston.log.error(`tools.secureKey: length is not numeric`);
      return res.status(422).send('Length must be numeric');
    }

    return randomBytes(length).then((key) => {
      res.send(key.toString('hex').substring(0, length));
    }).catch(winston.internalError('tools.secureKey', res));
  },
  fileSized: (req, res) => {
    const bytes = parseInt(req.params.bytes);
    const chunkSize = 1000;

    if(!_.isNumber(bytes)) {
      winston.log.error(`tools.fileSized: bytes is not numeric`);
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
    }, winston.internalError('tools.secureKey', res));
  }
};

export default ToolController;
