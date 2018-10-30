const Discord = require('discord.js');
const config = require("./config.json");

const client = new Discord.Client();
client.prefix = config.prefix();

client.on("iniciado",() => {
  console.log("Bot iniciado!\n\nUsers: " + client.users.size + "\nServidores " + client.guilds.size);
  client.user.setActivity(`Shyne - Um servidor para se divertir com amigos, além de conhecer pessoas novas! Vários chats e canais de voz de diferentes jogos!`);
});

client.on("guildCreate", guild => {
  console.log(`O bot entrou nos servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
  client.user.setActivity(`Shyne - Um servidor para se divertir com amigos, além de conhecer pessoas novas! Vários chats e canais de voz de diferentes jogos!`);
});

client.on("guildDelete", guild => {
  console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Shyne - Um servidor para se divertir com amigos, além de conhecer pessoas novas! Vários chats e canais de voz de diferentes jogos!`);
});

 client.on("message", async message => {
   let msg = message.content.toLowerCase();
   if (message.author.bot) return undefined;

   if (message.content.indexOf(client.prefix) !== 0) return;
   const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
   const command = args.shift().toLowerCase();

   try {
      let commands = require(`./commands/${command}.js`);
      commands.run(client, message, args);
   } catch (e) {
     console.log(e);
   } finally {}

});

client.login(config.token);
const Discord = require('discord.js');
const config = require("./config.json");

const client = new Discord.Client();
client.prefix = config.prefix();

client.on("iniciado",() => {
  console.log("Bot iniciado!\n\nUsers: " + client.users.size + "\nServidores " + client.guilds.size);
  client.user.setActivity(`${client.users.size} users`, {type: "Watching"});
});

 client.on("message", async message => {
   let msg = message.content.toLowerCase();
   if (message.author.bot) return undefined;

   if (message.content.indexOf(client.prefix) !== 0) return;
   const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
   const command = args.shift().toLowerCase();

   try {
      let commands = require(`./commands/${command}.js`);
      commands.run(client, message, args);
   } catch (e) {
     console.log(e);
   } finally {}

});

client.login(config.token);