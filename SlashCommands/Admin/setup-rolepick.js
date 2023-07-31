const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");

module.exports = {
    name: "setup-rolepick",
    description: "👑 Setup the role-picker menu",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "channel",
        description: "Select a channel you want to send the role embed to",
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
      .setAuthor({ name: `Azury Role-Picker`, iconURL: `${client.user.displayAvatarURL()}` })
      .setColor('#2f3136')
      .setFooter(`Made with 💖 by discord.azury.live`) 
      .setDescription(`***Click the \`button\` below to pick some roles!***`)
      .setImage(`https://media.discordapp.net/attachments/888470852658667635/937437443009945620/newProject_1.png`)
      const row = new MessageActionRow()
			.addComponents(
			  new MessageButton()
        .setLabel(`Pick a role`)
        .setCustomId(`azu_rolepicker`)
        .setEmoji(`896733063910944798`)
        .setStyle(`SECONDARY`)
			);
      ch.send({ content: ` `, embeds: [emb], components: [row] });
      return msg.edit({ content: `💖 The role system has successfully been setup view it here: ${ch}` })
    },
};
