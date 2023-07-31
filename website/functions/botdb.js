const DB = require('../database/models/Bots')

const savedb = async(owner, bot, path, expire) => {
  await DB.create({
    owner: owner,
    bot: bot,
    path: path,
    expire: expire
  })
}

module.exports = savedb;