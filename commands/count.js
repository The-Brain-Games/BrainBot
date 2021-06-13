const Discord = require('discord.js')

module.exports.run = async (client, disbut, message, args) => {
  let guild = client.guilds.get("789657841895735337");
  let memberCount = guild.members.size;

  return message.channel.send(`Brain Games is currently serving ${memberCount} members.`);
}

//The command's name
module.exports.help = {
  name: "count",
  description: "Shows the stats of Brain Games."
}