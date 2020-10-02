export async function help (client, from) {
    const text = 'Hi, I am Futezap and this is my list of commands:'
    await client.sendText(from, text)
}
