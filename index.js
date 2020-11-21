const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send("I'm not dead! :D"));

app.listen(port, () => console.log(`listening at http://localhost:${port}`));


const Discord = require("discord.js");
const client = new Discord.Client();
const Database = require("@replit/database");
const db = new Database();


const prefix = "~~";
const timetableUrl = {
	"ERR": "https://i.giphy.com/media/8L0Pky6C83SzkzU55a/source.gif",
	"F4M": "https://raw.githubusercontent.com/Fogeinator/botte/main/images/ttbs/f4m.png",
	"S1SH": "https://raw.githubusercontent.com/Fogeinator/botte/main/images/ttbs/s1sh.png",
};
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


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



	try{
		if (command === "oi") {
			//~~oi <tts>
			const timeTaken = Date.now() - message.createdTimestamp;
			message.channel.send(
				`u oi me for what... i reply in ${timeTaken}ms.`, 
				{tts: args[args.length-1]==='tts'} 
			);
		}
		else if (command === "sauce") {
			//~~sauce
			message.channel.send(
				'a friend told me the sauce was https://github.com/Fogeinator/botte ...',
				{tts: args[args.length-1]==='tts'}
			);
		}
		else if (command === "sum") {
			//~~sum [loads of numbers]
			const numArgs = args.map(x => parseFloat(x));
			const sum = numArgs.reduce((counter, x) => counter += x);
			isNaN(sum) ?
			message.channel.send(`you can only sum numbers dumbass`)
			:
			message.channel.send(
				`The sum of all the arguments you provided is ${sum}!`
			);
		}
		else if (command === "count") {
			//~~count *num* <tts>
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
			//~~rap <69>
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
			//~~ttb f4m
			let ttbUrl = timetableUrl[args[0].toUpperCase()];
			ttbUrl ? 
			message.channel.send(`${args[0].toUpperCase()} timetable`, 
			{files: [ ttbUrl ]})
			: 
			message.channel.send("send what cacat stuff i cant find eh", 
			{files: [ timetableUrl["err"] ]})
		}
		else if (command === "link"){
			if(args[0] === "set"){
				//~~link set f4m bio eaubaougboaegoaeoigbea
				let classss = args[1].toUpperCase();
				let period = args[2].toUpperCase();
				let zoomLink = args[3];
				
				(classss && period && zoomLink) ?
				db.set(`${classss}_${period}`, `${zoomLink}`)
				.then(() => message.channel.send(
					`I saved ${zoomLink} to ${classss}_${period}`
				))
				:
				message.channel.send(`one of your params are missing, check again...`);
			} 
			else if (args[0] === "delete"){
				//~~link delete f4m bio
				let classss = args[1].toUpperCase();
				let period = args[2].toUpperCase();

				(classss && period) ?
				db.delete(`${classss}_${period}`)
				.then(() => message.channel.send(
					`I just deleted ${classss}'s ${period} link... I hope you know what you're doing kiddo!`
				))
				:
				message.channel.send(`one of your params are missing, check again...`);
			}
			else {
				//~~link f4m bio
				let classss = args[0].toUpperCase();
				let period = args[1].toUpperCase();
				db.get(`${classss}_${period}`).then(value => {
					value ? 
					message.channel.send(
						`${classss} ${period} class link: ${value}`
					)
					: 
					message.channel.send(
						`i think u not yet run: ~~link set ${args[0]} ${args[1]} <link>` 
					)
				});
			}
		}
	} catch (err) {
		console.error(err);
		message.channel.send("im sry u say what idk pun")
	}



});  

client.login(process.env.BOT_TOKEN);