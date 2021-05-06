var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(_req, res, _next) {
  res.json({
    title: "Express Server",
    version: "4.16.1"
  });
});

module.exports = router;
