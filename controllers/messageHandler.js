const greetings = [
    'hello',
    'hi',
    'hey',
    'greetings',
    'howdy',
    'salutations',
    'yo',
    'hi there',
    'hello there',
    'hiya',
    'hey there',
    'hey ya',
    'sup',
    'hi friend',
    'hi folks',
    'hi everyone',
    'bonjour',
    'hola',
    'ciao',
    'namaste',
    'shalom',
    'aloha',
    'konnichiwa',
    'hallo'
  ];
  
  const greetedUsers = new Set();
  
  client.on('messageCreate', message => {
    if (message.author.bot) return;
    else {
      if (greetings.includes(message.content.toLowerCase())){
        if (!greetedUsers.has(message.author.id)) {
          greetedUsers.add(message.author.id);
    
          message.reply({
            content: `Nice to meet you, ${userMention(message.author.id)}! I am Alfred.`,
          });
    
          // console.log(message);
        } else {
          message.reply({
            content: `Hi again, ${userMention(message.author.id)}!`,
          });
        }
      }
      else{
        if (message.content.toLowerCase() === 'randi'){
          message.reply({
            content: `tu hoga randi saale`,
          });
        }
        else{
          message.reply({
            content: "Am still getting ready for operations... can't talk right now. Sorry!",
          })
        }
      }
    }
  });