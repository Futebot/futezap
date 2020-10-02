var fetch = require('node-fetch');
module.exports = shortener = function (url) { return new Promise(function (resolve, reject) {
    console.log('Creating short url...');
    fetch("https://tinyurl.com/api-create.php?url=" + url)
        .then(function (response) { return response.text(); })
        .then(function (json) {
        resolve(json);
    })
        .catch(function (err) {
        reject(err);
    });
}); };
