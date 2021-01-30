module.exports = {
  name: "invite",
  description: "Invites a user into a house as a member/guest.",
  args: true,
  usage: "<user> as <member/guest>",
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
        switch (args[2]) {
          case "member":
            target.roles.add(channel.topic + " - HM");
            return message.reply(
              `User ${args[0]} has been invited to the house as a new member!`
            );
            break;
          case "guest":
            target.roles.add(channel.topic + " - Guest");
            return message.reply(
              `User ${args[0]} has been invited to the house as a guest!`
            );
            break;
          default:
            return message.reply(
              "I can only invite this user as a house member or a guest, please specify correctly.\nUsage: Mayor, invite <user> as <member/guest>"
            );
        }
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
