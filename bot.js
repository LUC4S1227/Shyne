
const Discord = require("discord.js"); //baixar a lib
const client = new Discord.Client(); 
const config = require("./config.json"); 


client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`); 
  client.user.setActivity(`Shyne - Estamos com ${client.users.size} no servidor! Que bom! `);
// caso queira o bot trasmitindo use:
/*
   client.user.setPresence({ game: { name: 'comando', type: 1, url: 'https://www.twitch.tv/ladonegro'} });
    //0 = Jogando
    //  1 = Transmitindo
    //  2 = Ouvindo
    //  3 = Assistindo
      */
});

client.on("guildCreate", guild => {
  console.log(`O bot entrou nos servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
  client.user.setActivity(`Shyne - Um servidor para se divertir com amigos, além de conhecer pessoas novas! Vários chats e canais de voz de diferentes jogos!`);
});

client.on("guildDelete", guild => {
  console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
});


client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();

  // comando equipe
  if(comando === "equipe") {
   return message.reply("```CEO : 2  |  Cooder : 2  | Administrador : 1  | Moderador : 1  | Ajudante : 3 |```")
  }
  // comando info
  if(comando === "info") {
    const m = await message.channel.send("Info?");
    m.edit(`**Shyne - Estamos com: ${client.users.size} membros no servidor! Uau!**`)
  }
  // comando dev
  if(comando === "dev") {
    return message.reply("Meu desenvolvedor é: yLucasz")
  }
  // comando ajuda
  if(comando === "ajuda") {
    return message.reply("```$dev, $ping, $info```")
  }
  // coamdno ping
  if(comando === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`:ping_pong: Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latencia da API é ${Math.round(client.ping)}ms`);
  }
//comando apagar
  if(comando === "apagar") {
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Por favor, fale um numero entre 2 e 100 para as mensagens serem apagadas.");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));
  }
  // comando chutar 
  if(comando === "kick") {
//adicione o nome dos cargos que vc quer que use esse comando!
    if(!message.member.roles.some(r=>["Nome do cargo 1", "Nome de outro cargo 2"].includes(r.name)) )
    if(!message.member.roles.some(r=>["CEO", "Cooder"].includes(r.name)) )
    if(!message.member.roles.some(r=>["Administrador", "Ajudante"].includes(r.name)) )
      return message.reply("Desculpe, você não tem permissão para usar isto!");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Por favor mencione um membro **Válido** deste servidor");
    if(!member.kickable) 
      return message.reply("Eu não posso expulsar este usuário! Ele pode ter um cargo mais alto");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Nenhum motivo";
    
    await member.kick(reason)
      .catch(error => message.reply(`Desculpe ${message.author} não consegui expulsar o membro devido o: ${error}`));
    message.reply(`${member.user.tag} foi kickado por ${message.author.tag} Motivo: ${reason}`);

  }
  // comando ban
  if(comando === "ban") {
    //adicione o nome do cargo que vc quer que use esse comando!
    if(!message.member.roles.some(r=>["Nome do cargo"].includes(r.name)) )
    if(!message.member.roles.some(r=>["CEO"].includes(r.name)) )
    if(!message.member.roles.some(r=>["Cooder"].includes(r.name)) )
    if(!message.member.roles.some(r=>["Administrador"].includes(r.name)) )
      return message.reply("Desculpe, você não tem permissão para usar isto!");
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Por favor mencione um membro **Válido** deste servidor");
    if(!member.bannable) 
      return message.reply("Eu não posso banir este usuário! Ele pode ter um cargo mais alto.");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Nenhuma motivo";
    await member.ban(reason)
      .catch(error => message.reply(`Desculpe ${message.author} não consegui banir o membro devido o : ${error}`));
    message.reply(`${member.user.tag} foi banido por ${message.author.tag} Motivo: ${reason}`);
  }
  
});

client.login(config.token);
