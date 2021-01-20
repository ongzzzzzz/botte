const utils = require('../utils')

module.exports = {
	name: 'ttb',
	description: 'for kids v:two:',
	async execute (message, args) {
		//./ttb f4m
			
		if(!args[0]){
			message.channel.send("tell me wat class u want uwu")
		} else {

			let classs = args[0].toLowerCase();
			glob("images/ttbs/*.png", function (err, files) {
				if(files.includes(`images/ttbs/${classs}.png`)){
					message.channel.send(`${classs} timetable`, 
					{files: [  `https://raw.githubusercontent.com/Fogeinator/botte/main/images/ttbs/${classs}.png`  ]})
				} else {
					message.channel.send("send what cacat stuff i cant find eh", 
					{files: [ "https://i.giphy.com/media/8L0Pky6C83SzkzU55a/source.gif" ]})
				}
			})

		}
	},
};