/**
 * BOOSTERS
 */
const client = require("../index");

console.log(`[🔑 PRIVATE] Loaded the Private-Event: Boosters`.blue.bold)  
  client.on("guildMemberUpdate", async (oM, nM) => {
    
    
    
      //if he/she starts boosting    
      if(!oM.premiumSince && nM.premiumSince) {
        nM.send(`<:Like:922852837636055051> **Thanks for Boosting Azury Hangout!** <:Like:922852837636055051>\n**Claim Your Perks: <#931630052016271380>**`).catch(() => {});
      }
      //if he/she boosts again
      if(oM.premiumSince && oM.premiumSinceTimestamp != nM.premiumSinceTimestamp) {
        nM.send(`<:Like:922852837636055051> **Thanks for Boosting Azury Hangout again!** <:Like:922852837636055051>\n**Claim More Perks: <#931630052016271380>**`).catch(() => {});
      }
  //if he/she stops boosting
  if(oM.premiumSince && !nM.premiumSince) {
        nM.send(`<a:Gwave:937324366058909697> **It's sad to see you nolonger boosting us!**`).catch(console.warn)
      } 
    



    
      let boostLogChannel = nM.guild.channels.cache.get("939252601382375495");
      if(!boostLogChannel) boostLogChannel = await nM.guild.channels.fetch("939252601382375495").catch(()=>{}) || false;
      if(!boostLogChannel) return;
      

          
      //if he/she stops boosting
      if(oM.premiumSince && !nM.premiumSince) {
        return boostLogChannel.send(`<a:Gwave:937324366058909697> **${nM.user} has stopped boosting us! Sad times...**`).catch(console.warn)
      } 
      //if he/she starts boosting
      if(!oM.premiumSince && nM.premiumSince) {
        return boostLogChannel.send(`<:Like:922852837636055051> **${nM.user} Thanks for boosting us!**`).catch(console.warn);
      }
      //if he/she starts boosting
      if(oM.premiumSince && oM.premiumSinceTimestamp != nM.premiumSinceTimestamp) {
        return boostLogChannel.send(`<:Like:922852837636055051> **${nM.user} Boosted us again!**`).catch(console.warn);
      }
  });