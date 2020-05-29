import './config';
import logger from './services/logger';
import {typeORMConfig} from "./config";
import {createConnection} from "typeorm";
import serverService from "./services/ServerService";

async function run(): Promise<void> {
  await logger.init('logs');
  console.log(typeORMConfig);
  await createConnection(typeORMConfig);
  const port = Number(process.env.PORT) || 3000;

  const app = serverService.setupApp();
  app.listen(port);
  logger.log(`Server started on ${port}`)
}

run().then(() => logger.log('Completed setup'), (err) => logger.error(err));
