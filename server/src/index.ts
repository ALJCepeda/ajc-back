require('dotenv').config({ path: './../.env' });

import logger from './services/logger';
import {createConnection} from "typeorm";
import {typeORMConfig} from "./config/typeorm";
import serverService from "./services/ServerService";

async function run(): Promise<void> {
  await logger.init('logs');
  console.log(typeORMConfig);
  await createConnection(typeORMConfig);
  const port = Number(process.env.SERVER_PORT) || 8001;
  const host = process.env.SERVER_HOST || '0.0.0.0';

  const app = serverService.setupApp();
  app.listen(port, host);
  logger.log(`Server started on ${host}:${port}`)
}

run().then(() => logger.log('Completed setup'), (err) => logger.error(err));
