# DISCORD **AI CHATBOT** 🤖 - by Jack and Elena

## Overview
This project aims to create a Discord bot using Node.js that integrates with the Discord API and OpenAI for dynamic responses.

## Checklist

- **Project Setup with Libraries**
  - [x] Create a new Node.js project.
  - [x] Install `discord.js` and `openai` libraries using npm.
  - [x] Set up `discord.js` and `openai` by requiring them in your project.
  
- **Secure Configuration**
  - [x] Create a `.env` file to store API keys.
  - [x] Use `require('dotenv/config')` to load API keys from the `.env` file.
  - [x] Add `.env` to `.gitignore` to ensure sensitive information is not committed to the repository.

- **Bot Initialization**
  - [x] Initialize the Discord bot with `new Discord.Client()`.
  - [x] Log in to Discord using `client.login` with your Discord token.

- **Message Handling**
  - [x] Set up a message event listener with `client.on('messageCreate', callback)`.
  - [x] Process incoming messages and respond with a "hello" message.

- **Optimization**
  - [x] Implement efficient event handling.

- **OpenAI Chat Integration and Response Generation**
  - [x] Integrate OpenAI into the bot.
  - [x] Use `openai.chat.completions.create()` with your API key to generate responses.
  - [x] Pass conversation history and other necessary parameters to receive context-aware chat completions.

- **Response Management**
  - [x] Manage OpenAI responses returned by `openai.chat.completions.create()`.
  - [x] Send the response back to the Discord channel.

- **Command Processing**
  - [x] Process commands directed at the bot using string matching or a command prefix.
  - [x] Distinguish between general messages and commands meant for the bot.

- **Error Handling**
  - [x] Implement error handling using `.catch` or `try...catch` within `fetch` or `async` functions.
  - [x] Manage exceptions and provide error messages if something goes wrong.

## Stretch Goals

- **Messaging Users Directly**
  - [x] Utilize the `user.send()` method in Discord.js to send direct messages to users.

- **Dialogue Boxes and Interactive Responses**
  - [ ] Implement Discord's message components like buttons and select menus using `MessageActionRow` and `MessageButton` or `MessageSelectMenu` classes from Discord.js.
  - [ ] Handle interactions with `client.on(Events.InteractionCreate, callback)`.

- **Creating Private Chats (Channels)**
  - [ ] Use `guild.channels.create()` to create new private channels and manage access using permission overwrites in Discord.js.

- **Automated Moderation Features**
  - [ ] Monitor messages for specific keywords or patterns using `client.on(Events.MessageCreate, callback)`.
  - [ ] Implement moderation actions like `message.delete()` for removing inappropriate content and `guildMember.timeout()` for muting users.

- **Multimedia Responses (Images, GIFs, Audio Clips)**
  - [x] Send multimedia content using `message.channel.send()` with the `files` option.
  - [ ] Explore Discord.js voice modules for handling voice channels and streaming.

---

## Testing Checklist

### Discord.js Integration Verification
- [x] Verify Discord.js integration by creating a test function that creates a new Discord client.

### OpenAI Library Integration
- [x] Ensure that the OpenAI library is correctly integrated by creating a test function that attempts to use the OpenAI API to create a simple chat completion or query.

### API Key Security
- [ ] Test that the bot securely loads API keys from the `.env` file, confirming that no sensitive information is hard-coded.

### Bot Initialization and Login
- [ ] Ensure that the bot initializes and logs into Discord successfully.

### Message Event Handling
- [ ] Simulate receiving a message and verify that the bot responds with a "hello" message, testing the message event listener's functionality.

### Command Processing
- [ ] Simulate commands directed at the bot to check if it accurately processes these commands from general messages.

### Error Handling
- [ ] Introduce faults or exceptions in bot interactions to verify that the bot's error handling mechanisms effectively manage and log errors.

### Response Formatting and Dispatching
- [ ] Mock the process of sending responses back to the Discord channel, verifying that the bot formats and dispatches messages correctly.

### Direct Messaging
- [ ] Ensure the bot can send direct messages to users, testing the `user.send()` method's functionality.

### Multimedia Response Handling
- [ ] Test the bot's ability to send multimedia responses under specified conditions, ensuring it can handle images, GIFs, and audio clips effectively.



---


# Extra Notes

## View a branch when reviewing a pull request
- to view a remote branch from someone else you must
    - git fetch -p
        - this will get the meta data for new repos and *prune* the old deleted remote repos
    - check to that branch
        - you should checking the github repo and seeing what pull requests there are in relation to what branch you want to be checking
        - if you need help finding the branch use:  git branch -a
        - **** if the list of branches are getting to long and hard to find the right one use: git fetch -p, then try again with git branch -a
    - If you approve of the pull request changes, accept the pull request on github to merge to main
        - remember to delete the branch on github
## Post pull request
- after accepting pull request you must
    - update your main on local
        - check to main
        - pull
    - merge main to your local working branch (local meaning your vscode)
        - check to your working branch
        - merge main
    - **there will be a merge conflict**, resolve the merge conflict in vscode with the conflict editor (there is a button)
        - if we want everything, accept both, otherwise use judgement of what which one needs to be implemented
    - you may need to git commit after merge to conclude it
    - after merge, remember to push your local working branch to github
        - git push
This will allow to work on your current feature but ensure it's uptodate with main
## When you have done some code you want to add to main
- make sure you have added, committed and pushed everything in vscode
- on github make a pull request for your branch
