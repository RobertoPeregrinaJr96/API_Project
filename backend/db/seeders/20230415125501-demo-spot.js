'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoSpots = [
  {
    "address": '123 Demo street lane',
    "city": 'DemoCity1',
    "state": 'DemoState1',
    "country": 'DemoCountry1',
    "lat": 73.80034,
    "lng": 37.45572,
    "name": 'DemoName1',
    "description": 'this DemoPlace is so great for the DemoFamily',
    "price": 111.34,
    "ownerId": 7,
  },
  {
    "address": '456 Demo street lane',
    "city": 'DemoCity2',
    "state": 'DemoState2',
    "country": 'DemoCountry2',
    "lat": -13.97836,
    "lng": -38.20340,
    "name": 'DemoName1',
    "description": 'this isn\'t for the faint of heart and make sure you are alone ',
    "price": 222.00,
    "ownerId": 8,
  },
  {
    "address": '789 Demo street lane',
    "city": 'DemoCity3',
    "state": 'DemoState3',
    "country": 'DemoCountry3',
    "lat": 13.97898,
    "lng": -99.61281,
    "name": 'DemoName1',
    "description": 'this DemoPlace isn\'t  so great for the DemoFamily and suitable for the DemoBachelors',
    "price": 333.00,
    "ownerId": 9,
  },
  {
    "address": '101 Demo street lane',
    "city": 'DemoCity4',
    "state": 'DemoState4',
    "country": 'DemoCountry4',
    "lat": 26.43606,
    "lng": 65.82466,
    "name": 'DemoName1',
    "description": 'this DemoPlace is so great for the DemoFamily and DemoBachelor',
    "price": 444.52,
    "ownerId": 7,
  }, {
    "address": '125 Demo street lane',
    "city": 'DemoCity5',
    "state": 'DemoState5',
    "country": 'DemoCountry5',
    "lat": 41.78689,
    "lng": 138.62952,
    "name": 'DemoName5',
    "description": 'this DemoPlace is so great for the DemoFamily',
    "price": 555.34,
    "ownerId": 8,
  }, {
    "address": '126 Demo street lane',
    "city": 'DemoCity6',
    "state": 'DemoState6',
    "country": 'DemoCountry6',
    "lat": -24.19721,
    "lng": -159.31762,
    "name": 'DemoName6',
    "description": 'this DemoPlace is so great for the DemoFamily',
    "price": 666.34,
    "ownerId": 9,
  }, {
    "address": '127 Demo street lane',
    "city": 'DemoCity7',
    "state": 'DemoState7',
    "country": 'DemoCountry7',
    "lat": -52.52005,
    "lng": 16.43605,
    "name": 'DemoName7',
    "description": 'this DemoPlace is so great for the DemoFamily',
    "price": 777.34,
    "ownerId": 7,
  }, {
    "address": '128 Demo street lane',
    "city": 'DemoCity8',
    "state": 'DemoState8',
    "country": 'DemoCountry8',
    "lat": 30.64851,
    "lng": 44.45122
    ,
    "name": 'DemoName8',
    "description": 'this DemoPlace is so great for the DemoFamily',
    "price": 888.34,
    "ownerId": 8,
  }, {
    "address": '129 Demo street lane',
    "city": 'DemoCity9',
    "state": 'DemoState9',
    "country": 'DemoCountry9',
    "lat": -23.15180,
    "lng": -44.63480,
    "name": 'DemoName9',
    "description": 'this DemoPlace is so great for the DemoFamily',
    "price": 999.34,
    "ownerId": 9,
  },
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
