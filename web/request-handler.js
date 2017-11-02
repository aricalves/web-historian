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
    req.on('data', function(data) {
      let site = data.toString().split('=')[1];
      if (archive.isUrlInList(site)) {
        return;
      } else {
  
        archive.addUrlToList(site, (data) => {
          console.log('Added site to list.');
        });
        
      }
    });
  }

};


