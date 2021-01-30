module.exports = {
	name: 'structure',
	description: 'Shows server structure (debug)',
	execute(message) {
		let server = message.guild;
		category = server.channels.cache.filter(c => c.type === 'category').find(x => x.position == 0);
		let pos = 0;
		do {
			category = server.channels.cache.filter(c => c.type === 'category').find(x => x.position == pos);
			console.log(category.name);
			message.channel.send(`Category ${pos + 1} name: ${category.name}\nCategory ${pos + 1} id: ${category.id}\nCategory ${pos + 1} position: ${category.position}\nCategory ${pos + 1} variable type: ${typeof category}`);
			console.log(category.id);
			console.log(category.position);
			console.log(typeof category);
			check = server.channels.cache.filter(c => c.type === 'category').find(x => x.position == pos + 1);
			pos++;
		} while (typeof check !== 'undefined')
		return;
	}
}