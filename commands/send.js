const { SlashCommandBuilder } = require('@discordjs/builders');
const { Console } = require('console');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('send')
		.setDescription('user reply stuff')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('send this request to server')
                .setRequired(true))
};

console.log("\x1b[35m%s\x1b[0m", `[snh-create/deployement] user reply software deployed!`)
