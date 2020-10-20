import {Client, Message } from "@open-wa/wa-automate";
import {getImageURLFromText} from "../utils/image.util";

export async function sendSticker(message: Message, client: Client, attempt: number = 0) {

    try {
        const imgUrl = await getImageURLFromText(message.body.substr(message.body.indexOf(' '), message.body.length));
        await client.sendStickerfromUrl(message.chatId, imgUrl);
    } catch (e) {
        attempt += 1;
        if(attempt < 5) await sendSticker(message, client, attempt);
    }
}
