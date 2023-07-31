const client = require("../index");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
client.on("messageCreate", async (message) => {
  if (message.channel.id !== "931628308163067996"|| message.author.bot) return;
  SendInChannel();

  function SendInChannel() {
    const channel = client.channels.cache.get("931628308163067996");
    if (!channel) return;
    if(!message.member.roles.cache.some(x => x.id == "939267530508345346")){
      message.delete()
      message.author.send("**You need be an Admin or Higher to type in <#931628308163067996>!**")
    }
  }
})
