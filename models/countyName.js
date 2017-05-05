var express = require('express');
var router = express.Router();

module.exports = function(sequelize, DataTypes){

  var countyName = sequelize.define("countyName",
  {
    Name: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  },
  {
    timestamps: false,
    paranoid: false,
    underscored: false
  });

  return countyName;
}
