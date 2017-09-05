import collectionCtrl from './../../controllers/collection.js';

describe('Collection controller', () => {
  it('should get fetch field from collection', () => {
    const result = collectionCtrl.fetchPrimary('general', 'firstname');

    expect(result).toEqual({
      key: 'firstname',
      value: 'Alfred'
    });
  });

  it('should fetch an array of values from collection', (done) => {
    collectionCtrl.lookupWithArray('general', ['firstname', 'lastname', 'image']).then((result) => {
      expect(result).toEqual({
        firstname: 'Alfred',
        lastname: 'Cepeda',
        image: './../assets/images/me.jpeg'
      });

      done();
    });
  });

  it('should call lookupWithArray when using an array', () => {
    spyOn(collectionCtrl, 'lookupWithArray');

    collectionCtrl.get('general', ['firstname', 'lastname', 'image']);

    expect(collectionCtrl.lookupWithArray).toHaveBeenCalledWith('general', [ 'firstname', 'lastname', 'image']);
  });
});
