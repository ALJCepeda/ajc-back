import * as dotenv from 'dotenv';
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import User from "./models/User";
import Blog from "./models/Blog";
import TimelineEntry from "ajc-shared/src/models/TimelineEntry";

dotenv.config();

export const typeORMConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: process.env.PSQL_HOST,
  port: Number(process.env.PSQL_PORT),
  username: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD,
  database: process.env.PSQL_DB,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Blog,
    TimelineEntry
  ]
};
