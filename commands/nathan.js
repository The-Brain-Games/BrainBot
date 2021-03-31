const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    await message.delete()
    return message.channel.send("Nathan says hi")
}

//The command's name
module.exports.help = {
  name: "nathan",
  description: "hi."
}