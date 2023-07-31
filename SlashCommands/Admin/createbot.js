const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const axios = require("axios");
const botdb = require(''+process.cwd()+'/webSite/functions/botdb')
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");
const db = require(`quick.db`);
module.exports = {
    name: "createbot",
    description: "🤖 Host a Discord Bot from our Shop",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      if(!interaction.member.roles.cache.has("bot creator role ty")) return interaction.followUp(`❌ **Only BOT CREATORS can use this command!**`)
      return interaction.followUp(`<a:Loading:920516789883002880> **This command is coming soon! Please create the bot at https://admin.azury.live**`)

      /*
    const request = await fetch("https://discordapp.com/api/v9/users/@me", {
      method: "GET",
      headers: {
        authorization: `Bot ${bot_token.toString()}`,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.code === 0) {
          err = true;
          return res.redirect("/?error=true&message=Invaild bot token! (Discord API error code: 0)");
        }
        webutilit(body);
      });
      
       axios({
      method: 'post',
      url: process.env.API,
      data: {
        SECRECT: "6969",
        token: bot_token,
        userid: bot_owner.id,
        type: bot_type,
        prefix: bot_prefix,
        maker: interaction.user.username,
        owner: bot_owner.id,
        ownerId: bot_owner.id,
        id: bot_filename,
        statustxt: bot_statustext,
        statustype: bot_statusactivity
      }
    }).then(res => {
      const resjson = res.data;
      botdb(bot_owner.id, bot_id, resjson.path,69)
    })*/
    },
}
