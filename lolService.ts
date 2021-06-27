import axios from "axios";
import Discord from 'discord.js';

const axiosLoL = axios.create();
axiosLoL.defaults.baseURL = 'https://la2.api.riotgames.com';
axiosLoL.defaults.headers['X-Riot-Token'] = process.env.LOL_KEY;

export async function lolApi(msg: Discord.Message) {
  const summoner = msg.content;

  //get summoner profile
  const resSummoner = await axiosLoL.get(`lol/summoner/v4/summoners/by-name/${summoner}`);
  //get account ID
  const { accountId } = resSummoner.data;
  console.log("🚀 - lolApi - accountId", accountId);
  //Set ammount of games returned
  const params = { endIndex: 1 }
  //get match history
  const resMatchs = await axiosLoL.get(`/lol/match/v4/matchlists/by-account/${accountId}`, { params });
  // console.log("🚀 - lolApi - data", resMatchs.data);
  console.log(new Date(resMatchs.data.matches[0].timestamp));
  //get game ID from matches
  const { gameId } = resMatchs.data.matches[0];
  //Send response to Discord
  msg.channel.send(JSON.stringify(resMatchs.data));
}
