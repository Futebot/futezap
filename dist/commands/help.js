"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendHelp = void 0;
var helpCommand = 'I am Futezap and I am here to help you doing your everyday tasks.' +
    '\n\n Available commands:\n\n' +
    ' *.ping* to check if I am alive!\n'
    + ' *.youtube "your_search"* to get a video.\n'
    + ' *.lmgtfy "your_search"* to get Let Me Google That For You URL.\n'
    + ' *.image "your_search"* to get an image.\n'
    + ' *.sticker "your_search"* to get an image sticker.\n'
    + ' *.gif "your_search"* to get a GIF sticker.\n';
function sendHelp(message, client) {
    client.sendText(message.chatId, helpCommand);
}
exports.sendHelp = sendHelp;
//# sourceMappingURL=help.js.map