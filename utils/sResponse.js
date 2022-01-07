const Discord = require('discord.js')

const ResponseList = require('./responseList.json');

module.exports.run = async (message) => {
    const content = message.content.normalize().toLowerCase();

    if (content in ResponseList) {
        if ("reaction" in ResponseList[content]) message.react(ResponseList[content].reaction);

        if ("text" in ResponseList[content]) message.channel.send(ResponseList[content].text);

        if ("reply" in ResponseList[content]) message.reply(ResponseList[content].text);

        return true;
    } else {
        return false;
    }
}