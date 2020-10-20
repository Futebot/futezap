import {create, Client, Message, decryptMedia} from '@open-wa/wa-automate';
import {sendImage} from "./commands/image";
import {helpCommand} from "./commands/help";
import {sendSticker} from "./commands/sticker";
import {sendGifSticker} from "./commands/gif";
import {setGroupImage} from "./commands/groupImage";
import {sendYoutubeURL} from "./commands/youtube";
import {sendLMGTFY} from "./commands/lmgtfy";

create().then(client => start(client));

let messageControl: Message;

async function handleMessage(message: Message, client: Client) {

    if((message.caption && !message.caption.startsWith(".")) && (message.body && !message.body.startsWith("."))) {
        return;
    }

    const command = message.caption ? message.caption : message.body;

    if (command === '.ping') {
        await client.sendText(message.chatId, 'Pong 🏓!');

    } else if (command === '.help') {
        await client.sendText(message.chatId, helpCommand());

    } else if (command.startsWith('.youtube')) {
        await sendYoutubeURL(message, client);

    } else if (command.startsWith('.lmgtfy')) {
        await sendLMGTFY(message, client);

    } else if (command.startsWith('.image') || message.body.startsWith('.img')) {
        await sendImage(message, client);

    } else if (command.startsWith('.sticker')) {
        await sendSticker(message, client);

    } else if (command.startsWith('.gif')) {
       await sendGifSticker(message, client);

    } else if (command.startsWith('.groupimg')) {
        await setGroupImage(message, client);

    }

    }

function start(client: Client) {

    setInterval(() => {
        client.getMyLastMessage().then(message => {
            if (!messageControl || messageControl.content !== message.content) {
                messageControl = message;
                handleMessage(message, client);
            }
        });

    }, 1000);

    client.onMessage(async message => {
        await handleMessage(message, client);
    });
}