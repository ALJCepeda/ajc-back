import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import Promise from 'bluebird';

import config from './../config';
import winston from './../services/winston';

const errorHandlers = {
  'ENOENT': (res) => res.status(404).send('Not Found')
};

const handleError = function(err, req, res) {
  const handler = errorHandlers[err.code];
  if(_.isUndefined(handler)) {
    if(err.toString() === 'ForbiddenError: Forbidden') {
      res.status(403).send('Please stop that');
    } else {
      winston.erroredRequest(err, req);
      res.status(500).send('Unexpected error, admins notified');
    }
  } else {
    handler(res);
  }
};

var BlogController = function(blogURL) {
  this.blogURL = blogURL;
};

BlogController.prototype.getBlogs = function(path) {
  path = path || this.blogURL;

  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if(err) return reject(err);
      resolve(files);
    });
  }).then((files) => {
    const promises = files.map((file) => {
      const url = `${path}/${file}`;
      return new Promise((resolve, reject) => {
        fs.lstat(url, (err, stats) => {
          if(err) return reject(err)

          if(stats.isDirectory()) {
            this.getBlogs(url).then((file) => {
              resolve(file[0]);
            });
          } else if(stats.isFile()) {
            resolve(url);
          }
        })
      });
    });

    return Promise.all(promises).then((urls) => {
      return urls.map((url) => url.replace(`${this.blogURL}/`, ''));
    });
  });
};

BlogController.prototype.parseBlog = function(str) {
  const result = {
    meta: {},
    html: str
  };

  const regex = /(?:(name)\s?=\s?(?:'|")([^'"]+)(?:'|")|(content)\s?=\s?(?:'|")([^'"]+)(?:'|"))/g;
  let match, key, value;
  while((match = regex.exec(str)) !== null) {
    match = _.compact(match);
    if(match[1] === 'name') {
      key = match[2];
    } else if(match[1] === 'content') {
      value = match[2];
    }

    if(!_.isNil(key) && !_.isNil(value)) {
      if(key === 'tags') {
        value = value.split(',');
      }

      result.meta[key] = value;
      key = value = null;
    }
  }

  return result
};

BlogController.prototype.readBlog = function(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${this.blogURL}/${file}`, 'utf8', (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

BlogController.prototype.gatherBlogMeta = function() {
  return this.getBlogs().then((urls) => {
    const promises = urls.map(url => this.readBlog(url));

    const result = {};
    return Promise.all(promises).then((blogs) => {
      return blogs.reduce((res, blog, index) => {
        res[urls[index]] = blog;
        return res;
      }, {});
    });
  }).then((blob) => {
    Object.entries(blob).forEach(([url, blog]) => {
      blob[url] = this.parseBlog(blog);
    });

    return blob;
  });
};

BlogController.prototype.manifest = {
  get: (req, res) => res.sendFile(path.normalize(`${config.blogURL}/manifest.json`))
};

BlogController.prototype.blog = {
  get: (req, res) => {
    const file = path.resolve(`${config.blogURL}/${req.params.file}`);
    readBlog(file).then((blog) => {
      const data = parseBlog(blog);
      res.send(data);
    }, (err) => {
      handleError(err, req, res);
    });
  }
};

export default BlogController;
