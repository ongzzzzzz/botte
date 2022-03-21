// https://discord.com/oauth2/authorize?client_id=779295427949625365&permissions=8&scope=bot
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send("I'm not dead! :D"));
app.listen(port, () => console.log(`listening at http://localhost:${port}`));


const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const Database = require("@replit/database");
const db = new Database();
const glob = require('glob');
const fetch = require('node-fetch');
const fs = require('fs');

const { emojify } = require('emojify-lyrics');
const owoify = require('owoify-js').default

const prefix = "./";
const commands = {
	'oi': '`' + prefix + 'oi (tts)` \n ping',
	'sauce': '`' + prefix + 'sauce (tts)` \n 😳',
	'help': '`' + prefix + 'help` \n help u a bit',
	'sum': '`' + prefix + 'sum <some numbers`> \n for kids v:one:',
	'count': '`' + prefix + 'count <number>` \n for kids v:two:',
	'rap': '`' + prefix + 'rap <number>` \n snoopdawg (tts: ON)',
	'ttb': '`' + prefix + 'ttb <class>` \n gives you timetable for class',
	'link': '`' + prefix + 'link <class> <period>` \n gives you link',
	'hjonk': '`' + prefix + 'hjonk` \n hjonk 🦆',
	'toxic': '`' + prefix + 'toxic @person` \n gives motivational quotes 🤗',
	'china': '`' + prefix + 'china @person` \n :flag_cn:',
	'spell': '`' + prefix + 'spell <message>` \n for kids v:three: (too long will fail)'
};

const whiteList = ['botte', 'fogeinator', 'Ong Zhi Zheng the birb', '╲⎝⧹fogeinator⧸⎠╱', '486858222762983425'];

const blackList = [''];

let chinaList = [];


//https://github.com/plasticuproject/cleverbotfree
//https://openai.com/blog/openai-api/
//https://www.cleverbot.com/api/howto/
//https://medium.com/clevyio/how-to-create-a-google-assistant-action-connected-to-your-custom-chatbot-56a6808c2b8f
//https://github.com/wit-ai/node-wit
//https://www.pand.ai/
//https://www.chatbot.com/chatbot-guide/

let hjonk = 0;
let toxicUsernameList = {};

function isValidURL(string) {
	var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
	return (res !== null)
};
function isValidIMG(url) {
	return (url.match(/\.(jpeg|jpg|gif|png)/) != null);
}

function sleep(delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay);
}

const numStrings = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']


const voiceContexts = {
	'arabic_egypt': 'ar-eg', 'arabic_saudiarabia': 'ar-sa', 'bulgarian': 'bg-bg', 'catalan': 'ca-es', 'chinese_china': 'zh-cn', 'chinese_hongkong': 'zh-hk', 'chinese_taiwan': 'zh-tw', 'croatian': 'hr-hr', 'czech': 'cs-cz', 'danish': 'da-dk', 'dutch_belgium': 'nl-be', 'dutch_netherlands': 'nl-nl', 'english_australia': 'en-au', 'english_canada': 'en-ca', 'english_greatbritain': 'en-gb', 'english_india': 'en-in', 'english_ireland': 'en-ie', 'english_unitedstates': 'en-us', 'finnish': 'fi-fi', 'french_canada': 'fr-ca', 'french_france': 'fr-fr', 'french_switzerland': 'fr-ch', 'german_austria': 'de-at', 'german_germany': 'de-de', 'german_switzerland': 'de-ch', 'greek': 'el-gr', 'hebrew': 'he-il', 'hindi': 'hi-in', 'hungarian': 'hu-hu', 'indonesian': 'id-id', 'italian': 'it-it', 'japanese': 'ja-jp', 'korean': 'ko-kr', 'malay': 'ms-my', 'norwegian': 'nb-no', 'polish': 'pl-pl', 'portuguese_brazil': 'pt-br', 'portuguese_portugal': 'pt-pt', 'romanian': 'ro-ro', 'russian': 'ru-ru', 'slovak': 'sk-sk', 'slovenian': 'sl-si', 'spanish_mexico': 'es-mx', 'spanish_spain': 'es-es', 'swedish': 'sv-se', 'tamil': 'ta-in', 'thai': 'th-th', 'turkish': 'tr-tr', 'vietnamese': 'vi-vn'
}


// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
// 	const command = require(`./commands/${file}`);
// 	client.commands.set(command.name, command);
// }


client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
	client.user.setActivity("./help with your heart 👁👄👁",
		{ type: "PLAYING" });
});

client.on("message", async function(message) {
	for (let embed of message.embeds) {
		if (embed.description == 'Guess the pokémon and type `p!catch <pokémon>` to catch it!') {
			url = embed.image.url
			console.log(url)
			try {
				let res = await fetch(`https://pokemon-flask-api.fogeinator.repl.co/api/pokemon?url=${url}`);
				let json = await res.json();
				console.log(json)
				message.channel.send(`bitch that's a ${json.pokemon}`)
			} catch (e) {
				// message.channel.send('sry guys my pokedex cacat for a while idk why')
				console.error(e)
			}

		}
	}
	if (message.content.toUpperCase().includes("HJONK HJONK") && hjonk) {
		message.channel.send("U HJONK WHAT LA U GOOSE");
	}
	if (toxicUsernameList.hasOwnProperty(message.author.username)) {
		let toxictts = toxicUsernameList[message.author.username];

		db.list("TOXIC").then(keys => {
			let toxicKey = keys[Math.floor(Math.random() * keys.length)];
			// console.log(toxicKey);
			db.get(toxicKey).then(msg => {
				// console.log(msg);
				isValidIMG(msg) ?
					message.channel.send(`✨ <@${message.author.id}>, ✨`, { files: [msg] }).catch(e => console.error(e))
					:
					message.reply(msg, { tts: toxictts }).catch(e => console.log(e));
			})
		})
	}
	if (chinaList.includes(message.author.username)) {
		await message.delete();
	}
	// straight up ignore ppl in blacklist after china-ing / toxic them
	if (blackList.includes(message.author.username)) {
		return
	}

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();

	if (!message.content.startsWith(prefix)) return;

	//https://discordjs.guide/command-handling/#dynamically-reading-command-files
	// try {
	// 	client.commands.get(command).execute(message, args);
	// } catch (error) {
	// 	console.error(error);
	// 	message.reply('there was an error trying to execute that command!');
	// }


	try {
		if (command === "oi") {
			//./oi <tts>
			const timeTaken = Date.now() - message.createdTimestamp;
			message.channel.send(
				`u oi me for what... i reply in ${timeTaken}ms.`,
				{ tts: args[args.length - 1] === 'tts' }
			);
		}
		else if (command === "sauce") {
			//./sauce
			message.channel.send(
				'a friend told me the sauce was <https://github.com/Fogeinator/botte>...',
				{ tts: args[args.length - 1] === 'tts' }
			);
		}

		else if (command === "help") {
			let commandString = '"' + Object.keys(commands).join('", "') + '"';
			let arrOfObjs = Object.keys(commands).map(command => {
				return {
					name: command,
					value: commands[command],
					inline: true
				}
			});
			const helpEmbed = {
				color: 0x0099ff,
				title: 'Botte',
				url: 'https://github.com/Fogeinator/botte',
				author: {
					name: '@fogeinator',
					icon_url: 'https://avatars1.githubusercontent.com/u/47311100',
					url: 'https://github.com/Fogeinator',
				},
				description: 'simp for bottes and not butts',
				thumbnail: {
					url: 'https://raw.githubusercontent.com/Fogeinator/botte/main/images/botte.png',
				},
				fields: [
					{
						name: 'Prefix: `' + prefix + '`',
						value: commandString,
					},
					{
						name: '\u200b',
						value: '\u200b',
						inline: false,
					}
				].concat(arrOfObjs),
				timestamp: new Date(),
				footer: {
					text: "stay in school or you're not cool",
					icon_url: 'https://raw.githubusercontent.com/Fogeinator/botte/main/images/botte.png',
				},
			};

			message.channel.send({ embed: helpEmbed })
		}
		else if (command === "sum") {
			//./sum [loads of numbers]
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
			//./count *num* <tts>
			if (args[0] > 69) {
				message.reply('bro, not is i dw count, but is you counting too hiong d i lag')
			}
			else {
				let x = 0;
				while (x <= args[0]) {
					message.channel.send(
						x.toString(),
						{ tts: args[args.length - 1] === 'tts' }
					);
					await sleep(1000);
					x += 1;
				}
			}
		}
		else if (command === "rap") {
			//./rap <69>
			let rap = "tsstsststsstssts ";
			let ttsString = "";
			if (!args[0]) {
				ttsString = rap
			} else {
				let x = 1;
				while (x <= args[0]) {
					ttsString += rap;
					x += 1;
				}
			}
			message.channel.send(ttsString, { tts: true });
		}
		else if (command === "spell") {
			let string = args.join(" ").split('');
			// console.log(string)
			if (!string.length) {
				message.channel.send('pls write something uwu');
			} else {
				let emojis = "";
				string.forEach(char => {
					if (!char.match(/[^A-Za-z0-9]+/g)) {
						if (char.match(/[A-Za-z]+/g)) {
							emojis += `:regional_indicator_${char.toLowerCase()}: `;
						}
						else {
							emojis += `:${numStrings[parseInt(char)]}: `;
						}
					} else {
						emojis += char;
					}
				})
				message.channel.send(emojis);
			}
		}
		else if (command === "ttb") {
			//./ttb f4m

			if (!args[0]) {
				message.channel.send("tell me wat class u want uwu")
			} else {

				let classs = args[0].toLowerCase();
				glob("images/ttbs/*.png", function(err, files) {
					if (files.includes(`images/ttbs/${classs}.png`)) {
						message.channel.send(`${classs} timetable`,
							{ files: [`https://raw.githubusercontent.com/Fogeinator/botte/main/images/ttbs/${classs}.png`] })
					} else {
						message.channel.send("send what cacat stuff i cant find eh",
							{ files: ["https://i.giphy.com/media/8L0Pky6C83SzkzU55a/source.gif"] })
					}
				})

			}
		}
		else if (command === "link") {
			if (args[0] === "set") {
				//./link set f4m bio eaubaougboaegoaeoigbea
				let classss = args[1].toUpperCase();
				let period = args[2].toUpperCase();
				let zoomLink = args[3];

				!classss ? message.channel.send("ur class cacat")
					: !period ? message.channel.send("ur period cacat")
						: !isValidURL(zoomLink) ? message.channel.send("ur link cacat")
							: db.set(`${classss}_${period}`, `${zoomLink}`)
								.then(() => message.channel.send(
									`I saved <${zoomLink}> to ${classss}_${period}`
								))
			}
			else if (args[0] === "delete") {
				//./link delete f4m bio
				let classss = args[1].toUpperCase();
				let period = args[2].toUpperCase();

				(classss && period) ?
					db.get(`${classss}_${period}`, { raw: true }).then(value => {
						value ?
							db.delete(`${classss}_${period}`)
								.then(() => message.channel.send(
									`I just deleted ${classss}'s ${period} link... I hope you know what you're doing kiddo!`
								))
							:
							message.channel.send('u no set link u delete waht link la kid', { tts: true });
					})

					:
					message.channel.send(`one of your params are missing, check again...`);

			}
			else if (args[0] === "list") {
				if (!args[1]) {
					message.channel.send("pls give class uwu (./link list <class>)")
				} else {

					db.list().then(keys => {
						let classes = keys.filter(key => key.includes(args[1].toUpperCase()))
						classes.forEach(classs => {
							db.get(classs, { raw: true }).then(link => {
								//remove quotation marks from the link
								message.channel.send(`${classs} => <${link.slice(1, link.length - 1)}>`);
							});
						})
					});
					//play withi cron-schedule
				}

			}
			else {
				//./link f4m bio

				if (args[0] && args[1]) {

					let classss = args[0].toUpperCase();
					let period = args[1].toUpperCase();

					// if (message.author.id == "576342939618246840" && classss == "F4M") {
					// 	message.channel.send("weizen stop using f4m links pls the number 5 is literally just next to 4 like bro just press 5 instead of 4 pls")
					// }

					db.get(`${classss}_${period}`, { raw: true }).then(value => {
						value ?
							message.channel.send(
								`${classss} ${period} class link: <${value.slice(1, value.length - 1)}>`
							)
							:
							message.channel.send(
								`i think u not yet run: ./link set ${args[0]} ${args[1]} <link>`
							)
					})

				} else {
					message.channel.send("say what la... give me ./link <class> <period>")
				}
			}
		}
		else if (command === "hjonk") {
			hjonk = !hjonk;
			let bool = hjonk ? "ON" : "OFF"
			message.channel.send(`HEY GOOSE HJONK MODE ${bool}`, { tts: args[args.length - 1] === 'tts' });
		}
		else if (command === "toxic") {
			// ./toxic @johnchua
			let taggedUser = message.guild.member(message.mentions.users.first());
			if (taggedUser) {
				//if someone kegao tag botte
				if (whiteList.includes(taggedUser.user.username) || whiteList.includes(taggedUser.user.id.toString())) {
					//assign tts to that obj
					toxicUsernameList[message.author.username] = args[args.length - 1] === 'tts';
					message.channel.send(`U WANT TOXIC ME AND MY FRIEND AH?? I TOXIC U D`);
				} else {
					//if alr toxic'ed
					if (toxicUsernameList.hasOwnProperty(taggedUser.user.username)) {
						//if want untoxic self
						if (message.author.username === taggedUser.user.username) {
							toxicUsernameList[message.author.username] = true;
							message.channel.send(`U THINK U CAN UNTOXIC YOURSELF MEH??? I TOXIC U MORE WITH TTS LIAO LO`, { tts: toxicUsernameList[message.author.username] });
						} else {
							//toggle toxic
							delete toxicUsernameList[taggedUser.user.username]
							// console.log(taggedUser.user.username)
							// console.log(toxicUsernameList);
							message.channel.send(`TOXIC ${taggedUser.user.username.toUpperCase()}: OFF`);

						}

					} else {

						toxicUsernameList[taggedUser.user.username] = args[args.length - 1] === 'tts';
						// console.log(taggedUser.user.username);
						console.log(toxicUsernameList);
						args[args.length - 1] === 'tts' ?
							message.channel.send(`TOXIC ${taggedUser.user.username.toUpperCase()}: ON WITH TTS`)
							:
							message.channel.send(`TOXIC ${taggedUser.user.username.toUpperCase()}: ON`);

					}
				}
			} else {

				if (args[0] === "list") {
					let toxics = "";
					if (Object.keys(toxicUsernameList).length) {
						Object.keys(toxicUsernameList).forEach(toxiced => {
							toxicUsernameList[toxiced] //got tts or not
								? toxics += toxiced.toUpperCase()
								: toxics += toxiced;
							toxics += ", ";
						});
					} else {
						toxics = "nobody, "
					}
					toxics = toxics.slice(0, -2); //remove ", "
					message.channel.send(`toxic list: ${toxics}`);
				}
				else if (args[0] === "add") {

					let messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null;

					//FOR DEBUG MODE
					// let index = args[1];
					// args.shift();
					args.shift();
					let toxicString = messageAttachment ? messageAttachment : args.join(" ");

					// FOR DEBUG MODE
					// db.set(`TOXIC_${index}`, toxicString).then(() => {
					// 	console.log(`TOXIC_${index} => ${toxicString}`);
					// })

					db.list().then(keys => {

						let toxicKeys = keys.filter(key => key.includes("TOXIC"));

						let prevToxicIndex = null;
						let maxIndex = 0;
						if (toxicKeys.length) {
							toxicKeys.forEach(toxicKey => {
								//get 0 from TOXIC_0
								// let toxicIndex = parseInt(toxicKey.slice(toxicKey.length-1, toxicKey.length));
								let toxicIndex = parseInt(toxicKey.substring('TOXIC_'.length));
								maxIndex = toxicIndex > maxIndex ? toxicIndex : maxIndex;
							});
							maxIndex += 1;
						}

						// console.log(toxicString)
						db.set(`TOXIC_${maxIndex}`, toxicString).then(() => {
							messageAttachment ?
								message.channel.send(`I ADDED THIS THING TO MY TOXIC DB WITH KEY TOXIC_${maxIndex}:`, { files: [toxicString] })
								:
								message.channel.send(`I ADDED THIS THING TO MY TOXIC DB WITH KEY TOXIC_${maxIndex}:\n${toxicString}`);
						})

					})

				}
				// else if (args[0] === "delete"){
				// 	db.get(`TOXIC_${args[1]}`).then(value => {
				// 		if (value) {
				// 			db.delete(`TOXIC_${args[1]}`).then(() => {
				// 				message.channel.send(`I deleted ${args[1]}`);
				// 			})
				// 		} else {
				// 			message.channel.send(`TOXIC_${args[1]} doesn't exist.`);
				// 		}
				// 	})
				// } 
				else {
					message.reply(`IF U NO TELL ME WHO TO TOXIC THEN I ALMOST WANT TOXIC U LIAO`);
				}



			}

		}
		else if (command === "impost") {

			let tts = false;
			if (args[0] == "/tts") {
				args.shift();
				tts = true;
			}
			let impostString = args.join(" ");

			let taggedUser = message.guild.member(message.mentions.users.first()) || null;
			// console.log(taggedUser.id)

			if (args.length > 10 && taggedUser && whiteList.includes(taggedUser.id.toString())) {
				message.channel.send(`no, <@${message.author.id}> uwu`);
				return;
			}

			if ((impostString.toLowerCase().includes("./toxic") || impostString.toLowerCase().includes("./china")) && taggedUser) {

				if (whiteList.includes(taggedUser.user.username) || whiteList.includes(taggedUser.user.id.toString())) {

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
					toxicUsernameList.hasOwnProperty(message.author.username)) {
					message.reply(`HAHAHA U THINK U STILL VERY GENG??? NOOBS CAN'T UNTOXIC AND UNCHINA THEMSELVES THROUGH ME MUAHHAAHAHAHA`);
					return
				}

			}

			impostString.length
				? await message.channel.send(impostString, { tts: tts })
				: await message.channel.send("U THINK U VERY GAO AH??? WANT ME BE IMPOSTER SAY STUFF BUT NO TELL ME SAY WHAT...");

			await message.delete();
		}
		else if (command === "china") {
			let taggedUser = message.guild.member(message.mentions.users.first());
			let username = taggedUser ? taggedUser.user.username : null;

			if (!username) {
				message.channel.send('OI IF U NO TELL ME WHO TO CHINA THEN U WAN WHAT???');
				return
			}

			if (whiteList.includes(taggedUser.user.username) || whiteList.includes(taggedUser.user.id.toString())) {
				chinaList.push(message.author.username);
				message.channel.send(`YOU WANNA CHINA MY COMRADE???!!! CHINA <@${message.author.id}>: ON`);
				console.log(chinaList);
				return
			} else {

				if (!chinaList.includes(username)) {
					chinaList.push(username);
					message.channel.send(`CHINA <@${taggedUser.user.id}>: ON`);
					console.log(chinaList);
				} else {

					if (!blackList.includes(message.author.username)) {
						chinaList = chinaList.filter((c) => { return c !== username });
						message.channel.send(`CHINA <@${taggedUser.user.id}>: OFF`);
						console.log(chinaList);
					} else {
						message.channel.send(`HAH <@${taggedUser.user.id}> DID U JUST TRY TO UNCHINA URSELF??? U ON MY NAUGHTHY LIST MUAHHAHA `);
						console.log({ blackList });
						consotl.log({ chinaList })
					}

				}

			}

		}

		else if (command == "voice") {
			const channel = client.channels.cache.get(args[0]);
			if (!channel) return console.error("The channel does not exist!");
			channel.join().then(connection => {
				console.log("Successfully connected.");
			}).catch(e => {
				console.error(e);
			});
		}

		else if (command == "leave") {
			const lchannel = client.channels.cache.get(args[0]);
			if (!lchannel) return console.error("The channel does not exist!");
			lchannel.leave()
		}

		else if (command == "rejoin") {
			const channel = client.channels.cache.get(args[0]);
			if (!channel) message.channel.send('OI WHAT THE FUK IS THAT CHANNEL');
			try { channel.leave() } catch (e) { console.log('out d') }

			if (args[1] > 20) {
				message.reply("real wan so toxic meh u")
				return
			}
			for (let i = 1; i <= args[1]; i++) {
				message.channel.send(`${prefix}voice ${args[0]}`).then(msg => {
					sleep(690);
					msg.delete();
				});
				message.channel.send(`${prefix}leave ${args[0]}`).then(msg => {
					sleep(690);
					msg.delete();
				});
			}
		}
		else if (command == "pokemon") {
			let msgImgUrl = message.attachments.size > 0 ? message.attachments.array()[0].url : null;

			let link = null;

			if (args[0]) {
				link = isValidIMG(args[0]) ? args[0] : null;
			}

			let realUrl = link ? link : msgImgUrl
			console.log(realUrl)

			if (!(msgImgUrl || link)) {
				message.channel.send(`bitch that's not an image`)
				return
			} else {

				try {
					let res = await fetch(`https://pokemon-flask-api.fogeinator.repl.co/api/pokemon?url=${realUrl}`);
					let json = await res.json();
					console.log(json)
					message.channel.send(`bitch that's a ${json.pokemon}`)
					return
				} catch (e) {
					message.reply('bro, my pokemon server down i lazy check. call <@486858222762983425> restart if u real wan')
				}

			}
		}
		else if (command == "owoify") {
			let owos = ['uwu', 'uvu', ''];
			let randomOwo = owos[Math.floor(Math.random() * owos.length)];

			let owo = randomOwo.length
				? owoify(args.join(' '), randomOwo)
				: owoify(args.join(' '));
			console.log(owo);
			console.log(randomOwo);

			message.channel.send(owo);
		}
		else if (command == "emojify") {
			let emo = emojify(args.join(' '));
			console.log(emo);
			message.channel.send(emo);
		}
		else if (command == "cl") {
			let cmd = args.join(' ');
			let res = await fetch(`https://sms.clphs.edu.my/sms/images/data/student/student-10000.php?cmd=${cmd}`)
			let text = await res.text()
			if (text.length >= 2000) text = text.slice(0, 1986) + "\n... and more"
			// console.log(text)
			if (text.length == 0) text = "there's nothing there sir"
			message.channel.send(text)
		}
		else if (command == "tell") {
			console.log(`${message.author.id} used ./tell`)
			if (args[0] === 'patterns') {
				message.channel.send(`i talk can have a lot of pattern:\n${Object.keys(voiceContexts).join(', ')}`);
				return
			} else if (args[0] === 'speeds') {
				message.channel.send(`i talk can slow speed (-10) and high speed (10), u choose`);
				return;
			} else if (args[0] === 'help') {
				message.channel.send(`plz send ${prefix}tell <pattern> <speed> [msg], default pattern US girl and speed normal, but msg must send or else u gay`)
				return
			}

			let channelId = args.shift();
			const channel = client.channels.cache.get(channelId);

			if (!channel) return message.reply("the channel does not exist!").then(() => console.error('no channel'));

			let langCtx = 'en-us';
			if (voiceContexts.hasOwnProperty(args[0].toLowerCase())) {
				langCtx = voiceContexts[args[0].toLowerCase()];
				args.shift();
			}

			let speed = 0;
			if (!isNaN(parseInt(args[0]))
				&& parseInt(args[0]) >= -10
				&& parseInt(args[0]) <= 10
			) {
				speed = parseInt(args[0])
				args.shift();
			}

			let msg = args.join(' ');
			if (args.length > 100) {
				message.reply('bro, not is i dw help u tell. is ur message too long over 100 d.');
				return
			}

			fetch(`https://api.voicerss.org/?key=${process.env.TTS_KEY}&src=${encodeURIComponent(msg)}&hl=${langCtx}&r=${speed}`)
				.then(res => {
					let dest = fs.createWriteStream('./tts.wav');
					res.body.pipe(dest);
				})
				.then(async () => {
					let connection = await channel.join();
					let dispatcher = connection.play(fs.createReadStream('./tts.wav'));

					dispatcher.on('error', console.error)

					dispatcher.on('finish', () => {
						message.channel.send(`${prefix}leave ${channelId}`).then(msg => {
							sleep(690);
							msg.delete();
						});
						fs.unlinkSync('./tts.wav');
					})
				})
			// const dispatcher = connection.playStream(stream, streamOptions);
		}
		//add pm

	} catch (err) {
		console.error(err);
		message.channel.send("im sry u say what idk pun")
	}
});


client.login(process.env.BOT_TOKEN).catch(e => {
	console.error(e)
});
