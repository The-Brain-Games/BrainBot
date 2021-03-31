const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    await message.delete()
    return message.channel.send("Grant is a cool guy")
}

//The command's name
module.exports.help = {
  name: "grant",
  description: "who's the fairest of them all?"
}