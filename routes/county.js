var express = require('express');
var router = express.Router();
var county = require('../models').county;
var countyName = require('../models').countyName;
var Sequelize = require("sequelize");
var sequelize = new Sequelize('boe_database', 'root', '', {
  dialectOptions:{
    multipleStatements: true
  }
});
var json2csv = require('json2csv');
var csv = require('express-csv');
var fs = require('fs');

router.get('/:name/:zipCodes/:cities/:states/:affiliations/:towns/:wards/:districts/:congressionalDistricts/:senatorialDistricts/:legislativeDistricts/:schoolDistricts/:voterHistories', function(req, res, next){
  var fields = [ 'FirstName', 'MiddleName', 'LastName', 'Suffix', 'StreetNumber', 'HalfCode', 'StreetName', 'APT', 'AddressLine2', 'AddressLine3', 'City', 'State', 'ZipCode', 'ZipCodePlus4'];
  var query = "";
  var empty = 'null'
  var first = true;
  query = query.concat("SELECT DISTINCT VoterId, FirstName, MiddleName, LastName, Suffix, StreetNumber, HalfCode, StreetName, APT, AddressLine2, AddressLine3, City, State, ZipCode, ZipCodePlus4 FROM " + req.params.name + " WHERE ");
  if (req.params.zipCodes.valueOf() != empty.valueOf()){
    if (first === false)
      query += "AND ZipCode in ("  + req.params.zipCodes + ") ";
    else {
      query += "ZipCode in (" + req.params.zipCodes + ") ";
      first = false;
    }
  }
  if (req.params.cities.valueOf() != empty.valueOf()){
    if (first === false)
      query += "AND City in ("  + req.params.cities + ") ";
    else {
      query += "City in (" + req.params.cities + ") ";
      first = false;
    }
  }
  if (req.params.states.valueOf() != empty.valueOf()){
    if (first === false)
      query += "AND State in ("  + req.params.states + ") ";
    else {
      query += "State in (" + req.params.states + ") ";
      first = false;
    }
  }
  if (req.params.affiliations.valueOf() != empty.valueOf()){
    if (first === false)
      query += "AND Affiliation in ("  + req.params.affiliations + ") ";
    else {
      query += "Affiliation in (" + req.params.affiliations + ") ";
      first = false;
    }
  }
  if (req.params.towns.valueOf() != empty.valueOf()){
    if (first === false)
      query += "AND Town in ("  + req.params.towns + ") ";
    else {
      query += "Town in (" + req.params.towns + ") ";
      first = false;
    }
  }
  if (req.params.wards.valueOf() != empty.valueOf()){
    if (first === false)
      query += "AND Ward in ("  + req.params.wards + ") ";
    else {
      query += "Ward in (" + req.params.wards + ") ";
      first = false;
    }
  }
  if (req.params.districts.valueOf() != empty.valueOf()){
    if (first === false)
      query += "AND District in ("  + req.params.districts + ") ";
    else {
      query += "District in (" + req.params.districts + ") ";
      first = false;
    }
  }
  if (req.params.congressionalDistricts.valueOf() != empty.valueOf()){
    if (first === false)
      query += "AND CongressionalDistrict in ("  + req.params.congressionalDistricts + ") ";
    else {
      query += "CongressionalDistrict in (" + req.params.congressionalDistricts + ") ";
      first = false;
    }
  }
  if (req.params.senatorialDistricts.valueOf() != empty.valueOf()){
    if (first === false)
      query += "AND SenatorialDistrict in ("  + req.params.senatorialDistricts + ") ";
    else {
      query += "SenatorialDistrict in (" + req.params.senatorialDistricts + ") ";
      first = false;
    }
  }
  if (req.params.legislativeDistricts.valueOf() != empty.valueOf()){
    if (first === false)
      query += "AND LegislativeDistrict in ("  + req.params.legislativeDistricts + ") ";
    else {
      query += "LegislativeDistrict in (" + req.params.legislativeDistricts + ") ";
      first = false;
    }
  }
  if (req.params.schoolDistricts.valueOf() != empty.valueOf()){
    if (first === false)
      query += "AND SchoolDistrict in ("  + req.params.schoolDistricts + ") ";
    else {
      query += "SchoolDistrict in (" + req.params.schoolDistricts + ") ";
      first = false;
    }
  }
  if (req.params.voterHistories.valueOf() != empty.valueOf()){
    if (first === false)
      query += "AND VoterHistoryCode1 in (" + req.params.voterHistories + ") ";
    else {
      query += "VoterHistoryCode1 in (" + req.params.voterHistories + ") ";
      first = false;
    }
  }
  query += ';';
  console.log(query);
  sequelize.query(query)
    .then(function(counties, err){
      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json({data: counties});
  });
});

router.get('/:name/:field', function(req, res, next) {
  console.log('successsss ' + req.params.name + " " + req.params.field);
  /*sequelize.Promise.all([
    sequelize.query("SELECT DISTINCT zipcode FROM " + req.params.name, {model: county}),
    sequelize.query("SELECT DISTINCT city FROM " + req.params.name, {model: county})
  ])
  .spread(function(zipcode, city){
  });*/
  sequelize.query("SELECT DISTINCT " + req.params.field + ", COUNT(*) as count FROM " + req.params.name + " GROUP BY " + req.params.field + " ORDER BY count DESC", {model: county})
    .then(function(data, err){
      if (err) {
        return res.status(500).json(err);
      }
      console.log(data);
      res.status(201).json({data: data});
    });
});

router.get('/', function(req, res, next) {
  console.log("getting tablename!");
  sequelize.query("SHOW TABLES", {model: countyName})
    .then(function(counties, err){
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).json({data: counties});
      //console.log(JSON.stringify({data: counties}));
    });
});

module.exports = router;
