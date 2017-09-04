import collectionController from '../controllers/collection';

export default function(app) {
  app.route('/collection/:collection')
     .get(collectionController.get);
};
