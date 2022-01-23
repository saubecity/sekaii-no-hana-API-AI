const { SlashCommandBuilder } = require('@discordjs/builders');
const { Console } = require('console');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('character-create')
		.setDescription('Push and create a new character!')
};

console.log("\x1b[35m%s\x1b[0m", `[snh-create/deployement] deployed the creating functions!`)
console.log("\x1b[35m%s\x1b[0m", `[snh-create/deployement] snh-character builder is now "ready"!`)
