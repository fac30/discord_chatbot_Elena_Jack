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

        const middlebutton = new ButtonBuilder()
            .setCustomId('middlebutton')
            .setLabel('Middlebutton')
            .setStyle(ButtonStyle.Secondary);


        const deleting = new ButtonBuilder()
            .setCustomId('deleting')
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);

        const button = new ButtonBuilder()
            .setLabel('discord.js docs')
            .setURL('https://discord.js.org')
            .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder()
            .addComponents(success, middlebutton, deleting, button);

        await interaction.reply({
            content: `Selection of buttons.`,
            components: [row],
        });
    },
};
