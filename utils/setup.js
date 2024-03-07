// setup.js
const fs = require("fs");

const setupBot = (client) => {
  client.on("ready", async () => {
    const guild = await client.guilds.fetch(yourGuildId); // Replace with your guild ID
    await guild.commands.create(command);
    console.log("Command registered successfully!");
  });
};

module.exports = { setupBot };
