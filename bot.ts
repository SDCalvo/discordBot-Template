require('dotenv').config();
import axios from 'axios';
import Discord from 'discord.js';
import { randomIndex } from './helper';
import { lolApi } from './lolService';

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

async function gotMessage(msg: Discord.Message) {
  try {
    if (!msg.content.includes('!l ')) return;
    msg.content = msg.content.slice(3);

    console.log(msg.content);
    await lolApi(msg);
    await getGif(msg);
    leeroy(msg);
  } catch (error: any) {
    console.log(`Guarda! `, error?.response.data);
    console.log(`Guarda! `, error);
  }
}

function leeroy(msg: Discord.Message) {
  if (msg.content === 'damian armate bien') {
    const index = randomIndex(replies.length);
    msg.channel.send(replies[index]);
  }
}

async function getGif(msg: Discord.Message) {
  if (msg.content.includes('gif')) {
    msg.content = msg.content.slice(4);
    console.log('🚀 - msg.content', msg.content);
    const limit = 100;
    //msg.content dosen't have what slice method got rid of
    const URL = `https://g.tenor.com/v1/search`;
    const params = {
      limit,
      key: process.env.TENORKEY,
      q: msg.content,
    };
    let response = await axios.get(URL, { params });
    const rIndex = randomIndex(response.data.results.length);
    msg.channel.send(response.data.results[rIndex].url);
  }
}
