const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    await message.delete();
    return message.channel.send("no u");
}

//The command's name
module.exports.help = {
  name: "no",
  description: "no u"
}