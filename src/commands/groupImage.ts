import {Client, Message} from "@open-wa/wa-automate";
import {getImageURLFromText} from "../utils/image.util";

export async function setGroupImage(message: Message, client: Client, attempt: number = 0) {

    try {
        const imgUrl = await getImageURLFromText(message.body.substr(message.body.indexOf(' '), message.body.length));
        await client.setGroupIconByUrl(message.chatId, imgUrl);
    } catch (e) {
        attempt += 1;
        if(attempt < 5) await setGroupImage(message, client, attempt);
    }
}
