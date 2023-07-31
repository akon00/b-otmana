const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "stats",
    description: "Gathers the bot's statistics",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Gathering..`);
      
      setTimeout(() => {
        msg.edit({ content: `I'm currently managing **${client.users.cache.size} users, ${client.guilds.cache.size} guilds & ${client.channels.cache.size} channels!**` });
      }, 500);
    },
};
