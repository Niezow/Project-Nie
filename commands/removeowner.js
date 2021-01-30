module.exports = {
  name: "remove",
  description: "Removes an owner of the house and locks it down.",
  args: true,
  usage: "owner",
  execute(message, args) {
    if (args[0] === "owner") {
      const member = message.member;
      const server = message.guild;
      const channel = message.channel;
      if (member.roles.cache.some(role => role.name === "Administrator")) {
        if (channel.name == "control-room") {
          channel.parent.permissionOverwrites.forEach(ov => {
            if (ov.id !== server.id) {
              let deletableRole = server.roles.cache.find(r => r.id === ov.id);
              deletableRole.delete();
              console.log("Role deleted successfully.");
            }
          });
          channel.parent.children.forEach(ch => {
            ch.overwritePermissions([
              {
                id: server.id,
                deny: ["VIEW_CHANNEL"]
              }
            ]);
          });
          return message.channel.send(
            "Owner removed and channel locked down successfully."
          );
          channel.setTopic();
        };
      } else {
        return message.channel.send(
          "You don't have Administrator role to perform this command!"
        );
      }
    } else
      return message.channel.send(`Remove who?\nUsage: Mayor, remove owner`);
  }
};
