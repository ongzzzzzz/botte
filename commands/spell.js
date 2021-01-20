const utils = require('../utils')

module.exports = {
	name: 'spell',
	description: 'for kids v:two:',
	async execute (message, args) {
		let string = args.join(" ").split('');
		// console.log(string)
		if(!string.length){
			message.channel.send('pls write something uwu');
		} else {
			let emojis = "";
			string.forEach(char => {
				if(!char.match(/[^A-Za-z0-9]+/g)){
					if(char.match(/[A-Za-z]+/g)) {
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
	},
};