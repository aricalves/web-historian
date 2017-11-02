var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var http = require('http');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {

  fs.readFile(asset, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200, this.headers);
    res.end(data);
  });

};

// exports.loadPage = function(res, )
exports.loadingPage = function(res, callback) {
  console.log('serve loading page');

  var loadingPage = archive.paths.siteAssets + '/loading.html';

  fs.readFile(loadingPage, function(error, data) {
    res.writeHead(302, this.headers);
    res.end(data, 'utf-8');
  });

};



// As you progress, keep thinking about what helper functions you can put here!
