require('dotenv').config();
const Discord = require('discord.js');
const fs = require("fs");
var moment = require('moment')
require("moment-duration-format");
const client = new Discord.Client();
const disbut = require('discord-buttons');
client.commands = new Discord.Collection();

const TOKEN = process.env.TOKEN;

// utils init
const SingleMessageResponse = require('./utils/sResponse.js')

// commands init

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
  
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      throw new Error("Couldn't find commands.");
    }
  
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.info(`${f} loaded!`);
    client.commands.set(props.help.name, props);
  });
  
});

client.on('ready', () => {
  console.info(`\nLogged in as ${client.user.tag}!\n`);

  client.user.setPresence({ activity: { name: 'Brain Games' }, status: 'online' })
    //.then(console.info)
    .catch(console.error);
});

const talkedRecently = new Set();
let commandsRun = 0;
client.on('message', message => {
  // General checks:
  if(message.author.bot || message.channel.type === 'dm') return;
  if (SingleMessageResponse.run(message)) return;

  if (talkedRecently.has(message.author.id)) {
    //bot is on cooldown
    console.warn("Bot is on cooldown.")
    let cooldownEmbed = new Discord.MessageEmbed()
      .setColor('#8f0707')
      .setTitle('Cooldown')
      .setDescription('You are still on 2 second cooldown!\nStop spamming, 🆔!')
    return message.channel.send(cooldownEmbed)
  } else {
    // bot is not on cooldown, continue
    // Common vars
    let content = message.cleanContent.split(/\s+/);
    let command = content[0].toLowerCase();
    //console.log(`running command ${command}`)
    let args = content.slice(1);
    let prefix = ">";

    if (command.substring(0,1) != prefix) return;

    // Checks if message contains a command and runs it
    let commandfile = client.commands.get(command.slice(prefix.length));
    if(commandfile) {
      commandsRun++;
      commandfile.run(client,disbut,message,args);
      cooldown(message.author.id);
    } else {
      if (command.slice(prefix.length) == "botstats") {
        commandsRun++;
        botstats(message);
        cooldown(message.author.id);
        return;
      }
      console.warn(`Command ${command.slice(prefix.length)} does not exist.`)
    }
  }
});



//////////////////////////////////////////////BOTSTATS//////////////////////////////////////////////



function botstats(message) {
  const botstats = new Discord.MessageEmbed()
    .setColor('#ba365b')
    .setTitle('Bot Statistics')
    .addFields(
      {
        name: "Commands Run",
        value: commandsRun
      },
      {
        name: "Current Command Count",
        value: client.commands.array().length + 1
      },
      {
        name: "Uptime",
        value: moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")
      }
    )
    .setTimestamp()
    .setFooter('BrainBot', 'https://i.imgur.com/AkAd7Qo.png');

  return message.channel.send(botstats);
}


////////////////////////////////////////////////LOGS////////////////////////////////////////////////


client.on("messageDelete", function(messageDelete){
  if (messageDelete.bot || messageDelete.author.tag === "GitHub#0000" || messageDelete.author.tag === "Rythm#3722") return;

  var messageText;
  if (messageDelete.content.length > 800) {
    messageText = `${messageDelete.content.substring(0, 800)}...`;
  } else {
    messageText = messageDelete.content;
  }
  
  let deleteEmbed = new Discord.MessageEmbed()
  .setColor('#ba365b')
  .setTitle('Message Deleted')
    .setTimestamp()
    .setFooter('BrainBot', 'https://i.imgur.com/AkAd7Qo.png')
    .addFields(
        { 
          name: 'Channel:', 
          value: `${messageDelete.guild.channels.cache.get(`${messageDelete.channel.id}`).toString()}`
        },
        { 
          name: 'User:',
          value: `${messageDelete.author.tag} [${messageDelete.author.id}]` 
        },
        {
          name: 'Message:',
          value: `\`\`\`\n${messageText}\n\`\`\``
        }
      );

  client.channels.cache
    .get("789829927515062282")
    .send(deleteEmbed);
});

client.on('messageUpdate', function(oldMessage, newMessage){
  if (newMessage.bot || newMessage.author.tag === "GitHub#0000" || newMessage.author.tag === "Rythm#3722") return;

  var oldMessageText;
  if (oldMessage.content.length > 475) {
    oldMessageText = `${oldMessage.content.substring(0, 475)}...`;
  } else {
    oldMessageText = oldMessage.content;
  }

  var newMessageText;
  if (newMessage.content.length > 475) {
    newMessageText = `${newMessage.content.substring(0, 475)}...`;
  } else {
    newMessageText = newMessage.content;
  }

  let editEmbed = new Discord.MessageEmbed()
    .setColor('#ba365b')
    .setTitle('Message Edited')
    .setURL(`${newMessage.url}`)
    .setTimestamp()
    .setFooter('BrainBot', 'https://i.imgur.com/AkAd7Qo.png')
    .addFields(
        { 
          name: 'Channel:', 
          value: `${newMessage.guild.channels.cache.get(`${newMessage.channel.id}`).toString()}`
        },
        { 
          name: 'User:',
          value: `${newMessage.author.tag} [${newMessage.author.id}]` 
        },
        {
          name: 'Old Message:',
          value: `\`\`\`\n${oldMessageText}\n\`\`\``
        },
        {
          name: 'New Message:',
          value: `\`\`\`\n${newMessageText}\n\`\`\``
        }
      );

  client.channels.cache
    .get("789829927515062282")
    .send(editEmbed);
});

/*client.on("guildMemberAdd", function(member){
  console.info(`New member: ${member.tag}`);

  var joinMessages = []

  client.channels.cache
    .get("789829927515062282")
    .send(joinMessages[Math.floor(Math.random() * joinMessages.length)]);
});*/

//////////////////////////////////////////////COOLDOWN//////////////////////////////////////////////

function cooldown(user) {
  talkedRecently.add(user);
  setTimeout(() => {
    // Removes the user from the set after 2 seconds
    talkedRecently.delete(user);
  }, 2000);
}

client.login(TOKEN);
disbut(client);