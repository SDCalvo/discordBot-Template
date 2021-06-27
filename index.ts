require('dotenv').config();
import axios from 'axios';
import Discord from 'discord.js';
import { runCommand, checkPrefix, randomIndex } from './helper';
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

const commandsKeys = [
  { label: 'damian porque te armas mal?', func: damian },
  { label: 'lolApi ', func: lolApi },
  { label: 'gif ', func: getGif },
];

async function gotMessage(msg: Discord.Message) {
  try {

    //console.log(msg.content);
    let command = checkPrefix(msg, '!l ');
    if (command) {
      runCommand(msg, commandsKeys);
    };

  } catch (error: any) {
    console.log(`Guarda! `, error?.response.data || error);
  }
}

function damian(msg: Discord.Message) {
  const index = randomIndex(replies.length);
  msg.channel.send(replies[index]);
}

async function getGif(msg: Discord.Message) {
  const term = msg.content;
  console.log("🚀 - term", term);
  const limit = 100;
  //term dosen't have what slice method got rid of
  const URL = `https://g.tenor.com/v1/search`;
  const params = {
    limit,
    key: process.env.TENORKEY,
    q: term,
  };
  let response = await axios.get(URL, { params });
  const rIndex = randomIndex(response.data.results.length);
  msg.channel.send(response.data.results[rIndex].url);
}
