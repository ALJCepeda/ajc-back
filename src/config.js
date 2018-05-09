import babelPolyfill from 'babel-polyfill';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

global.appRoot = path.resolve(`${__dirname}/../`);

export default {
  blogURL: path.normalize(`${global.appRoot}/../blogs`),
  assets: {
    flex: {
      css:`${process.env.STATIC_URL}/aj-toolbelt/css/flex.css`
    }
  }
};
