import { Pool } from 'pg';

import logger from './../services/logger';

const poolConfig = {
  host: process.env.PSQL_HOST,
  port: Number(process.env.PSQL_PORT),
  database: process.env.PSQL_DB,
  user: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

const pool = new Pool(poolConfig);

export default {
  pool,
  connect: pool.connect,
  query: async function(query, params = [] as any[]): Promise<any> {
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
