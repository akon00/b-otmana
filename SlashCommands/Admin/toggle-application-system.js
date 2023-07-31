const { Client, CommandInteraction } = require("discord.js");
const model = require("../../models/apply")

module.exports = {
    name: "toggle-applysystem",
    description: "Enable or disable the Application module",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "option",
        description: "Select wether you would like to enable or disable this module",
        type: "STRING",
        required: true,
        choices: [
          { name: `Enable`, value: `enable` },
          { name: `Disable`, value: `disable` },
        ]
      }
    ],
    run: async (client, interaction, args) => {
      let option = interaction.options.getString('option');
      let msg = await interaction.followUp(`Fetching..`);

      if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp(`⚠ You are missing the **"ADMINISRATOR"** permission, therefore you cannot run this command`)

      model.findOne({ Guild: interaction.guild.id }, async(err, data) => {
        if(option == 'disable'){
          new model({
            Guild: interaction.guild.id
          }).save()
        } else {
          data.delete()
        }
      })

      setTimeout(() => {
        msg.edit(`📄 The **Application Module** has been successfully __${option.toUpperCase()}ED__`);
      }, 500);
    },
};
