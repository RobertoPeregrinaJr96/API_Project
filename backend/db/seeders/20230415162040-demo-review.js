'use strict';

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoReviews = [
  {
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac interdum mi. Suspendisse quis turpis quam. Quisque ac risus nulla. Praesent interdum, orci nec sodales auctor, nunc tortor imperdiet magna, vel dictum urna lectus et tortor ',
    stars: 3,
    userId: 1,
    spotId: 2,
  },
  {
    review: 'Maecenas est enim, aliquam vel interdum et, elementum bibendum turpis. Proin sed feugiat orci,  ',
    stars: 5,
    userId: 2,
    spotId: 3,
  },
  {
    review: 'Morbi eu eleifend velit. Pellentesque feugiat erat lorem, in maximus mi blandit et. Praesent eget cursus orci. Aliquam porta odio eget tempus posuere. Maecenas hendrerit felis diam, et vulputate urna ultrices at. Integer faucibus, tortor ut eleifend maximus, ',
    stars: 1,
    userId: 3,
    spotId: 4,
  },
  {
    review: 'Mauris sagittis viverra tempus. Duis consectetur pulvinar molestie. Suspendisse elementum    ',
    stars: 4,
    userId: 4,
    spotId: 8,
  },
  {
    review: 'Etiam at mauris nisi. Vestibulum odio mi, suscipit nec ante a, finibus posuere diam. In mollis maximus nisi, vel pulvinar sapien pellentesque in. ',
    stars: 2,
    userId: 6,
    spotId: 4,
  },
  {
    review: 'Aenean ac pretium ligula. Morbi eu odio at orci sollicitudin vehicula ut sed mauris.  ',
    stars: 4,
    userId: 5,
    spotId: 8,
  },
  {
    review: 'Phasellus quis facilisis justo, id aliquam est. Aliquam tempor dignissim ex in aliquet. ',
    stars: 1,
    userId: 4,
    spotId: 8,
  },
  {
    review: 'Vivamus ut ipsum porttitor, pellentesque sem vitae, molestie eros. Etiam sit amet eros sed  ',
    stars: 1,
    userId: 4,
    spotId: 7,
  },
  {
    review: 'Sed quis augue eu nibh ornare aliquet. Pellentesque varius pellentesque velit id consequat.  ',
    stars: 5,
    userId: 3,
    spotId: 9,
  },
  {
    review: 'In euismod ipsum velit. Donec rutrum, nulla quis lacinia porttitor, nunc justo malesuada est,   ',
    stars: 1,
    userId: 3,
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
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, demoReviews, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, demoReviews, {});
  }
};
