const { MessageEmbed } = require('discord.js')

function new_nick(){
  var length = 10,
  charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

module.exports = {
  name: 'moderate',
  category: "🎓 Punishment",
  description: 'moderate a guild members nickname',
  options: [
    {
      name: 'member',
      description: 'Member that you want to moderate username',
      type: 'USER',
      required: true
    },
    {
      name: 'reason',
      description: 'reason for this action',
      type: 'STRING',
      required: false
    }
  ],
    run: async (client, interaction) => {
      const md_member = interaction.options.getMember('member');
      const md_reason = interaction.options.getString('reason') || "`No Reason`";

      if(!interaction.member.roles.cache.has("939267532332867604")) return interaction.followUp(`<:Denied:930607627027759145> **You can't use this command!**`)
      if (md_member.id === interaction.guild.me.id) return interaction.followUp({ content: `<:Denied:930607627027759145> **You cannot moderate me!**` });
      if (md_member.bot) return interaction.followUp({ content: `<:Denied:930607627027759145> **You cannot moderate a bot!**` });
      if (md_member.id === interaction.guild.ownerId) return interaction.followUp({ content: `<:Denied:930607627027759145> **You cannot moderate the server owner!**` });
      if (md_member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp({ content: `<:Denied:930607627027759145> **This user is higher or equal to your role!**` });
      if (md_member.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.followUp({ content: `<:Denied:930607627027759145> **This user is higher or equal to my role!**` });

      let md_nickname = new_nick()
      const changed = new MessageEmbed()
      .setColor(`GREEN`)
      .setTitle(`<:Accepted:930607208327155763> Moderated the nickname of \`${md_member.user.tag}\`!`)
      .setDescription(`**Reason:** ${md_reason || `\`No Reason\``}`)

      const changed_emb = new MessageEmbed()
      .setColor(`GREEN`)
      .setTitle(`<:Accepted:930607208327155763> Your nickname was Moderated by \`${interaction.user.tag}\`!`)
      .setDescription(`**Reason:** ${md_reason || `\`No Reason\``}`)
    .setFooter(interaction.guild.name, interaction.guild.iconURL())
      md_member.setNickname(`Moderated ${md_nickname}`)

      interaction.followUp({ embeds: [changed] })
      md_member.send({ embeds: [changed_emb]})
    }
}