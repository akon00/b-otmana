const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const model = require("../../models/warns")
const dayjs = require("dayjs")

module.exports = {
  name: 'warnings',
  category: "🎓 Punishment",
  description: "Fetch all a users warnings",
  type: 'CHAT_INPUT',
  options: [
    {
      name: `member`,
      description: `Pick a user to view warnings of`,
      type: "USER",
      required: true,
    }
  ],
    run: async (client, interaction, args) => {
    const user = interaction.options.getMember('member');
    
    if(!interaction.member.roles.cache.has("939267532332867604")) return interaction.followUp(`<:Denied:930607627027759145> **You can't use this command!**`)
      
    model.findOne({ Guild: interaction.guild.id, User: user.user.id }, async(err, data) => {
      if(!data) return interaction.followUp({ content: `❗ ${user.user.tag} doesn't have any warnings!` })

      const warnings_emb = new MessageEmbed()
      .setColor(`RED`)
      .setAuthor(`${Object.keys(data.Array).length} Warnings for ${user.user.tag} (${user.user.id})`, user.user.displayAvatarURL({ dynamic: true }))
      .addFields(data.Array.map((x, y) => {
      return { name: `ID: ${x.id} | Moderator: ${client.users.cache.get(x.mod).tag}`, value: `${x.reason} - ${dayjs(x.data).format('MMM D, YYYY')}` }
      }))
      return interaction.followUp({ embeds: [warnings_emb] })
    })
  }
}