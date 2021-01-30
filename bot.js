const fs = require("fs");
const Discord = require("discord.js");
const prefix = "Mayor, ";

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync(`./commands`)
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

function botLog(contents) {
  let guild = client.guilds.cache.find(g => g.id == "788793985148649502");
  let logchannel = guild.channels.cache.find(c => c.name === "log-channel");
  if (!logchannel) return;
  return logchannel.send(contents);
}

client.once("ready", () => {
  console.log("Project Nie initialized successfully");
});

client.on("message", message => {
  let commandNameDefault = 'default';
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (/^Mayor, e+/.test(message.content)){
    let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);
    if (/^e{1,}/.test(args[0])){
      commandNameDefault = 'eee';
    }
  }
  
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);
  if (commandNameDefault == "default") commandNameDefault = args.shift().toLowerCase();
  const commandName = commandNameDefault;

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
    botLog(
      `Command **${command.name}** executed by user **${message.author.username}**.`
    );
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
    botLog(
      `Command **${command.name}**, performed by user **${message.author.username}** failed to execute.`
    );
    botLog(error);
  }
});

client.on("guildMemberAdd", member => {
  console.log("Member joined.");
  const joinResponse = `Hello **${member.user.username}**, welcome to: **${
    member.guild.name
  }**! Please read ${member.guild.channels.cache.find(
    "794948171750440991"
  )} for info! Enjoy your stay! ${member.guild.channels.cache.find(
    "797834018409283614}"
  )} for chat!`;
  let role = member.guild.roles.cache.find(r => r.name == "Dwellers");
  if (!role) return console.log("Role doesn't exist.");
  member.roles.add(role);
  const ch = member.guild.channels.cache.find(c => c.name == "reception");
  if (!ch) return console.log("Channel doesen't exist.");
  ch.send(joinResponse);
});

client.login(process.env.BOTTOKEN);
console.log(`Project Nie initializing...`);
