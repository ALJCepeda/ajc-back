import express from 'express';

import routes from './services/routes';
import winston from './services/winston';

const app = express();
app.use((req,res,next) => {
  if(process.env.NODE_ENV === 'development') {
    res.header('Access-Control-Allow-Origin', 'http://10.0.0.227:8080');
  }
  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const port = process.env.PORT;
routes(app);
app.listen(port);

winston.log.verbose(`Server started on: ${port}`);
