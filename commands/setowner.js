module.exports = {
  name: "set",
  description: "Sets the guild member as the owner of the house.",
  args: true,
  usage: "owner <user> <name> [color]",
  execute(message, args, usage) {
    if (args[0] === "owner") {
      const member = message.member;
      const server = message.guild;
      const channel = message.channel;
      if (!server.roles.cache.find(r => r.name == args[2] + " - Owner")) {
        let target;
        if (member.roles.cache.some(role => role.name === "Administrator")) {
          server.members
            .fetch({ query: args[1], limit: 1 })
            .then(
              (target = server.members.cache.find(
                t => t.displayName == args[1]
              ))
            )
            .catch(err => {
              console.error(err);
            });
          if (!target)
            return message.reply(`Target member not found, try again.`);

          if (!Array.isArray(args) || args.length < 3) {
            return message.reply(
              `You didn't provide enough arguments! Usage: Mayor, set ${usage}`
            );
          }
          if (channel.name !== "control-room")
            return message.reply(
              "You need to perform the command in the control room of the house!"
            );
          let color = 0;
          if (!args[3]) {
            let color = "#000000";
          } else {
            let color = args[3];
          }
          // Creating roles for three levels of house access
          server.roles
            .create({
              data: {
                name: args[2] + " - Owner",
                color: color,
                permissions: 66560
              },
              reason: "A new House Owner!"
            })
            .then(console.log(`Role ${args[1]} created.`))
            .catch(console.error);
          server.roles
            .create({
              data: {
                name: args[2] + " - HM",
                color: color,
                permissions: 66560
              },
              reason: "A new House Owner's House Members!"
            })
            .then(console.log(`Role ${args[1]} created.`))
            .catch(console.error);
          server.roles
            .create({
              data: {
                name: args[2] + " - Guest",
                color: color,
                permissions: 66560
              },
              reason: "A new House Owner's Guest Members!"
            })
            .then(console.log(`Role created.`))
            .catch(console.error);

          // Looking up created roles by name
          message.guild.roles
            .fetch()
            .then(roles => {
              let role = server.roles.cache.find(
                r => r.name == args[2] + " - Owner"
              );
              let roleHM = server.roles.cache.find(
                r => r.name == args[2] + " - HM"
              );
              let roleGuest = server.roles.cache.find(
                r => r.name == args[2] + " - Guest"
              );

              // Giving target member the owner role
              target.roles.add(role);

              // Rewriting permissions regarding newly made roles
              let category = channel.parent;
              category.overwritePermissions([
                {
                  id: role.id,
                  allow: ["VIEW_CHANNEL"]
                },
                {
                  id: roleHM.id,
                  allow: ["VIEW_CHANNEL"]
                },
                {
                  id: roleGuest.id,
                  allow: ["VIEW_CHANNEL"]
                },
                {
                  id: "788793985148649502",
                  deny: ["VIEW_CHANNEL"]
                }
              ]);

              category.children.forEach(ch => {
                if (ch.name === "control-room") {
                  ch.overwritePermissions([
                    {
                      id: role.id,
                      allow: ["VIEW_CHANNEL"]
                    },
                    {
                      id: "788793985148649502",
                      deny: ["VIEW_CHANNEL"]
                    }
                  ]);
                } else if (
                  (ch.nsfw && !ch.name.includes("Guest")) ||
                  ch.name.includes("HM")
                ) {
                  ch.overwritePermissions([
                    {
                      id: role.id,
                      allow: [
                        "VIEW_CHANNEL",
                        "MANAGE_CHANNELS",
                        "MANAGE_MESSAGES",
                        "MENTION_EVERYONE"
                      ]
                    },
                    {
                      id: roleHM.id,
                      allow: ["VIEW_CHANNEL"]
                    },
                    {
                      id: "788793985148649502",
                      deny: ["VIEW_CHANNEL"]
                    }
                  ]);
                } else if (ch.name === "doorstep") {
                  ch.overwritePermissions([
                    {
                      id: "803680212624998410",
                      allow: ["VIEW_CHANNEL"]
                    }
                  ]);
                } else if (ch.type === "voice") {
                  ch.overwritePermissions([
                    {
                      id: role.id,
                      allow: [
                        "VIEW_CHANNEL",
                        "MANAGE_CHANNELS",
                        "MUTE_MEMBERS",
                        "DEAFEN_MEMBERS"
                      ]
                    },
                    {
                      id: roleHM.id,
                      allow: ["VIEW_CHANNEL"]
                    },
                    {
                      id: roleGuest.id,
                      allow: ["VIEW_CHANNEL"]
                    },
                    {
                      id: "788793985148649502",
                      deny: ["VIEW_CHANNEL"]
                    }
                  ]);
                } else if (ch.name === "guest-room") {
                  ch.overwritePermissions([
                {
                  id: role.id,
                  allow: ["VIEW_CHANNEL",
                        "MANAGE_CHANNELS",
                        "MANAGE_MESSAGES",
                        "MENTION_EVERYONE",]
                },
                {
                  id: roleHM.id,
                  allow: ["VIEW_CHANNEL"]
                },
                {
                  id: roleGuest.id,
                  allow: ["VIEW_CHANNEL","READ_MESSAGE_HISTORY"]
                },
                {
                  id: "788793985148649502",
                  deny: ["VIEW_CHANNEL"]
                }
              ]);
                } else
                  ch.overwritePermissions([
                    {
                      id: role.id,
                      allow: [
                        "VIEW_CHANNEL",
                        "MANAGE_CHANNELS",
                        "MANAGE_MESSAGES",
                        "MENTION_EVERYONE"
                      ]
                    },
                    {
                      id: roleHM.id,
                      allow: ["VIEW_CHANNEL"]
                    },
                    {
                      id: roleGuest.id,
                      allow: ["VIEW_CHANNEL"]
                    },
                    {
                      id: "788793985148649502",
                      deny: ["VIEW_CHANNEL"]
                    }
                  ]);
              });
            })
            .catch(console.error);
          channel.setTopic = args[2];

          return message.reply(
            `Member ${target} is now set as the owner of the ${channel.parent.name}!`
          );
        } else {
          return message.channel.send(
            "You don't have Administrator role to perform this command!"
          );
        }
      } else
        return message.channel.send(
          "Such name is already in use. Choose a different one!"
        );
    } else return message.channel.send("Set who?\nUsage: Mayor, set owner");
  }
};
