require('dotenv').config();
const fetch = require("node-fetch");
const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  return; // just here because the code doesnt work yet

  // check if there are args
  if (! args) return;

  // create the url
  let keywords = args.join(" ")
  let url = `https://g.tenor.com/v1/autocomplete?q=${keywords}&key=${process.env.TENORKEY}&limit=10`

  // get the json site
  let response = await fetch(url)
  let result = await response.json()
  console.log(result)

  // randomly select a gif and send it
  const i = Math.floor(Math.random() * result.results.length)
  return message.channel.send(result.results[i].url)
}

//The command's name
module.exports.help = {
  name: "gif"
}