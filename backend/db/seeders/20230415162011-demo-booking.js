'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const demoBookings = [
  {
    startDate: '2021-05-07',
    endDate: '2021-05-09',
    userId: 1,
    spotId: 5,
  },
  {
    startDate: '2021-05-14',
    endDate: '2021-05-15',
    userId: 6,
    spotId: 5,
  },
  {
    startDate: '2021-05-17',
    endDate: '2021-05-24',
    userId: 3,
    spotId: 2,
  },
  {
    startDate: '2021-05-30',
    endDate: '2021-05-31',
    userId: 4,
    spotId: 2,
  },
  {
    startDate: '2021-06-04',
    endDate: '2021-06-11',
    userId: 1,
    spotId: 9,
  },
  {
    startDate: '2021-06-23 ',
    endDate: '2021-06-27',
    userId: 1,
    spotId: 7,
  },
  {
    startDate: '2021-06-28',
    endDate: '2021-07-07',
    userId: 6,
    spotId: 2,
  },
  {
    startDate: '2021-07-15',
    endDate: '2021-07-16',
    userId: 4,
    spotId: 8,
  },
  {
    startDate: '2021-07-19',
    endDate: '2021-07-29',
    userId: 5,
    spotId: 9,
  },
  {
    startDate: "2021-11-19",
    endDate: "2021-11-20",
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
