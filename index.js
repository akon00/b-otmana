const { Client, Collection } = require("discord.js");
const colors = require("colors")
require('dotenv').config()
const model = require("./models/eco")
const model2 = require("./models/tkn")

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
const fs = require(`fs`);
const Discord = require(`discord.js`);
client.config = require("./config.json");
// 💎Economy Section💎
client.boosterId = '895445684826816564';
client.botFooter = "Azury Manager";
client.botFooterIcon = "https://cdn.discordapp.com/attachments/931650810885062686/951646669961822238/output-onlinepngtools_1.png";
client.codesEmbed = new Discord.MessageEmbed()
  .setTitle(`<:dev:899007451096031263> CODE DOWNLOAD LINKS <:dev:899007451096031263>`)
  .setDescription(`> **[DJS 13 SlashCommands Handler](https://github.com/mipcit1010/SlashCommands-Handler)**\n\n> *MORE SOON!*`)
  .setColor(`PURPLE`)
.setImage(`https://media.discordapp.net/attachments/888470852658667635/937437443009945620/newProject_1.png`)

client.bank = (id) => new Promise(async(ful) => {
  let v = await model.findOne({id})
  if(!v) return ful(0)
  ful(v.coins)
})
client.addCoins = (id, coins) => {
  model.findOne({ id }, async(err, data) => {
    if(!data){
      new model({
        id,
        coins,
      }).save()
    } else {
      v = data.coins+coins
      let x = await model.findOneAndUpdate({ id: id }, {coins:v})
    }
  })
}
client.rmvCoins = (id, coins) => {
  model.findOne({ id }, async(err, data) => {
    if(!data){
      new model({
        id,
        coins: -coins,
      }).save()
    } else {
      v = data.coins-coins
      let x = await model.findOneAndUpdate({ id: id }, {coins:v})
    }
  })
}
client.setCoins = (id, coins) => {
  model.findOne({ id }, async(err, data) => {
    if(!data){
      new model({
        id,
        coins: coins,
      }).save()
    } else {
      let x = await model.findOneAndUpdate({ id: id }, {coins:coins})
    }
  })
}


client.tokens = (id) => new Promise(async(ful) => {
  let v = await model2.findOne({id})
  if(!v) return ful(0)
  ful(v.tokens)
})
client.addTokens = (id, tokens) => {
  model2.findOne({ id }, async(err, data) => {
    if(!data){
      new model2({
        id,
        tokens,
      }).save()
    } else {
      v = data.tokens+tokens
      let x = await model2.findOneAndUpdate({ id: id }, {tokens:v})
    }
  })
}
client.rmvTokens = (id, tokens) => {
  model2.findOne({ id }, async(err, data) => {
    if(!data){
      new model2({
        id,
        tokens: -tokens,
      }).save()
    } else {
      v = data.tokens-tokens
      let x = await model2.findOneAndUpdate({ id: id }, {tokens:v})
    }
  })
}
client.setTokens = (id, tokens) => {
  model2.findOne({ id }, async(err, data) => {
    if(!data){
      new model2({
        id,
        tokens,
      }).save()
    } else {
      let x = await model2.findOneAndUpdate({ id: id }, {tokens:tokens})
    }
  })
}
// 💎Economy Section💎

// Initializing the project
require("./handler")(client);
// Bot Maker SITE
require("./webSite/server/server")(client);
require("./webSite/database/connect");









// stop and restart
const glob = require("glob")
const fetch = require(`node-fetch`)
client.on("interactionCreate", async (btn) => {
  if (btn.values == "stop_client") {
    if(!client.config.developers.includes(btn.member.id)) return btn.reply({
      content: "❌ You can't use this!",
      ephemeral: true
    })
    try {
      btn.reply({
        content: "<a:Loading:920516789883002880> **Shuttingdown the bot...**",
        ephemeral: true
      })
      setTimeout(() => {
        process.exit()
      }, 5000)
    } catch (e) {
      btn.editReply({
        content: `${e}`
      })
    }
  }
  if (btn.values == "rename_client") {
    if(!client.config.developers.includes(btn.member.id)) return btn.reply({
      content: "❌ You can't use this!",
      ephemeral: true
    })
    let filter = (m) => m.author.id === btn.user.id;
    const collector = btn.channel.createMessageCollector({
      filter,
      max: 1
    })
    btn.reply({ content: "<a:Loading:920516789883002880> **Send new Bot Name**",
        ephemeral: true})
    /* collector.on("collect", async(msg) => {
      
    }) */ //not needed
    collector.on("end", (collected) => {
      const name = collected.first().content;
      if (!name) {
        return btn.reditReply({ content: `❌ **No Name!**`})
      }
      let beforename = client.user.username;
      client.user.setUsername(name)
        .then((user) => {
          message.delete()
          btn.editReply({ content: `✅ **Succesfully set name to ${client.user.username} from ${beforename}**`,
        ephemeral: true})
        })
        .catch((e) => {
          btn.editReply({ content: `${e}`,
        ephemeral: true})
        })
    })
  }
  if (btn.values == "changeav_client") {
    if(!client.config.developers.includes(btn.member.id)) return btn.reply({
      content: "❌ You can't use this!",
      ephemeral: true
    })
    let filter = (m) => m.author.id === btn.user.id;
    const collector = btn.channel.createMessageCollector({
      filter,
      max: 1
    })
    btn.reply({ content: "<a:Loading:920516789883002880> **Send the New Bot Image**",
        ephemeral: true})
    collector.on("collect", async (msg) => {
        let url = msg.content;
      if(msg.content.includes(`https://`)) {
        btn.editReply({ content: "<a:Loading:920516789883002880> **Changing avatar...**",
        ephemeral: true})
        
        await msg.delete()
        client.user.setAvatar(url)
          .then(user => {
            
              btn.editReply({ content: "✅ **Succesfully changed the Bot's avatar!**",
        ephemeral: true})
            
          }).catch((e) => {
          btn.editReply({ content: `${e}`,
        ephemeral: true})
        })
      } else {
        msg.delete()
        btn.editReply({ content: "❌ Not a valid URL",
        ephemeral: true})
      }
    })
  }
})
/*           ANTI CRASHING            ¦¦           ANTI CRASHING           */ 
process.on('unhandledRejection', (reason, p) => {
    console.log('\n\n\n\n\n=== unhandled Rejection ==='.toUpperCase().yellow.dim);
    console.log('Reason: ', reason.stack ? String(reason.stack).gray : String(reason).gray);
    console.log('=== unhandled Rejection ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  });
  process.on("uncaughtException", (err, origin) => {
    console.log('\n\n\n\n\n\n=== uncaught Exception ==='.toUpperCase().yellow.dim);
    console.log('Exception: ', err.stack ? err.stack : err)
    console.log('=== uncaught Exception ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  })
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('=== uncaught Exception Monitor ==='.toUpperCase().yellow.dim);
  });
  process.on('beforeExit', (code) => {
    console.log('\n\n\n\n\n=== before Exit ==='.toUpperCase().yellow.dim);
    console.log('Code: ', code);
    console.log('=== before Exit ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  });
  process.on('exit', (code) => {
    console.log('\n\n\n\n\n=== exit ==='.toUpperCase().yellow.dim);
    console.log('Code: ', code);
    console.log('=== exit ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  });
  process.on('multipleResolves', (type, promise, reason) => {
    console.log('\n\n\n\n\n=== multiple Resolves ==='.toUpperCase().yellow.dim);
    console.log(type, promise, reason);
    console.log('=== multiple Resolves ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  });
