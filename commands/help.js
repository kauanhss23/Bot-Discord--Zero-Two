const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const config = require("../json/config.json"); //config prefix

module.exports = {
    name : "help",
    working : true,
    run : async(client, message, args) =>{
        if(message.content.startsWith(config.prefix + "help")){
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

    }

}