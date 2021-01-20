const utils = require('../utils')
let prefix = utils.prefix;
const commands = {
	'oi': '`'+prefix+'oi (tts)` \n ping', 
	'sauce': '`'+prefix+'sauce (tts)` \n 😳', 
	'help': '`'+prefix+'help` \n help u a bit', 
	'sum': '`'+prefix+'sum <some numbers`> \n for kids v:one:', 
	'count': '`'+prefix+'count <number>` \n for kids v:two:', 
	'rap': '`'+prefix+'rap <number>` \n snoopdawg (tts: ON)',
	'ttb': '`'+prefix+'ttb <class>` \n gives you timetable for class', 
	'link': '`'+prefix+'link <class> <period>` \n gives you link', 
	'hjonk': '`'+prefix+'hjonk` \n hjonk 🦆', 
	'toxic': '`'+prefix+'toxic @person` \n gives motivational quotes 🤗', 
	'china': '`'+prefix+'china @person` \n :flag_cn:', 
	'spell': '`'+prefix+'spell <message>` \n for kids v:three: (too long will fail)'
};

module.exports = {
	name: 'help',
	description: 'help u a bit',
	async execute (message, args) {
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
					name: 'Prefix: `'+prefix+'`',
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
		message.channel.send({embed: helpEmbed})
	},
};