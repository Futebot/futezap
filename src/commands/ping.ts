import {Client, Message} from "@open-wa/wa-automate";

export async function sendPing(message: Message, client: Client) {
    await client.sendText(message.chatId, 'Pong 🏓!');
}