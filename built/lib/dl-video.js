var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
/* eslint-disable prefer-promise-reject-errors */
var TikTokScraper = require('tiktok-scraper');
var fetchJson = require('./fetcher').fetchJson;
var util = require('util');
var videoUrlLink = require('video-url-link');
var igGetInfo = util.promisify(videoUrlLink.instagram.getInfo);
var twtGetInfo = util.promisify(videoUrlLink.twitter.getInfo);
var tiktok = function (url) { return new Promise(function (resolve, reject) {
    TikTokScraper.getVideoMeta(url, { noWaterMark: true, hdVideo: true })
        .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('Get Video From', '@' + result.authorMeta.name, 'ID:', result.id);
            if (result.videoUrlNoWaterMark !== '') {
                result.url = result.videoUrlNoWaterMark;
                result.NoWaterMark = true;
            }
            else {
                result.url = result.videoUrl;
                result.NoWaterMark = false;
            }
            resolve(result);
            return [2 /*return*/];
        });
    }); }).catch(function (err) {
        console.error(err);
        reject(err);
    });
}); };
var instagram = function (url) { return new Promise(function (resolve, reject) {
    console.log('Get Instagram video metadata....');
    igGetInfo(url, {})
        .then(function (result) {
        var media = result.list.filter(function (x) { return x.video !== undefined; });
        if (!media[0])
            return reject('Not a video');
        console.log('Found ' + media.length + ' video');
        resolve(media);
    }).catch(function (err) {
        console.error(err);
        reject(err);
    });
}); };
var twitter = function (url) { return new Promise(function (resolve, reject) {
    console.log('Get Twitter video metadata....');
    twtGetInfo(url, {})
        .then(function (content) {
        resolve(content);
    })
        .catch(function (err) {
        console.error(err);
        reject(err);
    });
}); };
var facebook = function (url) { return new Promise(function (resolve, reject) {
    console.log('Get Facebook video metadata....');
    var keepsaveit = 'http://keepsaveit.com/api/';
    var apikey = '3tgDBIOPAPl62b0zuaWNYog2wvRrc4V414AjMi5zdHbU4a';
    fetchJson(keepsaveit + '?api_key=' + apikey + '&url=' + url, { method: 'GET' })
        .then(function (result) {
        var key = result.code;
        switch (key) {
            case 212:
                return reject('Access block for you, You have reached maximum 5 limit per minute hits, please stop extra hits.');
            case 101:
                return reject('API Key error : Your access key is wrong');
            case 102:
                return reject('Your Account is not activated.');
            case 103:
                return reject('Your account is suspend for some resons.');
            case 104:
                return reject('API Key error : You have not set your api_key in parameters.');
            case 111:
                return reject('Full access is not allow with DEMO API key.');
            case 112:
                return reject('Sorry, Something wrong, or an invalid link. Please try again or check your url.');
            case 113:
                return reject('Sorry this website is not supported.');
            case 404:
                return reject('The link you followed may be broken, or the page may have been removed.');
            case 405:
                return reject('You can\'t download media in private profile. Looks like the video you want to download is private and it is not accessible from our server.');
            default:
                return resolve(result);
        }
    }).catch(function (err) {
        console.error(err);
        reject(err);
    });
}); };
module.exports = {
    tiktok: tiktok,
    instagram: instagram,
    twitter: twitter,
    facebook: facebook
};
