import moment from 'moment';
import _ from 'lodash';

const rawData = {};

const BaseWork = {
  link: '#',
  logo: require('./../assets/images/work-icon.png'),
  isHometown: false
};

export default {
  rawData: rawData,
  setGeneral: function(data) {
    this.rawData.general = Object.assign({}, data);
  },
  setSkills: function(data) {
    this.rawData.skills = Object.assign({}, data);
  },
  setCities: function(data) {
    this.rawData.cities = data.slice();
  },
  setAddresses: function(data) {
    this.rawData.addresses = data.slice();
  },
  setHomes: function(data) {
    this.rawData.homes = data.slice();
  },
  setJobs: function(data) {
    this.rawData.jobs = data.map(entry => Object.assign({}, BaseWork, entry));
  },
  setEducation: function(data) {
    this.rawData.education = data;
  },
  indexCities: function(cities) {
    const result = {};

    cities.forEach(city => {
      const key = `${city.name}, ${city.shortState}`;

      if (!_.isUndefined(result[key])) {
        throw new Error(`Primary key already defined: ${key}`);
      }

      result[key] = city;
    });

    return result;
  },
  referenceCities: function(entries, cities) {
    return entries.map(entry => {
      const city = cities[entry.city];

      if (_.isUndefined(city)) {
        throw new Error(`No city defined for: ${entry.city}`);
      }

      return Object.assign(entry, { city });
    });
  },
  indexAddresses: function(addresses) {
    const result = {};

    addresses.forEach(address => {
      var key = `${address.number} ${address.street}`;

      if (_.isString(address.unit)) {
        key = `${key} ${address.unit}`;
      }

      if (!_.isUndefined(result[key])) {
        throw new Error('Primary key already defined:', key);
      }

      result[key] = address;
    });

    return result;
  },
  referenceAddresses: function(entries, addresses) {
    return entries.map(entry => {
      const address = addresses[entry.address];

      if (_.isUndefined(address)) {
        throw new Error(`No address defined for: ${entry.address}`);
      }

      return Object.assign(entry, { address });
    });
  },
  indexEducation: function(entries) {
    const result = {};

    entries.forEach(entry => {
      result[entry.type] = entry;
    });

    return result;
  },
  qualifyDates: function(entries) {
    return entries.map(entry =>
      Object.assign(
        {
          fullStart: moment(entry.start).format('MMMM Do, YYYY'),
          fullEnd: moment(entry.end).format('MMMM Do, YYYY')
        },
        entry
      )
    );
  },
  build: function() {
    const general = this.rawData.general;
    general.fullname = `${general.firstname} ${general.lastname}`;

    const skills = this.rawData.skills;

    const cities = this.rawData.cities;
    const indexedCities = this.indexCities(cities);

    const addresses = this.referenceCities(
      this.rawData.addresses,
      indexedCities
    );
    const indexedAddresses = this.indexAddresses(addresses);

    const referencedHomes = this.referenceAddresses(
      this.rawData.homes,
      indexedAddresses
    );
    const homes = this.qualifyDates(referencedHomes);

    const jobs = this.referenceAddresses(this.rawData.jobs, indexedAddresses);

    const education = this.referenceAddresses(
      this.rawData.education,
      indexedAddresses
    );
    const indexedEducation = this.indexEducation(education);

    return {
      general,
      skills,
      cities,
      indexedCities,
      addresses,
      indexedAddresses,
      homes,
      jobs,
      education,
      indexedEducation
    };
  }
};
