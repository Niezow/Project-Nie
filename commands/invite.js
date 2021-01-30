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
        let target;
        server.members
          .fetch({ query: args[1], limit: 1 })
          .then(
            (target = server.members.cache.find(t => t.displayName == args[0]))
          )
          .catch(err => {
            console.error(err);
          });
        console.log(target);
        switch (args[2]) {
          case "member": {
            let role = server.roles.cache.find(
              r => r.name == channel.topic + " - HM"
            );
            target.roles.add(role);
            target.send(
              `You have been invited to house ${channel.topic} as a house member by ${message.author}!`
            );
            return message.reply(
              `User ${args[0]} has been invited to the house as a new member!`
            );
            break;
          }
          case "guest": {
            let role = server.roles.cache.find(
              r => r.name == channel.topic + " - Guest"
            );
            target.roles.add(role);
            target.send(
              `You have been invited to house ${channel.topic} as a guest by ${message.author}!`
            );

            return message.reply(
              `User ${args[0]} has been invited to the house as a guest!`
            );
            break;
          }
          default:
            return message.reply(
              "I can only invite this user as a house member or a guest, please specify correctly.\nUsage: Mayor, invite <user> as <member/guest>"
            );
        }
        console.log(target);
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
