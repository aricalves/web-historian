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
    } else if (req.url.substring(0, 4) === '/www') {
      let asset = archive.paths.archivedSites + req.url;
    } else {
      let asset = archive.paths.siteAssets + req.url;
    }
    // else {
    //   let asset = `${archive.paths.archivedSites}/${req.url}`;
    //   http.serveAssets(res, asset);
    // }
  }



  if (reqType === 'POST') {

    req.on('data', (data) => {
      let url = data.toString().slice(4);
      res.writeHead(302, url);
      //chec if url is lone
      // archive.addUrlToList(url, (data) => {
      //   //302
      //   //use serve assets and tell them its loading (res and loadingage empty calback)
      //   res.end();
      // });
      archive.isUrlInList(url, function(exists) {
        console.log(url, exists);
        if (!exists) {
          archive.addUrlToList(url, function() {
            // res.writeHead(302, httpHelpers.headers);
            // res.end();
            //response is just ???
            console.log(res);
            http.loadingPage(res);
            console.log('successfully added url to list');
          });
        } else {
          //serve up page
          let asset = `${archive.paths.archivedSites}/${url}`;
          http.serveAssets(res, asset);
        }
      });
    });
  }
};
