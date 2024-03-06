// This test file verifies that our bot successfully initializes and logs into Discord.
// It checks if the bot client is created and if it logs into Discord without any issues.
// If the initialization and login processes are successful, it displays a success message; otherwise, it logs an error message with details of the failure.

// Import necessary modules
const assert = require('assert');
const { Client, IntentsBitField } = require('discord.js');
require('dotenv').config();

// Arrange: Define bot intents
console.log('Defining bot intents...');
const botIntents = new IntentsBitField();
botIntents.add(
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageTyping,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.DirectMessageReactions,
    IntentsBitField.Flags.DirectMessageTyping,
);

// Test function to check bot initialization and login
function testBotInitialization() {
    try {
        if (!process.env.DISCORD_TOKEN) {
            throw new Error('DISCORD_TOKEN environment variable is not defined.');
        }

        // Create a new Discord client with intents
        const client = new Client({ intents: botIntents });

        // Add event listener for the 'ready' event
        client.once('ready', () => {
            // Assert that the client is logged in
            assert.ok(client.user, 'Bot is not logged in.');
            console.info('Pass: Bot is successfully logged in.');
        });

        // Log in the bot using the token
        client.login(process.env.DISCORD_TOKEN);

        // Add an event listener for the 'error' event
        client.on('error', (error) => {
            console.error(`Fail: Bot login failed with error: ${error.message}`);
        });
    } catch (error) {
        console.error(`Fail: ${error.message}`);
    }
}

// Call the test function
testBotInitialization();
