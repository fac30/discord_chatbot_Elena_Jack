// libraries
const {Client, IntentsBitField} = require('discord.js');
const {OpenAI} = require('openai');
const dotenv = require('dotenv');

// This enables acces to api keys for both open AI and the Discord bot
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

// Initializes Discord bot
const client = new Client({intents: botIntents});

// Open AI confuguraion
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Log in to Discord using the token from .env
client.login(process.env.DISCORD_TOKEN)
    .then(() => {
      console.log('Bot is logged in!');
    })
    .catch((error) => {
      console.error('Error logging in:', error);
    });


// async function apiFetch(input) {
//     return
// }


// message event listner

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content) return;
  console.log('message get');


  //   this sends the api request
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {'role': 'system', 'content': 'you are a helpful assistant.'},
        {'role': 'user', 'content': message.content},
      ],
    });
  } catch (error) {
    console.error('There was an error while processing the OpenAI response:', error);
    await message.channel.send('There was an error in processing your message.');
  }

  console.log(response.choices[0]);
});

