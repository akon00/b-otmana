const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");

module.exports = {
    name: "add-bank",
    description: "🚩 Edit a users bank account by either adding or removing a value",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "user",
        description: "Select the user you want to views bank",
        type: "USER",
        required: true,
      },
      {
        name: "type",
        description: "Select wether you want to add/subtract a value from the users bank",
        type: "STRING",
        required: true,
        choices: [
          { name: `Add`, value: `add` },
          { name: `Subtract`, value: `subtract` },
        ]
      },
      {
        name: "value",
        description: "Select wether you want to add/subtract from coins or tokens",
        type: "STRING",
        required: true,
        choices: [
          { name: `Coins`, value: `coin` },
          { name: `Tokens`, value: `token` },
        ]
      },
      {
        name: "amount",
        description: "Select a amount of x to either add or remove from the value",
        type: "INTEGER",
        required: true,
      },
    ], 
    run: async (client, interaction, args) => {
      let pr_user = interaction.options.getUser('user');
      let pr_type = interaction.options.getString('type');
      let pr_value = interaction.options.getString('value');
      let pr_amount = interaction.options.getInteger('amount');
      let msg = await interaction.followUp(`Fetching..`);

      if(!client.config.developers.includes(interaction.user.id)) return msg.edit(`🔒 You must be an owner to use this command!`)

      if(pr_value == 'coin'){
        if(pr_type == 'add'){
          client.addCoins(interaction.user.id, pr_amount)
        } else {
          client.rmvCoins(interaction.user.id, pr_amount)
        }
      } else {
        if(pr_type == 'add'){ 
          client.addTokens(interaction.user.id, pr_amount)
        } else {
          client.rmvTokens(interaction.user.id, pr_amount)
        }
      } 

      setTimeout(xv,5000)
      
      let x = await client.bank(interaction.user.id)
      let z = await client.tokens(interaction.user.id)
      
      const embed = new MessageEmbed()
      .setColor(`#2f3136`)
      .setAuthor(`${pr_type}ed ${pr_amount} ${pr_value}s to/from ${pr_user.username}!`, pr_user.displayAvatarURL())
      .setFooter(`Made with 💖 by discord.azury.live`) 

      return msg.edit({ content: ` `, embeds: [embed] })

      function xv(){
        // @masterious make this log smth, just like <user> <type>ed <amount> from/to <user2>
        console.log(`⌊Azury.Live⌉ - ${interaction.user.tag} ${pr_type}ed ${pr_amount}s to/from ${pr_user.tag}`)
      }
    },
}
