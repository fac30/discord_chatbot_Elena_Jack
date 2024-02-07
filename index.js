// In this code:
// Step 1: We require the necessary libraries discord.js and openai using require().
// Step 2: We load environment variables from the .env file using dotenv.config().
// Step 3: We initialize the Discord bot with new Discord.Client(), and log in to Discord using the token from the .env file.
// Step 4: We set up a message event listener using client.on('messageCreate', callback) to handle incoming messages. If the message content is !hello, the bot responds with "Hello!".

// Step 1: Project Setup with Libraries
// Require necessary libraries
const Discord = require('discord.js');
const { ChatCompletionClient } = require('openai');
const dotenv = require('dotenv');

// Step 2: Secure Configuration
// Load environment variables from .env file
dotenv.config();

// Step 3: Bot Initialization
// Initialize Discord bot
const client = new Discord.Client();

// Log in to Discord using the token from .env
client.login(process.env.DISCORD_TOKEN)
    .then(() => {
        console.log('Bot is logged in!');
    })
    .catch((error) => {
        console.error('Error logging in:', error);
    });

// Step 4: Message Handling
// Set up message event listener
client.on('messageCreate', (message) => {
    // Ignore messages from other bots or non-text channels
    if (message.author.bot || !message.content || message.channel.type !== 'GUILD_TEXT') return;

    // Process incoming messages and respond with a "hello" message
    if (message.content === '!hello') {
        message.channel.send('Hello!');
    }
});
