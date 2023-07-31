const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const f = require("node-fetch")
let baseurl = "https://api.azury.live/"

let v = 210 // ⚡ MAX AMOUNT OF COINS A USER CAN GET

module.exports = {
    name: "work",
    description: "Do a job to get a certain amount of Coins",
    type: 'CHAT_INPUT',
    cooldown: 600000 * 3, // 30m
    run: async (client, interaction, args) => {
      if(interaction.member.roles.cache.some(z => z.id == client.boosterId)) v = 310

      let q = await f(`${baseurl}eco/job`)
      let job = await q.json()

      let x = Math.floor(Math.random() * v) + 1
      interaction.followUp({ content: `**👏 You work as a ${job.job} and they paid you 🪙${x} AzuCoins**, welldone!` })
      client.addCoins(interaction.user.id, x)
    },
};
