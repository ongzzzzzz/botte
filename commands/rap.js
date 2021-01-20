const utils = require('../utils')

module.exports = {
	name: 'rap',
	description: 'snoopdawg',
	async execute (message, args) {
		//./rap <69>
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
	},
};