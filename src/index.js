import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import routes from './services/routes';
import logger from './services/logger';

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

logger.init().then(() => {
  app.listen(port);
  logger.log(`Server started on ${port}`);
});
