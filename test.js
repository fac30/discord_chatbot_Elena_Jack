// libraries
const {Client, IntentsBitField, Collection} = require('discord.js');
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
);

// Initializes Discord bot with defined intents
const client = new Client({intents: botIntents});

//  Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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


// Log in to Discord using the token from .env
const jelena = {ready: false};
client.login(process.env.DISCORD_TOKEN)
    .then(() => {
      console.log('Bot is logged in!');
      jelena.ready = true;
    })
    .catch((error) => {
      console.error('Error logging in:', error);
    });

// message history handling

const history = [];

client.once('ready', async () => {
  try {
    if (jelena.ready) {
      const defaultServerChannel = await client.channel.fetch('1204751557166374975');
    }
    console.log('ready');
    // console.log(defaultServerChannel);
  } catch (error) {
    console.error('History initialisation error', error);
  }
});

async function historyUpdate() {
  try {

  } catch (error) {
    console.error('History update had an error', error);
  }
};

// this function handles the api request
async function apiFetch(message) {
  return await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {'role': 'system', 'content': 'you are a helpful assistant.'},
      {'role': 'user', 'content': message.content},
    ],
  });
}

// message event listner
client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content) return;
  console.log('message get');
  // Check if the message starts with the command prefix
  if (message.content.startsWith(commandPrefix)) {
    // Extract the command and arguments from the message content
    const [commandName, ...args] = message.content.slice(commandPrefix.length).trim().split(/ +/);

    // Check if the command exists in the client.commands collection
    if (client.commands.has(commandName)) {
      // Get the command object from the collection
      const command = client.commands.get(commandName);

      try {
        // Execute the command
        await command.execute(message, args);
      } catch (error) {
        console.error('Error executing command:', error);
        await message.channel.send('An error occurred while executing this command.');
      }
    } else {
      // Command not found
      await message.channel.send('Sorry, that command does not exist!');
    }
  } else {
    // Handle regular messages (processing with OpenAI)
    try {
      const response = await apiFetch(message);

      // this shows in console the json object of reply from the api
      console.log(response.choices[0]);


      // this makes the bot reply in discord
      await message.channel.send(response.choices[0].message.content);
    } catch (error) {
      console.error('There was an error while processing the OpenAI response:', error);
      await message.channel.send('There was an error in processing your message.');
    }
  }
});

