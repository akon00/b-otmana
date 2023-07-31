const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

let v = 210 // ⚡ MAX AMOUNT OF COINS A USER CAN GET

module.exports = {
    name: "daily",
    description: "Get a daily amount of Coins",
    type: 'CHAT_INPUT',
    cooldown: 3600000 * 24, // 24h
    run: async (client, interaction, args) => {
      if(interaction.member.roles.cache.some(z => z.id == client.boosterId)) v = 310

      let x = Math.floor(Math.random() * v) + 1
      interaction.followUp({ content: `**🪐 Sick! You just gained a extra 🪙${x} AzuCoins!** \n _• You can re run this command in 24 hours_` })
      client.addCoins(interaction.user.id, x)   
    },
};
