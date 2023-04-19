'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoReviewImage = [
  {
    url: 'demoReviewURL.com',
    reviewId: 1,
  },
  {
    url: 'demoReviewURL2.com',
    reviewId: 2,
  },
  {
    url: 'demoReviewURL3.com',
    reviewId: 3,
  },
  {
    url: 'demoReviewURL4.com',
    reviewId: 1,
  },
  {
    url: 'demoReviewURL5.com',
    reviewId: 2,
  },
  {
    url: 'demoReviewURL6.com',
    reviewId: 3,
  },
  {
    url: 'demoReviewURL7.com',
    reviewId: 7,
  },
  {
    url: 'demoReviewURL8.com',
    reviewId: 2,
  },
  {
    url: 'demoReviewURL9.com',
    reviewId: 3,
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
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, demoReviewImage, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, demoReviewImage, {});
  }
};
