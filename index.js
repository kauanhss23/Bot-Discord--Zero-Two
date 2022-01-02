const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./json/config.json"); //Pegando o prefixo do bot para respostas de comandos
const { token } = require("./json/config.json"); //pegando token no json

//pasta comandos
client.on('message', message => {
  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;
  if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
  if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

 const args = message.content
     .trim().slice(config.prefix.length)
     .split(/ +/g);
 const command = args.shift().toLowerCase();

 try {
     const commandFile = require(`./commands/${command}.js`)
     commandFile.run(client, message, args);
 } catch (err) {
 console.error('Erro:' + err);
}
});

//status
client.on("ready", () => {
  let atividades = [
      `--help`,
      `com o Katsuo-kun❤`,
      `com o Katsuo-chan❤`,
      `meu prefixo é --`
],
i = 0;
setInterval(() => client.user.setActivity(`${atividades[i++ %
atividades.length]}`, {
  type: "PLAYING"
}), 15000); //WATHCING, LISTENING, PLAYING, STREAMING
client.user
   .setStatus("online") //idle, dnd, online, invisible
   .catch(console.log);  
console.log("Estou online Katsuo")    
});

//menssagens pré definidas
client.on('message', message => {
    let responseObject = {

    "--criador" : "https://github.com/kauanhss23"
    };
    
    if(responseObject [message.content]){
    message.channel.send(responseObject[message.content]);
    };
});

//autorole
client.on('guildMemberAdd', member => {
    console.log('User @' + member.user.tag + 'entrou no servidor!');
    var role = member.guild.roles.cache.find(role => role.name == config.guild.role1, config.guild.role2)
    member.roles.add(role);
});

client.login(token);//token