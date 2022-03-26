const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Menambahkan seseorang ke dalam ticket')
    .addUserOption(option =>
      option.setName('target')
      .setDescription('Nama seseorang yang ingin di tambahkan')
      .setRequired(true)),
  async execute(interaction, client) {
    const chan = client.channels.cache.get(interaction.channelId);
    const user = interaction.options.getUser('target');

    if (chan.name.includes('ticket')) {
      chan.edit({
        permissionOverwrites: [{
          id: user,
          allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        },
        {
          id: interaction.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
      ],
      }).then(async () => {
        interaction.reply({
          content: `<@${user.id}> telah di tambahkan ke dalam ticket!`
        });
      });
    } else {
      interaction.reply({
        content: 'Command ini hanya bisa digunakan di dalam ticket!',
        ephemeral: true
      });
    };
  },
};
