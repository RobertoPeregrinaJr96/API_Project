'use strict';

const { DATE } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const demoBookings = [
  {
    startDate: new Date('2023-01-07'),
    endDate: new Date('2023-05-09'),
    userId: 1,
    spotId: 5,
  },
  {
    startDate: new Date('2023-03-14'),
    endDate: new Date('2023-04-15'),
    userId: 6,
    spotId: 5,
  },
  {
    startDate: new Date('2023-05-17'),
    endDate: new Date('2023-05-24'),
    userId: 3,
    spotId: 2,
  },
  {
    startDate: new Date('2023-02-30'),
    endDate: new Date('2023-05-31'),
    userId: 4,
    spotId: 2,
  },
  {
    startDate: new Date('2023-06-04'),
    endDate: new Date('2023-08-11'),
    userId: 1,
    spotId: 9,
  },
  {
    startDate: new Date('2023-02-23'),
    endDate: new Date('2023-09-27'),
    userId: 1,
    spotId: 7,
  },
  {
    startDate: new Date('2023-01-28'),
    endDate: new Date('2023-07-07'),
    userId: 6,
    spotId: 2,
  },
  {
    startDate: new Date('2023-07-15'),
    endDate: new Date('2023-12-16'),
    userId: 4,
    spotId: 8,
  },
  {
    startDate: new Date('2023-07-19'),
    endDate: new Date('2023-07-29'),
    userId: 5,
    spotId: 9,
  },
  {
    startDate: new Date("2023-11-19"),
    endDate: new Date("2023-11-20"),
    userId: 1,
    spotId: 1,
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
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, demoBookings);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options, demoBookings);
  }
};
