const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");
const db = require(`quick.db`);
module.exports = {
    name: "endloa",
    description: "💤 End your LOA",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let user = interaction.user;
      
      let msg = await interaction.followUp(`Fetching..`);

      const loa = db.get(`loa_${user}`);
    if(!loa){
      return msg.edit({ content: ` `,
        embeds: [
        new MessageEmbed()
        .setAuthor(`${user.username}`, user.displayAvatarURL({dynamic: true}))
        .setDescription(`❌ **You never had a LOA, submit one in <#931959111334125598>!**`)
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
          ]
      })
    }
    const count = db.get(`loacount_${user}`);
    msg.edit({ content: ` `,
      embeds: [
        new MessageEmbed()
        .setAuthor(`${user.username} ⚡ Ended LOA`, user.displayAvatarURL({dynamic: true}))
        .setDescription(`**Ended LOA:**\n${loa}`)
        .setColor("GREEN")
        .setFooter(`They have had ${count} total LOAs`, client.user.displayAvatarURL())
        .setTimestamp()
      ]
    })
      db.delete(`loa_${user}`);
      
   interaction.member.setNickname(`${interaction.user.username}`);
    },
}
