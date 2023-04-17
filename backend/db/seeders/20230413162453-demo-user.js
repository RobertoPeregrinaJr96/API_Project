'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoUsers = [
  {
    email: 'demo@user.io',
    username: 'Demo-lition',
    hashedPassword: bcrypt.hashSync('password'),
    firstName: 'demoFirstName',
    lastName: 'demoLastName'
  },
  {
    email: 'user2@user.io',
    username: 'FakeUser2',
    hashedPassword: bcrypt.hashSync('password2'),
    firstName: 'demoFirstName2',
    lastName: 'demoLastName2',
  },
  {
    email: 'user3@user.io',
    username: 'FakeUser3',
    hashedPassword: bcrypt.hashSync('password3'),
    firstName: 'demoFirstName3',
    lastName: 'demoLastName3',
  },
  {
    email: 'user4@user.io',
    username: 'FakeUser4',
    hashedPassword: bcrypt.hashSync('password4'),
    firstName: 'demoFirstName4',
    lastName: 'demoLastName4',
  },
  {
    email: 'user5@user.io',
    username: 'FakeUser5',
    hashedPassword: bcrypt.hashSync('password5'),
    firstName: 'demoFirstName5',
    lastName: 'demoLastName5',
  },
  {
    email: 'user6@user.io',
    username: 'FakeUser6',
    hashedPassword: bcrypt.hashSync('password6'),
    firstName: 'demoFirstName6',
    lastName: 'demoLastName6',
  },
  {
    email: 'user7@user.io',
    username: 'FakeUser7',
    hashedPassword: bcrypt.hashSync('password7'),
    firstName: 'demoFirstName7',
    lastName: 'demoLastName7',
  },
  {
    email: 'user8@user.io',
    username: 'FakeUser8',
    hashedPassword: bcrypt.hashSync('password8'),
    firstName: 'demoFirstName8',
    lastName: 'demoLastName8',
  },
  {
    email: 'user9@user.io',
    username: 'FakeUser9',
    hashedPassword: bcrypt.hashSync('password9'),
    firstName: 'demoFirstName9',
    lastName: 'demoLastName9',
  },
  {
    email: 'user10@user.io',
    username: 'FakeUser10',
    hashedPassword: bcrypt.hashSync('password10'),
    firstName: 'demoFirstName10',
    lastName: 'demoLastName10',
  },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
 * Add seed commands here.
 *
 * Example:
 * await queryInterface.bulkInsert('People', [{
 *   name: 'John Doe',
 *   isBetaMember: false
 * }], {});
*/
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, demoUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
 * Add commands to revert seed here.
 *
 * Example:
 * await queryInterface.bulkDelete('People', null, {});
 */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
