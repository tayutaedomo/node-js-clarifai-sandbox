'use strict';

var debug = require('debug')('node-js-recognition-sandbox:routes');

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Recognition Service Sandbox' });
});


module.exports = router;

