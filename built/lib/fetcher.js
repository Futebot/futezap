var fetch = require('node-fetch');
exports.getBase64 = getBase64 = function (url) { return new Promise(function (resolve, reject) {
    fetch(url, { headers: { 'User-Agent': 'okhttp/4.5.0' } })
        .then(function (response) { return response.buffer(); })
        .then(function (result) {
        var videoBase64 = "data:" + result.headers.get('content-type') + ";base64," + result.toString('base64');
        if (result)
            resolve(videoBase64);
    }).catch(function (err) {
        console.error(err);
        reject(err);
    });
}); };
exports.fetchJson = fetchJson = function (url, options) { return new Promise(function (resolve, reject) {
    fetch(url, options)
        .then(function (response) { return response.json(); })
        .then(function (json) {
        resolve(json);
    })
        .catch(function (err) {
        console.error(err);
        reject(err);
    });
}); };
exports.fetchText = fetchText = function (url, options) { return new Promise(function (resolve, reject) {
    fetch(url, options)
        .then(function (response) { return response.text(); })
        .then(function (text) {
        resolve(text);
    })
        .catch(function (err) {
        console.error(err);
        reject(err);
    });
}); };
exports.fetchMeme = fetchMeme = function () { return new Promise(function (resolve, reject) {
    var subreddit = ['dankmemes', 'wholesomeanimemes', 'wholesomememes', 'AdviceAnimals', 'MemeEconomy', 'memes', 'terriblefacebookmemes', 'teenagers', 'historymemes'];
    var randSub = subreddit[Math.random() * subreddit.length | 0];
    console.log('looking for memes on ' + randSub);
    fetch('https://meme-api.herokuapp.com/gimme/' + randSub)
        .then(function (response) { return response.json(); })
        .then(function (result) {
        resolve(result);
    }).catch(function (err) {
        console.error(err);
        reject(err);
    });
}); };
