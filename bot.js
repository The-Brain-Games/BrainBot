require('dotenv').config();
const Discord = require('discord.js');
const interactions = require("discord-slash-commands-client");
const client = new Discord.Client();

const TOKEN = process.env.TOKEN;
client.interactions = new interactions.Client(TOKEN, "819262229668036618");

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);

    // Create a new command that we can test
    client.interactions
        .createCommand({
            name: "ping",
            description: "ping pong",
            guildID: "698145767780647042"
        })
        .then(console.log)
        .catch(console.error);
});

client.on("interactionCreate", (interaction) => {
    if (interaction.name === "ping") {
        console.log("ping command run")
        interaction.channel.send("pong");
    }
});

client.on('message', message => {
    if (message.content.startsWith(".eval")) { // .eval command
        if(message.author.id != "411883159408476160") {
            message.reply("you do not have permission to use this command.")
            return;
        } else {
        var result = message.content.split(" ").slice(1).join(" ")
            let evaled = eval(result);
            console.log("Running eval command:")
            console.log(`Input: ${result}`)
            console.log(`Output: ${evaled}`)

            // message.channel.send(`result:\n${evaled}`) // <-- to send without an embed
            const evalEmbed = new Discord.MessageEmbed()
                .setColor('#ba365b')
                .setTitle('Evaluation')
                .setDescription(`Input:\n\`\`\`js\n${result}\n\`\`\`\nOutput:\n\`\`\`\n${evaled}\n\`\`\``)
                .setTimestamp()
                .setFooter('Evaluated by BrainBot', 'https://i.imgur.com/AkAd7Qo.png');

            message.channel.send(evalEmbed);
        }
    }
});

client.login(TOKEN);