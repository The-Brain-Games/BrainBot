const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    if(message.author.id != "411883159408476160" && message.author.id != "171083353502646272") {
        return message.reply("you do not have permission to use this command.");
    } else {
        console.warn(`${message.author.tag} is broadcasting.`)
    }

    // outdated way:
    //const brainCraft = client.channels.cache.find(channel => channel.id === "804470933514879026");
    //const brainNG = client.channels.cache.find(channel => channel.id === "789660320540393482");

    //For testing
    //var testing;
    var brainCraft;
    var brainNG;
    try {
        //For testing:
        //testing = client.channels.cache.get("796788504569839666");

        brainCraft = client.channels.cache.get("804470933514879026");
        brainNG = client.channels.cache.get("789660320540393482");
    } catch (err) {
        return console.error(`Error finding broadcast channels: ${err}`)
    }

    const broadcast_message = args.join(' ');
    
    //For testing:
    //testing.send(broadcast_message);

    brainCraft.send(broadcast_message);
    brainNG.send(broadcast_message);    
}

//The command's name
module.exports.help = {
  name: "broadcast",
  description: "Admin only command to broadcast messages to servers"
}