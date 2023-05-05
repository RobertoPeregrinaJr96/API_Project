'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId',onDelete:'CASCADE' ,hooks:true})
      Review.belongsTo(models.User, { foreignKey: 'userId',onDelete:'CASCADE' })
      Review.belongsTo(models.Spot, { foreignKey: 'spotId',onDelete:'CASCADE' })
    }
  }
  Review.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    review: {
      type: DataTypes.STRING,
      allowNull:false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE'
    },
    spotId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Spots',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'Review',
    defaultScope: {

      exclude: [  "createdAt", "updatedAt"]
    },
  });
  return Review;
};
