  const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const hastebin = require('hastebin-gen');

module.exports = {
    name: "eval",
    category: "🔰 Info",
    description: "🔒 Evalulate a peice of code",
    type: 'CHAT_INPUT',
    options: [
        {
          name: "code",
          description: "Code to eval",
          type: "STRING",
          required: true,
        },
    ],
    run: async (client, interaction, args) => {
      const codeToEval = interaction.options.getString('code')
      let msg = await interaction.followUp(`Evalulating..`)
    
      if(!client.config.developers.includes(interaction.user.id)) return msg.edit(`🔒 This command is locked to owners only!`)
      
      String.prototype.replaceAll = function (search, replacement) {
        return this.replace(RegExp(search, 'gi'), replacement);
      };

      client.clean = text => {
        if (typeof text !== 'string') {
          text = require('util').inspect(text, { depth: 0 });
        }
        text = text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
        .replaceAll(client.token, 'never gonna give you up, never gonna let you down')
        return text;
      };
      
      try {
        const evaled = client.clean(eval(codeToEval));      
        if (evaled.length < 800) {
          msg.edit({ content: `\`\`\`xl\n${evaled}\n\`\`\`` })
        } else {
          await hastebin(evaled, "js").then(r => {
            msg.edit({ content:   `\`\`\`xl\n${r}\n\`\`\`` })
          });
        }
      } catch (err) {
        msg.edit({ content: `\`\`\`xl\n${err}\n\`\`\`` });
      }
    },
};















/*
interaction.channel.send({ embeds: [new MessageEmbed().setTitle(":adm_q: Automation Usage").setColor("GREEN").addField(":StreamingDOT: **AUTO-DELETE:**", "> ***Messages in this channel will be deleted after `180 Seconds` or `3 Minutes`***").addField("👊 **BUMP/VOTE US:**", "> ***Bump us using the command `!d bump` (Every 2 Hours) and Vote us [Here](https://top.gg/servers/895398888113049631) (Every 12 Hours)***").setThumbnail(interaction.guild.iconURL()), new MessageEmbed().setColor("GREEN").setTitle("🌐 **LINKS & WEBSITES**").setThumbnail(interaction.guild.iconURL()).setDescription(">>> :a_right: **[Main Website](https://azury.live/)** *Our main website that explains all about us!*\n\n:a_right: **[API Website](https://api.azury.live)** *Our amazing API that has many FUN and COOL endpoints for your bot!*").setFooter(":star: Azury Hangout | Best Bot Shop of 2022 | Order NOW!")] })
*/