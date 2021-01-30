module.exports = {
  name: "remove",
  description: "Removes a member/guest from a house.",
  args: true,
  usage: "<user>",
  execute(message, args) {
    if (args[1] == "as") {
      const member = message.member;
      const server = message.guild;
      const channel = message.channel;
      if (channel.name == "control-room") {
        let target =
          message.mentions.members.first() ||
          server.members.fetch(`${args[0]}`);
        if (!target) return message.reply("target user not found!");
        let deletableRole = target.roles.fetch(
          `${channel.topic} - HM` || `${channel.topic} - Guest`
        );
        if (!deletableRole)
          return message.reply(
            "target user is not a member or a guest of this house!"
          );
        target.roles.delete(deletableRole);
        return message.reply(`${target} has been removed from this house!`);
      } else
        return message.reply(
          "please, perform this command within the control room of the respective house."
        );
    } else
      return message.reply(
        "this is not the correct way to use this command.\nUsage: Mayor, invite <user> as <member/guest>"
      );
  }
};
