module.exports = {
	name: 'buildhouse',
	description: 'makes thing.',
	execute(message) {
		const member = message.member;
		const server = message.guild;
		if (member.roles.cache.some(role => role.name === 'Engineer')) {
			server.channels.create("Vacant House", {
				type: "category",
			}).then(cat => {		
				server.channels.create("control-room", {
					type: "text",
					parent: cat
				});
				server.channels.create("room", {
					type: "text",
					parent: cat
				});
				server.channels.create("room", {
					type: "text",
					parent: cat
				});
				server.channels.create("house yelling", {
					type: "voice",
					parent: cat
				});
			}).catch(console.error);
		}
		else {
			return message.channel.send('You don\'t have Engineer role to perform this command!');
		}
	}
}