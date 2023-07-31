const client = require("../index");
const { MessageEmbed, Collection, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js")
const moment = require("moment")
const db = require(`quick.db`)
console.log(`[🔑 PRIVATE] Loaded the Private-Event: Role-Picker`.blue.bold)
client.on("interactionCreate", async (interaction) => {
  if(!interaction.isButton() && !interaction.isSelectMenu()) return;
  const redRole = "945379732122394645";
  const blueRole = "945379895712821288";
  const greenRole = "945380035634794556";
  const yellowRole = "945380164450271322";
  const heRole = "939267545880477827";
  const sheRole = "939267547453333585";
  const theyRole = "939267548392857610";
  const askRole = "939267549479182386";
  const annRole = "939267541732298812";
  const eventRole = "939267542701195344";
  const wakeRole = "939267543762362429";
    if(interaction.customId == `azu_rolepicker`) {
      const pickembed = new MessageEmbed()
      .setColor(`GREEN`)
      .setTitle(`✌️ Self-Roles | Role-Pick ✌️`)
      .addField(`**__Picked:__**`, "`None`")
      .setFooter(`⚡ Powered by Azury!`)
      const row = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Color Roles`)
        .setCustomId(`color_roles`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Ping Roles`)
        .setCustomId(`ping_roles`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Pronoun Roles`)
        .setCustomId(`pronoun_roles`)
        .setStyle(`SECONDARY`)
      ])
      const row2 = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Information`)
        .setEmoji(`❓`)
        .setCustomId(`roles_info`)
        .setStyle(`PRIMARY`)
      ])
      interaction.reply({ embeds: [pickembed], components: [row, row2], ephemeral: true })
    } else if (interaction.customId == `color_roles`) {
      const pickembed = new MessageEmbed()
      .setColor(`GREEN`)
      .setTitle(`✌️ Self-Roles | Role-Pick ✌️`)
      .addField(`**__Picked:__**`, "`Color_Roles`")
      .setFooter(`⚡ Powered by Azury!`)
      const row = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Red`)
        .setEmoji(`🔴`)
        .setCustomId(`red_role`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Blue`)
        .setEmoji(`🔵`)
        .setCustomId(`blue_role`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Green`)
        .setEmoji(`🟢`)
        .setCustomId(`green_role`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Yellow`)
        .setEmoji(`🟡`)
        .setCustomId(`yellow_role`)
        .setStyle(`SECONDARY`)
      ])
      const row2 = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Go Back`)
        .setEmoji(`⏪`)
        .setCustomId(`roles_back`)
        .setStyle(`PRIMARY`)
      ])
      interaction.update({ embeds: [pickembed], components: [row, row2], ephemeral: true })
    } else if (interaction.customId == `pronoun_roles`) {
      const pickembed = new MessageEmbed()
      .setColor(`GREEN`)
      .setTitle(`✌️ Self-Roles | Role-Pick ✌️`)
      .addField(`**__Picked:__**`, "`Pronoun_Roles`")
      .setFooter(`⚡ Powered by Azury!`)
      const row = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`He/Him`)
        .setEmoji(`👨`)
        .setCustomId(`he_role`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`She/Her`)
        .setEmoji(`👩`)
        .setCustomId(`she_role`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`They/Them`)
        .setEmoji(`🙎`)
        .setCustomId(`they_role`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Ask/Private`)
        .setEmoji(`🤔`)
        .setCustomId(`ask_role`)
        .setStyle(`SECONDARY`)
      ])
      const row2 = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Go Back`)
        .setEmoji(`⏪`)
        .setCustomId(`roles_back`)
        .setStyle(`PRIMARY`)
      ])
      interaction.update({ embeds: [pickembed], components: [row, row2], ephemeral: true })
    } else if (interaction.customId == `ping_roles`) {
      const pickembed = new MessageEmbed()
      .setColor(`GREEN`)
      .setTitle(`✌️ Self-Roles | Role-Pick ✌️`)
      .addField(`**__Picked:__**`, "`Ping_Roles`")
      .setFooter(`⚡ Powered by Azury!`)
      const row = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Announcements`)
        .setEmoji(`📣`)
        .setCustomId(`ann_role`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Events`)
        .setEmoji(`🌆`)
        .setCustomId(`event_role`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Wake-Up`)
        .setEmoji(`🙃`)
        .setCustomId(`wake_role`)
        .setStyle(`SECONDARY`)
      ])
      const row2 = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Go Back`)
        .setEmoji(`⏪`)
        .setCustomId(`roles_back`)
        .setStyle(`PRIMARY`)
      ])
      interaction.update({ embeds: [pickembed], components: [row, row2], ephemeral: true })
    } else if (interaction.customId == `roles_back`) {
      const pickembed = new MessageEmbed()
      .setColor(`GREEN`)
      .setTitle(`✌️ Self-Roles | Role-Pick ✌️`)
      .addField(`**__Picked:__**`, "`None`")
      .setFooter(`⚡ Powered by Azury!`)
      const row = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Color Roles`)
        .setCustomId(`color_roles`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Ping Roles`)
        .setCustomId(`ping_roles`)
        .setStyle(`SECONDARY`),
        new MessageButton()
        .setLabel(`Pronoun Roles`)
        .setCustomId(`pronoun_roles`)
        .setStyle(`SECONDARY`)
      ])
      const row2 = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(`Information`)
        .setEmoji(`❓`)
        .setCustomId(`roles_info`)
        .setStyle(`PRIMARY`)
      ])
      interaction.update({ embeds: [pickembed], components: [row, row2], ephemeral: true })
      } else if (interaction.customId == `roles_info`) {
        const embed = new MessageEmbed()
        .setColor(`BLUE`)
        .setTitle(`✌️ Self-Roles | F-A-Q ✌️`)
        .addField(`**__How to Pick a role__**`, "**You can pick a role by Clicking one of the Role Categorys. Then by pressing on the rple provided! You can press it again to remove the role!**")
        .addField(`**__My Developer__**`, "**I was coded by <@693553429380857978> and <@718200923490615316> made Azury possible!**\n**<@693553429380857978> Codes most of the bots & <@718200923490615316> Helps code then As well as Manages the server! We respect our team members in Azury!**\n\n**Here is the team:**\n<@693553429380857978> ~ Bot Developer & Founder\n<@718200923490615316> ~ Co-Bot Developer & Founder\n<@773034893696303124> ~ Co-Founder & Co-Bot Developer\n<@705048027865415690> ~ Site Dev, Server Manager, CEO-Bot Dev")
        .addField(`**__Source Code?__**`, "**NO! This system will NOT be Open sourced! Learn to make it yourself, or order one from us!**")
      interaction.reply({ embeds: [embed], ephemeral: true })
        } else if (interaction.customId == `red_role`) {
      if(interaction.member.roles.cache.has(redRole)) {
        await interaction.member.roles.remove(redRole)
        return interaction.reply({ content: `<:no:933239221836206131> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(redRole)
      interaction.reply({ content: `<a:yes:933239140718358558> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `blue_role`) {
      if(interaction.member.roles.cache.has(blueRole)) {
        await interaction.member.roles.remove(blueRole)
        return interaction.reply({ content: `<:no:933239221836206131> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(blueRole)
      interaction.reply({ content: `<a:yes:933239140718358558> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `green_role`) {
      if(interaction.member.roles.cache.has(greenRole)) {
        await interaction.member.roles.remove(greenRole)
        return interaction.reply({ content: `<:no:933239221836206131> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(greenRole)
      interaction.reply({ content: `<a:yes:933239140718358558> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `yellow_role`) {
      if(interaction.member.roles.cache.has(yellowRole)) {
        await interaction.member.roles.remove(yellowRole)
        return interaction.reply({ content: `<:no:933239221836206131> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(yellowRole)
      interaction.reply({ content: `<a:yes:933239140718358558> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `he_role`) {
      if(interaction.member.roles.cache.has(heRole)) {
        await interaction.member.roles.remove(heRole)
        return interaction.reply({ content: `<:no:933239221836206131> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(heRole)
      interaction.reply({ content: `<a:yes:933239140718358558> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `she_role`) {
      if(interaction.member.roles.cache.has(sheRole)) {
        await interaction.member.roles.remove(sheRole)
        return interaction.reply({ content: `<:no:933239221836206131> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(sheRole)
      interaction.reply({ content: `<a:yes:933239140718358558> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `they_role`) {
      if(interaction.member.roles.cache.has(theyRole)) {
        await interaction.member.roles.remove(theyRole)
        return interaction.reply({ content: `<:no:933239221836206131> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(theyRole)
      interaction.reply({ content: `<a:yes:933239140718358558> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `ask_role`) {
      if(interaction.member.roles.cache.has(askRole)) {
        await interaction.member.roles.remove(askRole)
        return interaction.reply({ content: `<:no:933239221836206131> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(askRole)
      interaction.reply({ content: `<a:yes:933239140718358558> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `yellow_role`) {
      if(interaction.member.roles.cache.has(askRole)) {
        await interaction.member.roles.remove(askRole)
        return interaction.reply({ content: `<:no:933239221836206131> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(askRole)
      interaction.reply({ content: `<a:yes:933239140718358558> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `ann_role`) {
      if(interaction.member.roles.cache.has(annRole)) {
        await interaction.member.roles.remove(annRole)
        return interaction.reply({ content: `<:no:933239221836206131> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(annRole)
      interaction.reply({ content: `<a:yes:933239140718358558> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `event_role`) {
      if(interaction.member.roles.cache.has(eventRole)) {
        await interaction.member.roles.remove(eventRole)
        return interaction.reply({ content: `<:no:933239221836206131> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(eventRole)
      interaction.reply({ content: `<a:yes:933239140718358558> **Successfuly added the role!**`, ephemeral: true })
    } else if (interaction.customId == `wake_role`) {
      if(interaction.member.roles.cache.has(wakeRole)) {
        await interaction.member.roles.remove(wakeRole)
        return interaction.reply({ content: `<:no:933239221836206131> **You already have the role, so i removed it from you!**`, ephemeral: true })
      }
      interaction.member.roles.add(wakeRole)
      interaction.reply({ content: `<a:yes:933239140718358558> **Successfuly added the role!**`, ephemeral: true })
    } 
})