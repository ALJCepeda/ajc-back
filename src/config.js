import path from 'path';

global.appRoot = path.resolve(`${__dirname}/../`);

export default {
  blogURL: path.normalize(`${global.appRoot}/../blogs`)
};
