'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReviewImage.belongsTo(models.Review, { foreignKey: 'reviewId' })
    }
  }
  ReviewImage.init({
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      }
    },
    reviewId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Reviews',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'ReviewImage',

  });
  return ReviewImage;
};
