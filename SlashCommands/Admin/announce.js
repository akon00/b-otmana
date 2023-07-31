const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");

module.exports = {
    name: "say",
    description: "👑 Announce/Say Something",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "ann_channel",
        description: "Select a channel you want to send the announcement to",
        type: "CHANNEL",
        required: true,
      },
      {
        name: "ann_msg",
        description: "Message to Announce [Use +n+ to add a space]",
        type: "STRING",
        required: true,
      }
    ], 
    run: async (client, interaction, args) => {
      let ch = interaction.options.getChannel('ann_channel');
      let msg = await interaction.followUp(`Fetching..`);
      let msgg = interaction.options.getString('ann_msg');

      if(!client.config.developers.includes(interaction.user.id)) return msg.edit(`🔒 You must be an owner to use this command!`)
      
      
     
      ch.send({ content: `${msgg.split("+n+").join("\n")}` });
      return msg.edit({ content: `💖 Sent the Announcement in: ${ch}` })
    },
};
