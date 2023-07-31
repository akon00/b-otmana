const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const {Pagination} = require("discordjs-button-embed-pagination");
const model = require("../../models/inv")

module.exports = {
    name: "use",
    description: "Use/redeem a item from the store, which you own",
    type: 'CHAT_INPUT',
    devOnly: true,
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Fetching..`)
      
      let array = []
      model.find({}, async(err, data) => {
        if(Object.keys(data.inventory).length === 0) return msg.edit(`🚩 Hmmm, your inventory seems to be empty therefore you cannot use anything!`)

        let array = []
        data.map((v, i) => {
          x = {label:v.Name, description:v.Description,value:v.Name}
          array.push(x)
        })

        const row = new MessageActionRow()
			  .addComponents(
			  	new MessageSelectMenu()
			  	.setCustomId('azu_redeem')
			  	.setPlaceholder('...')
			  	.addOptions([array]),
			  );

        const emb = new MessageEmbed()
        .setAuthor({ name: `🎒 Azury Inventory 🎒`, iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`Below in the selection is all the items in your inventory you can use, select one to get started** \n\n • _To view new items use /store, order one of them today using /order!_`)
        .setColor('#2f3136')
        .setFooter(`Made with 💖 by discord.azury.live`) 

        msg.edit({ content: ` `, embeds: [emb], components: [row] });
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
          const ch = Object.keys(data.inventory).includes(i.values)
          if(!ch) return msg.edit({ content: `🤔 Uh oh, this isn't suppose to happen! The item you have selected cannot be found in your inventory, if this issue continues to happen contact a developer!`, embeds: [], components: [] })

          ch.delete() // note 4 hace: check mgndb later
          if(i.Type == 'token_product'){
            let dvc = moment(new Date()).format("")
            interaction.channels.cache.create(`🪙•${interaction.user.username}`, {
              topic: `🪙 ${interaction.user.tag} has redeem a token product! \n 🪐 ${dvc}`,
              parent: client.orderCateory,
              permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: ['VIEW_CHANNEL']
                },
                {
                  id: interaction.user.id,
                  allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                },
                {
                  id: client.orderStaff,
                  allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'MANAGE_MESSAGES']
                },
              ]
            }).then(async(ch) => {
              
            })
          } else {
            // give use some sort of role, just send msg for now, setup /setup-product prop-Use : channel_product, role_product
          }
        })
      })
    }
};
