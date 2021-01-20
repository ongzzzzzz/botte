module.exports = {
	name: 'oi',
	description: 'ping',
	execute(message, args) {
		//./oi <tts>
		const timeTaken = Date.now() - message.createdTimestamp;
		message.channel.send(
			`u oi me for what... i reply in ${timeTaken}ms.`, 
			{tts: args[args.length-1]==='tts'} 
		);
	},
};