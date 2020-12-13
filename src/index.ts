import "reflect-metadata";
import badLogger, {logger} from './services/baseLogger';
import {createConnection} from "typeorm";
import {typeORMConfig} from "./config/typeorm";
import serverService from "./services/AppService";
import {AppConfig} from "./config/app";

async function run(): Promise<void> {
  await badLogger.init('logs');
  await createConnection(typeORMConfig);
  const {host, port} = AppConfig;

  await serverService.startServer(host, port);
  logger.info('Server started', { host, port });
}

run().then(() => {}, (err) => logger.error(err));
