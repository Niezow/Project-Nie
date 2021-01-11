console.log('Hello world!');

const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require(`./config.json`);

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Project Nie initialized successfully');
});

client.on('guildMemberAdd', member => {
    console.log('User @' + member.user.tag + ' has joined the server!');
    var role = member.guild.roles.cache.find(role => role.name == "New arrival");
    member.roles.add(role);
	var channel = member.guild.channels.cache.find(ch => ch.name == "Reception");
	channel.send('Welcome, @' + member.user.tag + '! Please, read #announcements for important information and enjoy your stay! EEEE!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;
	
	const command = client.commands.get(commandName);
	
	if (command.args && !args.length) {
	let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);
console.log('Project Nie initializing...');
