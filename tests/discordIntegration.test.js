// This script tests the integration of Discord.js functionality in our project.
// It creates a new Discord client with predefined intents and checks if the client is successfully created.
// If the test passes, it logs a success message; otherwise, it logs an error message with details of the failure.

// Import necessary modules
const { Client, IntentsBitField } = require('discord.js');

// Custom assertion function to compare actual and expected values
function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(`${message}: Expected ${expected}, but got ${actual}`);
    }
}

// Test function to create a new Discord client
function testDiscordIntegration() {
    try {
        console.log('Initializing Discord client...');

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

        // Act: Try to create a new Discord client
        console.log('Creating Discord client...');
        const client = new Client({ intents: botIntents });

        // Assert: Check if client is an instance of Client
        console.log('Asserting Discord client creation...');
        assertEqual(typeof client, 'object', 'Client type');
        assertEqual(client instanceof Client, true, 'Client instance');

        console.log('Discord.js integration test passed successfully.');
    } catch (error) {
        console.error('Discord.js integration test failed:', error.message);
    }
}

// Call the test function
testDiscordIntegration();
