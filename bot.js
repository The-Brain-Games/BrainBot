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

client.login(TOKEN);