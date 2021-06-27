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
  const { puuid } = resSummoner.data;
  console.log("🚀 - lolApi - puuid", puuid);
  //Set ammount of games returned
  const params = { endIndex: 1 }
  //get match history
  const resMatchs = await axiosLoL.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`);
  console.log("🚀 - lolApi - data", resMatchs.data);
  //get game ID from matches
  const lastMatch = resMatchs.data[0];
  //get game info from match ID
  const gameInfo = await axiosLoL.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${lastMatch}`);
  //construct msg for Disc

  //Send response to Discord
  msg.channel.send(JSON.stringify(lastMatch));
}

function constructMsg(msg: any){

  
}