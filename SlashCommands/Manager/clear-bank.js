const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");

module.exports = {
    name: "clear-bank",
    description: "🚩 Clear all tokens/coins from a users",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "user",
        description: "Select the user you want to views bank",
        type: "USER",
        required: true,
      },
      {
        name: "account",
        description: "Select wether you want to add/subtract from either their coin/or token account",
        type: "STRING",
        required: true,
        choices: [
          { name: `Coins`, value: `coins` },
          { name: `Tokens`, value: `tokens` },
        ]
      }
    ], 
    run: async (client, interaction, args) => {
      let ch = interaction.options.getUser('user');
      let ty = interaction.options.getString('account');
      let msg = await interaction.followUp(`Fetching..`);

      if(!client.config.developers.includes(interaction.user.id)) return msg.edit(`🔒 You must be an owner to use this command!`)

      if(ty == 'tokens'){
        await client.setTokens(interaction.user.id, 0)
      } else {
        await client.setCoins(interaction.user.id, 0)
      }
      
      const embed = new MessageEmbed()
      .setColor(`#2f3136`)
      .setAuthor(`Cleared all of ${ch.username}'s ${ty} from their bank account!`, ch.displayAvatarURL())
     
       .setFooter(`Made with 💖 by discord.azury.live`) 

      return msg.edit({ content: ` `, embeds: [embed] })
    },
};
