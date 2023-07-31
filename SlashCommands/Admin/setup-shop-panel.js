const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");

module.exports = {
    name: "setup-coins-panel",
    description: "👑 Setup the coins menu",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "channel",
        description: "Select a channel you want to send the bank embed to",
        type: "CHANNEL",
        required: true,
      }
    ], 
    run: async (client, interaction, args) => {
      let ch = interaction.options.getChannel('channel');
      let msg = await interaction.followUp(`Fetching..`);

      if(!client.config.developers.includes(interaction.user.id)) return msg.edit(`🔒 You must be an owner to use this command!`)
      if(ch.type != 'GUILD_TEXT') return msg.edit(`🚩 You must provide a channel, and not category or voice channel!`)
      
      const emb = new MessageEmbed()
      .setAuthor({ name: `🏦 Azury Bank 🏦`, iconURL: `${client.user.displayAvatarURL()}` })
      .setColor('#2f3136')
      .setFooter(`Made with 💖 by discord.azury.live`) 
      .setDescription(`View how much Coins & tokens you have in the **[🏦 Azury Bank™️](https://azury.live)**!\nYou can also view your **Inventory**, and all the Items that are for sale!\n\n***Click the \`button\` below to view your Bank status!***`)
      .setImage(`https://media.discordapp.net/attachments/931650810885062686/939563794747756605/newProject_1.png`)
      const row = new MessageActionRow()
			.addComponents(
			  new MessageButton()
        .setLabel(`View Your Bank / Inventory / Items`)
        .setCustomId(`azu_bank`)
        .setEmoji(`937441297722146836`)
        .setStyle(`SECONDARY`)
			);
      ch.send({ content: ` `, embeds: [emb], components: [row] });
      return msg.edit({ content: `💖 The coins system has successfully been setup view it here: ${ch}` })
    },
};
