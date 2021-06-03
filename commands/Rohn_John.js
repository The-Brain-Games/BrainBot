const Discord = require('discord.js');

module.exports.run = async (client, disbut, message, args) => {
    await message.delete();
    return message.channel.send("रोहन जॉन कहते हैं हाय");
}

//The command's name
module.exports.help = {
  name: "no",
  description: "no u"
}