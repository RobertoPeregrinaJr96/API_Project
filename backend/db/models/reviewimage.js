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
      ReviewImage.belongsTo(models.Review, { foreignKey: 'reviewId',onDelete:'CASCADE' })
    }
  }
  ReviewImage.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
        notNull:true
      }
    },
    reviewId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Reviews',
        onDelete: 'CASCADE',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'ReviewImage',
    defaultScope: {

      exclude: [  "createdAt", "updatedAt"]
    },
  });
  return ReviewImage;
};
