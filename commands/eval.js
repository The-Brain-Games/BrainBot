const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    if(message.author.id != "411883159408476160" && message.author.id != "212952336065232896" && message.author.id != "171083353502646272") {
        message.reply("you do not have permission to use this command.")
        return;
    } else {
    var result = args.join(" ")
        let evaled = eval(result);
        console.warn(`${message.author.tag} running eval command:`)
        console.log(`Input: ${result}`)
        console.log(`Output: ${evaled}`)

        // message.channel.send(`result:\n${evaled}`) // <-- to send without an embed
        const evalEmbed = new Discord.MessageEmbed()
            .setColor('#ba365b')
            .setTitle('Evaluation')
            .setDescription(`Input:\n\`\`\`js\n${result}\n\`\`\`\nOutput:\n\`\`\`\n${evaled}\n\`\`\``)
            .setTimestamp()
            .setFooter('Evaluated by BrainBot', 'https://i.imgur.com/AkAd7Qo.png');

        return message.channel.send(evalEmbed);
    }
}

//name this whatever the command name is.
module.exports.help = {
  name: "eval",
  description: "Admin only command"
}