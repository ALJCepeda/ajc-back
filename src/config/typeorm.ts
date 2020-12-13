import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import User from "../models/User";
import Blog from "../models/Blog";
import Log from "../models/Log";
import {HTTPLog} from "../models/HTTPLog";
import TimelineEntry from "../models/TimelineEntry";
import {AppConfig} from "./app";

export const typeORMConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: AppConfig.postgres.host,
  port: AppConfig.postgres.port,
  username: AppConfig.postgres.username,
  password: AppConfig.postgres.password,
  database: AppConfig.postgres.database,
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
