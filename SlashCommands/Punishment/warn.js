const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const model = require("../../models/warns")
const dayjs = require("dayjs")

function new_set(){
  var length = 5,
  charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
function new_nick(){
  let id1 = new_set()
  let id2 = new_set()
  let id3 = new_set()
  return `${id1}-${id2}-${id3}`;
}

module.exports = {
  name: 'warn',
  category: "🎓 Punishment",
  description: "Warn a user",
  type: 'CHAT_INPUT',
  options: [
    {
      name: `member`,
      description: `Pick a user to warn`,
      type: "USER",
      required: true,
    },
    {
      name: `reason`,
      description: `Give a reason`,
      type: "STRING",
      required: true,
    }
  ],
    run: async (client, interaction, args) => {
    const user = interaction.options.getMember('member');
    const reason = interaction.options.getString('reason');
    
    if(!interaction.member.roles.cache.has("939267532332867604")) return interaction.followUp(`<:Denied:930607627027759145> **You can't use this command!**`)

    const memberPosition = user.roles.highest.rawPosition;
    const moderationPosition = interaction.member.roles.highest.rawPosition;
    if (user.id === interaction.member.id) return interaction.followUp({content: `<:Denied:930607627027759145> **You can't warn yourself!**`});

    if (user.bot) return interaction.followUp({content: `<:Denied:930607627027759145> **A bot cannot be warned!**`});

    if (moderationPosition <= memberPosition) return interaction.followUp(`<:Denied:930607627027759145> **You can't warn someone who is higher or equal to your role!**`)
    if (user.id === interaction.guild.ownerId) return interaction.followUp({content: `<:Denied:930607627027759145> **You cannot warn the Server Owner!**`});

    const kicked = new MessageEmbed()
    .setColor(`GREEN`)
    .setTitle(`<:Accepted:930607208327155763> Warned \`${user.user.tag}\`!`)
    .setDescription(`**Reason:** ${reason || `\`No Reason\``}`)
    const warned = new MessageEmbed()
    .setColor(`GREEN`)
    .setTitle(`<:Accepted:930607208327155763> You have been warned by \`${interaction.user.tag}\`!`)
    .setDescription(`**Reason:** ${reason || `\`No Reason\``}`)
    .setFooter(interaction.guild.name, interaction.guild.iconURL())
      
    model.findOne({ Guild: interaction.guild.id, User: user.user.id }, async(err, data) => {
      if(!data){
        data = new model({
          Guild: interaction.guild.id,
          User : user.user.id,
          Array: [
            {
              mod   : interaction.user.id,
              reason: reason,
              data  : dayjs(new Date()).unix(),
              id    : new_nick()
            }
          ]
        })
      } else {
        const object = {
          mod: interaction.user.id,
          reason: reason,
          data: dayjs(new Date()).unix(),
          id: new_nick()
        }
        data.Array.push(object)
      }
      data.save()
      //data.save()
      interaction.followUp({ embeds: [kicked] })
      user.send({ embeds: [warned]}).catch(()=>{})
    })
  }
}