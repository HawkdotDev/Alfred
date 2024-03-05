const {
    Client,
    GatewayIntentBits,
    Message,
    userMention,
    REST,
    Routes,
  } = require("discord.js");
  const fs = require("fs");
  const JokeAPI = require("sv443-joke-api");
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
    // const serverId = interaction.guild.id;
    // const jsonFileName = `userDetails_${serverId}.json`;
  
    if (interaction.commandName === "joke") {
      try {
        const res = await JokeAPI.getJokes({
          categories: "Dark",
        });
        const data = await res.json();
  
        if (data.type === "single") {
          await interaction.reply(`${data.joke}`);
        } else if (data.type === "twopart") {
          await interaction.reply(`${data.setup} \n${data.delivery}`);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    else{
      interaction.reply(`${interaction.guild}, ${interaction.guildId}, ${interaction.channel}, i${nteraction.channelId}`)
    }
  
    // try {
    //   if (fs.existsSync(`./data/${jsonFileName}`)) {
    //     try {
    //       const data = fs.readFileSync(`./data/${jsonFileName}`, "utf-8");
    //       const serverDetails = JSON.parse(data);
  
    //       if (interaction.commandName === "joke") {
    //         try {
    //           const res = await JokeAPI.getJokes({
    //             categories: "Dark",
    //           });
    //           const data = await res.json();
  
    //           console.log(data);
  
    //           if (data.type === "single") {
    //             await interaction.reply(`${data.joke}`);
    //           } else if (data.type === "twopart") {
    //             await interaction.reply(`${data.setup} \n${data.delivery}`);
    //           }
    //         } catch (error) {
    //           console.log(error.message);
    //         }
    //       }
    //       if (interaction.commandName === "arcade") {
    //         if (interaction.channelId === currentChannel) {
    //           try {
    //             interaction.reply(`arcade is under construction`);
    //           } catch (error) {
    //             console.log(error.message);
    //           }
    //         } else {
    //           if (interaction.channelId === null || undefined) {
    //             interaction.reply("channel not set");
    //           } else {
    //             console.log(typeof currentChannel);
    //             interaction.reply("not the workspace channel");
    //           }
    //         }
    //       }
  
    //       if (interaction.commandName === "setup") {
    //         if (!interaction.member.permissions.has("ADMINISTRATOR")) {
    //           return interaction.reply({
    //             content: "You need administrator rights to run this command",
    //             ephemeral: true,
    //           });
    //         } 
    //         else {
    //           if (currentChannel === undefined || null) {
    //             try {
    //               currentChannel = interaction.channelId;
    //               interaction.reply(`alfred is placed on the current channel`);
    //             } catch (error) {
    //               console.log(error.message);
    //             }
    //           } else if (
    //             currentChannel !== undefined &&
    //             currentChannel !== null
    //           ) {
    //             try {
    //               interaction.reply({
    //                 content: `Alfred is already placed in a channel.`,
    //               });
    //             } catch (error) {
    //               console.log(error.message);
    //             }
    //           }
    //         }
    //       }
    //     } catch (error) {
    //       interaction.reply({
    //         content: `${error.message} \n/setup to setup Alfred`,
    //         ephemeral: true,
    //       });
    //       // fs.writeFileSync(jsonFileName, JSON.stringify(userDetails, null, 2));
    //     }
    //   } else {
    //     if (interaction.commandName === "setup") {
    //       if (!interaction.member.permissions.has("ADMINISTRATOR")) {
    //         return interaction.reply({
    //           content: "You need administrator rights to run this command",
    //           ephemeral: true,
    //         });
    //       } else {
    //         // serverDetails[interaction.guildId] = {
    //         //   allowedChannelId: interaction.channelId,
    //         // };
    //         // console.log(interaction.guild, interaction.guildId, interaction.channel, interaction.channelId)
  
    //         // fs.writeFileSync(jsonFileName, JSON.stringify(userDetails, null, 2));
    //         // if(currentChannel === undefined || null){
    //         //   try {
    //         //     currentChannel = interaction.channelId;
    //         //     interaction.reply(`alfred is placed on the current channel`);
    //         //   }catch(error) {
    //         //     console.log(error.message)
    //         //   }
    //         // }
    //         // else if (currentChannel !== undefined && currentChannel !== null) {
    //         //   try {
    //         //     interaction.reply({
    //         //       content: `Alfred is already placed in a channel.`,
    //         //     });
    //         //   } catch (error) {
    //         //     console.log(error.message);
    //         //   }
    //         // }
    //         console.log("auura");
    //       }
    //     } else {
    //       interaction.reply({
    //         content: `use /setup to setup Alfred`,
    //         ephemeral: true,
    //       });
    //     }
    //   }
    // } catch (error) {
    //   console.log(error, "json missing");
    //   interaction.reply({
    //     content: `${error.message} \n/setup to setup Alfred`,
    //     ephemeral: true,
    //   });
    // }
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
  