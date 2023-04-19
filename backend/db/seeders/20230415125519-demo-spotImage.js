'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoSpotImages = [
  {
    url: 'demoURL.com',
    preview: true,
    spotId: 1,
  },
  {
    url: 'demo2URL.com',
    preview: true,
    spotId: 2,
  },
  {
    url: 'demo3URL.com',
    preview: false,
    spotId: 3,
  },
  {
    url: 'demo4URL.com',
    preview: true,
    spotId: 4,
  },
  {
    url: 'demo5URL.com',
    preview: true,
    spotId: 5,
  },
  {
    url: 'demo6URL.com',
    preview: true,
    spotId: 6,
  },
  {
    url: 'demo7URL.com',
    preview: false,
    spotId: 7,
  },
  {
    url: 'demo8URL.com',
    preview: true,
    spotId: 8,
  },
  {
    url: 'demo9URL.com',
    preview: true,
    spotId: 9,
  },
  {
    url: 'demo10URL.com',
    preview: true,
    spotId: 9,
  },
  {
    url: 'demo11URL.com',
    preview: false,
    spotId: 9,
  },
  {
    url: 'demo12URL.com',
    preview: true,
    spotId: 9,
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
    options.tableName = 'SpotImages'
    return queryInterface.bulkInsert(options, demoSpotImages, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages'
    return queryInterface.bulkDelete(options, demoSpotImages, {})
  }
};
