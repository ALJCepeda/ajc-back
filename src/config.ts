import * as dotenv from 'dotenv';
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import User from "./models/User";
import Blog from "./models/Blog";
import TimelineEntry from "./models/TimelineEntry";

dotenv.config();

export const typeORMConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.PSQL_HOST || 'db',
  port: Number(process.env.PSQL_PORT || 5432),
  username: process.env.PSQL_USER || 'ajc-web',
  password: process.env.PSQL_PASSWORD || 'password',
  database: process.env.PSQL_DB || 'ajc-web'  ,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Blog,
    TimelineEntry
  ]
};
