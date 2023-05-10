'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoSpotImages = [
  {
    url: 'https://cdn.discordapp.com/attachments/1088906268485357618/1105537826239545354/images_14.jpg',
    preview: true,
    spotId: 1,
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1088906268485357618/1105537826625437747/images_13.jpg',
    preview: true,
    spotId: 2,
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1088906268485357618/1105537826969354391/images_12.jpg',
    preview: true,
    spotId: 3,
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1088906268485357618/1105537827204255805/images_11.jpg',
    preview: true,
    spotId: 4,
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1088906268485357618/1105537827481075752/images_10.jpg',
    preview: true,
    spotId: 5,
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1088906268485357618/1105537827783049216/images_9.jpg',
    preview: true,
    spotId: 6,
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1088906268485357618/1105537828047310878/images_8.jpg',
    preview: true,
    spotId: 7,
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1088906268485357618/1105537828747759657/images_6.jpg',
    preview: true,
    spotId: 8,
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1088906268485357618/1105537885362454650/images_2.jpg',
    preview: true,
    spotId: 9,
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1088906268485357618/1105537886360715355/images_4.jpg',
    preview: true,
    spotId: 9,
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1088906268485357618/1105537886704652308/images_3.jpg',
    preview: true,
    spotId: 9,
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1088906268485357618/1105537916001865749/download_5.jpg',
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
