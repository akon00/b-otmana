const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");

let token_price = 5000

module.exports = {
    name: "invest",
    description: "Invest your coins into tokens",
    type: 'CHAT_INPUT',
    devOnly: true,
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Verifiying..`);

      let token_bank = await client.tokens(interaction.user.id)
      let coin_bank = await client.bank(interaction.user.id)

      if(coin_bank < token_price) return msg.edit(`🚦 Hey stop there! You don't have enough **coins for that**, you currently only have **🪙${coin_bank} Coins!**`)

      client.rmvCoins(interaction.user.id, token_price)
      client.addTokens(interaction.user.id, 1)  

      let token_bank2 = await client.tokens(interaction.user.id)
      return msg.edit(`🪙 Congratulations, you have just invested **5k coins** into **1 token**, you now have **${token_bank2} tokens!**`)
    },
};
