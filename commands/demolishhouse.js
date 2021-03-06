module.exports = {
	name: 'demolish',
	description: 'breaks thing.',
	execute(message) {
		const member = message.member;
		const server = message.guild;
		const channel = message.channel;
		if (member.roles.cache.some(role => role.name === 'Administrator')) {
			const categoryChannel = channel.parent;
			if (channel.name !== 'control-room')
				return message.reply('please, perform this command in the control room of the respective house.');
			const rooms = server.channels.cache.filter(x => x.parent == categoryChannel);
			let filter = (message) => !message.author.bot;
			let options = {
				max: 1,
				time: 15000
			};
			let collector = channel.createMessageCollector(filter, options);
			
			collector.on('end', (collected, reason) => {
				if (reason === 'time') {
					message.reply('Ran out of time.');
				} else {
					switch (collected.array()[0].content) {
						case 'Y':
							rooms.forEach(ch => {
								ch.delete();
							});
							categoryChannel.delete();
							break;
						case 'N':
							message.reply('Demolition cancelled at request.');
							break;
						default:
							message.reply('Answer not recognized. Demolition cancelled.');
							break;
					}
				}
			});
			message.reply('Do you really want to demolish this house? (Y/N)');
		}
		else {
			return message.channel.send('You don\'t have Administrator role to perform this command!');
		}
	}
}