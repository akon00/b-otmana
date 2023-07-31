const Discord = require("discord.js");
const role = "939327289538281542";
const status = ".gg/azury";
const colors = require(`colors`);
const serverID = "895398888113049631";
const client = require(`../index.js`)

console.log(`[🔑 PRIVATE] Loaded the Private-Event: Status-Role`.blue.bold)


    client.on("presenceUpdate", async (oP, nP) => {
        let guild = client.guilds.cache.get(serverID)
        if (!guild) return;
        if (nP) {

            var user = guild.members.cache.get(nP.userId);

            if (!user || !user.roles) user = await guild.members.fetch(nP.userId).catch(() => {}) || false;

            if (!user) return;

            if (nP.activities.some(({
                    state
                }) => state?.includes(status))) {
                if (!user.roles.cache.has(role)) {
                  
                    user.roles.add(role).catch(() => {});
                    //console.log(`[🔷 Status Check] AdStatus found from User: ${user.user.tag}`.green.dim)
                  
                }
            } else {
                if (user.roles.cache.has(role)) {
                  
                    user.roles.remove(role).catch(() => {});
                    //console.log(`[🔷 Status Check] No AdStatus found of User: ${user.user.tag}`.red.dim)
                  
                }
            }
        }
    })
    

    client.on("ready", async () => {

        let guild = client.guilds.cache.get(serverID)
        if (!guild) return;


        let fm = await guild.members.fetch().catch(() => {})

        let haveStatus = [...fm.filter(user =>
            !user.user.bot && !user.roles.cache.has(role) &&
            user.presence && user.presence.activities.some(({
                state
            }) => state?.includes(status))
        ).values()];

        let noStatus = [...fm.filter(user =>
            !user.user.bot && !user.roles.cache.has(role) &&
            (!user.presence || !user.presence.activities.some(({
                state
            }) => state?.includes(status)))
        ).values()];

        for (const user of haveStatus) {
          
            await user.roles.add(role).catch(() => {});
                    //await console.log(`[🔷 Status Check] AdStatus found from User: ${user.user.tag}`.green.dim)
          
            await delay(350);
        }

        for (const user of noStatus) {
          
            
                    user.roles.remove(role).catch(() => {});
                    //console.log(`[🔷 Status Check] No AdStatus found of User: ${user.user.tag}`.red.dim)
                  
            await delay(350);
        }
    })

    function delay(delayInms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(2);
            }, delayInms);
        });
    }
/*     Coded by Discord.azury.live    */
/* Give Credits if you Consider Using */