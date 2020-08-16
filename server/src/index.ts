require('dotenv').config({ path: './../.env' });

import badLogger, {logger} from './services/baseLogger';
import {createConnection} from "typeorm";
import {typeORMConfig} from "./config/typeorm";
import serverService from "./services/AppService";

async function run(): Promise<void> {
  await badLogger.init('logs');
  console.log(typeORMConfig);
  await createConnection(typeORMConfig);
  const port = Number(process.env.SERVER_PORT) || 8001;
  const host = process.env.SERVER_HOST || '0.0.0.0';
  
  const app = serverService.setupApp();
  app.listen(port, host);
  logger.info('Server started', { host, port });
}

run().then(() => {}, (err) => logger.error(err));
