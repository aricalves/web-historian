const request = require('request');
const fs = require('fs');
const helpers = require('../helpers/archive-helpers');

// const fetcher = () => {
//   helpers.readListOfUrls(urls => {
//     helpers.downloadUrls(urls, () => {
//       fs.writeFile(helpers.paths.list, '');
//     });
//   });
  
// };

// fetcher();

helpers.readListOfUrls(helpers.downloadUrls);

// cron command: */1 * * * * /Users/student/.nvm/versions/node/v6.11.3/bin/node /Users/student/.nvm/versions/node/v6.11.3/bin/node
