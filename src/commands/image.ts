import * as util from "util";
import {Client, Message} from "@open-wa/wa-automate";
import {getImageURLFromText} from "../utils/image.util";

export async function sendImage(message: Message, client: Client, attempt: number = 0) {

    try {
        const imgUrl = await getImageURLFromText(message.body.substr(message.body.indexOf(' '), message.body.length));
        await client.sendFileFromUrl(message.chatId, imgUrl, imgUrl, '');
    } catch (e) {
        attempt += 1;
        if(attempt < 5) await sendImage(message, client, attempt);
    }
}
