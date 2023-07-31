const client = require("../index");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");


client.on("messageCreate", async (message) => {


 if (message.channel.id !== "939254485413421097"|| message.author.bot) return;
 SendInChannel();

 function SendInChannel() {
  const channel = client.channels.cache.get("939254485413421097");
  if (!channel) return;
  
  message.react("⭐")
  message.react("😎")
   }
})

