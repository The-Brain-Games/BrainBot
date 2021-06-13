const Discord = require('discord.js')

module.exports.run = async (client, disbut, message, args) => {
  return message.channel.send(`Brain Games is currently serving ${client.guilds.get("789657841895735337").members.size} members.`);
}

//The command's name
module.exports.help = {
  name: "count",
  description: "Shows the stats of Brain Games."
}