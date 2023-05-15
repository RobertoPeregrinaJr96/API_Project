'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoSpots = [
  // 1
  {
    "address": '822 Bald Hill Ave',
    "city": 'San Jose',
    "state": 'California',
    "country": 'United States of America',
    "lat": 73.80034,
    "lng": 37.45572,
    "name": 'Beech Lodge',
    "description": 'Pellentesque iaculis augue sapien, ut aliquam massa luctus at. Sed aliquam tincidunt neque,  ',
    "price": 111.34,
    "ownerId": 7,
  },
  // 2
  {
    "address": '30 Penn Ave',
    "city": 'Sylmar',
    "state": 'California ',
    "country": 'United States of America',
    "lat": -13.97836,
    "lng": -38.20340,
    "name": 'Sea View',
    "description": 'Nulla interdum faucibus neque sit amet consequat. Duis vehicula rutrum elementum. ',
    "price": 222.00,
    "ownerId": 8,
  },
  // 3
  {
    "address": '9639 Court Drive',
    "city": 'Antioch',
    "state": 'California',
    "country": 'United States of America',
    "lat": 13.97898,
    "lng": -99.61281,
    "name": 'Seaways',
    "description": 'Nulla interdum faucibus neque sit amet consequat. Duis vehicula rutrum elementum. Cras lobortis egestas  ',
    "price": 333.00,
    "ownerId": 9,
  },
  // 4
  {
    "address": '71 Coffee Ave',
    "city": 'Laguna Niguel',
    "state": 'California',
    "country": 'United States of America',
    "lat": 26.43606,
    "lng": 65.82466,
    "name": 'Whittington House',
    "description": 'Vestibulum enim purus, posuere sed orci sed, finibus rutrum dolor. Vivamus in augue ac arcu cursus  ',
    "price": 444.52,
    "ownerId": 7,
  },
  // 5
  {
    "address": '8652 Cemetery St',
    "city": 'Folsom',
    "state": 'California',
    "country": 'United States of America',
    "lat": 41.78689,
    "lng": 138.62952,
    "name": 'The Old Barn',
    "description": 'Fusce pellentesque nisl ut libero porta, eget tristique magna pulvinar. ',
    "price": 555.34,
    "ownerId": 8,
  },
  // 6
  {
    "address": '119 Redwood Ave',
    "city": 'Pomona',
    "state": 'California',
    "country": 'United States of America',
    "lat": -24.19721,
    "lng": -159.31762,
    "name": 'The Apples',
    "description": 'Maecenas eu odio iaculis elit suscipit facilisis in in tellus. Sed sollicitudin metus sit amet metus tempus, eu consectetur mi fringilla.',
    "price": 666.34,
    "ownerId": 9,
  },
  // 7
  {
    "address": '67 Belmont Court',
    "city": 'Azusa',
    "state": 'California',
    "country": 'United States of America',
    "lat": -52.52005,
    "lng": 16.43605,
    "name": 'Primroseside',
    "description": 'Suspendisse sed ipsum eget risus rutrum venenatis vitae sit amet quam. Aenean eget arcu laoreet, ornare urna a, fringilla eros. Ut rutrum velit sed ante egestas, molestie tincidunt nunc hendrerit. Fusce consequat',
    "price": 777.34,
    "ownerId": 7,
  },
  // 8
  {
    "address": '103 Broad St',
    "city": 'Milpitas',
    "state": 'California',
    "country": 'United States of America',
    "lat": 30.64851,
    "lng": 44.45122
    ,
    "name": 'Apple House',
    "description": 'Nam non magna sapien. Sed pulvinar, nunc at efficitur egestas, tellus felis finibus leo, nec hendrerit libero massa sit amet mi. Nunc efficitur ',
    "price": 888.34,
    "ownerId": 8,
  },
  // 9
  {
    "address": '81 East Ave',
    "city": 'Santa Ana',
    "state": 'California',
    "country": 'United States of America',
    "lat": -23.15180,
    "lng": -44.63480,
    "name": 'Snake\'s Lodge',
    "description": 'Sed nec efficitur elit. Nunc dapibus blandit lorem iaculis congue. Nam pellentesque congue malesuada. Nunc ac dictum dolor. Maecenas molestie massa ',
    "price": 999.34,
    "ownerId": 9,
  },
  // 10
  {
    "address": "64 E. Spruce Street",
    "city": "South Gate",
    "state": "California",
    "country": "United States of America",
    "lat": 37.7645358,
    "lng": -122.4730327,
    "name": "Frozen House",
    "description": "Suspendisse sapien nunc, gravida sed consectetur sagittis, suscipit vitae nisl. Donec dapibus tincidunt augue, cursus mollis mi eleifend sed.",
    "price": 546.51,
    "ownerId": 10,
  },
  // 11
  {
    "address": "135 Courtland St",
    "city": "Van Nuys",
    "state": "California",
    "country": "United States of America",
    "lat": 37.7645358,
    "lng": -122.4730327,
    "name": "Woodlandside",
    "description": "Fusce pellentesque nisl ut libero porta, eget tristique magna pulvinar. Maecenas finibus purus ut tortor laoreet, sit amet finibus dui consectetur.",
    "price": 724.24,
    "ownerId": 10,
  },
  // 12
  {
    "address": "83 Wintergreen Circle",
    "city": "Simi Valley",
    "state": "California",
    "country": "United States of America",
    "lat": 37.7645358,
    "lng": -122.4730327,
    "name": "Oak End",
    "description": "Vestibulum enim purus, posuere sed orci sed, finibus rutrum dolor. Vivamus in augue ac arcu cursus lobortis at sit amet tortor. Nulla neque nibh, ",
    "price": 534.45,
    "ownerId": 10,
  },
  // 13
  {
    "address": "123 Disney Lane",
    "city": "San Francisco",
    "state": "California",
    "country": "United States of America",
    "lat": 37.7645358,
    "lng": -122.4730327,
    "name": "App Academy",
    "description": "Place where web developers are created",
    "price": 123,
    "ownerId": 10,
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Spots'
    await queryInterface.bulkInsert(options, demoSpots, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots'
    await queryInterface.bulkDelete(options, demoSpots, {})
  }
};
