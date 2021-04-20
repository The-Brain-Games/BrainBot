const Discord = require('discord.js')
var fs = require('fs')

const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')

module.exports.run = async (client, message, args) => {
    var db = new JsonDB(new Config("todo", true, true, '/'));
    var data = db.getData("/")

    var uid = message.author.id

    if (args[0] === 'add' || args[0] === '+') {
        if (!data.hasOwnProperty(uid)) {
            // add uid to db
            db.push(`/${uid}`, {
                tasks:[]
            });
        }

        // common vars & checks
        var task = args.slice(1).join(' ')
        if (task.length >= 80) return message.reply("try writing a shorter task.")
        if (db.getData(`/${uid}`).tasks.length > 10) return message.reply("you have too many tasks, try completing the ones you have first.")
        
        // push task to db
        db.push(`/${uid}`, {
            tasks:[
                task
            ]
        }, false);

        return message.channel.send(`I have added \`${task}\` to your list of tasks.`)

    } else if (args[0] === 'remove' || args[0] === 'done' || args[0] === '-') {
        if (!data.hasOwnProperty(uid)) {
            // then there is nothing to remove
            return message.reply("you have no active tasks.")
        }
        
        // common vars & checks
        if (args.length <= 0) return message.reply("please give a number input in the format: `>todo add <index>`.")

        var tasknum = Number(args[1])-1
        if (Number.isNaN(tasknum)) return message.reply("please give a number input in the format: `>todo add <index>`.")

        var userTasks = db.getData(`/${uid}/`).tasks
        if (userTasks.length === 0) return message.reply("you have no active tasks.")

        // try to remove the task from the array
        var task2remove = userTasks[tasknum]
        try {
            userTasks.splice(tasknum, 1)
        } catch (err) {
            return message.reply("that is not a valid index, check `>todo` for your list of tasks & their index's.")
        }

        // insert the task back into the db
        var tasks = userTasks
        db.push(`/${uid}`, {
            tasks
        });

        return message.channel.send(`I have removed \`${task2remove}\` from your list of tasks.`)
    } else {
        if (!data.hasOwnProperty(uid)) {
            // the user has no tasks
            return message.reply("you have no active tasks.")
        }

        // check if the user has no tasks
        var userTasks = db.getData(`/${uid}`).tasks
        if (userTasks.length === 0) return message.reply("you have no active tasks.")

        // iterate through the array and format it for the message send.
        for (var i = 0; i<userTasks.length; i++) {
            userTasks[i] = `\`${i+1}\`: ${userTasks[i]}`
        }

        return message.channel.send(userTasks)
    }
}

//The command's name
module.exports.help = {
  name: "todo",
  description: "Command for managing tasks.\nUsage:\nTo add a task: `$todo add <task`\nTo remove a task: `$todo remove <task number>`\nTo list tasks: `$todo`"
}
