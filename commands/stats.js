const Discord = require('discord.js')

module.exports.run = async (client, disbut, message, args) => {
  return message.channel.send(`Brain Games is currently serving ${client.guilds.get("804162605107249213").memberCount} members.`);
}

//The command's name
module.exports.help = {
  name: "stats",
  description: "Shows the stats of Brain Games."
}