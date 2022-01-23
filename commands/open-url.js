const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('url-debug')
		.setDescription('debug a url developers only')
        .addStringOption(option =>
            option.setName('uri')
                .setDescription('send this request to server')
                .setRequired(true))
};


