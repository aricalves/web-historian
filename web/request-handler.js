const path = require('path');
const archive = require('../helpers/archive-helpers');
const http = require('./http-helpers');

exports.handleRequest = function (req, res) {
  const reqType = req.method;
  
  if (reqType === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    
    if (req.url === '/') {
      let asset = __dirname + '/public/index.html';
      http.serveAssets(res, asset);
    } else {
      let asset = `${archive.paths.archivedSites}/${req.url}`;
      http.serveAssets(res, asset);
    }
  }

  if (reqType === 'POST') {
    
    req.on('data', (data) => {
      let url = data.toString().slice(4);
      res.writeHead(302, url);
      archive.addUrlToList(url, (data) => {
        res.end();
      });
    });
    
  }

};


