const Discord = require('discord.js')

module.exports.run = async (client, disbut, message, args) => {
  const aboutEmbed = new Discord.MessageEmbed()
      .setColor('#ba365b')
      .setDescription(
          "Brain Games was first founded in early 2020 by user GrantBGreat. The first server made under Brain Games was the whitelisted [BrainCraft](https://realbraingames.com/#/BrainCraft) server. Some months later, perfectsquare150 joined Brain Games, but also started playing BeamMP with GrantBGreat. After a while he decided to start his own BeamMP server and we built it under Brain Games as a server called [BrainNG](https://realbraingames.com/#/BrainNG). BrainNG was the first server under Brain Games to go public and with the massive success from the modded BrainNG server, Grant decided to make the BrainCraft server public. The public BrainNG server also inspired Grant to make the [BeamMP Status discord bot](https://top.gg/bot/784631695902375956), which is now used in many diffrent community's accross BeamMP. Since then we have only been growing and none of this would have been possible without you guys, so thank you."
        )
      .setTimestamp()
      .setFooter('BrainBot', 'https://i.imgur.com/AkAd7Qo.png');
  
  let button = new disbut.MessageButton()
    .setLabel("Read More!")
    .setStyle("url")
    .setURL("https://realbraingames.com/#/about-us")

  return message.channel.send({
    component: button,
    embed: aboutEmbed
  });
}

//The command's name
module.exports.help = {
  name: "about",
  description: "Learn about Brain Games and who we are."
}