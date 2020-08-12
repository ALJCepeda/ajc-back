import moment from 'moment';
import store from './store';

store.setGeneral({
  firstname: 'Alfred',
  lastname: 'Cepeda',
  gender: 'Male',
  birthdate: moment('1988-08-30'),
  hometown: 'Yorktown Heights, New York',
  phone: '(813) 562-3862',
  email: 'AlfredJCepeda@gmail.com',
  image: require('./../assets/images/me.jpeg')
});

store.setSkills({
  'Node.JS': {
    outOfTen: 7,
    description:
      'Experienced in developing and deploying complicated server infastructures such as distributed models that utilized clusters and messaging queues. Capable of architecting high quality web services, command line tools, and desktop applications in a short amount of time through the smart design of isomorphic Javascript code.',
    projects: [],
    rank: 1
  },
  PHP: {
    outOfTen: 6,
    description: '',
    projects: [],
    rank: 2
  },
  Javascript: {
    outOfTen: 8,
    description: '',
    projects: [],
    rank: 3
  },
  HTML: {
    outOfTen: 7,
    description: '',
    projects: [],
    rank: 4
  },
  CSS: {
    outOfTen: 7,
    description: '',
    projects: [],
    rank: 5
  },
  SQL: {
    outOfTen: 9,
    description: '',
    projects: [],
    rank: 6
  },
  Vue: {
    outOfTen: 6,
    description: '',
    projects: [],
    rank: 7
  },
  'Angular 1.x': {
    outOfTen: 7,
    description: '',
    projects: [],
    rank: 8
  },
  'Angular 2.x': {
    outOfTen: 6,
    description: '',
    projects: [],
    rank: 9
  },
  iOS: {
    outOfTen: 5,
    description: '',
    projects: [],
    rank: 10
  },
  Bash: {
    outOfTen: 4,
    description: '',
    project: [],
    rank: 11
  }
});

store.setCities([
  {
    name: 'Yorktown Heights',
    state: 'New York',
    shortState: 'NY',
    zip: 'N/A',
    country: 'United States',
    logo: null,
    href: null,
    isHometown: true
  },
  {
    name: 'Independence',
    state: 'Oregon',
    shortState: 'OR',
    country: 'United States',
    logo: null,
    href: null
  },
  {
    name: 'Portland',
    state: 'Oregon',
    shortState: 'OR',
    country: 'United States',
    logo: null,
    href: null
  },
  {
    name: 'Port Saint Lucie',
    state: 'Florida',
    shortState: 'FL',
    country: 'United States',
    logo: null,
    href: null
  },
  {
    name: 'Overland Park',
    state: 'Kansas',
    shortState: 'KS',
    country: 'United States',
    logo: null,
    href: null
  },
  {
    name: 'Orlando',
    state: 'Florida',
    shortState: 'FL',
    country: 'United State',
    logo: null,
    href: null
  },
  {
    name: 'Lithia',
    state: 'Florida',
    shortState: 'FL',
    country: 'United States',
    logo: null,
    href: null
  }
]);

store.setAddresses([
  {
    number: 2763,
    street: 'Moreland St',
    zip: 10598,
    city: 'Yorktown Heights, NY'
  },
  {
    number: 175,
    street: 'Independence Way',
    zip: 97351,
    city: 'Independence, OR'
  },
  {
    number: 811,
    street: 'North Main St',
    zip: 97351,
    city: 'Independence, OR'
  },
  {
    number: 8,
    street: 'Brisa Ln',
    zip: 34952,
    city: 'Port Saint Lucie, FL'
  },
  {
    number: 1620,
    street: 'SE Green Acres Cir',
    unit: 'N-103',
    zip: 34952,
    city: 'Port Saint Lucie, FL'
  },
  {
    number: 6811,
    street: 'Shawnee Mission Pkwy',
    unit: '#206',
    zip: 66202,
    city: 'Overland Park, KS'
  },
  {
    number: 4000,
    street: 'Central Florida Blvd',
    zip: 32816,
    city: 'Orlando, FL'
  },
  {
    number: 16550,
    street: 'Fishhawk Blvd',
    zip: 33547,
    city: 'Lithia, FL'
  }
]);

store.setHomes([
  {
    address: '1620 SE Green Acres Cir N-103',
    start: moment('2017-04-01'),
    end: null
  },
  {
    address: '8 Brisa Ln',
    start: moment('2016-08-01'),
    end: moment('2017-03-31')
  },
  {
    address: '811 North Main St',
    start: moment('2015-06-01'),
    end: moment('2016-08-01')
  },
  {
    address: '175 Independence Way',
    start: moment('2012-08-01'),
    end: moment('2015-06-01')
  },
  {
    address: '2763 Moreland St',
    start: null,
    end: null
  }
]);

store.setJobs([
  {
    company: 'Nikao Coporation',
    title: 'Front End Developer',
    href: 'https://www.linkedin.com/company/nikao-corporation',
    address: '6811 Shawnee Mission Pkwy #206',
    description:
      'Nikao is a web and mobile technology innovation company that incubates and operates a diverse set of companies. We are founders, innovators, thinkers who are highly motivated and superbly caffeinated.',
    start: moment('2017-02-27'),
    end: null
  },
  {
    company: 'Self-Employed',
    title: 'Software Engineer',
    address: '8 Brisa Ln',
    description:
      'Mobile/Web/Software/Database development, consulting, review, and optimizations',
    start: moment('2012-01-01'),
    end: moment('2017-02-27')
  }
]);

store.setEducation([
  {
    type: 'college',
    name: 'University of Central Florida',
    degree: "Bachelor's in Interdisciplinary Studies",
    address: '4000 Central Florida Blvd',
    graduated: moment('2013-03-01'),
    href: 'https://ucf.edu',
    logo: 'https://www.ucf.edu/wp-content/uploads/2015/06/ucf.png'
  },
  {
    type: 'highschool',
    name: 'Newsome High School',
    address: '16550 Fishhawk Blvd',
    graduated: moment('2006-06-01'),
    href: 'http://newsome.mysdhc.org',
    logo: null
  }
]);

const data = store.build();
export default data;
