const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require('ms');
module.exports = {
  name: 'timeout',
  category: "🎓 Punishment",
  description: "Timeout a user",
  type: 'CHAT_INPUT',
  options: [
    {
      name: `member`,
      description: `Pick a user to timeout`,
      type: "USER",
      required: true,
    },
    {
    name: 'time',
    description: 'Time (In Seconds)',
    type: 'STRING',
    required: true,
    },
    {
      name: `reason`,
      description: `Give a reason`,
      type: "STRING",
      required: false,
    }
  ],
  /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
    const user = interaction.options.getMember('member');
    const time = interaction.options.getString('time')
        const reason = interaction.options.getString('reason') || "`No Reason`";
        const timeMs = ms(time);

        if(!interaction.member.roles.cache.has("939267532332867604")) return interaction.followUp(`<:Denied:930607627027759145> **You can't use this command!**`)

    const memberPosition = user.roles.highest.rawPosition;
      const moderationPosition = interaction.member.roles.highest.rawPosition;

      if (user.id === interaction.member.id) return interaction.editReply({
            content: `<:Denied:930607627027759145> **You cannot timeout yourself!**`
        });

        if (user.id === interaction.guild.me.id) return interaction.editReply({
            content: `<:Denied:930607627027759145> **You cannot timeout me!**`
        });

        if (user.id === interaction.guild.ownerId) return interaction.followUp({
            content: `<:Denied:930607627027759145> **You cannot timeout the server owner!**`
        });

        if (user.roles.highest.position >= interaction.member.roles.highest.position) return interaction.editReply({
            content: `<:Denied:930607627027759145> **This user is higher/equal than your role!**`
        });
if(user.permissions.has('Administrator'.toUpperCase())) {
   return interaction.editReply({
            content: `<:Denied:930607627027759145> **This user is an Admin!**`
        });
}
        if (user.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.editReply({
            content: `<:Denied:930607627027759145> **This user is higher/equal than my role!**`
        });

        if (!timeMs) return interaction.editReply({
            content: `<:Denied:930607627027759145> **Invalid time! Please try again!**`,
            ephemeral: true
        })

        if (timeMs <= 19000) return interaction.editReply({
            content: `<:Denied:930607627027759145> **You cannot timeout someone for less then 20 seconds!**`,
            ephemeral: true
        })

        if (timeMs > 2332800000) return interaction.editReply({
            content: `<:Denied:930607627027759145> **You cannot timeout someone for longer than 27 days!**`,
            ephemeral: true
        })
      

    const timedout = new MessageEmbed()
    .setColor(`GREEN`)
    .setTitle(`<:Accepted:930607208327155763> Timed-out \`${user.user.tag}\` for ${time}!`)
    .setDescription(`**Reason:** ${reason || `\`No Reason\``}`)
const timedout_emb = new MessageEmbed()
    .setColor(`GREEN`)
    .setTitle(`<:Accepted:930607208327155763> You have been Timedout for ${time} by \`${interaction.user.tag}\`!`)
    .setDescription(`**Reason:** ${reason || `\`No Reason\``}`)
    .setFooter(interaction.guild.name, interaction.guild.iconURL())
    user.timeout(timeMs, reason)
    
      
       interaction.followUp({ embeds: [timedout] })
      user.send({ embeds: [timedout_emb]})

  }
}