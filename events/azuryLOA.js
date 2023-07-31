const client = require("../index");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const db = require(`quick.db`);
client.on("messageCreate", async (message) => {


 if (message.channel.id !== "931959111334125598"|| message.author.bot) return;
 SendInChannel();

 function SendInChannel() {
  const channel = client.channels.cache.get("931959111334125598");
  if (!channel) return;
   const count = db.get(`loacount_${message.author}`);
   message.member.setNickname(`${message.author.username} [LOA]`);
   db.add(`loacount_${message.author}`, 1);
   db.set(`loa_${message.author}`, message.content);
   const embed = new MessageEmbed()
   .setColor(`WHITE`)
   .setAuthor(`${message.author.username} • Leave of Absence`, message.author.displayAvatarURL())
   .setDescription(`${message.content}`)
   .setFooter(`USER-ID: `+message.author.id+`\n⟫ Use /endloa to end it early!`, message.guild.iconURL())
   message.delete()
   channel.send({ content: `<:White_Conifer:931992706668974111> **LOA OF: ${message.author} / <@&939267530508345346>**`, embeds: [embed] }).then((m) => { m.react("✅") });
   }
})
