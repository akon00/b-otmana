const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");
const db = require(`quick.db`);
module.exports = {
    name: "loastatus",
    description: "💤 View a staff member's LOA",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "user",
        description: "Select the user you want to views' loa",
        type: "USER",
        required: false,
      },
    ], 
    run: async (client, interaction, args) => {
      let user = interaction.options.getUser('user') || interaction.user;
      
      let msg = await interaction.followUp(`Fetching..`);

      const loa = db.get(`loa_${user}`);
    if(!loa){
      return msg.edit({ content: ` `,
        embeds: [
        new MessageEmbed()
        .setAuthor(`${user.username}`, user.displayAvatarURL({dynamic: true}))
        .setDescription(`❌ **This user doesn't have any LOAs!**`)
        .setColor("RED")
        .setFooter(client.botFooter, client.botFooterIcon) 
        .setTimestamp()
          ]
      })
    }
    const count = db.get(`loacount_${user}`);
    msg.edit({ content: ` `,
      embeds: [
        new MessageEmbed()
        .setAuthor(`${user.username} ⚡ LOA`, user.displayAvatarURL({dynamic: true}))
        .setDescription(`**Current LOA:**\n${loa}`)
        .setColor("GREEN")
        .setFooter(`They have had ${count} total LOAs`, client.user.displayAvatarURL())
        .setTimestamp()
      ]
    })
    },
}
