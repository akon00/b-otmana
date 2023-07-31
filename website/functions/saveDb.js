const Schema = require('../database/models/Bots')

const saveDb = async (customerId, days) => {
  await Schema.create({
    OwnerId: customerId,
    Expire: days
  })
}
module.exports = saveDb;