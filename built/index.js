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
var _a = require('@open-wa/wa-automate'), create = _a.create, decryptMedia = _a.decryptMedia;
var moment = require('moment-timezone');
var color = require('./lib/color');
moment.tz.setDefault('Asia/Jakarta');
moment.locale('id');
var serverOption = {
    headless: true,
    qrRefreshS: 20,
    qrTimeout: 0,
    authTimeout: 0,
    autoRefresh: true,
    killProcessOnBrowserClose: true,
    cacheEnabled: false,
    chromiumArgs: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        // THIS MAY BREAK YOUR APP !!!ONLY FOR TESTING FOR NOW!!!
        '--aggressive-cache-discard',
        '--disable-cache',
        '--disable-application-cache',
        '--disable-offline-load-stale-cache',
        '--disk-cache-size=0'
    ]
};
var opsys = process.platform;
if (opsys === 'win32' || opsys === 'win64') {
    serverOption.executablePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
}
else if (opsys === 'linux') {
    serverOption.browserRevision = '737027';
}
else if (opsys === 'darwin') {
    serverOption.executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
}
var startServer = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        create('Imperial', serverOption)
            .then(function (client) {
            console.log('[DEV] Red Emperor');
            console.log('[SERVER] Server Started!');
            // Force it to keep the current session
            client.onStateChanged(function (state) {
                console.log('[Client State]', state);
                if (state === 'CONFLICT')
                    client.forceRefocus();
            });
            // listening on message
            client.onMessage(function (message) {
                msgHandler(client, message);
            });
            client.onAddedToGroup(function (chat) {
                client.sendText(chat.groupMetadata.id, "Halo warga grup *" + chat.contact.name + "* terimakasih sudah menginvite bot ini, untuk melihat menu silahkan kirim *#menu*");
            });
        })
            .catch(function (err) {
            console.error(err);
        });
        return [2 /*return*/];
    });
}); };
function msgHandler(client, message) {
    return __awaiter(this, void 0, void 0, function () {
        var type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, mentionedJidList, body, name_1, pushname, verifiedName, prefix, command, args, isCmd, time, botNumber, groupId, groupAdmins, _a, groupMembers, _b, isGroupAdmins, isBotGroupAdmins, url, _c, text, err_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 12, , 13]);
                    type = message.type, id = message.id, from = message.from, t = message.t, sender = message.sender, isGroupMsg = message.isGroupMsg, chat = message.chat, caption = message.caption, isMedia = message.isMedia, mimetype = message.mimetype, quotedMsg = message.quotedMsg, mentionedJidList = message.mentionedJidList;
                    body = message.body;
                    name_1 = chat.name;
                    pushname = sender.pushname, verifiedName = sender.verifiedName;
                    pushname = pushname || verifiedName; // verifiedName is the name of someone who uses a business account
                    prefix = '#';
                    body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption) && caption.startsWith(prefix)) ? caption : '';
                    command = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase();
                    args = body.slice(prefix.length).trim().split(/ +/).slice(1);
                    isCmd = body.startsWith(prefix);
                    time = moment(t * 1000).format('DD/MM HH:mm:ss');
                    if (!isCmd && !isGroupMsg)
                        return [2 /*return*/, console.log('[RECV]', color(time, 'yellow'), 'Message from', color(pushname))];
                    if (!isCmd && isGroupMsg)
                        return [2 /*return*/, console.log('[RECV]', color(time, 'yellow'), 'Message from', color(pushname), 'in', color(name_1))];
                    if (isCmd && !isGroupMsg)
                        console.log(color('[EXEC]'), color(time, 'yellow'), color(command + " [" + args.length + "]"), 'from', color(pushname));
                    if (isCmd && isGroupMsg)
                        console.log(color('[EXEC]'), color(time, 'yellow'), color(command + " [" + args.length + "]"), 'from', color(pushname), 'in', color(name_1));
                    return [4 /*yield*/, client.getHostNumber()];
                case 1:
                    botNumber = _d.sent();
                    groupId = isGroupMsg ? chat.groupMetadata.id : '';
                    if (!isGroupMsg) return [3 /*break*/, 3];
                    return [4 /*yield*/, client.getGroupAdmins(groupId)];
                case 2:
                    _a = _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = '';
                    _d.label = 4;
                case 4:
                    groupAdmins = _a;
                    if (!isGroupMsg) return [3 /*break*/, 6];
                    return [4 /*yield*/, client.getGroupMembersId(groupId)];
                case 5:
                    _b = _d.sent();
                    return [3 /*break*/, 7];
                case 6:
                    _b = '';
                    _d.label = 7;
                case 7:
                    groupMembers = _b;
                    isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false;
                    isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false;
                    url = args.length !== 0 ? args[0] : '';
                    _c = command;
                    switch (_c) {
                        case 'menu': return [3 /*break*/, 8];
                        case 'help': return [3 /*break*/, 8];
                    }
                    return [3 /*break*/, 10];
                case 8:
                    text = "Hi, " + pushname + "! \uD83D\uDC4B\uFE0F \n\nUsable Commands!\u2728\n\n*Sticker Creator*\nCMD: #sticker\nDescription: Converts image into sticker, kirim gambar dengan caption #sticker atau balas gambar yang sudah dikirim dengan #sticker\n\nCMD: #sticker <url gambar>\nDescription: Converts image url into sticker\n\n*Gif Sticker*\nCMD : #gif Giphy URL\nDescription: Convert gif to sticker (but giphy only)\n\n*Downloader*\nCMD: #tiktok <post/video url>\nDescription: Return a Tiktok video\n\nCMD: #fb <post/video url>\nDescription: Return a Facebook video download link\n\nCMD: #ig <post/video url>\nDescription: Return a Instagram video download link\n\nCMD: #twt <post/video url>\nDescription: Return a Twitter video download link\n\n*Other*\nCMD: #tnc\nDescription: show the Terms and Conditions\n\nHope you have a great day!\u2728";
                    return [4 /*yield*/, client.sendText(from, text)];
                case 9:
                    _d.sent();
                    return [3 /*break*/, 11];
                case 10:
                    console.log(color('[ERROR]', 'red'), color(time, 'yellow'), 'Unregistered Command from', color(pushname));
                    return [3 /*break*/, 11];
                case 11: return [3 /*break*/, 13];
                case 12:
                    err_1 = _d.sent();
                    console.log(color('[ERROR]', 'red'), err_1);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}
startServer();
