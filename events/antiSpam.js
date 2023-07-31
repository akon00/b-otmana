const client = require('../index.js')
const ms = require("ms")
const usercollection = new Map();
const spam_limit = 7;
const spam_time = 5000;
const spam_timer = 10000;
// const spam_mute = ms(30);
console.log(`[🛡️ AUTO-MOD] Loaded the Event: Anti-Spam`.blue.bold)
client.on('messageCreate', async(message) => {
    if(message.author.bot || !message.guild) return;
    
    if(usercollection.has(message.author.id)) {
      const userdata = usercollection.get(message.author.id);
      const { lastMessage, timer } = userdata;
      const spam_timediff = message.createdTimestamp - lastMessage.createdTimestamp;
      let msgs = userdata.msgs;

      if(spam_timediff > spam_time) {
        clearTimeout(timer)
        userdata.msgs = 1
        userdata.lastMessage = message;
        userdata.timer = setTimeout(() => {
          usercollection.delete(message.author.id);
        }, spam_timer)
        usercollection.set(message.author.id, userdata)
      } else {
        ++msgs;
        if(parseInt(msgs) == spam_limit) {
          message.reply(`<:Error:930608437665083402> **AUTOMOD | Spamming is forbidden within the server!**`)
          let user = client.users.cache.get(message.author.id)
          message.member.timeout(300000, `AUTOMOD| Spam`)
          message.author.send(`<:Error:930608437665083402> **AUTOMOD | You have been timedout for spamming!**\n> *This doesn't affect you if your Admin!*`)
          message.channel.bulkDelete(spam_limit);
        } else {
          userdata.msgs = msgs;
          usercollection.set(message.author.id, userdata);
        }
      }
    } else {
      let tm = setTimeout(() => {
        usercollection.delete(message.author.id);
      }, spam_timer);
      usercollection.set(message.author.id, {msgs: 1,lastMessage: message,timer: tm})
    }
})