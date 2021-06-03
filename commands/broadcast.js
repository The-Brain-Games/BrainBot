const Discord = require('discord.js')

module.exports.run = async (client, disbut, message, args) => {
    if(message.author.id != "411883159408476160" && message.author.id != "171083353502646272") {
        return message.reply("you do not have permission to use this command.");
    } else {
        console.warn(`${message.author.tag} is broadcasting.`);
    }

    //For testing:
    //var serverIDs = ["796788484714528818", "796788504569839666"];

    var serverIDs = ["804470933514879026", "789660320540393482", "763167820014944336"]; // this is the list of server channel ID's for sending to
    var serverChannels = [];
    try {
        for (var i = 0; i < serverIDs.length; i++) {
            serverChannels.push(client.channels.cache.get(serverIDs[i]));
        }
    } catch (err) {
        return console.error(`Error finding broadcast channels: ${err}`);
    }

    const broadcast_message = args.join(' ');

    //send the message:
    for (var i = 0; i < serverChannels.length; i++) {
        serverChannels[i].send(broadcast_message);
    }

    return message.reply("I have pushed your broadcast. :)");
}

//The command's name
module.exports.help = {
  name: "broadcast",
  description: "Admin only command to broadcast messages to servers"
}