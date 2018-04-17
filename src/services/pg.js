import { Pool } from 'pg';
import Promise from 'bluebird';

import logger from './logger.js';

const pool = new Pool({
  host: process.env.PSQL_HOST,
  port: process.env.PSQL_PORT,
  database: process.env.PSQL_DB,
  user: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default {
  pool,
  connect: pool.connect,
  query: async function(query, params = []) {
    try {
      const client = await pool.connect();
      const res = await client.query(query, params);
      client.release();
      return res;
    } catch(err) {
      logger.error(`pg.query: ${err.stack}`);
      throw err;
    }
  }
};
