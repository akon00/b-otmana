const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

let v = 610 // ⚡ MAX AMOUNT OF COINS A USER CAN GET

module.exports = {
    name: "weekly",
    description: "Get a weekly amount of Coins",
    type: 'CHAT_INPUT',
    cooldown: 86400000 * 7, // 1w
    run: async (client, interaction, args) => {
      if(interaction.member.roles.cache.some(z => z.id == client.boosterId)) v = 910

      let x = Math.floor(Math.random() * v) + 1
      interaction.followUp({ content: `**🪐 Sick! You just gained a extra 🪙${x} AzuCoins!** \n _• You can re run this command in 1 week_`})
      client.addCoins(interaction.user.id, x)   
    },
};
