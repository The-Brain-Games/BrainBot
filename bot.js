require('dotenv').config();
const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client();
client.commands = new Discord.Collection();

const TOKEN = process.env.TOKEN;

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
  
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.error("Couldn't find commands.");
      return;
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
    .then(console.log)
    .catch(console.error);
});

client.on('message', message => {
  // General checks:
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  if (cooldown == true) {
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
    let content = message.content.split(" ");
    let command = content[0].toLowerCase();
    //console.log(`running command ${command}`)
    let args = content.slice(1);
    let prefix = ">";

    if (command.substring(0,1) != prefix) return;

    // Checks if message contains a command and runs it
    let commandfile = client.commands.get(command.slice(prefix.length));
    if(commandfile) {
      commandfile.run(client,message,args)
      cooldown = true;
      setTimeout(() => {
        cooldown = false
      }, 2000); //Timeout for 2 seconds
    } else {
      console.warn(`Command ${command.slice(prefix.length)} does not exist.`)
    }
  }
});

client.login(TOKEN);