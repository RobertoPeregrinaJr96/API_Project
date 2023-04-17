'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const demoBookings = [
  // MM/DD/YYYY
  {
    startDate: '02-01-2023',
    endDate: '03-01-2023',
    userId: 1,
    spotId: 2,
  },
  {
    startDate: '04-01-2023',
    endDate: '05-01-2023',
    userId: 2,
    spotId: 3,
  },
  {
    startDate: '06-01-2023',
    endDate: '07-01-2023',
    userId: 3,
    spotId: 4,
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
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, demoBookings, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, demoBookings, {});
  }
};
