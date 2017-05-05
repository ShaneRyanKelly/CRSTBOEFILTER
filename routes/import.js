var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');
var path = require('path');
var fs = require("fs"),
  readline = require("readline");
var es = require('event-stream');
var getLine = require('get-line');
var Sequelize = require("sequelize");
var sequelize = new Sequelize('boe_database', 'root', '');
//var fileStream = fs.createReadStream(path.join(__dirname, '../public/upload', 'uploadFile.csv'));

router.use(fileUpload());

router.post('/', function(req, res, next){
  console.log(req.files);
  if ( !req.files )
    return res.status(400).send('No Files were uploaded');

  let uploadFile = req.files.uploadFile;

  console.log(uploadFile.name);
  uploadFile.mv('public/upload/uploadFile.csv', function(err){
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

router.post('/:query', function(req, res, next){
  console.log("query: " + req.params.query);
  sequelize.query(req.params.query, {raw: true})
    .then(function(data, err){
      if (err) {
        return res.status(500).json(err);
      }
      console.log(data);
      res.status(201).send("Query Successfully Executed");
    });
});

router.post('/:headers/:county', function(req, res, next){
  sequelize.query("LOAD DATA LOCAL INFILE '/home/bodhi/fast/public/upload/uploadFile.csv' INTO TABLE " + req.params.county + " FIELDS TERMINATED BY ',' LINES TERMINATED BY '\\r\\n' IGNORE 1 LINES (" + req.params.headers + ");")
  .then(function(data, err){
    if (err) {
      return res.status(500).json(err);
    }
    console.log(data);
    res.status(201).send("Query Successfully Executed");
  });
});

router.get('/', function(req, res, next){
  console.log("getting");
  var file = path.join(__dirname, '../public/upload', 'uploadFile.csv');
  var getLines;
  if (!file)
    return res.status(400).send('file not found!');
  getLines = getLine({
    lines: [1],
    encoding: 'utf8'
  });
  //console.time('get first line');

  fs.createReadStream(file, { encoding: 'utf8' })
    .pipe(getLines)
    .pipe(es.map(function(line, next){
      return res.status(200).send(line);
      //console.log(data);
      //console.timeEnd('get first line');
    }));
  // return res.status(200).send(line);
});
module.exports = router;
