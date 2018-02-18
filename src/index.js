import express from 'express';

import routes from './services/routes';
import winston from './services/winston';

const app = express();
const port = process.env.PORT;
routes(app);
app.listen(port);

winston.log.verbose(`Server started on: ${port}`);
