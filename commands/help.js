const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('get help on a specific subject')
        .addStringOption(option =>
            option.setName('subject')
                .setDescription('avaible arguments: -browse --dev-security --dev-system --url-debug --power-add')
                .setRequired(true))
};


