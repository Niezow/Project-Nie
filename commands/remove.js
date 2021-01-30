module.exports = {
  name: "bonk",
  description: "Removes a member/guest from a house.",
  args: true,
  usage: "<user>",
  execute(message, args) {
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
			channel.send('Target member not found!');
          });
        let deletableRole = target.roles.cache.find(r => r.name == (`${channel.topic} - HM` || `${channel.topic} - Guest`));
        if (!deletableRole)
          return message.reply(
            "target user is not a member or a guest of this house!"
          );
        target.roles.remove(deletableRole);
        return message.reply(`${target} has been removed from this house!`);
      } else
        return message.reply(
          "please, perform this command within the control room of the respective house."
        );
  }
};
