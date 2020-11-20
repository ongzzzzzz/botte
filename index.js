const Discord = require("discord.js");
// const config = require("./config.json");
const client = new Discord.Client();

const prefix = "~~";

client.once("ready", () => { // prints "Ready!" to the console once the bot is online
    console.log("Ready!");
});

client.on("message", function(message) { 
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();


    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.channel.send(`Pong! This message had a latency of ${timeTaken}ms.`, {tts: args[-1]==='tts'} );
    }
    else if (command === "sum") {
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter += x);
        message.channel.send(`The sum of all the arguments you provided is ${sum}!`, {tts: args[-1]==='tts'} );
    }
    else if (command === "timetable"){
        message.channel.send("go to school kid");
    }
    else if (command === "count") {
        let x = 0;
        while(x < args[0]){
            message.channel.send(x.toString(), {tts: args[-1]==='tts'});
        }
    }


});  

client.login(process.env.BOT_TOKEN);
