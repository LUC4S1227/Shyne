exports.run = (client, message, args) => {
  const m = await message.channel.send("Calculando...");
  m.edit(`Pong! :ping_pong: \nLatencia é**${m.createdTimestamp - message.createdTimestamp}ms** \nLatencia API é **${client.ping}ms**`);
}