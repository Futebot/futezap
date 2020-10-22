import {create, Client, Message} from '@open-wa/wa-automate';
import {sendImage} from "./commands/image";
import {sendHelp} from "./commands/help";
import {sendSticker} from "./commands/sticker";
import {sendGifSticker} from "./commands/gif";
import {setGroupImage} from "./commands/groupImage";
import {sendYoutubeURL} from "./commands/youtube";
import {sendLMGTFY} from "./commands/lmgtfy";
import {sendPing} from "./commands/ping";

create().then(client => start(client));

let messageControl: Message;

const commands = [
    {prefix: '.ping', function: sendPing},
    {prefix: '.help', function: sendHelp},
    {prefix: '.youtube', function: sendYoutubeURL},
    {prefix: '.lmgtfy', function: sendLMGTFY},
    {prefix: '.image', function: sendImage},
    {prefix: '.sticker', function: sendSticker},
    {prefix: '.gif', function: sendGifSticker},
    {prefix: '.groupimg', function: setGroupImage}
]

async function handleMessage(message: Message, client: Client) {

    if((message.caption && !message.caption.startsWith(".")) && (message.body && !message.body.startsWith("."))) {
        return;
    }

    const commandCalled = message.caption ? message.caption : message.body;

    for (const command of commands) {
        if(commandCalled === command.prefix) {
            await command.function(message, client);
        }
    }

}

function start(client: Client) {

    // THIS IS TO ALLOW ME TO TEST ON MY OWN PHONE
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