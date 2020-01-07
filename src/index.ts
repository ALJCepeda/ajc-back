import './config';
import logger from './services/logger';
import {typeORMConfig} from "./config";
import {createConnection} from "typeorm";
import serverService from "./services/ServerService";

if(process.env.CONSOLE_ERRORS === 'true') {
  logger.consoleErrors = true;
}

if(process.env.CONSOLE_ACCESS === 'true') {
  logger.consoleAccess = true;
}

if(process.env.VERBOSE === 'true') {
  logger.verbose = true;
}

if(process.env.MUTE_COUNT === 'true') {
  logger.muteCount = true;
}

async function run(): Promise<any> {
  await logger.init('logs');
  await createConnection(typeORMConfig);
  const port = Number(process.env.PORT) || 3000;

  const app = serverService.setupApp();
  app.listen(port);
  logger.log(`Server started on ${port}`)
}

run().then(() => logger.log('Completed setup'), (err) => console.error(err));


