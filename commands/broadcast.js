const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    if(message.author.id != "411883159408476160" && message.author.id != "171083353502646272") {
        message.reply("you do not have permission to use this command.")
        return;
    } else {
        console.warn(`${message.author.tag} is broadcasting.`)
        return message.reply(args.join(" "));
    }

    const BrainCraft = client.channels.cache.find(channel => channel.id === "804470933514879026")
    const BrainNG = client.channels.cache.find(channel => channel.id === "789660320540393482")
}

//The command's name
module.exports.help = {
  name: "broadcast",
  description: "Admin only command to broadcast messages to servers"
}