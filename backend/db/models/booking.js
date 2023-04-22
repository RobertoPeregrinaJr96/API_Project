'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { through: 'User', foreignKey: 'userId', onDelete: 'CASCADE', otherKey: 'id' })
      Booking.belongsTo(models.Spot, { through: 'Spot', foreignKey: 'spotId', otherKey: 'id', onDelete: 'CASCADE' })
    }
  }
  Booking.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    startDate: {
      type: DataTypes.DATE,

      // should i put a unique constraint
    },
    endDate: {
      type: DataTypes.DATE,

      // should i put a unique constraint
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Booking',
    defaultScope: {

      exclude: ["createdAt", "updatedAt"]
    },
  });
  return Booking;
};
