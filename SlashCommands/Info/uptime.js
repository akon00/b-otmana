const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "uptime",
    description: "Fetchs the bots total uptime",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Fetching..`);

      let totalSeconds = (client.uptime / 1000);
      let days = Math.floor(totalSeconds / 86400);
      totalSeconds %= 86400;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60);

      let newm;
      if(minutes == 0){
        newm = `I've been up for **${seconds}s**!`
      } else if(hours == 0){
        newm = `I've been up for **${minutes}m & ${seconds}s**!`
      } else if(days == 0){
        newm = `I've been up for **${hours}h, ${minutes}m & ${seconds}s**!`
      } else {
        newm = `I've been up for **${days}d, ${hours}h, ${minutes}m & ${seconds}s**!`
      }
      
      setTimeout(() => {
        msg.edit(`${newm}`);
      }, 500);
    },
};
