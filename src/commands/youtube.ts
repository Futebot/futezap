import {Client, Message} from "@open-wa/wa-automate";
const usetube = require('usetube')

export async function sendYoutubeURL(message: Message, client: Client, attempt: number = 0) {

    try {
        const videos = await usetube.searchVideo(message.body.substr(message.body.indexOf(' '), message.body.length));
        await client.sendYoutubeLink(message.chatId, `https://www.youtube.com/watch?v=${videos.tracks[attempt].id}`);
    } catch (e) {
        attempt += 1;
        if(attempt < 5) await sendYoutubeURL(message, client, attempt);
    }
}
