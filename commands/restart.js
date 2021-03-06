module.exports = {
    name: 'restart',
    description: 'Restart the bot.',
    execute(message) {
        const member = message.member;
        if (member.roles.cache.some(role => role.name === 'Administrator')) {
            return process.exit();
        }
        else {
            return message.channel.send('You don\'t have Administrator role to perform this command!');
        }
    }
}