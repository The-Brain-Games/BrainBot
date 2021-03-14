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
});

client.on('message', message => {
    // General checks:
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    // Common vars
    let content = message.content.split(" ");
    let command = content[0].toLowerCase();
    let args = content.slice(1);
    let prefix = ">";

    // Checks if message contains a command and runs it
    let commandfile = client.commands.get(command.slice(prefix.length));
    if(commandfile) commandfile.run(client,message,args);
});

client.login(TOKEN);