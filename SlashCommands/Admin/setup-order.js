const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");

module.exports = {
    name: "setup-order",
    description: "👑 Setup the order menu",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "channel",
        description: "Select a channel you want to send the order embed to",
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
      .setAuthor({ name: `TICKETS & ORDERS`, iconURL: `${client.user.displayAvatarURL()}` })
      .setColor('#2f3136')
      .setFooter(`Made with 💖 by discord.azury.live`) 
      .setDescription(`Need support? Want to order a bot? Why not open a ticket channel, from the menu below, we provide 24/7 , fast & quick support! \n\n **_"Amazing support since 2021!" ~Azury_**`)
      .setImage(`https://media.discordapp.net/attachments/888470852658667635/937437443009945620/newProject_1.png`)
      const row = new MessageActionRow()
			.addComponents(
			  new MessageSelectMenu()
			  .setCustomId('select_ord')
			  .setPlaceholder('Order a bot / Get support / Claim a giveaway')
			  .addOptions([
          { label: `General Support`, description: `Need help? Get some general support on our bots /or server!`, value: `ord_support`, emoji: `937441297722146836` },
          { label: `Giveaway claim`, description: `Won a giveaway? Open a ticket here to claim your reward!`, value: `ord_giveaway`, emoji: `937441297365614603` },
          { label: `Bot order`, description: `Want to order a bot? Click below to order one of our bots!`, value: `ord_order`, emoji: `937441297923469342` },
        ]),
			);
      ch.send({ content: ` `, embeds: [emb], components: [row] });
      return msg.edit({ content: `💖 The order system has successfully been setup view it here: ${ch}` })
    },
};
