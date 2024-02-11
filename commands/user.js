const { SlashCommandBuilder } = require('discord.js');

// Export an object representing the 'user' command module
module.exports = {
    // Define command data using SlashCommandBuilder
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user.'),

    // Execute function to handle command execution
    async execute(interaction) {
        // Access the user object who ran the command and reply with their username
        // 'interaction.username' contains information about the user who triggered the command
        // 'interaction.member' contains information about the user's membership in the guild
        // 'interaction.member.joinedAt' returns the date the user joined the guild
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
    },
};
