// const { Client } = require('discord.js');
// const { OpenAI } = require('openai');
// const dotenv = require('dotenv');

// dotenv.config();

// // Import your bot's main file
// const { handleCommand, handleRegularMessage, loginBot } = require('./index');

// // Initialize a Discord client for testing
// const client = new Client();

// // Test Discord.js integration by creating a new Discord client
// const testDiscordIntegration = () => {
//     console.log('Testing Discord.js integration...');
//     if (client instanceof Client) {
//         console.log('Discord.js integration test passed.');
//     } else {
//         console.error('Discord.js integration test failed.');
//     }
// };

// // Test OpenAI library integration
// const testOpenAIIntegration = () => {
//     console.log('Testing OpenAI library integration...');
//     const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//     if (openai instanceof OpenAI) {
//         console.log('OpenAI library integration test passed.');
//     } else {
//         console.error('OpenAI library integration test failed.');
//     }
// };

// // Test loading API keys securely from .env file
// const testAPILoading = () => {
//     console.log('Testing loading API keys from .env file...');
//     if (process.env.DISCORD_TOKEN && process.env.OPENAI_API_KEY) {
//         console.log('API key loading test passed.');
//     } else {
//         console.error('API key loading test failed.');
//     }
// };

// // Test bot login to Discord
// const testBotLogin = async () => {
//     console.log('Testing bot login to Discord...');
//     try {
//         await loginBot();
//         console.log('Bot login test passed.');
//     } catch (error) {
//         console.error('Bot login test failed:', error);
//     }
// };

// // Test handling of bot commands
// const testBotCommands = async () => {
//     console.log('Testing handling of bot commands...');
//     const message = {
//         content: '!testcommand arg1 arg2',
//         author: {
//             bot: false,
//         },
//         channel: {
//             send: () => { },
//         },
//     };
//     // Mock command for testing purposes
//     const mockCommand = {
//         execute: () => { },
//     };
//     client.commands = new Map();
//     client.commands.set('testcommand', mockCommand);
//     await handleCommand(message, 'testcommand', ['arg1', 'arg2']);
//     console.log('Bot command handling test passed.');
// };

// // Test handling of regular messages with OpenAI
// const testRegularMessageHandling = async () => {
//     console.log('Testing handling of regular messages with OpenAI...');
//     const message = {
//         content: 'This is a test message',
//         channel: {
//             send: () => { },
//         },
//     };
//     await handleRegularMessage(message);
//     console.log('Regular message handling test passed.');
// };

// // Run all tests
// const runTests = async () => {
//     testDiscordIntegration();
//     testOpenAIIntegration();
//     testAPILoading();
//     await testBotLogin();
//     await testBotCommands();
//     await testRegularMessageHandling();
// };

// // Run tests
// runTests();
