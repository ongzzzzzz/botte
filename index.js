const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send("I'm not dead! :D"));

app.listen(port, () => console.log(`listening at http://localhost:${port}`));


const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = "~~";
const timetableUrl = {
	"ERR": "https://i.giphy.com/media/8L0Pky6C83SzkzU55a/source.gif",
	"F4M": "https://raw.githubusercontent.com/Fogeinator/botte/main/images/ttbs/f4m.png",
	"S1SH": "https://raw.githubusercontent.com/Fogeinator/botte/main/images/ttbs/s1sh.png",
};

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
	client.user.setActivity("with your heart 👁👄👁", 
	{ type: "PLAYING" });
});

client.on("message", function(message) { 
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();


    if (command === "oi") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.channel.send(
			`u oi me for what... i reply in ${timeTaken}ms.`, 
			{tts: args[args.length-1]==='tts'} 
		);
    }
    else if (command === "sum") {
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter += x);
        message.channel.send(
			`The sum of all the arguments you provided is ${sum}!`
		);
    }
    else if (command === "count") {
        let x = 0;
        while(x <= args[0]){
        	message.channel.send(
				x.toString(), 
				{tts: args[args.length-1]==='tts'}
			);
        	sleep(1000);
			x += 1;
        }
    }
	else if (command === "rap") {
		let rap = "tsstsststsstssts ";
		let ttsString = ""; 
        if(!args[0]){
			ttsString = rap
		} else {
			let x = 1;
			while(x <= args[0]){
				ttsString += rap;
				x += 1;
			}
		}
		message.channel.send(ttsString, {tts: true});
	}
	else if (command === "ttb"){
		let ttbUrl = timetableUrl[args[0].toUpperCase()];
        ttbUrl ? 
		message.channel.send(`${args[0].toUpperCase()} timetable`, 
		{files: [ ttbUrl ]})
		: 
		message.channel.send("send what cacat stuff i cant find eh", 
		{files: [ timetableUrl["err"] ]})
    }
	// else if (){

	// }


});  

client.login(process.env.BOT_TOKEN);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getCurrentPeriod(){
	
}