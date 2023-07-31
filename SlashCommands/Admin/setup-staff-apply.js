const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");

module.exports = {
    name: "setup-staffapply",
    description: "👑 Setup the apply menu",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "channel",
        description: "Select a channel you want to send the apply embed to",
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
      .setAuthor({ name: `Azury Staff Application`, iconURL: `${client.user.displayAvatarURL()}` })
      .setColor('#2f3136')
      .setFooter(`Made with 💖 by discord.azury.live`) 
      .setDescription(`**Apply for a <@&931653129550823514> where you can help moderate azury! And even get to a high respectable rank!**\n\n***Click the \`button\` below to open a application ticket!***`)
      .setImage(`https://media.discordapp.net/attachments/888470852658667635/937437443009945620/newProject_1.png`)
      const row = new MessageActionRow()
			.addComponents(
			  new MessageButton()
        .setLabel(`Apply For Staff`)
        .setCustomId(`azu_apply`)
        .setEmoji(`931664743138218055`)
        .setStyle(`SECONDARY`)
			);
      ch.send({ content: ` `, embeds: [emb], components: [row] });
      return msg.edit({ content: `💖 The apply system has successfully been setup view it here: ${ch}` })
    },
};
