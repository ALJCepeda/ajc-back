import 'babel-polyfill';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const appRoot = path.resolve(`${__dirname}/../`);

export default {
  blogURL: path.normalize(`${appRoot}/../blogs`)
};
