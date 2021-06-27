import Discord from 'discord.js';
import { ICommands } from './interfaces/interfaces';

export function randomIndex(maxValue: number) {
  return Math.floor(Math.random() * maxValue);
}

export function runCommand(msg: Discord.Message, commandsKeys: ICommands[]) {
  // search match command in message content
  const foundKey = commandsKeys.find((comKey) => msg.content.includes(comKey.label));

  if (!foundKey) {
    return defaultFunc(msg);
  }
  //slice msg taking command away
  msg.content = msg.content.slice(foundKey.label.length);
  return foundKey.func(msg);

}

export function checkPrefix(msg: Discord.Message, prefix: string) {
  console.log("🚀 - checkPrefix - msg.content.includes(prefix)", msg.content.includes(prefix));
  if (msg.content.includes(prefix)) {
    msg.content = msg.content.slice(prefix.length);
    return true;
  }
  return false;
}

function defaultFunc(msg: Discord.Message) {
  msg.channel.send('No seas tan pelotudo, eso no es un comando.');
}
