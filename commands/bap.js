module.exports = {
  name: "bap",
  description: "bap",
  args: true,
  usage: "<user> <reason>",
  execute(message, args) {
    const { Client, MessageEmbed } = require("discord.js");
    const client = new Client();

    const fs = require("fs");
    //const ms = require("ms");
    let baps = JSON.parse(fs.readFileSync("./data/punish/storage.json", "utf8"));
    let guild = message.guild;

    /*Embeds*/
    const oops = new MessageEmbed()
      .setTitle("Error")
      .setColor("RED")
      .setDescription("You can't tell me to bap them. Please, ask a Police officer.")
      .setAuthor("Mayor Nie", "lel");

    const Mod = new MessageEmbed()
      .setTitle("Error")
      .setColor("RED")
      .setDescription("You can't tell me to bap a Police officer.")
      .setAuthor("Mayor Nie", "lel");
    /**Commands */
    let bUser =
      message.mentions.members.first() ||
      guild.members.fetch(`${args[0]}`);
    if (!bUser)
      return message.channel.send(
        "Are you sure that this was someone from here? Didn't find it in the userlist..."
      );
    let bReason = args.slice(1).join(" ");
    if (!bReason)
      return message.channel.send(
        "Please tell me, why you want to bap this person. Because, you know, it's a bap :D"
      );
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.channel.send(oops);
    if (bUser.hasPermission("KICK_MEMBERS")) return message.channel.send(Mod);

    if (!baps[message.guild.id])
      baps[message.guild.id] = {
        user: bUser.id,
        baps: 0
      };

    baps[bUser.id].baps++;

    fs.writeFile("./data/punish/storage.json", JSON.stringify(baps, null, 4), err => {
      if (err) console.log(err);
    });

    let bapEmbed = new MessageEmbed()
      .setTitle("Bapped")
      .setColor("YELLOW")
      .addField("Bapped Dweller", `${bUser}`)
      .addField("Enforcer", `${message.author.id}`)
      .addField("Reason", `${bReason}`)
      .addField("Number of baps", baps[bUser.id].baps)
      .addField("Bapped at", `${message.createdAt}`);

    let baponEmbed = new MessageEmbed()
      .setTitle("Bapped")
      .setColor("YELLOW")
      .addField("Bapped on", `${message.guild.name}`)
      .addField("Enforcer", `${message.author}`)
      .addField("Reason", `${bReason}`)
      .addField("Bapped at", `${message.createdAt}`);

    let logchannel = message.guild.channels.cache.find(c => c.name === "log-channel");
    if (!logchannel) return;

    bUser.send(baponEmbed);
    logchannel.send(bapEmbed);
  }
};
