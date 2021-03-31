const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    if(message.author.id != "411883159408476160" && message.author.id != "171083353502646272") {
        message.reply("you do not have permission to use this command.")
        return;
    } else {
        console.warn(`${message.author.tag} is broadcasting.`)
        return message.reply(args.join(" "));
    }
}

//The command's name
module.exports.help = {
  name: "broadcast",
  description: "Admin only command"
}