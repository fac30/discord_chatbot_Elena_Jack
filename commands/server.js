const {SlashCommandBuilder} = require('discord.js');

module.exports = {
  // Define command data using SlashCommandBuilder
  data: new SlashCommandBuilder()
      .setName('server')
      .setDescription('Get information about the server'),

  // Execute function to handle command execution
  async execute(interaction) {
    // Access the guild (server) information from the interaction object
    const guild = interaction.guild;

    // Reply with information about the server, including its name and total member count
    // 'guild.name' returns the name of the server
    // 'guild.memberCount' returns the total number of members in the server
    await interaction.reply(`Server Name: ${guild.name}\nTotal Members: ${guild.memberCount}`);
  },
};
