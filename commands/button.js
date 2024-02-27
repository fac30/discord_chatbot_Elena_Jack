const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Replies with a button!'),

    async execute(interaction) {
        const success = new ButtonBuilder()
            .setCustomId('success')
            .setLabel('Success')
            .setStyle(ButtonStyle.Success);

        const button = new ButtonBuilder()
            .setCustomId('button')
            .setLabel('Button')
            .setStyle(ButtonStyle.Secondary);


        const deleting = new ButtonBuilder()
            .setCustomId('deleting')
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(success, button, deleting);

        await interaction.reply({
            content: `Selection of buttons.`,
            components: [row],
        });
    },
};
