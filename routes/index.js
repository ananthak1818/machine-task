var express = require('express');
var router = express.Router();

const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  try {
    fs.readFile('data.json', (err, data) => {
      if (err) {
        throw err
      } else {
        res.render('index', { data: JSON.parse(data) });
      }
    }); 
  } catch (error) {
    throw error;
  }
});

module.exports = router;
