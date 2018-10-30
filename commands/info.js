const Discord = require(`discord.js`)

exports.run = (client, message, args) => {

  let embed = new Discord.RichEmbed()
   .setColor([81, 250, 254])
   .setAuthor("Informações do Bot", client.user.avatarURL)
   .setDescription("Convite - Shyne [aqui](https://discord.gg/Cv7ZqUW)")
   .addField("Membros", ":fire:", + client.users.size, true)
   .addField("Canais", ":fire:", + client.channels.size, true)
   .addField("Versão do Bot", "2.0", true)
   .addField(":Criador", "yLucasz#7768", true)
   .setFooter("Footer", client.user.avatarURL)
   .setTimestamp("");
  message.channel.send(embed);

}