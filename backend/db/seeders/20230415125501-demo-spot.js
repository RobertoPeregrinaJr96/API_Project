'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoSpots = [
  {
    address: '123 Demo street lane',
    city: 'DemoCity1',
    state: 'DemoState1',
    country: 'DemoCountry1',
    lat: 73.80034,
    lng: 37.45572,
    name: 'DemoName1',
    description: 'this DemoPlace is so great for the DemoFamily',
    price: 560.34,
    ownerId: 1,
  },
  {
    address: '456 Demo street lane',
    city: 'DemoCity2',
    state: 'DemoState2',
    country: 'DemoCountry2',
    lat: -13.97836,
    lng: -38.20340,
    name: 'DemoName1',
    description: 'this isn\'t for the faint of heart and make sure you are alone ',
    price: 92.00,
    ownerId: 6,
  },
  {
    address: '789 Demo street lane',
    city: 'DemoCity3',
    state: 'DemoState3',
    country: 'DemoCountry3',
    lat: 13.97898,
    lng: -99.61281,
    name: 'DemoName1',
    description: 'this DemoPlace isn\'t  so great for the DemoFamily and suitable for the DemoBachelors',
    price: 750.00,
    ownerId: 1,
  },
  {
    address: '101 Demo street lane',
    city: 'DemoCity4',
    state: 'DemoState4',
    country: 'DemoCountry4',
    lat: 26.43606,
    lng: 65.82466,
    name: 'DemoName1',
    description: 'this DemoPlace is so great for the DemoFamily and DemoBachelor',
    price: 287.52,
    ownerId: 6,
  },
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
