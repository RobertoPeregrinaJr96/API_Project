'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



const demoUsers = [
  {
    email: 'LizGaines@email.com',
    username: 'FakeUser1',
    hashedPassword: bcrypt.hashSync('password'),
    firstName: 'Liz ',
    lastName: 'Gaines'
  },
  {
    email: 'MarcusSawyer@email.com',
    username: 'FakeUser2',
    hashedPassword: bcrypt.hashSync('password'),
    firstName: 'Marcus ',
    lastName: 'Sawyer',
  },
  {
    email: 'DeloresBates@email.com',
    username: 'FakeUser3',
    hashedPassword: bcrypt.hashSync('password'),
    firstName: 'Delores ',
    lastName: 'Bates',
  },
  {
    email: 'CindyWiley@email.com',
    username: 'FakeUser4',
    hashedPassword: bcrypt.hashSync('password'),
    firstName: 'Cindy ',
    lastName: 'Wiley',
  },
  {
    email: 'MarshaRoe@email.com',
    username: 'FakeUser5',
    hashedPassword: bcrypt.hashSync('password'),
    firstName: 'Marsha ',
    lastName: 'Roe',
  },
  {
    email: 'TrevorSparks@email.com',
    username: 'FakeUser6',
    hashedPassword: bcrypt.hashSync('password'),
    firstName: 'Trevor',
    lastName: 'Sparks',
  },
  {
    email: 'AlexisMoss@email.com',
    username: 'FakeUser7',
    hashedPassword: bcrypt.hashSync('password'),
    firstName: 'Alexis ',
    lastName: 'Moss',
  },
  {
    email: 'MargueriteCowan@email.com',
    username: 'FakeUser8',
    hashedPassword: bcrypt.hashSync('password'),
    firstName: 'Marguerite ',
    lastName: 'Cowan',
  },
  {
    email: 'RoxanneHyde@email.com',
    username: 'FakeUser9',
    hashedPassword: bcrypt.hashSync('password'),
    firstName: 'Roxanne ',
    lastName: 'Hyde',
  },
  {
    email: 'GordonGibbs@email.com',
    username: 'FakeUser10',
    hashedPassword: bcrypt.hashSync('password'),
    firstName: 'Gordon ',
    lastName: 'Gibbs',
  },
  {
    email: 'DemoUser@email.com',
    username: 'DemoUser',
    hashedPassword: bcrypt.hashSync('password'),
    firstName: 'John ',
    lastName: 'Smith',
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
