//setupCommands.js


const registerCommands = async () => {
const commands = [
    {
      name: 'setup',
      description: 'setsup alfred'
    },
    {
      name: 'joke',
      description: 'alfred replies with a joke'
    },
    {
      name: 'arcade',
      description: 'alfred starts a game of your choice from the arcade for you'
    },
]
    try{
      await rest.put(Routes.applicationCommands(process.env.APP_ID), { body: commands });
    }
    catch(error){
      console.log(error);
    }

}

module.exports = { registerCommands };