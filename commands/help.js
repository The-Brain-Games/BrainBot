const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  if (args[0] === "help")
    return message.channel.send("I aint helping u lol")
  else
    return
}

//The command's name
module.exports.help = {
  name: "help"
}