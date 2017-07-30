'use strict';

var debug = require('debug')('node-js-recognition-sandbox:routes:google');

var express = require('express');
var router = express.Router();

var path = require('path');
var fs = require('fs');
var beautify = require('js-beautify').js_beautify;

var Storage = require('@google-cloud/storage');
var Vision = require('@google-cloud/vision');


function get_cloud_vision() {
  var key_path = process.env.GOOGLE_CLOUD_VISION_KEY_PATH || path.join(__dirname, '../credentials/google_cloud_vision_key.json');
  debug(key_path);

  try {
    fs.statSync(key_path);
  } catch(err) {
    if(err.code === 'ENOENT') return false
  }

  return Vision({
    projectId: process.env.GOOGLE_CLOUD_VISION_PROJECT_ID || 'test',
    keyFilename: key_path
  });
}


var TITLE_LABEL_DETECTION = 'Label Detection';

router.get('/detect_label', function(req, res, next) {
  var vision = get_cloud_vision();
  //debug(Vision);

  res.render('google/detect_label', {
    title: TITLE_LABEL_DETECTION,
    data: {
      cannot_use_vision: ! vision
    }
  });
});

router.post('/detect_label', function(req, res, next) {
  var vision = get_cloud_vision();

  var template_payload = {
    title: TITLE_LABEL_DETECTION,
    data: {
      cannot_use_vision: ! vision
    }
  };

  if (! vision) {
    res.render('google/detect_label', template_payload);
    return;
  }

  // See: https://googlecloudplatform.github.io/google-cloud-node/#/docs/vision/0.12.0/vision?method=labelDetection
  // See: https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/vision/detect.js#L110
  var storage = Storage();

  var bucketName = req.body.bucket;
  var fileName = req.body.path;

  //vision.labelDetection(storage.bucket(bucketName).file(fileName)).then(function(response) {
  vision.detectLabels(storage.bucket(bucketName).file(fileName)).then(function(response) {
    template_payload.data.result = response;
    template_payload.data.resultStr = beautify(JSON.stringify(response), { indent_size: 2 });

    res.render('google/detect_label', template_payload);

  }).catch(function(err) {
    debug(err);

    template_payload.data.error = err;
    template_payload.data.errorStr = beautify(JSON.stringify(err), { indent_size: 2 });

    res.render('google/detect_label', template_payload);
  });
});


module.exports = router;

