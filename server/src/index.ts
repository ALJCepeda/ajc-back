require('dotenv').config({ path: './../.env' });
import "reflect-metadata";
import badLogger, {logger} from './services/baseLogger';
import {createConnection} from "typeorm";
import {typeORMConfig} from "./config/typeorm";
import serverService from "./services/AppService";

async function run(): Promise<void> {
  await badLogger.init('logs');
  await createConnection(typeORMConfig);
  const port = Number(process.env.SERVER_PORT) || 8001;
  const host = process.env.SERVER_HOST || '0.0.0.0';
  
  const { app } = await serverService.startServer(host, port);
  logger.info('Server started', { host, port });
}

run().then(() => {}, (err) => logger.error(err));
