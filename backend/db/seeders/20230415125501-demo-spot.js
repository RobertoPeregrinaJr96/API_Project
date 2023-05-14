'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoSpots = [
  // 1
  {
    "address": '822 Bald Hill Ave',
    "city": 'San Jose',
    "state": 'California',
    "country": 'United States of America',
    "lat": 73.80034,
    "lng": 37.45572,
    "name": 'Beech Lodge',
    "description": 'Pellentesque iaculis augue sapien, ut aliquam massa luctus at. Sed aliquam tincidunt neque, in volutpat mauris congue nec. Proin ac porta lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras eget mattis ipsum, non scelerisque dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi non sem id sapien maximus lobortis. Sed bibendum at sapien vulputate luctus. Curabitur efficitur mollis hendrerit. Donec dapibus eget est et varius. Aliquam placerat eros id mattis vehicula. Quisque vel ullamcorper ex, vel placerat magna.',
    "price": 111.34,
    "ownerId": 7,
  },
  // 2
  {
    "address": '30 Penn Ave',
    "city": 'Sylmar',
    "state": 'California ',
    "country": 'United States of America',
    "lat": -13.97836,
    "lng": -38.20340,
    "name": 'Sea View',
    "description": 'Nulla interdum faucibus neque sit amet consequat. Duis vehicula rutrum elementum. Cras lobortis egestas blandit. Ut mollis, augue in scelerisque vulputate, velit justo volutpat eros, ac interdum odio velit facilisis orci. Ut suscipit elit eget mauris fermentum, et commodo eros mollis. Donec vel volutpat sem, commodo faucibus sem. Fusce in hendrerit purus. Nulla tempus sagittis augue, nec ullamcorper sapien laoreet a. Nulla id sagittis odio. Cras commodo, purus non consequat aliquet, risus est auctor sapien, vel iaculis nulla tellus ut dolor. Quisque a turpis sed nisi ultrices luctus et vitae nisi. Integer fermentum, odio molestie suscipit ullamcorper, massa elit suscipit augue, sed volutpat arcu dolor in est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus augue lacus, tristique id turpis ac, venenatis accumsan nunc. Maecenas faucibus leo et vulputate dictum. Sed massa sem, pretium nec bibendum vitae, auctor eu ex.',
    "price": 222.00,
    "ownerId": 8,
  },
  // 3
  {
    "address": '9639 Court Drive',
    "city": 'Antioch',
    "state": 'California',
    "country": 'United States of America',
    "lat": 13.97898,
    "lng": -99.61281,
    "name": 'Seaways',
    "description": 'Nulla interdum faucibus neque sit amet consequat. Duis vehicula rutrum elementum. Cras lobortis egestas blandit. Ut mollis, augue in scelerisque vulputate, velit justo volutpat eros, ac interdum odio velit facilisis orci. Ut suscipit elit eget mauris fermentum, et commodo eros mollis. Donec vel volutpat sem, commodo faucibus sem. Fusce in hendrerit purus. Nulla tempus sagittis augue, nec ullamcorper sapien laoreet a. Nulla id sagittis odio. Cras commodo, purus non consequat aliquet, risus est auctor sapien, vel iaculis nulla tellus ut dolor. Quisque a turpis sed nisi ultrices luctus et vitae nisi. Integer fermentum, odio molestie suscipit ullamcorper, massa elit suscipit augue, sed volutpat arcu dolor in est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus augue lacus, tristique id turpis ac, venenatis accumsan nunc. Maecenas faucibus leo et vulputate dictum. Sed massa sem, pretium nec bibendum vitae, auctor eu ex.',
    "price": 333.00,
    "ownerId": 9,
  },
  // 4
  {
    "address": '71 Coffee Ave',
    "city": 'Laguna Niguel',
    "state": 'California',
    "country": 'United States of America',
    "lat": 26.43606,
    "lng": 65.82466,
    "name": 'Whittington House',
    "description": 'Vestibulum enim purus, posuere sed orci sed, finibus rutrum dolor. Vivamus in augue ac arcu cursus lobortis at sit amet tortor. Nulla neque nibh, scelerisque quis lorem vel, condimentum efficitur justo. Vivamus ullamcorper rhoncus nibh, at pulvinar lorem consequat vel. Ut non quam ligula. In suscipit neque ac diam tristique elementum et id dui. Nulla ac dui auctor diam blandit commodo nec quis augue. Quisque eu dolor ac nisl aliquam pulvinar. Aliquam dapibus risus nisl, eget tincidunt risus varius at. Curabitur lobortis maximus metus non porta. Nunc convallis eros turpis, quis pharetra lorem molestie eget. Sed maximus gravida justo non tristique.',
    "price": 444.52,
    "ownerId": 7,
  },
  // 5
  {
    "address": '8652 Cemetery St',
    "city": 'Folsom',
    "state": 'California',
    "country": 'United States of America',
    "lat": 41.78689,
    "lng": 138.62952,
    "name": 'The Old Barn',
    "description": 'Fusce pellentesque nisl ut libero porta, eget tristique magna pulvinar. Maecenas finibus purus ut tortor laoreet, sit amet finibus dui consectetur. Aenean luctus, neque nec porta vehicula, mauris quam iaculis purus, hendrerit varius urna velit vel ante. Nam fringilla risus magna, facilisis porttitor diam egestas eget. Donec consectetur, ex id accumsan consequat, ligula enim finibus nunc, semper euismod nibh est vel felis. Nulla auctor faucibus mi non laoreet. Phasellus volutpat quam vitae pellentesque venenatis.',
    "price": 555.34,
    "ownerId": 8,
  },
  // 6
  {
    "address": '119 Redwood Ave',
    "city": 'Pomona',
    "state": 'California',
    "country": 'United States of America',
    "lat": -24.19721,
    "lng": -159.31762,
    "name": 'The Apples',
    "description": 'Maecenas eu odio iaculis elit suscipit facilisis in in tellus. Sed sollicitudin metus sit amet metus tempus, eu consectetur mi fringilla. Maecenas a interdum mi. Nulla facilisi. Nunc ipsum erat, maximus sed mauris nec, cursus aliquam nisl. Vivamus feugiat gravida ipsum, nec pharetra dolor facilisis in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at erat odio. Sed blandit semper sollicitudin. Donec interdum lorem quis viverra tristique.',
    "price": 666.34,
    "ownerId": 9,
  },
  // 7
  {
    "address": '67 Belmont Court',
    "city": 'Azusa',
    "state": 'California',
    "country": 'United States of America',
    "lat": -52.52005,
    "lng": 16.43605,
    "name": 'Primroseside',
    "description": 'Suspendisse sed ipsum eget risus rutrum venenatis vitae sit amet quam. Aenean eget arcu laoreet, ornare urna a, fringilla eros. Ut rutrum velit sed ante egestas, molestie tincidunt nunc hendrerit. Fusce consequat enim ac odio sagittis, a pulvinar ipsum lacinia. Quisque fermentum enim ut maximus bibendum. Pellentesque ornare, elit nec aliquet aliquam, nibh eros volutpat arcu, efficitur porttitor felis libero sit amet metus. Integer eget interdum risus, et mollis est. Suspendisse rutrum feugiat facilisis. Duis hendrerit bibendum interdum. Etiam hendrerit tincidunt dui, eu convallis diam tempor eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hac habitasse platea dictumst. Proin lectus nulla, imperdiet porttitor nibh ut, pretium auctor libero. Suspendisse vitae iaculis leo. In rhoncus suscipit velit, varius feugiat lorem tincidunt sit amet.',
    "price": 777.34,
    "ownerId": 7,
  },
  // 8
  {
    "address": '103 Broad St',
    "city": 'Milpitas',
    "state": 'California',
    "country": 'United States of America',
    "lat": 30.64851,
    "lng": 44.45122
    ,
    "name": 'Apple House',
    "description": 'Nam non magna sapien. Sed pulvinar, nunc at efficitur egestas, tellus felis finibus leo, nec hendrerit libero massa sit amet mi. Nunc efficitur vehicula tortor, et euismod velit lacinia ac. Nunc nisi lacus, ullamcorper non hendrerit sit amet, consectetur vitae erat. In quis orci non magna dignissim imperdiet sed et neque. Aliquam varius mauris mattis, fermentum ipsum at, auctor arcu. Donec eget rutrum augue, ut pharetra ligula. Vestibulum scelerisque massa sit amet euismod cursus.',
    "price": 888.34,
    "ownerId": 8,
  },
  // 9
  {
    "address": '81 East Ave',
    "city": 'Santa Ana',
    "state": 'California',
    "country": 'United States of America',
    "lat": -23.15180,
    "lng": -44.63480,
    "name": 'Snake\'s Lodge',
    "description": 'Sed nec efficitur elit. Nunc dapibus blandit lorem iaculis congue. Nam pellentesque congue malesuada. Nunc ac dictum dolor. Maecenas molestie massa ac ligula mollis ornare. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam ac sem ullamcorper, fringilla augue nec, pulvinar eros. Pellentesque sit amet finibus lacus. Ut commodo viverra diam, at euismod nisi sagittis malesuada. Curabitur lorem augue, pulvinar vel facilisis ac, auctor at eros. Integer sollicitudin varius ex vitae tincidunt.',
    "price": 999.34,
    "ownerId": 9,
  },
  // 10
  {
    "address": "64 E. Spruce Street",
    "city": "South Gate",
    "state": "California",
    "country": "United States of America",
    "lat": 37.7645358,
    "lng": -122.4730327,
    "name": "Frozen House",
    "description": "Suspendisse sapien nunc, gravida sed consectetur sagittis, suscipit vitae nisl. Donec dapibus tincidunt augue, cursus mollis mi eleifend sed. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi ante nunc, interdum et libero sit amet, congue lobortis metus. Integer lacinia rhoncus enim eu interdum. Donec elementum, neque a maximus venenatis, ligula odio suscipit tellus, vel suscipit dolor eros eu massa. Cras non placerat lorem. Proin sed arcu vel odio vulputate ultrices. Morbi commodo velit ac suscipit malesuada. Integer ut est eget ligula ornare tristique.",
    "price": 546.51,
    "ownerId": 10,
  },
  // 11
  {
    "address": "135 Courtland St",
    "city": "Van Nuys",
    "state": "California",
    "country": "United States of America",
    "lat": 37.7645358,
    "lng": -122.4730327,
    "name": "Woodlandside",
    "description": "Fusce pellentesque nisl ut libero porta, eget tristique magna pulvinar. Maecenas finibus purus ut tortor laoreet, sit amet finibus dui consectetur. Aenean luctus, neque nec porta vehicula, mauris quam iaculis purus, hendrerit varius urna velit vel ante. Nam fringilla risus magna, facilisis porttitor diam egestas eget. Donec consectetur, ex id accumsan consequat, ligula enim finibus nunc, semper euismod nibh est vel felis. Nulla auctor faucibus mi non laoreet. Phasellus volutpat quam vitae pellentesque venenatis.",
    "price": 724.24,
    "ownerId": 10,
  },
  // 12
  {
    "address": "83 Wintergreen Circle",
    "city": "Simi Valley",
    "state": "California",
    "country": "United States of America",
    "lat": 37.7645358,
    "lng": -122.4730327,
    "name": "Oak End",
    "description": "Vestibulum enim purus, posuere sed orci sed, finibus rutrum dolor. Vivamus in augue ac arcu cursus lobortis at sit amet tortor. Nulla neque nibh, scelerisque quis lorem vel, condimentum efficitur justo. Vivamus ullamcorper rhoncus nibh, at pulvinar lorem consequat vel. Ut non quam ligula. In suscipit neque ac diam tristique elementum et id dui. Nulla ac dui auctor diam blandit commodo nec quis augue. Quisque eu dolor ac nisl aliquam pulvinar. Aliquam dapibus risus nisl, eget tincidunt risus varius at. Curabitur lobortis maximus metus non porta. Nunc convallis eros turpis, quis pharetra lorem molestie eget. Sed maximus gravida justo non tristique.",
    "price": 534.45,
    "ownerId": 10,
  },
  // 13
  {
    "address": "123 Disney Lane",
    "city": "San Francisco",
    "state": "California",
    "country": "United States of America",
    "lat": 37.7645358,
    "lng": -122.4730327,
    "name": "App Academy",
    "description": "Place where web developers are created",
    "price": 123,
    "ownerId": 10,
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
