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
console.log("Estou online Katsuo <3")    
});

//comando help
client.on('message', message => {
    let prefix = "--";
    if(message.content.startsWith(prefix + "help")){
        const embed = new Discord.MessageEmbed()
        .setColor('#7c2ae8')
        .setTitle('Comandos da Zero Two')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setDescription(`Em que posso ajudar **${message.author.tag}**?`)
        .addFields(
          { name: ':arrow_right: --ping', value: 'Comando para saber o ping do bot' },
          { name: ':arrow_right: --uptime', value: 'Comando para saber a quanto tempo o bot está online' },
          { name: ':arrow_right: --criador', value: 'Informações sobre o criador' },
          { name: ':arrow_right: --clear [Qtd de menssagens à ser apagadas]', value: 'Comando apagar mensagens' },
        )
        .setImage("https://media.giphy.com/media/vg1tbA9Q4aJbX66riI/giphy.gif")
        .setFooter('Zero Two', 'https://i.imgur.com/MnAqBjF.jpg')
        message.channel.send(embed)
    }
})

//Boas Vindas
client.on("guildMemberAdd", async (member) => { 

  let guild = await client.guilds.cache.get("744753822269964300");
  let channel = await client.channels.cache.get("744756656038215711");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === 'blush_eoto_002');
  if (guild != member.guild) {
    return console.log("Até um outro dia!");
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`${emoji} Boas-vindas!`)
      .setImage("https://media.giphy.com/media/YJKRUy32M3IUhXImrz/giphy.gif")
      .setDescription(`**${member.user}**, bem-vindo(a) ao servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, espero que se divirta! :heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setTimestamp();

    channel.send(embed);
  }
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
    console.log('User @' + member.user.tag + ' has joined the server!');
    var role = member.guild.roles.cache.find(role => role.name == "───── Users ─────", "Verified")
    member.roles.add(role);
});

//ban 
client.on('message', message =>{
  if(message.content.startsWith("--ban")){
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Sem permissão necessária!")
    let User = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if (!User) return message.channel.send("Usuário inválido")
    if (User.hasPermission("BAN_MEMBERS")) return message.reply("Sem permissão necessária!")
    User.ban()
} 
});

client.login("");//token