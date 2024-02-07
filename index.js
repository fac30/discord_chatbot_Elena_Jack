// In this code:
// Step 1: We require the necessary libraries discord.js and openai using require().
// Step 2: We load environment variables from the .env file using dotenv.config().
// Step 3: We initialize the Discord bot with new Discord.Client(), and log in to Discord using the token from the .env file.
// Step 4: We set up a message event listener using client.on('messageCreate', callback) to handle incoming messages. If the message content is !hello, the bot responds with "Hello!".

// Step 1: Project Setup with Libraries
// Require necessary libraries
const {Client, IntentsBitField} = require('discord.js');
const {ChatCompletionClient} = require('openai');
const dotenv = require('dotenv');

// Step 2: Secure Configuration
// Load environment variables from .env file
dotenv.config();

// intents - these enable the bot to recieve specific events, as such are required to allow the bot to perform certain actions
const botIntents = new IntentsBitField();
botIntents.add(
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageTyping,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.MessageContent,
);

// Initialize Discord bot
const client = new Client({intents: botIntents});

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
  console.log('message get');
  console.log(message.content);
  console.log(message.content == 'hello');
  // Ignore messages from other bots or non-text channels

  // if (message.author.bot || !message.content || message.channel.type !== 'GUILD_TEXT') return;
  // this line is stopping the ability to reply, unsure why I cannot find the documentation for this so please fix

  // Process incoming messages and respond with a "hello" message
  if (message.content == 'hello') {
    console.log('reply sent');
    return message.channel.send('Hello!');
  }
});
