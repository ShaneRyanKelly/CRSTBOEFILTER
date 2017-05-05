var county = require('../models/county');

exports.countyName = function(req, res, next){
  res.send("County Name = " req.params.name);
};
