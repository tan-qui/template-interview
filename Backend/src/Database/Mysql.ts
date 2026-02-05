import { config } from 'dotenv';
import { createPool } from 'mysql2/promise';

const envFile = `.env.${process.env.NODE_ENV}`;
config({ path: envFile });

const dbPool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 100,
  decimalNumbers: true
});

export default dbPool;