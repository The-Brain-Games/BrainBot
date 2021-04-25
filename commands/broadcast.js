const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    if(message.author.id != "411883159408476160" && message.author.id != "171083353502646272") {
        message.reply("you do not have permission to use this command.")
        return;
    } else {
        console.warn(`${message.author.tag} is broadcasting.`)
    }

    //const BrainCraft = client.channels.cache.find(channel => channel.id === "804470933514879026");
    //const BrainNG = client.channels.cache.find(channel => channel.id === "789660320540393482");

    try {
        const BrainCraft = client.channels.cache.get("804470933514879026");
        const BrainNG = client.channels.cache.get("789660320540393482");
    } catch (err) {
        return console.error(`Error finding broadcast channels: ${err}`)
    }

    const broadcast_message = args.join(' ');
    
    BrainCraft.send(broadcast_message);
    BrainNG.send(broadcast_message);    
}

//The command's name
module.exports.help = {
  name: "broadcast",
  description: "Admin only command to broadcast messages to servers"
}