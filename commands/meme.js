const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Get a random meme'),
    async execute(interaction) {
        try {
            const img = await getMeme(); // Fetch meme URL
            if (img) {
                await interaction.reply({ content: img, ephemeral: true }); // Send meme URL to Discord
            } else {
                await interaction.reply({ content: 'Failed to fetch meme. Please try again later.', ephemeral: true });
            }
        } catch (error) {
            console.error('Error fetching meme:', error);
            await interaction.reply({ content: 'Failed to fetch meme. Please try again later.', ephemeral: true }); // Notify if there's an error
        }
    },
};

async function getMeme() {
    try {
        const res = await axios.get('https://meme-api.com/gimme');
        if (res.data && res.data.url) {
            return res.data.url;
        } else {
            console.error('Invalid response from meme API:', res.data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching meme:', error);
        throw new Error('Failed to fetch meme.');
    }
}
