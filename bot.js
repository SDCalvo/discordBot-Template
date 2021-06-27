const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
client.login(process.env.BOTTOKEN);

client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', gotMessage);

const replies = [
    'ed que quiedo jugad denek detadidad',
    'ed que me nedfeadon ed dompeavances',
    'adi decia da guia que lei',
    'chango deja que me diviedta',
];

function gotMessage(msg) {
    console.log(msg.content);
    if (msg.content === 'damian armate bien') {
        const index = Math.floor(Math.random() * replies.length);
        msg.channel.send(replies[index]);
    }
}
