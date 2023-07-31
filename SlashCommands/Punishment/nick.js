const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'nickname',
    category: "🎓 Punishment",
    description: 'changes the provided user\'s nickname to the one specified',
    options: [{
            name: 'target',
            description: 'target you want to change the nickname',
            type: 'USER',
            required: true
        },
        {
            name: "nick",
            description: "new nickname",
            type: "STRING",
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

        const target = interaction.options.getMember('target');
        const newnick = interaction.options.getString('nick');
        const reason = interaction.options.getString('reason') || "`No Reason`";

        if(!interaction.member.roles.cache.has("939267532332867604")) return interaction.followUp(`<:Denied:930607627027759145> **You can't use this command!**`)

        if (target.id === interaction.guild.me.id) return interaction.followUp({ content: `<:Denied:930607627027759145> **You cannot change my Nickname!**` });

        if (target.id === interaction.guild.ownerId) return interaction.followUp({ content: `<:Denied:930607627027759145> **You cannot change the server owner's nickname!**` });

        if (target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp({ content: `<:Denied:930607627027759145> **This user is higher or equal to your role!**` });

        if (target.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.followUp({ content: `<:Denied:930607627027759145> **This user is higher or equal to my role!**` });

        if (newnick.length > 32) return interaction.followUp({ content: `<:Denied:930607627027759145> **The nickname cannot be higher than 32!**` });

        const changed = new MessageEmbed()
        .setColor(`GREEN`)
        .setTitle(`<:Accepted:930607208327155763> Changed the nickname of \`${target.user.tag}\` to: **${newnick}**!`)
        .setDescription(`**Reason:** ${reason || `\`No Reason\``}`)
        target.setNickname(newnick)

        interaction.followUp({ embeds: [changed] })

    }
}