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
      Booking.belongsTo(models.User, { foreignKey: 'userId',otherKey:'id' })
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId',otherKey:'id' })
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
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    spotId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Spots',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
    defaultScope: {

      exclude: [  "createdAt", "updatedAt"]
    },
  });
  return Booking;
};
