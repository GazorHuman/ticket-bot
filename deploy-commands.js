const fs = require('fs');
const {
  REST
} = require('@discordjs/rest');
const {
  Routes
} = require('discord-api-types/v9');
const {
  clientId
} = require('./config.json');
const t = require('./token.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({
  version: '9'
}).setToken(t.token);

rest.put(Routes.applicationCommands(clientId), {
    body: commands
  })
  .then(() => console.log('Sukses menambahkan slash command.'))
  .catch(console.error);
