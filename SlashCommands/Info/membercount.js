const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment")

module.exports = {
    name: "membercount",
    description: "Gets the server's membercount",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Loading..`);
      const ar = `<:arrow_right:896722207777120276>`
let myGuild = interaction.guild; 
      
      const members = interaction.guild.members.cache;
  let memberCount = myGuild.memberCount;
      
      const emb = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`<:rmembers:921748358421434368> MemberCount of ${interaction.guild.name}`)
        .addField(`${ar} Total Members:`, `\`${memberCount}\`/\`${interaction.guild.maximumMembers}\``)
        .addField(`${ar} Total Bots:`, `\`${interaction.guild.members.cache.filter(member => member.user.bot).size}\``,)
        .addField(`${ar} Total Users:`, `\`${interaction.guild.members.cache.filter(member => !member.user.bot).size}\``,)
      .setThumbnail(client.user.displayAvatarURL({ dynamic : true }))
        .setFooter(client.botFooter, client.botFooterIcon) 

      
      
      setTimeout(() => {
        msg.edit({ content: ` `, embeds: [emb] });
      }, 500);
    },
};
