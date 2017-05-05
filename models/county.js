var express = require('express');
var router = express.Router();

module.exports = function(sequelize, DataTypes){

  var county = sequelize.define("county",
  {
    voterID: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    ZipCode: DataTypes.STRING,
    city: DataTypes.STRING

  },
  {
    timestamps: false,
    paranoid: false,
    underscored: false
  });

  return county;
}
