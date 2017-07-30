'use strict';

var debug = require('debug')('node-js-recognition-sandbox:routes:clarifai');

var express = require('express');
var router = express.Router();

var Clarifai = require('clarifai');
var beautify = require('js-beautify').js_beautify;

var apiKey = process.env.CLARIFAI_API_KEY;


router.get('/get_started', function(req, res, next) {
  res.render('clarifai/get_started', { title: 'Get Started', data: {} });
});

router.post('/get_started', function(req, res, next) {
  // See: https://developer.clarifai.com/welcome/

  var url = req.body.url;

  // instantiate a new Clarifai app passing in your api key.
  var app = new Clarifai.App({
    apiKey: apiKey
  });

  // predict the contents of an image by passing in a url
  app.models.predict(Clarifai.GENERAL_MODEL, url).then(
    function(response) {
      debug(response);

      res.render('clarifai/get_started', {
        title: 'Get Started',
        data: {
          result: response,
          resultStr: beautify(JSON.stringify(response), { indent_size: 2 })
        }
      });
    },
    function(err) {
      debug(err);

      res.render('clarifai/get_started', {
        title: 'Get Started',
        data: {
          error: err,
          errorStr: beautify(JSON.stringify(err), { indent_size: 2 })
        }
      });
    }
  );
});


module.exports = router;

