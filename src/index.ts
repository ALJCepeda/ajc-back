import './config';
import logger from './services/logger';
import {typeORMConfig} from "./config";
import {createConnection} from "typeorm";
import serverService from "./services/ServerService";

logger.consoleErrors = process.env.CONSOLE_ERRORS === 'true';
logger.consoleAccess = process.env.CONSOLE_ACCESS === 'true';
logger.verbose = process.env.VERBOSE === 'true';
logger.muteCount = process.env.MUTE_COUNT === 'true';

async function run(): Promise<void> {
  await logger.init('logs');
  await createConnection(typeORMConfig);
  const port = Number(process.env.PORT) || 3000;

  const app = serverService.setupApp();
  app.listen(port);
  logger.log(`Server started on ${port}`)
}

run().then(() => logger.log('Completed setup'), (err) => logger.error(err));
