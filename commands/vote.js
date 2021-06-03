const Discord = require('discord.js')

module.exports.run = async (client, disbut, message, args) => {
    let voteEmbed = new Discord.MessageEmbed()
      .setColor('#ba365b')
      .setDescription(args.join(" "))
      .setFooter('BrainBot', 'https://i.imgur.com/AkAd7Qo.png');
    
    return message.channel.send(voteEmbed);
}

//The command's name
module.exports.help = {
  name: "vote",
  description: "Admin only command to run votes using new bot buttons."
}