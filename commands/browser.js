const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('youtube-dl-exec')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('browse')
		.setDescription('Browse sekaii-no-hana using a powerful api!')
};

console.log('\x1b[30m\x1b[47m%s\x1b[0m', '[sekaii/browser] command now avaible and registered!')
