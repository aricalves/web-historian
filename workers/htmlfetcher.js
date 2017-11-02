const request = require('request');
const fs = require('fs');
const helpers = require('../helpers/archive-helpers');

const fetcher = () => {
  helpers.readListOfUrls(urls => {
    helpers.downloadUrls(urls);
  });
  //fs.writeFile(helpers.paths.list, '', () => { console.log('File cleared'); });
};

fetcher();

