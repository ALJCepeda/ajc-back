import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
