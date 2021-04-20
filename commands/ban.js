const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    // general stuff
    var messageResponse = 'ERROR';
    const user2ban = message.mentions.users.first();
    if (user2ban === undefined) return message.reply("mention a user, using the syntax `>ban <user>`");

    if (user2ban.id === '411883159408476160') {
        messageResponse = 'You cannot ban my daddy. 😠';
    } else if (user2ban.id === '718188351508971542') {
        messageResponse = 'I would love to, but I can\'t. 😟';
    } else if (user2ban.id === '301969699258761216') {
        messageResponse = 'Grant is my daddy, therefore Techy is my grandpa, so no banning him!';
    } else if (user2ban === message.author) {
        // then the user wants to ban themselfs...
        return message.reply("bro don\'t do it man")
    } else {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You don't have perms! haha");

        try {
        user2ban.ban();
        } catch (err) {
            return message.reply('I don\'t have permission to ban that user. 😟')
        }
        messageResponse = `I have banned ${user2ban.username}`;
    }

    return message.channel.send(messageResponse);
}

//The command's name
module.exports.help = {
  name: "ban",
  description: "Very totally normal ban command."
}