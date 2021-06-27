import axios from "axios";
import Discord from 'discord.js';
const axiosLoL = axios.create();
axiosLoL.defaults.baseURL = 'https://la2.api.riotgames.com';
axiosLoL.defaults.headers['X-Riot-Token'] = process.env.LOL_KEY;

export async function lolApi(msg: Discord.Message) {
  if (msg.content === 'lolApi') {
    const { data } = await axiosLoL.get('lol/summoner/v4/summoners/by-name/jjfwarrior');
    console.log("🚀 - lolApi - data", data);
    msg.channel.send(JSON.stringify(data));
  }
}
