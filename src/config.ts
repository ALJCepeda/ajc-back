import * as dotenv from 'dotenv';
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import User from "./models/User";
import Blog from "./models/Blog";
import TimelineEntry from "./models/TimelineEntry";

dotenv.config();

export const typeORMConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER || 'ajc-web',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'ajc-web',
  synchronize: true,
  logging: false,
  entities: [
    User,
    Blog,
    TimelineEntry
  ]
};
