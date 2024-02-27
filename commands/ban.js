// const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// module.exports = {
//     data: {
//         name: 'ban', // Name of the command
//         description: 'Bans a user.', // Description of the command (optional)
//         // Other properties such as options, permissions, etc., can be defined here
//     },
//     async execute(interaction) {
//         const target = interaction.options.getUser('target');
//         const reason = interaction.options.getString('reason') ?? 'No reason provided';

//         // Check if the target user is a valid GuildMember
//         const member = interaction.guild.members.cache.get(target.id);
//         if (!member) {
//             await interaction.reply({
//                 content: 'The specified user is not a member of this server.',
//                 ephemeral: true, // Make the reply visible only to the user who invoked the command
//             });
//             return;
//         }

//         try {
//             // Ban the user
//             await member.ban({ reason });

//             // Reply with a confirmation message
//             await interaction.reply({
//                 content: `${member.user.tag} has been banned from the server.`,
//                 ephemeral: true, // Make the reply visible only to the user who invoked the command
//                 components: [ // Adding buttons to the reply
//                     new ActionRowBuilder().addComponents(
//                         new ButtonBuilder()
//                             .setCustomId('confirm')
//                             .setLabel('Confirm Ban')
//                             .setStyle(ButtonStyle.DANGER),
//                         new ButtonBuilder()
//                             .setCustomId('cancel')
//                             .setLabel('Cancel')
//                             .setStyle(ButtonStyle.SECONDARY),
//                     ),
//                 ],
//             });
//         } catch (error) {
//             console.error('Error banning user:', error);
//             await interaction.reply({
//                 content: 'An error occurred while attempting to ban the user.',
//                 ephemeral: true, // Make the reply visible only to the user who invoked the command
//             });
//         }
//     },
// };
