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

  // Ignore messages from other bots or non-text channels
  if (message.author.bot || !message.content) return;


  // Process incoming messages and respond with a "hello" message
  if (message.content == 'hello') {
    message.channel.send('Hello!');
  }
});


// Step 5: Optimisation
// Async function to fetch a response from the OpenAI API.
async function getOpenAIResponse(prompt) {
  try {
    // Retrieve the API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;
    // Define the URL for the OpenAI API
    const apiUrl = 'http.. api api api';

    // Define the request body with the prompt and other parameters
    const requestBody = {
      prompt: prompt,
      max_tokens: 150, // Limit the maximum number of tokens in the response
      temperature: 0.7, // Control randomness of the response
    };

    // Send a POST request to the OpenAI API
    const response = await fetch(apiUrl, {
      method: 'POST', // Use the POST method to send data to the server
      headers: {
        'Content-Type': 'application/json', // Specify that the request body is in JSON format
        'Authorization': `Bearer ${apiKey}`, // Include the API key for authentication
      },
      body: JSON.stringify(requestBody), // Convert the request body to JSON format
    });

    // Extract the response data in JSON format
    const responseData = await response.json();
    // Return the generated text from the OpenAI response
    return responseData.choices[0].text;
  } catch (error) {
    // Handle any errors occurring during the fetch operation
    console.error('An error occurred while fetching OpenAI response:', error);
    // Throw an error for the failure
    throw new Error('Failed to fetch OpenAI response');
  }
}

// Step 6: OpenAI Chat Integration and Response Generation
// Function to send a chat prompt to OpenAI and retrieve the response
async function chatWithOpenAI(message) {
  try {
    // Retrieve the response from OpenAI based on the content of the message
    const response = await getOpenAIResponse(message.content);

    // Send the response from OpenAI to the Discord channel
    await message.channel.send(response);
  } catch (error) {
    // Log any errors occuring during the processing of the OpenAI response
    console.error('There was an error while processing the OpenAI response:', error);

    // Send an error message to the Discord channel
    await message.channel.send('There was an error in processing your message.');
  }
}
