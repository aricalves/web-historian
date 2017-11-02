const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const http = require('http');

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) { 
      throw err;
    } else {
      callback(data.toString().split('\n'));
    }
  });
};


exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls((data) => {
    callback(data.includes(url));
  });
 
};

exports.addUrlToList = function(url, callback) {
  fs.writeFile(exports.paths.list, url, (err, data) => {
    if (err) {
      throw err;
    } else {
      callback(data);
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    if (err) {
      throw err;
    }
    callback(files.includes(url));
  });
};

exports.downloadUrls = function(urls) {
  _.each(urls, url => {
    let file = fs.createWriteStream(`${exports.paths.archivedSites}/${url}`);
    http.get(`http://${url}`, response => response.pipe(file));
  });
};
