# node-js-recognition-sandbox
Try recognition services.

# Setup and lunch web server
```
$ git clone git@github.com:tayutaedomo/node-js-recognition-sandbox.git
$ cd node-js-recognition-sandbox
$ npm install
$ bin/www
```

Your app should now be running on [localhost:3000](http://localhost:3000).

# Basic Authentication
Default username/password is `username/password`. If you want to use your original username/password, set below.
````
$ export BASIC_USERNAME=username
$ export BASIC_PASSWORD=password
````


# clarifai
If use, you have to set below.
````
$ export CLARIFAI_API_KEY=<your api key>
````


# Cloud Vision API
If use, you have to copy account service key file.
```
$ cp <your account service key>.json path/to/node-js-recognition-sandbox/credentials/google_cloud_vision_key.json
```
or set below.
````
$ export GOOGLE_CLOUD_VISION_KEY_PATH=<key file path>
````

