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
var image_1 = require("./commands/image");
var help_1 = require("./commands/help");
var sticker_1 = require("./commands/sticker");
var gif_1 = require("./commands/gif");
var groupImage_1 = require("./commands/groupImage");
var youtube_1 = require("./commands/youtube");
var lmgtfy_1 = require("./commands/lmgtfy");
var ping_1 = require("./commands/ping");
wa_automate_1.create().then(function (client) { return start(client); });
var messageControl;
var commands = [
    { prefix: '.ping', function: ping_1.sendPing },
    { prefix: '.help', function: help_1.sendHelp },
    { prefix: '.youtube', function: youtube_1.sendYoutubeURL },
    { prefix: '.lmgtfy', function: lmgtfy_1.sendLMGTFY },
    { prefix: '.image', function: image_1.sendImage },
    { prefix: '.sticker', function: sticker_1.sendSticker },
    { prefix: '.gif', function: gif_1.sendGifSticker },
    { prefix: '.groupimg', function: groupImage_1.setGroupImage }
];
function handleMessage(message, client) {
    return __awaiter(this, void 0, void 0, function () {
        var commandCalled, _i, commands_1, command;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if ((message.caption && !message.caption.startsWith(".")) && (message.body && !message.body.startsWith("."))) {
                        return [2 /*return*/];
                    }
                    commandCalled = message.caption ? message.caption : message.body;
                    _i = 0, commands_1 = commands;
                    _a.label = 1;
                case 1:
                    if (!(_i < commands_1.length)) return [3 /*break*/, 4];
                    command = commands_1[_i];
                    if (!(commandCalled === command.prefix)) return [3 /*break*/, 3];
                    return [4 /*yield*/, command.function(message, client)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function start(client) {
    var _this = this;
    // THIS IS TO ALLOW ME TO TEST ON MY OWN PHONE
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