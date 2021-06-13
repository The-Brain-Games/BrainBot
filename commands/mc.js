const Discord = require('discord.js');
const util = require('minecraft-server-util');

module.exports.run = async (client, disbut, message, args) => {
    message.channel.startTyping();

    let mc_embed = new Discord.MessageEmbed()
      .setColor('#0a7014')
      .setTitle('BrainCraft Status:')
      .setTimestamp()
      .setFooter('BrainBot', 'https://i.imgur.com/AkAd7Qo.png')

    await util.status("172.16.1.52")
        .then((response) => {
            mc_embed.setDescription("🟢 Server is Online!");

            mc_embed.addFields(
                {
                    name: "Version:",
                    value: response.version,
                    inline: true
                },
                {
                    name: "Players:",
                    value: `${response.onlinePlayers} / ${response.maxPlayers}`,
                    inline: true
                },
                {
                    name: "Ping:",
                    value: response.roundTripLatency,
                    inline: true
                }
            );

            if (response.samplePlayers != null) {
                let playerList = [];
                for (let i = 0; i < response.samplePlayers.length; i++) {
                    playerList.push(response.samplePlayers[i].name);
                }

                mc_embed.addField("Players List:", playerList.join("\n"));
            }
        })
        .catch((error) => {
            console.error(error);
            mc_embed.setDescription("⛔ SERVER IS OFFLINE ⛔");
        });

    let button = new disbut.MessageButton()
        .setLabel("Dynmap")
        .setStyle("url")
        .setURL("http://mc.realbraingames.com:8123/")

    message.channel.send({
        component: button,
        embed: mc_embed
    });
    message.channel.stopTyping();
}

//The command's name
module.exports.help = {
  name: "mc",
  description: "Check the status of the BrainCraft server."
}