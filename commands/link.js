const utils = require('../utils')

module.exports = {
	name: 'link',
	description: 'for kids v:two:',
	async execute (message, args) {
		if(args[0] === "set"){
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
				)
			)
		} 
		else if (args[0] === "delete"){
				//./link delete f4m bio
				let classss = args[1].toUpperCase();
				let period = args[2].toUpperCase();

				(classss && period) ?
				db.get(`${classss}_${period}`, {raw: true}).then(value => {
					value ?
					db.delete(`${classss}_${period}`)
					.then(() => message.channel.send(
						`I just deleted ${classss}'s ${period} link... I hope you know what you're doing kiddo!`
					))
					:
					message.channel.send('u no set link u delete waht link la kid', {tts: true});
				})
				
				:
				message.channel.send(`one of your params are missing, check again...`);

			}
			else if (args[0] === "list"){
				if(!args[1]){
					message.channel.send("pls give class uwu (./link list <class>)")
				} else {

					db.list().then(keys => {
						let classes = keys.filter(key => key.includes(args[1].toUpperCase()))
						classes.forEach(classs => {
							db.get(classs, {raw: true}).then(link => {
								//remove quotation marks from the link
								message.channel.send(`${classs} => <${link.slice(1, link.length-1)}>`);
							});
						})
					});
					//play withi cron-schedule
				}
				
			}
			else {
				//./link f4m bio
				
				if(args[0] && args[1]){

					let classss = args[0].toUpperCase();
					let period = args[1].toUpperCase();

					db.get(`${classss}_${period}`, {raw: true}).then(value => {
					value ? 
						message.channel.send(
							`${classss} ${period} class link: <${value}>`
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
	},
};