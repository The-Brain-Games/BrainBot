const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    await message.delete()
    return message.channel.send("https://tenor.com/view/ffs-baby-really-oh-god-just-stop-gif-12739180")
}

//The command's name
module.exports.help = {
  name: "ban",
  description: "DON'T DO IT!!"
}