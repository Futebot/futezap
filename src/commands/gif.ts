import {Client, Message} from "@open-wa/wa-automate";
import {getGifURLFromText, getImageURLFromText} from "../utils/image.util";

export async function sendGifSticker(message: Message, client: Client, attempt: number = 0) {

    try {
        const imgUrl = await getGifURLFromText(message.body.substr(message.body.indexOf(' '), message.body.length), attempt);
        await client.sendStickerfromUrl(message.chatId, imgUrl);
    } catch (e) {
        attempt += 1;
        if(attempt < 5) await sendGifSticker(message, client, attempt);
    }
}
