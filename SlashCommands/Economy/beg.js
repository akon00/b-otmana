const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

let v = 40 // ⚡ MAX AMOUNT OF COINS A USER CAN GET

module.exports = {
    name: "beg",
    description: "Beg for coins",
    type: 'CHAT_INPUT',
    cooldown: 3600000 * 3, // 3h
    devOnly: true,
    run: async (client, interaction, args) => {
      if(interaction.member.roles.cache.some(z => z.id == client.boosterId)) v = 86

      let beg_success = Math.floor(Math.random() * 2) + 1
      let beg_amount = Math.floor(Math.random() * v) + 1

      if(beg_success == 1){
        beg_success = "🪐 Amazing! You were lucky and earned "

        interaction.followUp({ content: `**${beg_success} ${beg_amount}!** \n _• You can re run this command in 3 hours_` })
        client.addCoins(interaction.user.id, beg_amount)
      } else {
        beg_success = "🪐 Oops! Looks like you begged in the wrong place, people just pushed you out of the way! No money 4 u!" 

        interaction.followUp({ content: `**${beg_success}!** \n _• You can re run this command in 3 hours_` })
      }
    }
};
