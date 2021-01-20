module.exports = {
	name: 'sauce',
	description: ':flushed:',
	execute(message, args) {
		// ./sauce
		message.channel.send(
			'a friend told me the sauce was <https://github.com/Fogeinator/botte>...',
			{tts: args[args.length-1]==='tts'}
		);
	},
};