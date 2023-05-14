'use strict';

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoReviews = [
  {
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac interdum mi. Suspendisse quis turpis quam. Quisque ac risus nulla. Praesent interdum, orci nec sodales auctor, nunc tortor imperdiet magna, vel dictum urna lectus et tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque at odio vel elit condimentum pretium. Nulla mollis, magna eu hendrerit dignissim, risus sem ultrices massa, quis commodo mauris dolor rhoncus felis. Sed quis semper nunc. In hac habitasse platea dictumst. Donec accumsan diam nec neque eleifend facilisis.',
    stars: 3,
    userId: 1,
    spotId: 2,
  },
  {
    review: 'Maecenas est enim, aliquam vel interdum et, elementum bibendum turpis. Proin sed feugiat orci, vitae gravida nisi. Fusce semper consequat enim lobortis vestibulum. Mauris blandit tincidunt aliquam. Ut consectetur ante ipsum, quis tempor ex sollicitudin at. Nulla dapibus, ex nec ultricies auctor, eros sapien dictum quam, in gravida sem dui ut velit. Proin lorem ligula, vehicula ornare pharetra ac, molestie non enim. Donec at mauris eu ligula sollicitudin ultricies. Suspendisse potenti. Vivamus convallis magna ut cursus porta. Phasellus mattis congue nisl quis placerat. Vestibulum vitae odio in ante vehicula consequat. Phasellus sed nibh ornare metus pellentesque condimentum. Vestibulum pellentesque sodales velit, nec tincidunt dolor mattis at. Vivamus eget scelerisque lectus, quis ultrices turpis. Duis aliquet molestie tellus vitae malesuada.',
    stars: 5,
    userId: 2,
    spotId: 3,
  },
  {
    review: 'Morbi eu eleifend velit. Pellentesque feugiat erat lorem, in maximus mi blandit et. Praesent eget cursus orci. Aliquam porta odio eget tempus posuere. Maecenas hendrerit felis diam, et vulputate urna ultrices at. Integer faucibus, tortor ut eleifend maximus, justo mauris rutrum augue, sit amet pretium nisi dui ut leo. Nam sodales risus at risus molestie, in tincidunt urna sollicitudin. Praesent interdum lacus ipsum, id dapibus nisi sagittis vel. Vivamus gravida magna nec sem lacinia, blandit pulvinar tellus condimentum. Cras dictum scelerisque lorem. Vestibulum dictum ex vel turpis molestie aliquet. Integer gravida nunc nec dignissim mattis. Etiam mattis elementum mi, et tincidunt massa mattis eget. Aenean ac leo vel tortor scelerisque tincidunt. Integer pulvinar ipsum felis, nec consequat leo luctus et. In in dui quis magna facilisis vehicula a a erat.',
    stars: 1,
    userId: 3,
    spotId: 4,
  },
  {
    review: 'Mauris sagittis viverra tempus. Duis consectetur pulvinar molestie. Suspendisse elementum ut sem ut bibendum. Sed at felis euismod, faucibus orci ut, sollicitudin ex. Duis vel elit molestie tortor ullamcorper dignissim a quis nibh. Morbi tempor mi vel pharetra eleifend. Maecenas eleifend ullamcorper dolor, quis vestibulum felis mattis eu. In commodo sapien pharetra enim lacinia tempor. Pellentesque sollicitudin neque quis ex mattis, id vehicula tellus tincidunt. Integer eget porttitor sapien.',
    stars: 4,
    userId: 4,
    spotId: 8,
  },
  {
    review: 'Etiam at mauris nisi. Vestibulum odio mi, suscipit nec ante a, finibus posuere diam. In mollis maximus nisi, vel pulvinar sapien pellentesque in. Aenean molestie sapien at lacus luctus congue. Nunc malesuada semper nunc, consectetur molestie ligula posuere et. Cras at pretium mi, id congue augue. Fusce fermentum mauris a elit tempor pulvinar. Suspendisse rhoncus mollis mauris non porttitor. Proin ac mi gravida, auctor ligula vitae, tincidunt neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor ipsum at quam eleifend tincidunt. Mauris molestie maximus ligula ut condimentum. Aenean sed sapien at leo finibus aliquam. Ut euismod sagittis ligula, quis rhoncus justo ullamcorper in. Quisque sagittis, enim ut aliquam auctor, ipsum magna facilisis felis, tempor blandit augue felis at ex.',
    stars: 2,
    userId: 6,
    spotId: 4,
  },
  {
    review: 'Aenean ac pretium ligula. Morbi eu odio at orci sollicitudin vehicula ut sed mauris. Cras tempus, sem sit amet gravida ornare, mauris felis dapibus magna, a laoreet lectus felis et lorem. Praesent tellus nisi, lacinia vel metus malesuada, dictum varius neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus aliquet magna ac laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam ornare viverra dui sed tempor. Sed et velit eu diam interdum bibendum. Praesent ullamcorper ac ligula non tempor. Praesent tincidunt et erat in condimentum. Quisque libero nulla, molestie at justo sit amet, efficitur sollicitudin mauris. Suspendisse et iaculis sapien, eu mattis sem. Donec cursus euismod elit ut hendrerit. Aliquam erat volutpat.',
    stars: 4,
    userId: 5,
    spotId: 8,
  },
  {
    review: 'Phasellus quis facilisis justo, id aliquam est. Aliquam tempor dignissim ex in aliquet. Vestibulum sed justo pretium, imperdiet sem vel, efficitur orci. Duis mollis varius nisl eget accumsan. Curabitur ac lorem leo. Proin hendrerit dolor pretium, ultricies metus sit amet, mattis augue. Maecenas tempus convallis vehicula. Proin id tristique turpis. Phasellus sagittis, tortor quis tincidunt facilisis, ex tortor suscipit dolor, eu laoreet est eros at lorem. Sed euismod enim at velit commodo lacinia. Curabitur tincidunt dui nec enim bibendum fermentum. Nunc tincidunt enim nibh, sed aliquet mi iaculis ut. Suspendisse tempus tincidunt leo, quis sodales urna hendrerit hendrerit. Sed eu volutpat magna, non sodales lacus. Pellentesque purus tortor, porttitor at hendrerit a, ultrices et purus.',
    stars: 1,
    userId: 4,
    spotId: 8,
  },
  {
    review: 'Vivamus ut ipsum porttitor, pellentesque sem vitae, molestie eros. Etiam sit amet eros sed arcu sagittis sollicitudin at eget lacus. Maecenas ullamcorper, nunc sit amet pharetra condimentum, dolor est molestie diam, a sollicitudin nibh metus non mi. Cras ac sollicitudin lectus. Cras quis ipsum turpis. Quisque laoreet nibh vel augue fermentum ornare. Nulla felis justo, aliquet ut felis non, congue condimentum nisl. Phasellus placerat fermentum tristique.',
    stars: 1,
    userId: 4,
    spotId: 7,
  },
  {
    review: 'Sed quis augue eu nibh ornare aliquet. Pellentesque varius pellentesque velit id consequat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Suspendisse vestibulum metus tempus purus pellentesque, et suscipit mi cursus. Quisque sit amet justo ac purus pharetra hendrerit. Integer ultricies odio ut enim varius, nec laoreet lorem facilisis. Proin sodales ipsum fermentum nulla auctor finibus. Cras commodo viverra dapibus.',
    stars: 5,
    userId: 3,
    spotId: 9,
  },
  {
    review: 'In euismod ipsum velit. Donec rutrum, nulla quis lacinia porttitor, nunc justo malesuada est, vel aliquam purus est mattis eros. Donec eu lectus a erat egestas vehicula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc auctor condimentum felis, nec tincidunt metus vestibulum non. Mauris hendrerit sem eget luctus finibus. Donec ut enim tortor. Sed porta sem velit, at varius magna pretium eget. Nulla rutrum risus vel nisi iaculis, ut vehicula lorem dapibus. Praesent pretium mauris sed diam viverra ultrices. Nam quis malesuada lorem.',
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
