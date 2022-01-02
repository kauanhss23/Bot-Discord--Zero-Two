const Discord = require("discord.js"); //importando a bli
const config = require("../json/config.json"); //importando config

module.exports = {
    name : "ban",
    working : true,
    run : async (client, message, args) => {

        if(message.content.startsWith(config.prefix + "ban")){
            if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Sem permissão de `BAN_MEMBERS`!")
            let User = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
            if (!User) return message.channel.send("Usuário inválido")
            if (User.hasPermission("BAN_MEMBERS")) return message.reply("Sem permissão necessária!")
            User.ban()
        }
    }
}