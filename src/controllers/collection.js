import _ from 'lodash';
import data from '../data.js';

export const getCollection = function(collection) {
  const collectionData = data[collection];

  if(_.isUndefined(collectionData)) {
    throw new Error(`Undefined collection ${collection}`);
  }

  return collectionData;
};

export const fetchPrimary = function(collection, key) {
  const collectionData = getCollection(collection);
  return collectionData[key];
};

export const fetchRow = function(collection, key) {
  const collectionData = getCollection(collection);
  return collectionData[key];
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

};

export const lookupArray = function(collection, key) {
  return keys.reduce((res, key) => {
    res[key] = fetch(collection, key);
  }, {});
};

export const get = function(req, res) {
  const collection = req.params.collection;

  if(_.isNil(collection)) {
    return res.status(400).send('Must define a collection').end();
  }

  const config = req.body;

  if(_.isNil(config.keys)) {
    return res.status(400).send('No lookups defined').end();
  }

  const { keys } = config;

  if(_.isObject(keys)) {
    return lookupObject(collection, keys)
      .then(res.send)
      .catch(res.status(400).send)
      .finally(res.end);
  } else if(_.isArray(keys)) {
    return lookupArray(collection, keys)
      .then(res.send)
      .catch(res.status(400).send)
      .finally(res.end);
  } else {
    return res.status(400).send('Invalid configuration').end();
  }
};

export default {
  get
};
