const Discord = require('discord.js');
const util = require('minecraft-server-util');

module.exports.run = async (client, disbut, message, args) => {
    message.channel.startTyping();

    let mc_embed = new Discord.MessageEmbed()
      .setTitle('BrainCraft Status:')
      .setTimestamp()
      .setFooter('BrainBot', 'https://i.imgur.com/AkAd7Qo.png')

    await util.status("172.16.1.50")
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
                    name: "Latency:",
                    value: `${response.roundTripLatency}ms`,
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

            mc_embed.setColor('#0a7014');
        })
        .catch((error) => {
            console.error(error);
            
            mc_embed
                .setDescription("⛔ SERVER IS OFFLINE ⛔")
                .setColor('#8f0707');
        });

    let button = new disbut.MessageButton()
        .setLabel("Dynmap")
        .setStyle("url")
        .setURL("http://mc.realbraingames.com:8123/")

    message.channel.send({
        component: button,
        embed: mc_embed
    });


    // events server:
    let e_embed = new Discord.MessageEmbed()
      .setTitle('BrainCraft Modded Status:')
      .setTimestamp()
      .setFooter('BrainBot', 'https://i.imgur.com/AkAd7Qo.png')

    await util.status("172.16.1.50", { port: 21544, enableSRV: true, timeout: 5000, protocolVersion: 47 })
        .then((response) => {
            e_embed.setDescription("🟢 Modded server is Online!");

            e_embed.addFields(
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
                    name: "Latency:",
                    value: `${response.roundTripLatency}ms`,
                    inline: true
                }
            );

            if (response.samplePlayers != null) {
                let playerList = [];
                for (let i = 0; i < response.samplePlayers.length; i++) {
                    playerList.push(response.samplePlayers[i].name);
                }

                e_embed.addField("Players List:", playerList.join("\n"));
            }

            e_embed.setColor('#0a7014');
        })
        .catch((error) => {
            console.error(error);
            
            e_embed
                .setDescription("⛔ MODDED SERVER IS OFFLINE ⛔")
                .setColor('#8f0707');
        });

    message.channel.send(e_embed);


    message.channel.stopTyping();
}

//The command's name
module.exports.help = {
  name: "mc",
  description: "Check the status of the BrainCraft server."
}
