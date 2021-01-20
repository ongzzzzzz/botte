const utils = require('../utils')

module.exports = {
	name: 'count',
	description: 'for kids v:two:',
	async execute (message, args) {
		//./count *num* <tts>
		let x = 0;
		while(x <= args[0]){
			message.channel.send(
				x.toString(), 
				{tts: args[args.length-1]==='tts'}
			);
			await utils.sleep(1000);
			x += 1;
		}
	},
};