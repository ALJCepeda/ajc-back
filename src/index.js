import express from 'express';
import './config';
import routes from './routes';
import logger from './libs/logger';

const app = express();
app.use((req,res,next) => {
  if(process.env.NODE_ENV === 'development') {
    res.header('Access-Control-Allow-Origin', '*');
  }

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const port = process.env.PORT;
routes(app);

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

logger.init('logs').then(() => {
  app.listen(port);
  logger.log(`Server started on ${port}`);
});
