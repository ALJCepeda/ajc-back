import _ from 'lodash';
import Promise from 'bluebird';
import data from '../resources/data.js';

export const getCollection = function(collection) {
  const collectionData = data[collection];

  if(_.isUndefined(collectionData)) {
    throw new Error(`Undefined collection ${collection}`);
  }

  return collectionData;
};

export const fetchPrimary = function(collection, key) {
  const collectionData = getCollection(collection);
  return {
    key: key,
    value: collectionData[key]
  };
};

export const fetchRow = function(collection, key) {
  const collectionData = getCollection(collection);
  return {
    key: key,
    value: collectionData[key]
  };
};

export const fetch = function(collection, key) {
  if(_.isNumber(key)) {
    return fetchRow(collection, key);
  } else if(_.isString(key)) {
    return fetchPrimary(collection, key);
  } else {
    throw new Error(`Unable to complete fetch for key: ${key}`);
  }
};

export const lookupObject = function(collection, keys) {
  //return Promise.resolve();
};

export const lookupWithArray = function(collection, keys) {
  const promises = [];

  keys.forEach((key) => {
    const promise = fetch(collection, key);
    promises.push(promise);
  });

  return Promise.all(promises).then((data) => {
    return data.reduce((res, entry) => {
      res[entry.key] = entry.value;
      return res;
    }, {});
  });
};

export const get = function(collection, keys) {
  if(_.isArray(keys)) {
    return this.lookupWithArray(collection, keys);
  } else if(_.isObject(keys)) {
    return lookupObject(collection, keys);
  }
};

export const resolveRequest = function(req, res) {
  const collection = req.params.collection;

  if(_.isNil(collection)) {
    return res.status(400).send('Must define a collection').end();
  }

  const config = req.body;

  if(_.isNil(config.keys)) {
    return res.status(400).send('No lookups defined').end();
  }

  const { keys } = config;

  get(collection, keys)
    .then(res.send)
    .catch(res.status(400).send)
    .finally(res.end);
};

export default { fetchPrimary, lookupWithArray, get, resolveRequest };
