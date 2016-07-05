const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const resourcesPath = path.join(__dirname, 'resources');
const resources = fs.readdirSync(resourcesPath);
const User = require('./resources/users/model');
const Subscription = require('./resources/subscriptions/model');

const API = require('./lib/api');

app.use(express.static('assets'));

app.get('/', function(req, res) {
  res.redirect('/v1');
});

app.get('/v1', function (request, response) {
  response.set('Content-Type', 'application/json');
  response.send(JSON.stringify(API.index(), null, 2));
});

app.get('/join', function(request, response) {
  response.sendfile(__dirname + '/index.html');
});

resources.forEach(function (resource) {
  API.register(resource);
  app.use(API.endpoint(resource));
});

module.exports = app;
