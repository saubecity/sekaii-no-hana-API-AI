const { SlashCommandBuilder } = require('@discordjs/builders');

console.log(`[snh-search/builder] asynchronised function declaring...`)
module.exports = {
	data: new SlashCommandBuilder()
		.setName('process')
		.setDescription('see the hardware the bot is running on!'),
	async execute(interaction) {
		await interaction.reply('yuuu');
	},
};

console.log(`[snh-search/builder] asynchronised function declared.`)

