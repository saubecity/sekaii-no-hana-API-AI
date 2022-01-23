const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('bug')
		.setDescription('report a bug in a fast and easy way!')
};


