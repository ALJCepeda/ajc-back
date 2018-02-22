import { Pool } from 'pg';
import Promise from 'bluebird';

import winston from './winston.js';

const pool = new Pool({
  host: 'localhost',
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default {
  query: function(query, params = []) {
    return pool.connect().then(client => {
      return client.query(query, params).then(
        res => { client.release(); return res; },
        err => winston.log.error(`pg.query: ${err.stack}`)
      );
    }, err => winston.log.error(`pg.connect: ${err.stack}`));
  }
};
