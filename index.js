// libraries
const {Client, IntentsBitField, Collection, Events, Partials} = require('discord.js');
const {OpenAI} = require('openai');
const dotenv = require('dotenv');
const fs = require('fs');

// This enables access to api keys for both open AI and the Discord bot
dotenv.config();

// intents - these enable the bot to recieve specific events, as such are required to allow the bot to perform certain actions
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

// Initializes Discord bot with defined intents
const client = new Client({intents: botIntents, partials: [Partials.Message, Partials.Channel, Partials.Reaction]});

//  Initialize OpenAI with API key
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

// POINT 8. COMMAND PROCESSING
// Define the command prefix
const commandPrefix = '!';

// Create a collection to store commands
client.commands = new Collection();

// Read command files from the commands folder
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

// Load each command file and add it to the client.commands collection
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// Function to handle bot login
function loginBot() {
  return new Promise((resolve, reject) => {
    // Log in to Discord using the token from .env
    client.login(process.env.DISCORD_TOKEN)
        .then(() => {
          console.log('Bot is logged in!');
          resolve();
        })
        .catch((error) => {
          console.error('Error logging in:', error);
          reject(error); // Reject the promise with the error if login fails
        });
  });
}

// Login to Discord and start the bot
loginBot();

// message history handling

const history = [];

function logMessage(message) {
  if (message.author.bot && message.author.id !== client.user.id) return;

  if (message.author.id === client.user.id) {
    return history.unshift({
      role: 'system',
      content: message.content,
    });
  } else {
    history.unshift({
      role: 'user',
      content: message.content,
    });
  }
}

client.once(Events.ClientReady, async (client) => {
  try {
    const defaultServerChannel = await client.channels.fetch('1204751557166374975');
    const historyJson = await defaultServerChannel.messages.fetch({limit: 10});
    await historyJson.forEach((message) => logMessage(message));
    history.unshift({'role': 'system', 'content': 'you are a helpful assistant.'});
    console.log(history);
    console.log(`${client.user.tag} history ready`);
  } catch (error) {
    console.error('History initialisation error', error);
  }
});

// Function to handle command execution
async function handleCommand(message, commandName, args) {
  if (client.commands.has(commandName)) {
    const command = client.commands.get(commandName);
    try {
      await command.execute(message, args);
    } catch (error) {
      console.error('Error executing command:', error);
      await message.channel.send('An error occurred while executing this command.');
    }
  } else {
    await message.channel.send('Sorry, that command does not exist!');
  }
}

// Function to handle regular message processing with OpenAI
async function handleRegularMessage(message) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: history,
    });
    console.log(response.choices[0]);
    await message.channel.send(response.choices[0].message.content);
  } catch (error) {
    console.error('There was an error while processing the OpenAI response:', error);
    await message.channel.send('There was an error in processing your message.');
  }
}

// Function to handle multimedia responses
const handleMultimedia = async (message) => {
  try {
    if (message.content.includes('cat')) {
      await message.channel.send({
        files: ['./multimedia-files/cat.jpg'],
      });
    } else if (message.content.includes('gif')) {
      await message.channel.send('https://giphy.com/gifs/justin-mood-monday-mondays-1hqYk0leUMddBBkAM7');
    } else if (message.content.includes('audio')) {
      await message.channel.send({
        files: ['./multimedia-files/magicFluteMozart.mp3'],
      });
    } else {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error handling multimedia:', error);
    await message.channel.send('An error occurred while processing multimedia content.');
  }
};

// Event listener for incoming messages
client.on('messageCreate', async (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  console.log('Message received:', message.content);

  // Check if the message starts with the command prefix
  if (message.content.startsWith(commandPrefix)) {
    const [commandName, ...args] = message.content.slice(commandPrefix.length).trim().split(/ +/);
    await handleCommand(message, commandName, args);
  } else if (message.content.startsWith('!directmessage')) { // Add this condition
    // Extract the user ID from the message content
    const userId = message.content.split(' ')[1];

    // Retrieve the user object using the user ID
    const user = await client.users.fetch(userId).catch(() => null);

    // Check if the user object exists
    if (user) {
      try {
        // Send a direct message to the user
        await user.send('Hello! This is a direct message from the bot.');
        await message.channel.send('Direct message sent!');
      } catch (error) {
        console.error('Error sending direct message:', error);
        await message.channel.send('Failed to send direct message.');
      }
    } else {
      await message.channel.send('User not found.');
    }
  } else {
    await handleMultimedia(message);
    await handleRegularMessage(message);
  }
});
