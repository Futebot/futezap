const lmgtfy = require('lmgtfy');
import {Client, Message} from "@open-wa/wa-automate";

export async function sendLMGTFY(message: Message, client: Client, attempt: number = 0) {

    try {
        const url = lmgtfy(message.body.substr(message.body.indexOf(' '), message.body.length), 'g');
        await client.sendText(message.chatId, url);
    } catch (e) {
        await client.sendText(message.chatId, "Please try again.");
    }
}
