const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");

module.exports = {
    name: "view-bank",
    description: "👑 View a users custom bank values",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "user",
        description: "Select the user you want to views bank",
        type: "USER",
        required: true,
      }
    ], 
    run: async (client, interaction, args) => {
      let ch = interaction.options.getUser('user');
      let msg = await interaction.followUp(`Fetching..`);

      if(!client.config.developers.includes(interaction.user.id)) return msg.edit(`🔒 You must be an owner to use this command!`)

      let x = await client.bank(ch.id)
      let z = await client.tokens(ch.id)
      
      const embed = new MessageEmbed()
      .setColor(`#2f3136`)
      .setAuthor(`${ch.username} ⚡ Bank Account`, ch.displayAvatarURL())
      .addField(`Coins:`, `\`${x}\``)
      .addField(`🪙 Tokens:`, `\`${z}\``)
      .setThumbnail(ch.displayAvatarURL({ dynamic: true }))
      .setFooter(`Made with 💖 by discord.azury.live`) 

      return msg.edit({ content: ` `, embeds: [embed] })
    },
};
