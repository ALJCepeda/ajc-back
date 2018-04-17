import babelPolyfill from 'babel-polyfill';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

global.appRoot = path.resolve(`${__dirname}/../`);

export default {
  blogURL: path.normalize(`${global.appRoot}/../blogs`),
  assetsURL: path.normalize(`${global.appRoot}/../static-assets`)
};
