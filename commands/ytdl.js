const { SlashCommandBuilder } = require('@discordjs/builders');
const { Console } = require('console');
const cmd = require('child_process')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('youtube')
		.setDescription('download a youtube video at any format/quality (4k 60fps) including mp3, gif, etc')
		.addStringOption(option =>
			option.setName('link')
				.setDescription('The link of the youtube video, try https://www.youtube.com/watch?v=DC9FybAKSg0 :P')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('quality')
				.setDescription('the quality of the video output (the more it higher, the more it will take to download)')
				.setRequired(true)
				.addChoice('Max quality (up to 8k 60fps) (takes a lot of time)', 'max')
				.addChoice('meduim quality (up to 4k 60fps)', 'meduim')
				.addChoice('worst quality (1080p and lower)', 'low')
				.addChoice('no, i want to download it as a music (mp3)', 'music'))
		.addStringOption(option =>
			option.setName('format')
				.setDescription('if you have selected \'music\', please select .mp3, else, we recommend you to use mp4')
				.setRequired(true)
				.addChoice('.mp4 (for video/recommended)', 'mp4')
				.addChoice('.mp3 (for music)', 'mp3')
				.addChoice('.avi (for video, disrecommended and experimental)', 'avi')
				.addChoice('.webm (for video, web)', 'webm')
				.addChoice('.gif (for video, animated image sequence, heavy)', 'gif')
				.addChoice('.mkv (for video, high-quality, annoying)', 'gif'))
};


