const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    var suggestion = args.join(" ");
    if (suggestion === '') return message.reply("please include context to your suggestion.");

    await message.delete();

    let suggestEmbed = new Discord.MessageEmbed()
      .setColor('#ba365b')
      .setTitle('New Suggestion')
      .setTimestamp()
      .setFooter('BrainBot', 'https://i.imgur.com/AkAd7Qo.png')

    
    client.channels.cache
        .get("825457139467550801")
        .send(suggestEmbed);


    message.channel
        .send(`✅ I have sucessfully sent your suggestion!`)
        .then(msg => {
            msg.delete({ timeout: 10000 })
        })
        .catch(console.error);
}

//The command's name
module.exports.help = {
  name: "suggest",
  description: "Make a suggestion to the mods of Brain Games. This can be whatever you want, server specific or not."
}