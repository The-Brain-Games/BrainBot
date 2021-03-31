const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    await message.delete()
    return message.channel.send("https://tenor.com/view/sudo-rm-rf-linux-bruh-chungus-poggers-gif-19024993")
}

//The command's name
module.exports.help = {
  name: "linux",
  description: "yes."
}