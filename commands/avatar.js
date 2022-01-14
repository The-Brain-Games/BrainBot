const Discord = require('discord.js');

module.exports.run = async (client, disbut, message, args) => {
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new Discord.MessageEmbed()
        .setColor('#ba365b')
        .setAuthor(user.username)
        .setTimestamp()
        .setImage(user.avatarURL)
        .setFooter('BrainBot', 'https://i.imgur.com/AkAd7Qo.png');
    return message.channel.send(avatarEmbed);
};

module.exports.help = {
    name: "avatar",
    description: "Returns a picture of the mentioned user's avatar or your own if no mention is given.",
};