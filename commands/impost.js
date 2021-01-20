const utils = require('../utils')

module.exports = {
	name: 'impost',
	description: 'for kids v:two:',
	async execute (message, args) {
		let tts = false;
		if(args[0] == "/tts"){
			args.shift();
			tts = true;
		}
		let impostString = args.join(" ");

		let taggedUser = message.guild.member(message.mentions.users.first()) || null;
		if((impostString.toLowerCase().includes("./toxic") || impostString.toLowerCase().includes("./china")) && taggedUser){

			if(whiteList.includes(taggedUser.user.username)){

				if (chinaList.includes(message.author.username)) {
					if (toxicUsernameList.hasOwnProperty(message.author.username)) {
						message.reply(`OI U ALREADY CHINA'D AND TOXIC'D STILL WANT KEGAO SCAM ME???`)
					} else {
						message.reply("OI U CHINA'D BUT STILL AN KEGAO SCAM ME??? I NOW TOXIC U D.");
						message.channel.send(`./toxic <@${message.author.id}>`);
					}
				} else {
					if (toxicUsernameList.hasOwnProperty(message.author.username)) {
						message.reply(`OI U TOXIC'D STILL WANT KEGAO SCAM ME??? I NOW CHINA U D.`);
						message.channel.send(`./china <@${message.author.id}>`);
					} else {
						message.reply(`OI U THINK U VERY SMART CAN SCAM ME??? I NOW CHINA AND TOXIC U D.`);
						message.channel.send(`./toxic <@${message.author.id}>`);
						message.channel.send(`./china <@${message.author.id}>`);
					}
				}
					
				return

			} else if (chinaList.includes(message.author.username) || 
			blackList.includes(message.author.username) || 
			toxicUsernameList.hasOwnProperty(message.author.username)){
				message.reply(`HAHAHA U THINK U STILL VERY GENG??? NOOBS CAN'T UNTOXIC AND UNCHINA THEMSELVES THROUGH ME MUAHHAAHAHAHA`);
				return
			}
				
		}

		impostString.length
		? await message.channel.send(impostString, {tts: tts})
		: await message.channel.send("U THINK U VERY GAO AH??? WANT ME BE IMPOSTER SAY STUFF BUT NO TELL ME SAY WHAT...");
		await message.delete();
	},
};