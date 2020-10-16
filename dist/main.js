"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var wa_automate_1 = require("@open-wa/wa-automate");
// const wa = require('@open-wa/wa-automate');
var usetube = require('usetube');
var lmgtfy = require('lmgtfy');
var gis = require('g-i-s');
wa_automate_1.create().then(function (client) { return start(client); });
var messageControl;
function handleMessage(message, client) {
    return __awaiter(this, void 0, void 0, function () {
        var videos, e_1, url, e_2, e_3, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(message.body === '.ping')) return [3 /*break*/, 2];
                    return [4 /*yield*/, client.sendText(message.chatId, 'Pong 🏓!')];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 26];
                case 2:
                    if (!(message.body === '.help')) return [3 /*break*/, 4];
                    return [4 /*yield*/, client.sendText(message.chatId, 'I am Futezap and I am here to help you doing your everyday tasks.' +
                            '\n\n Available commands:\n\n' +
                            ' *.ping* to check if I am alive!\n'
                            + ' *.youtube "your_search"* to get a video.\n'
                            + ' *.lmgtfy "your_search"* to get Let Me Google That For You URL.\n'
                            + ' *.image "your_search"* to get an image.\n')];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 26];
                case 4:
                    if (!message.body.startsWith('.youtube')) return [3 /*break*/, 11];
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 8, , 10]);
                    return [4 /*yield*/, usetube.searchVideo(message.body.substr(message.body.indexOf(' '), message.body.length))];
                case 6:
                    videos = _a.sent();
                    return [4 /*yield*/, client.sendYoutubeLink(message.chatId, "https://www.youtube.com/watch?v=" + videos.tracks[0].id)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 8:
                    e_1 = _a.sent();
                    return [4 /*yield*/, client.sendText(message.chatId, "Please try again.")];
                case 9:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 26];
                case 11:
                    if (!message.body.startsWith('.lmgtfy')) return [3 /*break*/, 17];
                    _a.label = 12;
                case 12:
                    _a.trys.push([12, 14, , 16]);
                    url = lmgtfy(message.body.substr(message.body.indexOf(' '), message.body.length), 'g');
                    return [4 /*yield*/, client.sendText(message.chatId, url)];
                case 13:
                    _a.sent();
                    return [3 /*break*/, 16];
                case 14:
                    e_2 = _a.sent();
                    return [4 /*yield*/, client.sendText(message.chatId, "Please try again.")];
                case 15:
                    _a.sent();
                    return [3 /*break*/, 16];
                case 16: return [3 /*break*/, 26];
                case 17:
                    if (!message.body.startsWith('.image')) return [3 /*break*/, 25];
                    _a.label = 18;
                case 18:
                    _a.trys.push([18, 19, , 24]);
                    gis(message.body.substr(message.body.indexOf(' '), message.body.length), function (error, results) {
                        client.sendFileFromUrl(message.chatId, results[0].url, results[0].url, '');
                    });
                    return [3 /*break*/, 24];
                case 19:
                    e_3 = _a.sent();
                    _a.label = 20;
                case 20:
                    _a.trys.push([20, 21, , 23]);
                    gis(message.body.substr(message.body.indexOf(' '), message.body.length), function (error, results) {
                        client.sendFileFromUrl(message.chatId, results[1].url, results[1].url, '');
                    });
                    return [3 /*break*/, 23];
                case 21:
                    e_4 = _a.sent();
                    return [4 /*yield*/, client.sendText(message.chatId, "Please try again.")];
                case 22:
                    _a.sent();
                    return [3 /*break*/, 23];
                case 23: return [3 /*break*/, 24];
                case 24: return [3 /*break*/, 26];
                case 25:
                    if (message.body.startsWith('.groupimg')) {
                        gis(message.body.substr(message.body.indexOf(' '), message.body.length), function (error, results) {
                            client.setGroupIconByUrl(message.chatId, results[1].url);
                        });
                    }
                    _a.label = 26;
                case 26: return [2 /*return*/];
            }
        });
    });
}
function start(client) {
    var _this = this;
    setInterval(function () {
        client.getMyLastMessage().then(function (message) {
            if (!messageControl || messageControl.content !== message.content) {
                messageControl = message;
                handleMessage(message, client);
            }
        });
    }, 1000);
    client.onMessage(function (message) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, handleMessage(message, client)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
}
//# sourceMappingURL=main.js.map