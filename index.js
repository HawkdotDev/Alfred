const {
  Client,
  GatewayIntentBits,
  Message,
  userMention,
  REST,
  Routes,
} = require("discord.js");
const jokeAPI = require("sv443-joke-api");

require("dotenv").config();

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.login(process.env.TOKEN);

const commands = [
  {
    name: "setup",
    description: "setsup alfred",
  },
  {
    name: "joke",
    description: "alfred replies with a joke",
  },
  {
    name: "arcade",
    description: "alfred starts a game of your choice from the arcade for you",
  },
];

client.on("interactionCreate", async (interaction) => {
  if (interaction.commandName === "joke") {
    try {
      const res = await jokeAPI.getJokes({
        categories: "Dark",
      });
      const data = await res.json();

      if (data.type === "single") {
        await interaction.reply(`${data.joke}`);
      } else if (data.type === "twopart") {
        await interaction.reply(`${data.setup} \n${data.delivery}`);
      }
    } catch (error) {
      console.log(error);
    }
  } else if (interaction.commandName === "arcade") {
    try {
      interaction.reply(
        `arcade is under construction`
      );
    } catch (error) {
      console.log(error);
    }
  } else if (interaction.commandName === "setup") {
    try {
      interaction.reply(
        `setup is under construction`
      );
    } catch (error) {
      console.log(error);
    }
  }
});

(async () => {
  try {
    await rest.put(Routes.applicationCommands("756409632095993907"), {
      body: commands,
    });
  } catch (error) {
    console.log(error);
  }
})();
