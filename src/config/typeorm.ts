import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import User from "../models/User";
import Blog from "../models/Blog";
import Log from "../models/Log";
import {HTTPLog} from "../models/HTTPLog";
import TimelineEntry from "../models/TimelineEntry";

export const typeORMConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB || process.env.POSTGRES_USER,
  synchronize: true,
  logging: false,
  entities: [
    Log,
    HTTPLog,
    User,
    Blog,
    TimelineEntry
  ]
};