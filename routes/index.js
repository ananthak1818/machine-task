var express = require('express');
var router = express.Router();

var fetchUrl = require("fetch").fetchUrl;

/* GET home page. */
router.get('/', function (req, response, next) {
  try {
    let url = 'https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow&key=t8zCMSmmYbFpo2DnqoNCAw(('

    fetchUrl(url, function (error, meta, body) {
      response.render('index', { data: JSON.parse(body.toString()) });
    });
  } catch (error) {
    throw error;
  }
});

module.exports = router;
