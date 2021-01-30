module.exports = {
  name: "build",
  description: "Builds a default house.",
  args: true,
  usage: "house",
  execute(message, args) {
    if (args[0] === "house") {
      const member = message.member;
      const server = message.guild;
      if (member.roles.cache.some(role => role.name === "Administrator")) {
        server.channels
          .create("vacant-house", {
            type: "category",
            permissionOverwrites: [
              {
                id: message.guild.id,
                deny: ["VIEW_CHANNEL"]
              }
            ]
          })
          .then(cat => {
            server.channels.create("doorstep", {
              type: "text",
              parent: cat,
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  deny: ["VIEW_CHANNEL"]
                }
              ]
            });
            server.channels.create("control-room", {
              type: "text",
              parent: cat,
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  deny: ["VIEW_CHANNEL"]
                }
              ]
            });
            server.channels.create("nsfw-room", {
              type: "text",
              parent: cat,
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  deny: ["VIEW_CHANNEL"]
                }
              ]
            });
            server.channels.create("room", {
              type: "text",
              parent: cat,
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  deny: ["VIEW_CHANNEL"]
                }
              ]
            });
          server.channels.create("guest-room", {
              type: "text",
              parent: cat,
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  deny: ["VIEW_CHANNEL"]
                }
              ]
            });
            server.channels.create("house-yelling", {
              type: "voice",
              parent: cat,
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  deny: ["VIEW_CHANNEL"]
                }
              ]
            });
          })
          .catch(console.error);
      } else {
        return message.channel.send(
          "You don't have Administrator role to perform this command!"
        );
      }
    } else return message.reply("Build what?");
  }
};
