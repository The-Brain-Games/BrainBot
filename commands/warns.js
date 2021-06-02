const Discord = require('discord.js')
var fs = require('fs')
var moment = require('moment')

const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')

module.exports.run = async (client, message, args) => {
    // general stuff
    const user4warn = message.mentions.users.first();
    if (user4warn === undefined) return message.reply("mention a user, using the syntax `>warns <user> [page]`");
    uid = user4warn.id

    let warnsEmbed = new Discord.MessageEmbed()
      .setColor('#0027b3')
      .setTitle('Warns')
      .setDescription(`A list of infractions for user ${user4warn}.`)
      .setTimestamp()
      .setFooter('Brainbot', 'https://i.imgur.com/AkAd7Qo.png')

    // connect to db
    var db = new JsonDB(new Config("warns", true, true, '/'));
    try {
        var data = db.getData(`/${uid}/warns`);
    } catch (err) {
        return message.reply(`I could not find any warns/infractions for ${user4warn}.`)
    }

    var startIndex = 1;
    var endIndex = 4;
    if (endIndex > data.length) endIndex = data.length
    var pagenum = 1;

    if (args.length > 1) {
        try {
            startIndex = parseInt(args[1])*4-4;
        } catch (err) {
            return message.reply('please make page number an integer value.');
        }

        pagenum = startIndex/4+1;

        if (4 > data.length-startIndex) {
            endIndex = data.length;
        } else {
            endIndex = startIndex+3;
        }
    }

    for (var i = startIndex-1; i < endIndex; i++) {
        warnsEmbed.addField(
            data[i].date,
            data[i].reason,
            false
        );
    }

    warnsEmbed.addField(
        '\u200B',
        `Page ${pagenum} of ${Math.ceil(data.length/4)}`,
        false
    )

    return message.channel.send(warnsEmbed);
}


//The command's name
module.exports.help = {
  name: "warns",
  description: "Displays a user's warns."
}