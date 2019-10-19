import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const appRoot = path.resolve(`${__dirname}/../`);

export default {
  blogURL: path.normalize(`${appRoot}/../blogs`)
};
