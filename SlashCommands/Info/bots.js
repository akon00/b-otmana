const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");
const Db = require(""+process.cwd()+"/webSite/database/models/Bots");
module.exports = {
    name: "bots",
    description: "🤖 View a user's bots in admin.azury.live",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "user",
        description: "Select the user you want to views' bots",
        type: "USER",
        required: false,
      },
    ], 
    run: async (client, interaction, args) => {
      let user = interaction.options.getUser('user') || interaction.user;
      
      let msg = await interaction.followUp(`Fetching..`);

      const db = await Db.find({
      owner: user.id,
    })
    if(!db || !db.length){
      return msg.edit({ content: ` `,
        embeds: [
        new MessageEmbed()
        .setAuthor(`${user.username}`, user.displayAvatarURL({dynamic: true}))
        .setDescription(`❌ **This user doesn't have any bots!**`)
        .setColor("RED")
        .setFooter(client.botFooter, client.botFooterIcon) 
        .setTimestamp()
          ]
      })
    }
    const botmaped = db.map(a => {
      return `<@${a.bot}> | **[\`Invite It\`](https://discord.com/api/oauth2/authorize?client_id=${a.bot}&permissions=8&scope=bot%20applications.commands)**`
    })
    msg.edit({ content: ` `,
      embeds: [
        new MessageEmbed()
        .setAuthor(`${user.username}'s Bot Inventory`, user.displayAvatarURL({dynamic: true}))
        .addField("<:blurple_bot:949844029720371280> Discord Bot: **|** <:plus:949844502598791178> Bot Invite:", `${botmaped.join('\n')}`)
        .setColor("GREEN")
        .setFooter(client.botFooter, client.botFooterIcon) 
        .setTimestamp()
      ]
    })
    },
}
