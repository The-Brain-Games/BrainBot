const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    await message.delete()
    return message.channel.send("Grant > Nathan")
}

//The command's name
module.exports.help = {
  name: "nathan"
}