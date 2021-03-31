const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    const brainNG = client.guilds.get("804162605107249213");
    const brainCraft = client.guilds.get("789657841895735337");

    const memberCount = brainNG.memberCount + brainCraft.memberCount;

    return message.channel.send(`Brain Games is currently serving ${memberCount} members.`)
}

//The command's name
module.exports.help = {
  name: "stats",
  description: "Shows the stats of Brain Games."
}