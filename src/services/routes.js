module.exports = function(app) {
  import collectionController from '../controllers/collection';

  app.route('/collection/:collection')
     .get(collectionController.get);
};
