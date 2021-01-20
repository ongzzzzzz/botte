module.exports = {
	name: 'sum',
	description: 'for kids v:one:',
	execute(message, args) {
		//./sum [loads of numbers]
		const numArgs = args.map(x => parseFloat(x));
		const sum = numArgs.reduce((counter, x) => counter += x);
		isNaN(sum) ?
		message.channel.send(`you can only sum numbers dumbass`)
		:
		message.channel.send(
			`The sum of all the arguments you provided is ${sum}!`
		);
	},
};