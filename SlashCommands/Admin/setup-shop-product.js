const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");
const model = require("../../models/prd")

module.exports = {
    name: "setup-shop-product",
    description: "👑 Setup a new product",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "name",
        description: "The proudtc name your selling",
        type: "STRING",
        required: true,
      },
      {
        name: "description",
        description: "Give a brief description of then item your selling",
        type: "STRING",
        required: true,
      },
      {
        name: "type",
        description: "Type of payment method",
        type: "STRING",
        required: true,
        choices: [
          { name: `Tokens`, value: `token_product` },
          { name: `Coins`, value: `coin_product` },
        ]
      },
      {
        name: "amount",
        description: "The amount of tokens/coins your product should cost",
        type: "INTEGER",
        required: true,
      },
    ], 
    run: async (client, interaction, args) => {
      let pr_name = interaction.options.getString('name');
      let pr_description = interaction.options.getString('description');
      let pr_type = interaction.options.getString('type');
      let pr_amount = interaction.options.getInteger('amount');

      let msg = await interaction.followUp(`Fetching..`);

      if(!client.config.developers.includes(interaction.user.id)) return msg.edit(`🔒 You must be an owner to use this command!`)
      
      // const emb = new MessageEmbed()
      // .setAuthor({ name: `🏦 Azury Bank 🏦`, iconURL: `${client.user.displayAvatarURL()}` })
      // .setColor('#f65bad')
      // .setFooter(`Made with 💖 by discord.azury.live`) 
      // .setDescription(`View how much Coins & tokens you have in the **[🏦 Azury Bank™️](https://azury.live)**!\nYou can also view your **Inventory**, and all the Items that are for sale!\n\n***Click the \`button\` below to view your Bank status!***`)
      // .setImage(`https://media.discordapp.net/attachments/888470852658667635/937437443009945620/newProject_1.png`)
      // const row = new MessageActionRow()
			// .addComponents(
			//   new MessageButton()
      //   .setLabel(`View Your Bank / Inventory / Items`)
      //   .setCustomId(`azu_bank`)
      //   .setEmoji(`937441297722146836`)
      //   .setStyle(`SECONDARY`)
			// );
      // ch.send({ content: ` `, embeds: [emb], components: [row] });

      let abc = pr_name.toLowerCase()
      new model({
        View: abc,

        Name: pr_name,
        Description: pr_description,
        Type: pr_type,
        Amount: pr_amount
      }).save()
      
      return msg.edit({ content: `💖 Thanks for creating a new product, you can view it under the name **${pr_name}**, you can also find it here **/store**!` })
    },
};
