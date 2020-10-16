import {create, Client, Message, decryptMedia} from '@open-wa/wa-automate';
// const wa = require('@open-wa/wa-automate');
const usetube = require('usetube')
const lmgtfy = require('lmgtfy');
const gis = require('g-i-s');

create().then(client => start(client));

let messageControl: Message;

async function handleMessage(message: Message, client: Client) {
    if (message.body === '.ping') {
        await client.sendText(message.chatId, 'Pong 🏓!');

    } else if (message.body === '.help') {
        await client.sendText(message.chatId, 'I am Futezap and I am here to help you doing your everyday tasks.' +
            '\n\n Available commands:\n\n' +
            ' *.ping* to check if I am alive!\n'
          + ' *.youtube "your_search"* to get a video.\n'
        + ' *.lmgtfy "your_search"* to get Let Me Google That For You URL.\n'
        + ' *.image "your_search"* to get an image.\n');

    } else if (message.body.startsWith('.youtube')) {
        try {
            const videos = await usetube.searchVideo(message.body.substr(message.body.indexOf(' '), message.body.length));
            await client.sendYoutubeLink(message.chatId, `https://www.youtube.com/watch?v=${videos.tracks[0].id}`);
        } catch (e) {
            await client.sendText(message.chatId, "Please try again.");
        }

    } else if (message.body.startsWith('.lmgtfy')) {
        try {
        const url = lmgtfy(message.body.substr(message.body.indexOf(' '), message.body.length), 'g');
        await client.sendText(message.chatId, url);
        } catch (e) {
            await client.sendText(message.chatId, "Please try again.");
        }

    } else if (message.body.startsWith('.image')) {
        try {
            gis(message.body.substr(message.body.indexOf(' '), message.body.length), (error:any, results:any) => {
                client.sendFileFromUrl(message.chatId, results[0].url, results[0].url, '');
            });
        } catch (e) {
            try {
                gis(message.body.substr(message.body.indexOf(' '), message.body.length), (error:any, results:any) => {
                    client.sendFileFromUrl(message.chatId, results[1].url, results[1].url, '');
                });
            } catch (e) {
                await client.sendText(message.chatId, "Please try again.");
            }
        }
    } else if (message.body.startsWith('.groupimg')) {
        gis(message.body.substr(message.body.indexOf(' '), message.body.length), (error:any, results:any) => {
            client.setGroupIconByUrl(message.chatId, results[1].url);
        });
        client.tagEveryone()
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