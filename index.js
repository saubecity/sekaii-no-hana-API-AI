require("http").createServer((req, res) => res.end(process.version)).listen()

var propertyPointer = 0
const express = require('express');
const os = require('os')
const youtube = require('youtube-dl-exec')
const { generateDependencyReport } = require('@discordjs/voice')
console.log(generateDependencyReport());
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const { Client, Intents, Discord, MessageButton, Collection, MessageActionRow, MessageSelectMenu, MessageEmbed, Message, Channel } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,  "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] });
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token, prefix, url } = require('./config.gitignore.json');
var characters = require('./anime/characters.json');
const fs = require('fs')
var anime = require('./anime/characters.json')
var config = require('./config.json')
var interactionCreate = require('./events/interactionCreate.js');
const { channel } = require("diagnostics_channel");
var recursiontype = false;
var commands = [];
var globalimports = [];
var input = [];
var globalpassions = [];
let date_ob = new Date();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
var location = fetch('https://api.db-ip.com/v2/free/self')
	.then(response => response.json())
	.then(data => location = data)
	.then(data => console.log('\x1b[33m%s\x1b[0m', `welcome to sekaii-no-hana apiih! connected from ${location.city} <3`))
client.commands = new Collection();
// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('[sekaii-no-hana/service] Ready!');
	client.user.setActivity("cute, nice, prowerful <3", {
		type: "STREAMING",
		url: "https://www.twitch.tv/redcat"
	});
});


var botuses;
var tempuses = fs.readFile('./saves/counts.txt', 'utf-8', (err, data) => {
	if (err) {
		fs.writeFile('/saves/counts.txt', '0', (err) => {
			if (err) {
				console.error(`come fix here pls!`)
			}
		})
	}
	console.log(`${data} << debug`)
	tempuses = data
	botuses = parseInt(tempuses)
})


function commandisused() {
	botuses+= 1
	fs.writeFile('./saves/counts.txt', `${botuses}`, (err) => {
		switch (err) {
			case true:
				console.error(`failed to use writeFile file (x0000101)`)
				break;
		}
	})
}

client.once('ready', () => {
	console.log('[sekaii-no-hana/API & discord] Ready!');
});

var _name;
var _rank;
var _age;
var _gender;
var temporarydata = [];

client.on("messageCreate", (message) => {
	const WindowsToaster = require('node-notifier').WindowsToaster;
	const https = require("https")
	var avatar = fs.createWriteStream("avatar.png")

	https.get(`${message.author.avatarURL().replace(/webp/g, "png")}`, response => {
		response.pipe(avatar);
		var notifier = new WindowsToaster({
			withFallback: false, // Fallback to Growl or Balloons?
			customPath: "Relative" // Relative/Absolute path if you want to use your fork of SnoreToast.exe
		});
		const path = require('path');
		var buffer = fs.readFile('avatar.png', (err, data) => {
			buffer = data
			console.log(`${message.author.avatarURL().replace(/webp/g, "png")}`)
			notifier.notify({
				title: `${message.author.tag} sent a message!`,
				subtitle: `sent in #${message.channel.name} inside ${message.guild.name}`,
				message: `${message.content}`,
				icon: path.join(__dirname, "avatar.png")
			})

			notifier.on("click", (window) => {
				exec(`cd C:\\Program Files (x86)\\Google\\Chrome\\Application && chrome.exe ${message.url}`)
			})
		})
	})
})


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	console.log("\x1b[32m%s\x1b[0m", `[snh-search/builders] builded ${file} as asynchronised function.`)
}

const commandNames = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

const { exec } = require("child_process");
const { request } = require("http");


// commands

// commands only up

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

fs.writeFile('./saves/readme.txt', config.files.readme, (err) => {
	if (err) {
		console.log('\x1b[31m%s\x1b[0m', 'an error occured, but it not major, the app will continue to run :P')
	}
})


const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log("\x1b[34m%s\x1b[0m", 'Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log("\x1b[34m%s\x1b[0m", 'Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();


client.on('interactionCreate', async (interaction, attachments) => {
	if (!interaction.isCommand()) return;
	commandisused()
	console.log("\x1b[36m%s\x1b[0m", `[snh-commands/handler] reicieved request from command ${interaction.commandId} with id ${interaction.commandId} created at ${interaction.createdAt}`)
	if (interaction.commandName === 'process') {
		var displayText = `:package: this the hardware the bot is currencely using\`\`\`cs\noperating system: "${os.version()}"\nsession: "${os.userInfo().username}"\ncpus: "${os.cpus()[0].model} ${os.cpus()[0].speed}"\ntotal RAM: "${os.totalmem() / 1024 / 1024} mb"\nused RAM (global): "${(os.totalmem() /1024/1024) - (os.freemem() / 1024 / 1024)} mb"\nfree RAM: "${os.freemem() / 1024 / 1024} mb"\nused RAM (sekaii-no-hana): "${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB"\ngpu (graphic process unit): "not avaible"\`\`\``
		await interaction.reply(`${displayText}`)
	} else if (interaction.commandName === 'character-create') { // create
		await interaction.reply('`sekaii-no-hana API 2021` - calming down server...\n*THIS IS A PRE-RELEASE, AM STILL WORKING ON IT, SO IT MAY BE UGLY RIGTH NOW*')
		await new Promise(resolve => setTimeout(resolve, 500))
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('create-anime')
					.setPlaceholder('open this box to select!')
					.addOptions([{
						label: 'protagonist',
						description: 'highest ranks, require admin permission and javascript verification',
						value: 'protagonist',
					}, {
						label: 'the higher ranks',
						description: 'superior ranks, require admin permission',
						value: 'the higher ranks',
					}, {
						label: 'the 9 kabe',
						description: 'requires descirption',
						value: 'the 9 kabe',
					}, {
						label: 'antagonist',
						description: 'opposition against others, require admin permission',
						value: 'antagonist',
					}, {
						label: 'karibukai insen',
						description: 'what is that? but of course require admin to push',
						value: 'karibukai insen',
					}]),
			);

		await interaction.editReply({ content: '**Step 1**: destination', components: [row] })
		await interaction.followUp({ content: '`Sekaii-no-hana API / character pusher` :pleading_face: **current branch: beta**', ephemeral: true })
		const msg = await interaction.fetchReply()
	} else if (interaction.commandName == 'send') { // sender
		const string = interaction.options.getString('input')
		interaction.channel.sendTyping()
		updatereg(string)
		await interaction.deferReply();
		if (string.length !== 0 && string.length <= 1999) {
			interaction.editReply(':white_check_mark: `succesfully got your input...`\nthis is what we got: `' + input[0] + '`')
		} else if (input.length >= 1999) {
			interaction.editReply(':white_check_mark: ye, we got something very big! lag excepted')

		} else {
			interaction.editReply(':exclamation: `an error occured, more details below`\n`looks like discord.js did not handle this request, this is probably a coding error, you should contact the developer [saubecity] or open an issue https://github.com/saubecity/sekaii-no-hana-data if seeing it multiple times! thank you!')
		}
		await new Promise(resolve => setTimeout(resolve, 1000))
		interaction.deleteReply()
		console.log('\x1b[32m%s\x1b[0m', `[sekaii-debugger/sender] some sent ${input[0]}`)
	} else if (interaction.commandName == 'bug') { // bug reporter
		const string1 = interaction.options.getString('how it happens?')
		const string2 = interaction.options.getString('what happend to the bot after?')
		const string3 = interaction.options.getString('were you creating a character?')
		const string4 = interaction.options.getString('is this bug destructive or minor?')
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('sendreport')
					.setLabel('send document!')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId('abortreport')
					.setLabel("no, d'ont send")
					.setStyle('DANGER'),
			);
		const report = `\`\`\`report from ${interaction.user.tag}, in channel #${interaction.channel.name}\n\n${string1}\nbot status: ${string2}\nhappend in character-create: ${string3}\nbut level: ${string4}\`\`\``
		interaction.reply({ content: `**this document will be sent to saubecity's server**\n${report}\nsend it?`, components: [row], ephemeral: true })
	} else if (interaction.commandName == 'browse') {
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('search-anime')
					.setPlaceholder('open this box to select!')
					.addOptions([{
						label: 'protagonist',
						description: 'leading characters of the anime!',
						value: 'protagonist',
					}, {
						label: 'the higher ranks',
						description: 'its writen in front of u, they have a higher rank.',
						value: 'higher-ranks',
					}, {
						label: 'the 9 kabe',
						description: 'pls i need description',
						value: 'the 9 kabe',
					}, {
						label: 'antagonist',
						description: 'opposition against the leading characters',
						value: 'antagonist',
					}, {
						label: 'karibukai insen',
						description: 'pls pls am not japanese',
						value: 'karibukai insen',
					}]),
			);
		interaction.reply({ content: `ready to jump in a pool of data, select the **rank** you witch to target :pleading_face: `, components: [row] })
	} else if (interaction.commandName == 'url-debug') {
		const string = interaction.options.getString('uri')
		exec(`"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe" ${string}`);
		interaction.reply(`:no_entry: ur action may not be executed, type \`/help url-debug\` for more information! :no_entry:`)
	} else if (interaction.commandName == 'super-idol') {
		interaction.reply(`am waiting for my super idol to come back <3`)
		interaction.user.send(`it my fault i left her alone!!`)
		await new Promise(resolve => setTimeout(resolve, 1000))
		var role = interaction.guild.roles.cache.get('922977906123239444')
		for (var i = 0; i < 16777215; i++) {
			role.setColor(`${i}`)
			await new Promise(resolve => setTimeout(resolve, 1))
		}
		role.setName(`winver`)
	} else if (interaction.commandName == 'help') {
		var string = interaction.options.getString('subject')
		var docs = require('./anime/help.json')
		if (string == "help") {
			var keys = Object.keys(docs)
			var temp_text = "";
			for (var i = 0 ; i < keys.length; i++) {
				temp_text+= ``
			}
			interaction.reply(``)
		}
	} else if (interaction.commandName == 'youtube') {
		interaction.deferReply()
		// try with https://www.youtube.com/watch?v=DC9FybAKSg0
		const url = interaction.options.getString('link')
		const quality = interaction.options.getString('quality')
		const format = interaction.options.getString('format')
		const id = interaction.user.id
		var entryQuality;
		var formats = ['.mp4', '.mp3', '.avi', '.gif', '.webm', '.mkv']
		for (var i = 0; i < formats.length; i++) {
			fs.unlink(`./commands/${id}${formats[i]}`, (err, file) => {

			})
		}
		if (quality == 'max') {
			entryQuality = 'bestvideo[ext=?mp4]+bestaudio/best'
		} else if (quality == 'meduim') {
			entryQuality = 'bestvideo[ext=?mp4][height<=?2160]+bestaudio/best';
		} else if (quality == 'low') {
			entryQuality = 'bestvideo[ext=?mp4][height<=?1080]+bestaudio/best';
		} else if (quality == 'music') {
			entryQuality = 'bestvideo[ext=?mp4][height=?144]+bestaudio/best';
		}
		console.log(url)
		await new Promise(resolve => setTimeout(resolve,2000))
		interaction.editReply(`:ballot_box_with_check: we've started download your video, you'll receive a private message when the process is done \n\`\`\`cs\nvideo url: '${url}'\nquality: '${quality}'\nformat: '${format}'\nrequest by: '${id}'\`\`\``)
		await exec(`cd commands && yt-dlp.exe -f "${entryQuality}" -o "${interaction.user.id}.%(ext)s" ${url}`, (err, stdout) => {
			if (err) {
				interaction.channel.send(`:warning: something bad is happenning, you may not receive the file\n\`\`\`cs\n${err}\`\`\``)
			}
			console.log(stdout)
			interaction.editReply(`:white_check_mark: succesfully downloaded your video, we're coverting your video to the requested format`)
			if (format) {
				console.error(`here!`)
				for (var i = 0; i < formats.length; i++) {
					exec(`cd commands && ffmpeg -i ${id}${formats[i]} ${id}.${format}`, (err, stdout) => {
						console.log(err)
						if (formats[i] !== `.${format}`) {
							if (err || stdout) {
								fs.unlink(`./commands/${id}${formats[i]}`, (err) => {
									interaction.editReply(`:no_entry:  clearing \`temporary\` files, please wait \`<3\``)
									new Promise(resolve => setTimeout(resolve, 500))
									interaction.editReply(`:pleading_face: <@${id}> ur video was succesfully downloaded, go to your DMS and check out!`)
								})
							} else {
								fs.unlink(`./commands/${id}${formats[i]}`, (err) => {
									interaction.editReply(`:no_entry:  clearing \`temporary\` files, please wait \`<3\``)
									new Promise(resolve => setTimeout(resolve, 500))
									interaction.editReply(`:pleading_face: <@${id}> ur video was succesfully downloaded, go to your DMS and check out!`)
								})
							}
						}
					})
				}
				if (formats[i] == formats[formats.length - 1]) {
					sendRequeztedFile(interaction, format, id, url)
				}
				interaction.editReply(`:pleading_face: <@${id}> ur video was succesfully downloaded, go to your DMS and check out!`)
			} else {
				interaction.editReply(`:pleading_face: <@${id}> ur video was succesfully downloaded, go to your DMS and check out!`)
			}
		})
		console.log([url, quality, format, id])
	}
});

function sendRequeztedFile(interaction, format, id, url) {
	var displayText = `hey <@${id}>, we've succesfully fetched, downloaded and processed your file, some details:\`\`\`cs\n[video/processor] converted file to '.${format}' using #ffmpeg\ndownloaded ${url} succesfully\`\`\`:sob: **did you know:** its harder to get the title of a youtube video than downloading it via js`
	if (fs.statSync(`./commands/${id}.${format}`)["size"] < 8000000) {
		var file = fs.readFile(`./commands/${id}.${format}`, (err) => console.log(err))
		interaction.user.send({ content: displayText, attachments: file})
	} else {
		interaction.user.send('success')
	}
}



client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;
	commandisused()
	console.log('\x1b[31m%s\x1b[0m', `[snh-options/select/handle] reicieved request from command ${interaction.commandName} with id ${interaction.commandId} created at ${interaction.createdAt}`);
	if (interaction.customId === 'create-anime') {
		_rank = interaction.values[0]
		await interaction.update(`ok, currentely, the rank of your character is ${_rank}, l'et get to other stuff...`);
		await new Promise(resolve => setTimeout(resolve, 2000))
		await interaction.deleteReply()
		const button1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('confnextforname')
					.setLabel('confirm input')
					.setStyle('SECONDARY'),
			);
		const danger = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('processexit')
					.setLabel('abort process')
					.setStyle('DANGER'),
			);
		await interaction.followUp({ content: 'what the **name** of you character, please type it below! :triumph:\n*use* `/send <name here>` *to send it to the server*', components: [button1] })
	} else if (interaction.customId == 'search-anime') {
		var __rank = interaction.values[0]
		var __cd = __rank
		var __njpw_en_channel01_3;
		var page;
		console.log(__rank)
		var tempdesk = Object.keys(anime[__rank])
		var comp = []
		var __section_switch = []
		for (var i = 0; i < tempdesk.length; i++) {
			if (anime[__rank][tempdesk[i]] == {}) {
				__section_switch.push(0)
			} else if (!anime[__rank][tempdesk[i]]["about me!"]) {
				__section_switch.push(0)
			}
		}
		console.log(tempdesk.length)
		if (__rank !== 'protagonist') {
			var buttons = []
			for (var i = 0; i < tempdesk.length; i++) {
				var buttons_private_class = []
				if (i < 4) {
					buttons_private_class.push(new MessageButton())
					buttons_private_class[0].setCustomId(`pass ch-list ${i}`)
					buttons_private_class[0].setLabel(`${tempdesk[i]}`)
					buttons_private_class[0].setStyle('SECONDARY')
					buttons_private_class.push(new MessageButton())
					buttons_private_class[1].setCustomId(`pass add-ch-list ${i}`)
					buttons_private_class[1].setLabel(`+`)
					buttons_private_class[1].setStyle('SUCCESS')
					buttons_private_class.push(new MessageButton())
					buttons_private_class[2].setCustomId(`pass new-menu ${i}`)
					buttons_private_class[2].setLabel(`•••`)
					buttons_private_class[2].setStyle('PRIMARY')
					buttons.push(buttons_private_class)
					console.log(`${tempdesk[i]}`)
				} else if (i == 4) {
					page = 4
					buttons_private_class.push(new MessageButton())
					buttons_private_class[0].setCustomId(`change-branch`)
					buttons_private_class[0].setLabel(`change rank`)
					buttons_private_class[0].setStyle('PRIMARY')
					buttons_private_class.push(new MessageButton())
					buttons_private_class[1].setCustomId(`pass next-page ${i}`)
					buttons_private_class[1].setLabel(`next ->`)
					buttons_private_class[1].setStyle('DANGER')
					buttons.push(buttons_private_class)
				} else {
					console.warn(`no passed by ${tempdesk[i]}`)
				}
			}
			const row = []
			for (var i = 0; i < buttons.length; i++) {
				row.push(
					new MessageActionRow()
						.addComponents(buttons[i])
				)
			}
			// row 
			interaction.reply({ content: `:pleading_face: those character are the verions 2.0 of the API`, components: row})
			characters_import([buttons, tempdesk, page, __rank], globalimports)
		} else {
			for (var i = 0; i < Object.keys(anime[__rank]).length; i++) {
				var ___name = anime[__rank][tempdesk[i]]["about me!"].name
				console.log(`${___name} from loop`)
				var ___desc = 'no desc';
				if (anime[__rank][tempdesk[i]]["about me!"].story == "" || anime[__rank][tempdesk[i]]["about me!"].story == undefined) {
					if (anime[__rank][___name][`life of ${___name}`].identity.story.length > !1999) {
						___desc = anime[__rank][___name][`life of ${___name}`].identity.story
						contextcont = `:warning: no primary description added, try adding one!`
					} else {
						___desc = `sadly, this character d'osent have a description, try adding one!`
					}
				}
				___desc = ___desc.substring(0, 96)
				___desc += "..."
				var templist = {
					label: `${___name}`,
					description: `${___desc}`,
					value: `${___name}`,
				}
				comp.push(templist)
			}
			const row = new MessageActionRow()
				.addComponents(
					new MessageSelectMenu()
						.setCustomId('characters-anime-select')
						.setPlaceholder('select the character!')
						.addOptions(comp),
				);
			console.warn(comp)
			var contextcont;
			characters_import([__rank], globalimports)
			interaction.reply({ content: "ok, here are the list of characters from the **protagonist** rank :yum:", components: [row] })
		}
	} else if (interaction.customId == 'characters-anime-select') {
		var ___imports = globalimports
		var __rank = ___imports[0]
		console.log(__rank)
		var ___name = interaction.values[0]
		var ___chinfo = Object.keys(anime[__rank][___name])
		var ___gender = anime[__rank][___name]["about me!"].gender
		var ___prefix = grammar(___gender)
		console.log(___chinfo)
		var tempdesk = [];
		var __ch_interaction = [];
		for (var i = 0; i < ___chinfo.length; i++) {
			var toast_description;
			if (___chinfo[i] == `life of ${___name}`) {
				toast_description = `the life of ${___name}, d'osent looks like it!`
			} else if (___chinfo[i] == `personality`) {
				toast_description = `the personality, is ${___prefix} sensible, or whatever <3`
			} else if (___chinfo[i] == `characteristics`) {
				toast_description == `the characteristics, is ${___prefix} cute, etc...`
			} else if (___chinfo[i] == `about me!`) {
				toast_description = `about him, the age, etc`
			} else if (___chinfo[i] == "others") {
				toast_description = `other stuff am still working on`
			} else {
				toast_description = `you're seeing this becuz an error occured`
			}
			var tempx = {
				label: `${___chinfo[i]}`,
				description: `${toast_description}`,
				value: `${___chinfo[i]}`,
			}
			__ch_interaction.push(tempx)
		}
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('characters-anime-directing')
					.setPlaceholder('select the character!')
					.addOptions(__ch_interaction),
			);
		var animation = [':man_office_worker:', ':woman_technologist:', ':singer:', ':man_detective:', ':police_officer:', ':man_scientist:']
		interaction.reply({ content: `you've choosed **${___name}**, what the information you want to get from ${___prefix}?`, components: [row] })
		characters_imporgt([__rank, ___name, ___gender, ___prefix], globalimports)
	} else if (interaction.customId == 'characters-anime-directing') {
		var ___directory = interaction.values[0]
		var __rank = globalimports[0]
		var confuse = false;
		var ___name = globalimports[1]
		var ___gender = globalimports[2]
		var ___prefix = globalimports[3]
		var ___chinfo = Object.keys(anime[__rank][___name][___directory])
		if (interaction.values[0] == 'about me!') {
			interaction.reply(`hy :pleading_face:, my name is ${anime[__rank][___name][___directory].name}, am a cute `)
		} else {
			console.log(___chinfo)
			var __ch_interaction_trigger = true
			var __ch_interaction = [];
			for (var i = 0; i < ___chinfo.length; i++) {  // registery base, please type /help dev-register for more info
				if (anime[__rank][___name][___directory][___chinfo[i]].story) {
					var toast_description = anime[__rank][___name][___directory][___chinfo[i]].story;
					toast_description = toast_description.substring(0, 97)
					toast_description += '...'
					var tempx = {
						label: `${___chinfo[i]}`,
						description: `${toast_description}`,
						value: `${___chinfo[i]}`,
					}
					__ch_interaction.push(tempx)
				} else if (___chinfo[i] == 'physical') {
					if (anime[__rank][___name][___directory][___chinfo[i]].physics.story) {
						var toast_description = anime[__rank][___name][___directory][___chinfo[i]].physics.story;
						toast_description = toast_description.substring(0, 97)
						toast_description += '...'
						var tempx = {
							label: `${___chinfo[i]}`,
							description: `${toast_description}`,
							value: `${___chinfo[i]}`,
						}
						__ch_interaction.push(tempx)
					}
				} else if (___chinfo[i] == 'powers/special-abilities') {
					var special_abilities_count = Object.keys(anime[__rank][___name][___directory][___chinfo[i]].powers.link[0].powers)
					var toast_description = `${parsearr(special_abilities_count)}`
					toast_description = toast_description.substring(0, 97)
					toast_description += '...'
					console.log(toast_description)
					var tempx = {
						label: `${___chinfo[i]}`,
						description: `${toast_description}`,
						value: `${___chinfo[i]}`,
					}
					__ch_interaction.push(tempx)
				} else if (___chinfo[i] == 'mentally/inside') {
					var __Cd = Object.keys(anime[__rank][___name][___directory][___chinfo[i]])
					var tempx = {
						label: `${___chinfo[i]}`,
						description: `${__Cd.length} directories ...${parsearr(__Cd)}`,
						value: `${___chinfo[i]}`,
					}
					__ch_interaction.push(tempx)
				} else if (___chinfo[i] == 'about me!') {
					// about me changed to here!
					__ch_interaction_trigger = false
				}
			}
			var __cd__ = `characters-anime-value`
			var __ani_nc = `ok, so you've choosed the section **${___directory}**, what value you want to view`
			var row = new MessageActionRow()
				.addComponents(
					new MessageSelectMenu()
						.setCustomId(__cd__)
						.setPlaceholder('select the directory!')
						.addOptions(__ch_interaction)
				);
			interaction.reply({ content: `${__ani_nc}`, components: [row] })
			characters_import([__rank, ___name, ___gender, ___prefix, ___directory], globalimports)
		}
	} else if (interaction.customId == 'characters-anime-value') {
		var ___value = interaction.values[0]
		console.log(`debug::${___value}`)
		var unlock;
		var execute_that = true;
		var __rank = globalimports[0]
		var ___name = globalimports[1]
		var ___gender = globalimports[2]
		var ___prefix = globalimports[3]
		console.log(___prefix)
		var ___directory = globalimports[4]
		var ___subprocess = `mentally/inside`
		var ___temporary__debug;
		if (globalimports[5]) {
			___temporary__debug = globalimports[5]
		}
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('close-search')
					.setLabel('close window!')
					.setStyle('DANGER'),
				new MessageButton()
					.setCustomId('change-branch')
					.setLabel('change branch!')
					.setStyle('SECONDARY')
			);
		var embed = new MessageEmbed()
			.setColor(config.embeds["global-config"].color)
			.setAuthor(`${___name}/${___directory}`)
		embed.setTitle(`${___value}`);
		console.log(___value)
		if (___value == "status" || ___value == 'secrets' || ___value == 'want/needs/desire' || ___value == 'interest' || ___value == 'flaw-centric') {
			embed.setAuthor(`${___name}/${___directory}/${___subprocess}`)
		} else if (anime[__rank][___name][___directory][___value].story !== "" && ___value !== "physical") {
			embed.setDescription(`${anime[__rank][___name][___directory][___value].story}`)
		} else if (anime[__rank][___name][___directory][___value].physics.story !== "" && ___value == "physical") {
			embed.setDescription(`${anime[__rank][___name][___directory][___value].physics.story}`)
		}



		if (___value == 'identity' && anime[__rank][___name][___directory][___value].story) {
			embed.setDescription(anime[__rank][___name][___directory][___value].story);
			embed.addFields(
				{ name: `what ${grammar(___gender)} thinks about ${grammar_second(___gender)}?`, value: `that h'es ${parsearr(anime[__rank][___name][___directory][___value].link[0].define_as)}`, inline: true },
				{ name: `how freinds see ${grammar_second(___gender)}?`, value: `they think ${grammar(_gender)}'s ${parsearr(anime[__rank][___name][___directory][___value].link[0]["freinds-sees-him-as"])}`, inline: true },
				{ name: `how stranger see ${grammar_second(___gender)}?`, value: `they think ${grammar(_gender)}'s ${parsearr(anime[__rank][___name][___directory][___value].link[0]["stranger-sees-him-as"])}` }
			)
		} else if (___value == 'backstory & wound' && anime[__rank][___name][___directory][___value].story) {
			embed.setDescription(`${anime[__rank][___name][___directory][___value].story}`)
			if (anime[__rank][___name][___directory][___value].link[0].event_brouth !== "") {
				embed.setFooter(`this event brouth ${anime[__rank][___name][___directory][___value].link[0]["with?"][0].event_brouth} to ${grammar_second(___gender)}`)
			}
		} else if (___value == 'relationship') {
			embed.setDescription(`${anime[__rank][___name][___directory][___value].story}`)
			embed.addFields(
				{ name: `who are the closest freinds to ${grammar_second(___gender)}?`, value: `${parsearr(anime[__rank][___name][___directory][___value].link[0].closest)} are the closest to him`, inline: true }
			)
			if (anime[__rank][___name][___directory][___value].link[0].freinds) {
				embed.addFields({
					name: `who are his/her freinds?`,
					value: `${parsearr(anime[__rank][___name][___directory][___value].link[0].freinds)} are ${___name}'s current freinds`,
					inline: true
				})
			}
			if (anime[__rank][___name][___directory][___value].link[0]["love?"] !== "") {
				embed.addFields({
					name: `who do ${grammar(___gender)} loves`,
					value: `${grammar(___gender)} loves ${anime[__rank][___name][___directory][___value].link[0]["love?"]}, so cute ꈍ ꒳ ꈍ`,
					inline: true
				})
			}
			if (anime[__rank][___name][___directory][___value].link[0].major_spent_time !== []) {
				embed.addFields({
					name: `with who ${grammar(___gender)} spend must of her time with?`,
					value: `with ${parsearr(anime[__rank][___name][___directory][___value].link[0].major_spent_time)}`,
					inline: true
				})
			}
			if (anime[__rank][___name][___directory][___value].link[0].want_to_be_closer_to !== []) {
				embed.addFields({
					name: `with who he wants to be closer`,
					value: `with ${parsearr(anime[__rank][___name][___directory][___value].link[0].want_to_be_closer_to)}`,
					inline: true
				})
			}
		} else if (___value == 'education & finances') {
			embed.setDescription(`${anime[__rank][___name][___directory][___value].story}`)
			if (anime[__rank][___name][___directory][___value].link[0]["places?"] !== []) {
				embed.addFields({
					name: `in witch headquarter?`,
					value: `in ${parsearr(anime[__rank][___name][___directory][___value].link[0]["places?"])}`,
					inline: true
				})
			}
		} else if (___value == 'family') {
			embed.setDescription(`${anime[__rank][___name][___directory][___value].story}`)
		} else if (___value == 'emotional range') {
			if (anime[__rank][___name][___directory][___value].link[0].emotional == false) {
				embed.addFields({
					name: `is ${grammar(___gender)} emotional?`,
					value: `no, its d'osent looks like ${grammar(___gender)} is!`,
					inline: true
				})
			} else {
				embed.addFields({
					name: `is ${grammar(___gender)} emotional?`,
					value: `yes, ${grammar(___gender)} is emotional, so d'ont hurt him too much :)`,
					inline: true
				})
			}
			if (anime[__rank][___name][___directory][___value].link[0].hiding_feelings == false) {
				embed.addFields({
					name: `is ${grammar(___gender)} hiding ${grammar_third(___gender)}`,
					value: `no, ${grammar(___gender)}'s not hiding his feeling`,
					inline: true
				})
			} else {
				embed.addFields({
					name: `is ${grammar(___gender)} hiding ${grammar_third(___gender)}`,
					value: `yes, ${___name} is the type of person to hide his felling, just be sweeter with him!`,
					inline: true
				})
			}
		} else if (___value == 'skills & talents') {
			embed.setColor('#d62b39')
			if (anime[__rank][___name][___directory][___value].link[0].skills !== []) {
				embed.addFields({
					name: `what are ${grammar_third(___gender)} skills?`,
					value: `${grammar_third(___gender)} skills are ${parsearr(anime[__rank][___name][___directory][___value].link[0].skills)}`,
					inline: true
				})
			}
			if (anime[__rank][___name][___directory][___value].link[0].talents !== []) {
				embed.addFields({
					name: `what are ${grammar_third(___gender)} talents?`,
					value: `${grammar_third(___gender)} talents are ${parsearr(anime[__rank][___name][___directory][___value].link[0].talents)}`,
					inline: true
				})
			} else if (___value = 'physical') {
				embed.setDescription(`${anime[__rank][___name][___directory][___value].physics.story}`);
			}
		} else if (___value == 'physical') {
			embed.setColor('#f08a1d')
			embed.addFields(
				{ name: `${___name}'s heigth?`, value: `${anime[__rank][___name][___directory][___value].physics["heigth-inch"]} inch, \`(${anime[__rank][___name][___directory][___value].physics.heigth} cm)\``, inline: true },
				{ name: `${grammar_third(___gender)} age?`, value: `${grammar(___gender)}'s ${anime[__rank][___name][___directory][___value].physics["decreptated/age"]} **y/o**`, inline: true }
			)
			if (anime[__rank][___name][___directory][___value].physics.link[0].cute == true) {
				embed.addFields({
					name: `is ${grammar(___gender)} cute?`,
					value: `yes, ${grammar(___gender)}'s definitely cute <3`,
					inline: true
				})
			} else {
				embed.addFields({
					name: `is ${grammar(___gender)} cute?`,
					value: `um, no sorry, ${grammar(___gender)}'s maybe cute inside!`,
					inline: true
				})
			}
			if (anime[__rank][___name][___directory][___value].physics.link[0].hot == true) {
				embed.addFields({
					name: `is ${grammar(___gender)} hot/attractive?`,
					value: `yup, ${grammar(___gender)} is`,
					inline: true
				})
			} else {
				embed.addFields({
					name: `is ${grammar(___gender)} hot/attractive?`,
					value: `um, sorry, ${grammar(___gender)}'s not `,
					inline: true
				})
			}
		} else if (___value == 'powers/special-abilities') {
			embed = []
			for (var i = 0; i < Object.keys(anime[__rank][___name][___directory][___value].powers.link[0].powers).length; i++) {
				var embedcolor = `#`
				embedcolor += `${Math.floor(Math.random() * 16777215).toString(16)}`
				console.log(embedcolor)
				var temp = Object.keys(anime[__rank][___name][___directory][___value].powers.link[0].powers)
				embed.push(
					new MessageEmbed()
						.setThumbnail(`${anime[__rank][___name][___directory][___value].powers.link[0].powers[temp[i]].image}`)
						.setColor(`${embedcolor}`)
						.setTitle(`${anime[__rank][___name][___directory][___value].powers.link[0].powers[temp[i]].name}`)
						.setDescription(`**japanese name:**\`${anime[__rank][___name][___directory][___value].powers.link[0].powers[temp[i]].name_jp}\``)
						.addFields({
							name: `what does it do/how to use it?`,
							value: `${anime[__rank][___name][___directory][___value].powers.link[0].powers[temp[i]][`description/effects`]}`
						})
				)
				if (anime[__rank][___name][___directory][___value].powers.link[0].powers[temp[i]].big_big_big_image) {
					embed[i].setImage(`${anime[__rank][___name][___directory][___value].powers.link[0].powers[temp[i]].big_big_big_image}`)
				}
			}
			console.log(embed[0])
		} else if (___value == 'mentally/inside') {
			var ___temporary__debug = Object.keys(anime[__rank][___name][___directory][___value])
			var ___options = [];
			for (var i = 0; i < ___temporary__debug.length; i++) {
				if (anime[__rank][___name][___directory][___value][___temporary__debug[i]].story) {
					if (anime[__rank][___name][___directory][___value][___temporary__debug[i]].story !== "") {
						___options.push({
							label: `${___temporary__debug[i]}`,
							description: `${anime[__rank][___name][___directory][___value][___temporary__debug[i]].story.substring(0, 96)}...`,
							value: `${___temporary__debug[i]}`,
						})
					} else {
						___options.push({
							label: `${___temporary__debug[i]}`,
							description: `if possible, preview will be added later to ${___temporary__debug[i]}`,
							value: `${___temporary__debug[i]}`,
						})
					}
				} else {
					___options.push({
						label: `${___temporary__debug[i]}`,
						description: `if possible, preview will be added later to ${___temporary__debug[i]}`,
						value: `${___temporary__debug[i]}`,
					})
				}
			}
			var __NEW_row = new MessageActionRow()
				.addComponents(
					new MessageSelectMenu()
						.setCustomId('characters-anime-value')
						.setPlaceholder('Nothing selected')
						.addOptions(___options))

			interaction.reply({ content: `looks like you want to check what he has inside? :confounded:`, components: [__NEW_row] })
			execute_that = false
			characters_import([__rank, ___name, ___gender, ___prefix, ___directory, ___temporary__debug], globalimports)
		} else if (___value == 'status') {
			embed.setColor('#eb3434')
			if (anime[__rank][___name][___directory][___subprocess][___value].depressed == true) {
				embed.addFields({
					name: `is ${grammar(___gender)} depressed?`,
					value: `looks like yes, give ${grammar_second(___gender)} a hug! :pleading_face:\nthe command \`/hug\` is comming soon!`,
					inline: true
				})
			} else {
				embed.addFields({
					name: `is ${grammar(___gender)} depressed?`,
					value: `no, but that's not a reason to leave ${grammar_second(___gender)} alone!`,
					inline: true
				})
			}
			if (anime[__rank][___name][___directory][___subprocess][___value].lonely == true) {
				embed.addFields({
					name: `is ${grammar(___gender)} lonely?`,
					value: `yeah, that so sad, go talk a little bit to ${grammar_second(___gender)}!`,
					inline: true
				})
			} else {
				embed.addFields({
					name: `is ${grammar(___gender)} lonely?`,
					value: `no, but that's not a reason to leave ${grammar_second(___gender)} alone!`,
					inline: true
				})
			}
			if (anime[__rank][___name][___directory][___subprocess][___value].freindly == true) {
				embed.addFields({
					name: `is ${grammar(___gender)} freindly?`,
					value: `yeah, if you want to be freind with ${grammar_second(___gender)}, there nothing easier`,
					inline: true
				})
			} else {
				embed.addFields({
					name: `is ${grammar(___gender)} freindly?`,
					value: `no, but ${grammar(___gender)} maybe want a freind inside (>﹏<)`,
					inline: true
				})
			}
			if (anime[__rank][___name][___directory][___subprocess][___value].single == true) {
				embed.addFields({
					name: `is ${grammar(___gender)} single?`,
					value: `yes, you could be ${grammar_third(___gender)} futur partner, nah, just joking :yum:`,
					inline: true
				})
			} else {
				embed.addFields({
					name: `is ${grammar(___gender)} freindly?`,
					value: `${grammar(___gender)} has already a partner, too late for u :(`,
					inline: true
				})
			}
		} else if (___value == 'secrets') {
			embed.setColor('#ccff00')
			embed.setDescription(`${anime[__rank][___name][___directory][___subprocess][___value].story}`)
			if (anime[__rank][___name][___directory][___subprocess][___value].story == "") {
				embed.setDescription(`:warning: no value has been found, you can add one by pressing modify :warning:`)
			}
			if (anime[__rank][___name][___directory][___subprocess][___value].link[0]['shared-secrets'] !== []) {
				embed.addFields({
					name: `witch secret does ${grammar(___gender)} shares?`,
					value: `${grammar(___gender)} shared the secret about ${parsearr(anime[__rank][___name][___directory][___subprocess][___value].link[0]['shared-secrets'])}`,
					inline: true
				})
			}
			if (anime[__rank][___name][___directory][___subprocess][___value].link[0]['shared-secrets-with'] !== []) {
				embed.addFields({
					name: `with who does ${grammar(___gender)} share ${grammar_third(___gender)} secrets?`,
					value: `${grammar(___gender)} shares secrets with ${parsearr(anime[__rank][___name][___directory][___subprocess][___value].link[0]['shared-secrets-with'])}`,
					inline: true
				})
			}
		} else if (___value == 'want/needs/desire') {
			embed.setColor('#c074f5')
			if (anime[__rank][___name][___directory][___subprocess][___value].story !== "") {
				embed.setDescription(`${anime[__rank][___name][___directory][___subprocess][___value].story}`)
			} else {
				embed.setDescription(`:warning: no value avaible, try adding one!`)
			}
			if (anime[__rank][___name][___directory][___subprocess][___value].wants !== []) {
				embed.addFields({
					name: `what do ${grammar(___gender)} wants?`,
					value: `${grammar(___gender)} wants \`${parsearr(anime[__rank][___name][___directory][___subprocess][___value].wants)}\``,
					inline: true
				})
			}
			if (anime[__rank][___name][___directory][___subprocess][___value].needs !== []) {
				embed.addFields({
					name: `what do ${grammar(___gender)} needs?`,
					value: `${grammar(___gender)} needs \`${parsearr(anime[__rank][___name][___directory][___subprocess][___value].needs)}\``,
					inline: true
				})
			}


		} else if (___value == 'interest') {
			embed.setColor('#14ffb5')
			if (anime[__rank][___name][___directory][___subprocess][___value].story !== "") {
				embed.setDescription(`${anime[__rank][___name][___directory][___subprocess][___value].story}`)
			} else {
				embed.setDescription(`cannot fetch any data, no value is given.`)
			}
			if (anime[__rank][___name][___directory][___subprocess][___value].link[0]["interest-array"] !== []) {
				embed.addFields({
					name: `what are ${grammar_third(___gender)} interest?`,
					value: `${grammar_third(___gender)} interest are ${parsearr(anime[__rank][___name][___directory][___subprocess][___value].link[0]["interest-array"])}`
				})
			}
		} else if (___value == 'flaw-centric') {
			embed.setColor('#fc6603')
			if (anime[__rank][___name][___directory][___subprocess][___value].story !== "") {
				embed.setDescription(`${anime[__rank][___name][___directory][___subprocess][___value].story}`)
				embed.setFooter(`this section is not developed, becuz i d'ont understand the meaning of flaw-centric`)
			} else {
				embed.setDescription(`no content found!`)
			}
		} else if (___value == 'stress and pressure') {
			if (anime[__rank][___name][___directory][___value].story !== "") {
				embed.setDescription(`${anime[__rank][___name][___directory][___value].story}`)
			} else {
				embed.setDescription(`:no_entry: no content has been added :no_entry:`)
			}
			if (anime[__rank][___name][___directory][___value]["stressed-easely"] == true) {
				embed.addFields({
					name: `is ${grammar(___gender)} stressed easely?`,
					value: `yeah, ${grammar(___gender)} get stressed easely!`,
					inline: true
				})
			} else if (anime[__rank][___name][___directory][___value]["stressed-easely"] == false) {
				embed.addFields({
					name: `is ${grammar(___gender)} stressed easely?`,
					value: `no, ${grammar(___gender)} d'osent get stressed easely!`,
					inline: true
				})
			}
		} else if (___value == 'about me!') {
			interaction.reply('OMG shut the fuck up am telling everything to my senpai!')
		}
		if (execute_that == true) {
			if (Array.isArray(embed)) {
				interaction.reply({ embeds: embed, components: [row] })
			} else {
				interaction.reply({ embeds: [embed], components: [row] })
			}
		}

	} else if (interaction.customId.startsWith('pass characters-anime-select')) {
		var ___directory = interaction.values[0]
		var ___name = globalimports[0]
		var __rank = globalimports[1]
		var ___value = Object.keys(anime[__rank][___name][___directory])
		var list = []
		for (var i = 0; i < ___value.length; i++) {
			var toast_description;
			if (anime[__rank][___name][___directory][___value[i]].story) {
				toast_description = `${anime[__rank][___name][___directory][___value[i]].story}`
			} else if (___value[i] == 'powers/special-abilities') {
				toast_description = `${___name} has ${Object.keys(anime[__rank][___name][___directory][___value[i]].powers.link[0].powers).length} ${config.powers.isMultipleTempoTag}... ${parsearr(Object.keys(anime[__rank][___name][___directory][___value[i]].powers.link[0].powers))}`
			}
			toast_description = toast_description.substring(0, 97)
			toast_description += '...'
			var tempx = {
				label: `${___value[i]}`,
				description: `${toast_description}`,
				value: `${___value[i]}`,
			}
			list.push(tempx)
		}
		var row = new MessageActionRow().addComponents(
			new MessageSelectMenu()
			.setCustomId('characters-anime-value')
			.setPlaceholder('select the property you wanna view <3')
			.setOptions(list)
		)
		interaction.reply({ content: `:laughing: what the property you wanna view about **${grammar_third(anime[__rank][___name]['about me!'].gender)}**`, components: [row]})
		var ___prefix = grammar(anime[__rank][___name]['about me!'].gender)
		var ___gender = anime[__rank][___name]['about me!'].gender
		characters_import([__rank, ___name, ___gender, ___prefix, ___directory], globalimports)
	} else if (interaction.customId == 'pass next-select-value-create') {
		var __rank = globalimports[0]
		console.log(`${__rank} << rank`) 
		var ___name = globalimports[1]
		var ___gender = globalimports[2]
		var ___directory = interaction.values[0]
		if (___directory.startsWith('life of')) {
			___directory = `life of kunio-tojiro`
		}
		console.log(___directory + '!=' + ___name + '!+' + __rank + ' << debug')
		var ___avaible_values = Object.keys(anime.protagonist["kunio-tojiro"][___directory])
		var list = []
		for (var i = 0; i < ___avaible_values.length; i++) {
			toast_description = `description comming soon...`
			if (___avaible_values[i] == `identity`) {
				toast_description = `what ${grammar(___gender)} think about ${grammar_second(___gender)}, others stuff`
			} else if (___avaible_values[i] == `backstory & wound`) {
				toast_description = `i d'ont understand the meaning`
			} else if (___avaible_values[i] == `relationship`) {
				toast_description = `his freinds, the people ${grammar(___gender)} loves`
			} else if (___avaible_values[i] == `education & finances`) {
				toast_description = `the way ${grammar(___gender)} got educated, is he poor or rich`
			} else if (___avaible_values[i] == `family`) {
				toast_description = `${grammar_third(___gender)} family story`
			} else if (___avaible_values[i] == `emotional range`) {
				toast_description = `idk i d'ont understand the meaning`
			} else if (___avaible_values[i] == `skills & talents`) {
				toast_description = `his skills and talents u dummy`
			} else {
				// am an cpu expansive task
			}
			console.log(scanKeys("protagonist", "kunio-tojiro", ___directory, ___avaible_values[i]))
			var tempx = {
				label: `${___avaible_values[i]}`,
				description: `${toast_description}`,
				value: `${___avaible_values[i]}`
			}
			list.push(tempx)
		}
		var row = new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId(`create-chr`).setPlaceholder('select at least one property that will be added...').addOptions(list))
		interaction.update({ content: `:computer: select the property you want to add to your character!`, components: [row]})
		characters_import([__rank, ___name, ___directory])
	} else if (interaction.customId.startsWith('create-chr')) {
		var __rank = globalimports[0]
		console.log(__rank)
		var ___name = globalimports[1]
		var ___directory = globalimports[2]
		var ___value = interaction.values[0]
		var tempdir = ___directory
		if (___directory.startsWith('life of')) {
			___directory = 'life of kunio-tojiro'
		}
		var setup = anime.protagonist["kunio-tojiro"][___directory][___value]
		var buttons = []
		buttons.push(new MessageButton().setCustomId("change-branch").setLabel("quick exit!").setStyle("SECONDARY"))
		buttons.push(new MessageButton().setCustomId("editor-process").setLabel("enable stream!").setStyle("SUCCESS"))
		const row = new MessageActionRow().setComponents(...buttons)
		interaction.update({ content: `:warning: **switch data mode to stream** :warning:\nwe require the user action to change to interaction type to \`stream\`\n\`required permission: use interaction.editReply()\`\nuse the button below to switch the interaction type!`, components: [row]})
		propertyImport([__rank, ___name, ___directory, ___value]) // this importing function is ONLY AND STRICTELY made for DATA CREATION OR MODIFYING IN A CHARACTER
	}
	// global code down here
});
var storage = []
function propertyImport(database) {
	storage = []
	for (var i = 0; i < database.length; i++) {
		storage.push(database[i])
	}
}


function contentEditorBuilder(interaction, setup, __rank, ___name, ___directory, ___value) {
	var keys = scanKeys(anime[__rank, ___name, ___directory, ___value])
	return keys
}
// content editor
function stringEditorBuilder(interaction, __rank, ___name, ___directory, ___value, string, ___subprocess) {
	var buttons = []
	buttons.push(new MessageButton().setCustomId("compile").setLabel("compile & add").setStyle("SUCCESS"))
	buttons.push(new MessageButton().setCustomId("abort process!").setLabel("abort process!").setStyle("DANGER"))
	buttons.push(new MessageButton().setCustomId("unmount").setLabel("unmount").setStyle("SECONDARY"))
	buttons.push(new MessageButton().setCustomId("create-np").setLabel("->").setStyle("PRIMARY"))
	var row = new MessageActionRow().setComponents(...buttons)
	interaction.update({ content: 'hy', components: [row]})
	pointer = 0
}
// buttons function

client.on('interactionCreate', async (interaction, message, channel, args, love, you, naomi) => {
	if (!interaction.isButton()) return;
	commandisused()

	if (interaction.customId == 'confnextforname') {
		_name = input[0]
		if (_name == undefined) {
			_name = `Hano Michiko`
		}
		if (_name !== "") {
			await interaction.update(`:envelope_with_arrow: something was received to our server!`)
			await new Promise(resolve => setTimeout(resolve, 1000))
		}
		await interaction.editReply(`*your character name is ${_name}, great start, l'et go to something else!*`)
		await new Promise(resolve => setTimeout(resolve, 2000))
		const button1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('confnextforage')
					.setLabel('confirm age input!')
					.setStyle('SECONDARY'),
			);
		await interaction.editReply({ content: ':magnet: **great start :)**', components: [button1] })
		await new Promise(resolve => setTimeout(resolve, 1000))
		var animation = [":man_scientist:", ":woman_detective:", ":man_teacher:", ":singer:", ":technologist:", ":woman_with_headscarf:", ":man_supervillain:"]
		for (var i = 0; i < animation.length; i++) {
			await interaction.editReply(animation[i] + ' type the **age** of you character\nremember to use `/send <age here>` to sent it to the server')
			await new Promise(resolve => setTimeout(resolve, 500))
		}
		await interaction.editReply(':man_supervillain: type the **age** of you character\nremember to use `/send <age here>` to sent it to the server')
	} else if (interaction.customId == 'confnextforage') { // age
		_age = input[0]
		await interaction.update(`:yum: nice, your character is ${_age} year old!`)
		await new Promise(resolve => setTimeout(resolve, 1000))
		await interaction.editReply(`[###            ] server pinging`)
		await new Promise(resolve => setTimeout(resolve, 500))
		await interaction.editReply(`[    ###        ] server pinging`)
		await new Promise(resolve => setTimeout(resolve, 500))
		await interaction.editReply(`[           ### ] server pinging`)
		await interaction.editReply(`[=>            ] next step: **gender**`)
		await new Promise(resolve => setTimeout(resolve, 1000))
		await interaction.editReply(`[====>         ] next step: **gender**`)
		await new Promise(resolve => setTimeout(resolve, 1000))
		await interaction.editReply(`[=========>    ] next step: **gender**`)
		await new Promise(resolve => setTimeout(resolve, 1000))
		await interaction.editReply(`[==============] next step: **gender**`)
		await new Promise(resolve => setTimeout(resolve, 1000))
		const button1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('confnextforgen')
					.setLabel('confirm character gender!')
					.setStyle('SECONDARY'),
			);
		await interaction.editReply({ content: 'set the gender of the **character** :), type it below\nremember to use `/send <gender>` to communicate with server!\n:information_source: compaible types to write: `girl, boy or male, female`', components: [button1] })
	} else if (interaction.customId == 'confnextforgen') { // next
		_gender = reconvgen(input[0])
		if (_gender !== 'boy' && _gender !== 'girl' && _gender !== 'male' && _gender !== 'female') {
			interaction.reply(':no_entry: **please enter a valid gender**\n:information_source: if you are sure that you entered the rigth keyword, its may be a bug, all valid keyworkd are `boy, girl, male, female , captial letters are not accepted => Boy, Girl, Male, Female`')
			await new Promise(resolve => setTimeout(resolve, 4500))
			interaction.deleteReply()
		} else if (_gender == 'boy' || _gender == 'girl' || _gender == 'male' || _gender == 'female') {
			interaction.update(`:pleading_face: ${grammar(_gender)}'s a ${convgen(_gender)}, hope ${grammar(_gender)}'s cute <3`)
			const button1 = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId('confnextforid')
					.setLabel('confirm character identity!')
					.setStyle('SECONDARY'),
			);
			await new Promise(resolve => setTimeout(resolve, 2000))
			interaction.editReply({ content: 'what do he thinks **about him**, and what **others people** think about him!\nsend the story to the server `/send <text here>`...\n:information_source: click on the confirm button if you want to leave it empty', components: [button1] })
		}
	} else if (interaction.customId == 'confnextforid') {
		temporarydata.push(input[0])
		const button1 = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('confnextforid')
				.setLabel('modify!')
				.setStyle('SECONDARY'),
		);
		const button2 = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('confnextforchange1')
				.setLabel('confirm and continue!')
				.setStyle('SUCCESS'),
		);
		interaction.update({ content: `:envelope_with_arrow: that what we got :)\n\`${input[0]}\`\nwanna change it, use \`/send <new story>\` to change it now, than press modify!`, components: [button1, button2] })
	} else if (interaction.customId == 'confnextforchange1') {
		const button1 = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('confnextforpassions')
				.setLabel('send and confirm passions!')
				.setStyle('SUCCESS'),
		);
		const button2 = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('smid')
				.setLabel('add passions!')
				.setStyle('SECONDARY'),
		);
		globalpassions = []
		temporarydata.push(input[0])
		interaction.update(':white_check_mark: `we pushed everything you said to the server...`')
		await new Promise(resolve => setTimeout(resolve, 2000))
		var characterpassion = []
		var animation = [':fork_and_knife:', ':thunder_cloud_rain:', ':boom:', ':cherry_blossom:', ':person_running:', ':mahjong:', ':desktop:']
		for (var i = 0; i < animation.length; i++) {
			interaction.editReply({ content: `${animation[i]} write ${_name}'s current passions! what ${grammar(_gender)} likes doing?\n\`\`\`no content found! try adding some <3\`\`\`\nremember to use \`/send <passions>\` to send passion, and send one at a time than click add`, components: [button1, button2] })
			await new Promise(resolve => setTimeout(resolve, 1000))
		}
	} else if (interaction.customId == 'smid') {
		globalpassions.push(input[0])
		const button1 = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('confnextforpassions')
				.setLabel('send and confirm passions!')
				.setStyle('SUCCESS'),
		);
		const button2 = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('smid')
				.setLabel('add passions!')
				.setStyle('SECONDARY'),
		);
		const button3 = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('confnextforchange1')
				.setLabel('reset passions :(')
				.setStyle('DANGER'),
		);
		interaction.update({ content: `:desktop: write ${_name}'s current passions! what ${grammar(_gender)} likes doing?\n\`\`\`${parsearr(globalpassions)}\`\`\`\n:white_check_mark: yeah boi, we've got that one`, components: [button1, button2, button3] })
		await new Promise(resolve => setTimeout(resolve, 1000))
		interaction.editReply({ content: `:desktop: write ${_name}'s current passions! what ${grammar(_gender)} likes doing?\n\`\`\`${parsearr(globalpassions)}\`\`\`\nremember to use \`/send <passions>\` to send passion, and send one at a time than click add passion`, components: [button1, button2, button3] })
	} else if (interaction.customId == 'confnextforpassions') {
		if (globalpassions.length == 0) {
			interaction.reply(`:no_entry: sorry, you should at least write 1 passions\n:information_source: try writing his favourite hobbies \`ex: manga, tv, etc...\`\n:cockroach: found a bug! report it by private messaging the developer [@saubecity]`)
			await new Promise(resolve => setTimeout(resolve, 4500))
			interaction.deleteReply()
		} else if (globalpassions.length !== 0) {
			interaction.editReply()
			// back up here
		}
	} else if (interaction.customId == 'sendreport') {
		interaction.deferReply()
		interaction.editReply('updating...')
		var loading = ['-', '\\', '|', '/']
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 4; j++) {
				interaction.editReply(`send **your** documents :pleading_face: ${loading[j]}`)
				await new Promise(resolve => setTimeout(resolve, 500))
			}
		}
	} else if (interaction.customId == 'close-search') {
		interaction.channel.bulkDelete(5)
	} else if (interaction.customId == 'change-branch') {
		interaction.update({ content: `-register at \`${Math.floor(Math.random()*16777215)}?\` to \`${url}/request\` --http-endpoint`, components: []})
		interaction.deleteReply()
	} else if (interaction.customId.startsWith('pass new-menu')) {
		var button = globalimports[0]
		var characters = globalimports[1]
		var directory = globalimports[2]
		var __rank = globalimports[3]
		var next_characters = globalimports[4]
		if (next_characters == undefined) {
			next_characters = characters
		}
		var id = interaction.customId
		var buttons = {
			"manager": {
				"row": 0
			}
		}
		var row_string_id = id.match(/\d/g)
		var row_int_id = parseInt(row_string_id)
		buttons.manager.row = row_int_id
		var _switch = true
		if (button[buttons.manager.row].length > 3) {
			_switch = false
		}
		console.log(button.length)
		console.log(buttons.manager.row)
		console.log(button)
		switch (_switch) {
			case true:
				var buttons_private_class = []
				buttons_private_class.push(new MessageButton())
				buttons_private_class[0].setCustomId(`pass as-normal ${buttons.manager.row}`)
				buttons_private_class[0].setLabel(`view as complete character`)
				buttons_private_class[0].setStyle('SECONDARY')
				buttons_private_class.push(new MessageButton())
				buttons_private_class[1].setCustomId(`pass deletechr ${buttons.manager.row}`)
				buttons_private_class[1].setLabel(`DELETE character!`)
				buttons_private_class[1].setStyle('DANGER')
				button[buttons.manager.row].push(buttons_private_class)
				break;
			case false:
				button[buttons.manager.row].pop()
		}
		const row = []
		for (var i = 0; i < button.length; i++) {
			row.push(
				new MessageActionRow()
					.addComponents(button[i])
			)
		}
		characters_import([button, characters, directory, __rank, next_characters, buttons.manager.row], globalimports)
		interaction.update({ content: `:pleading_face: those character are the verions 2.0 of the API`, components: row})
		if (button == []) {
			interaction.editReply(`:warning: could not fetch those characters :warning:`)
			await new Promise(resolve => setTimeout(resolve, 2000))
			interaction.deleteReply()
		}
	} else if (interaction.customId.startsWith('pass next-page')) {
		var buttons = globalimports[0]
		var characters = globalimports[1]
		var directory = globalimports[2]
		var __rank = globalimports[3]
		var next_characters = characters;
		if (next_characters.length >= 4) {
			for (var i = 0; i < 4; i++) {
				next_characters.shift()
			}
		}
		console.log(next_characters)
		var buttons = []
		for (var i = 0; i < next_characters.length; i++) {
			var buttons_private_class = []
			if (i < 4) {
				buttons_private_class.push(new MessageButton())
				buttons_private_class[0].setCustomId(`pass ch-list ${[i]}`)
				buttons_private_class[0].setLabel(`${next_characters[i]}`)
				buttons_private_class[0].setStyle('SECONDARY')
				buttons_private_class.push(new MessageButton())
				buttons_private_class[1].setCustomId(`pass add-ch-list ${i}`)
				buttons_private_class[1].setLabel(`+`)
				buttons_private_class[1].setStyle('SUCCESS')
				buttons_private_class.push(new MessageButton())
				buttons_private_class[2].setCustomId(`pass new-menu ${i}`)
				buttons_private_class[2].setLabel(`•••`)
				buttons_private_class[2].setStyle('PRIMARY')
				buttons.push(buttons_private_class)
			} else if (i == 4) {
				page = 4
				buttons_private_class.push(new MessageButton())
				buttons_private_class[0].setCustomId(`pass last-page ${i}`)
				buttons_private_class[0].setLabel(`<-`)
				buttons_private_class[0].setStyle('DANGER')
				buttons_private_class.push(new MessageButton())
				buttons_private_class[1].setCustomId(`change-branch`)
				buttons_private_class[1].setLabel(`change rank!`)
				buttons_private_class[1].setStyle('PRIMARY')
				buttons_private_class.push(new MessageButton())
				buttons_private_class[2].setCustomId(`pass next-page ${i}`)
				buttons_private_class[2].setLabel(`->`)
				buttons_private_class[2].setStyle('DANGER')
				buttons.push(buttons_private_class)
			} else {
				console.warn(`no passed by`)
			}
		}
		if (next_characters.length <= 4) {
			console.log(`passed by`)
			var buttons_private_class = []
			buttons_private_class.push(new MessageButton())
			buttons_private_class[0].setCustomId(`pass last-page ${i}`)
			buttons_private_class[0].setLabel(`<-`)
			buttons_private_class[0].setStyle('SECONDARY')
			buttons_private_class.push(new MessageButton())
			buttons_private_class[1].setCustomId(`change-branch`)
			buttons_private_class[1].setLabel(`change rank!`)
			buttons_private_class[1].setStyle('PRIMARY')
			buttons.push(buttons_private_class)
		}
		const row = []
		for (var i = 0; i < buttons.length; i++) {
			row.push(
				new MessageActionRow()
					.addComponents(buttons[i])
			)
		}
		next_characters = characters
		// row 
		interaction.update({ content: `:pleading_face: those character are the verions 2.0 of the API`, components: row})
		characters_import([buttons, characters, directory, __rank, next_characters], globalimports)
	} else if (interaction.customId.startsWith('pass deletechr')) {
		var buttons = []
		var buttons_private_class = []
		buttons_private_class.push(new MessageButton())
		buttons_private_class[0].setCustomId(`change-branch`)
		buttons_private_class[0].setLabel(`no, leave him alive!`)
		buttons_private_class[0].setStyle('SECONDARY')
		buttons_private_class.push(new MessageButton())
		buttons_private_class[1].setCustomId(`send-delete-request`)
		buttons_private_class[1].setLabel(`send delete request :(`)
		buttons_private_class[1].setStyle('DANGER')
		buttons = buttons_private_class
		var characters = globalimports[1]
		var directory = globalimports[2]
		var __rank = globalimports[3]
		var next_characters = globalimports[4]
		var pointer = globalimports[5]
		console.log(next_characters)
		var __name = interaction.customId
		const row = new MessageActionRow()
			.addComponents(buttons_private_class);
		var data = {
			"request": {
				"content": `:no_entry: you are now requesting the deletation from the \`${__rank} rank\` :no_entry: \nclick on \`confirm\` to send the following deletation request!\n\`\`\`sent by ${interaction.user.tag}, further information are ${interaction.createdAt}\n${interaction.user.tag} requested the deletation of ${next_characters[pointer]}\n\n this file will be send to saubecity's server at boukert.saubecity.repl.co, you may be private message to make its you who is trying to delete ${next_characters[pointer]}\`\`\`:information_source: its recomended to private message anyone of @Dev to make sure we read your request`
			}
		}
		interaction.update({content: data.request.content, components: [row]})
		characters_import([buttons_private_class, characters, directory, __rank, next_characters, pointer, data.request.content], globalimports)
	} else if (interaction.customId == 'send-delete-request') {
		var characters = globalimports[1]
		var directory = globalimports[2]
		var __rank = globalimports[3]
		var next_characters = globalimports[4]
		var pointer = globalimports[5]
		var tempdata;
		var data_file = {
			"request": {
				"original": {
					"file": fs.readFile('./reports/request-delete.txt', 'utf-8', function(data) {tempdata = data})
				},
				"new": {
					"file": globalimports[6]
				}
			}
		}
		tempdata+= `\n\n${data_file.request.new.file}`
		data_file.request.new.file = tempdata
		fs.writeFile(`./reports/deleting-request/request-delete-${Math.floor(Math.random()*16777215).toString(16)}-${interaction.user.tag}.txt`, data_file.request.new.file, (err) => {
			if (err) {
				interaction.reply(`:interaction_failed: an error occured, please content a developer about the bug!`)
			} else {
				var buttons_private_class = []
				buttons_private_class.push(new MessageButton())
				buttons_private_class[0].setCustomId(`change-branch`)
				buttons_private_class[0].setLabel(`quit this menu!`)
				buttons_private_class[0].setStyle('SECONDARY')
				const row = new MessageActionRow()
			      .addComponents(buttons_private_class);
				interaction.update({ content:`:white_check_mark: succesfully sent the request to \`${url}\``, components: [row]})
			}
		})
	} else if (interaction.customId.startsWith('pass ch-list')) {
		console.log(`interaction began!`)
		var buttons;
		// omg so fucking complicated am so tired i have no fucking life i just wanna die
		var characters = globalimports[1]
		var directory = globalimports[2]
		var __rank = globalimports[3]
		var next_characters = globalimports[4]
		console.log(pointer)
		var pointer = globalimports[5]
		var ___name;
		switch (pointer) {
			case undefined:
				console.log(`${interaction.customId}`)
				pointer = interaction.customId.match(/\d/g)
				var temp_pointer = parseInt(pointer);
				pointer = temp_pointer
				console.log(pointer)
				break;
			case pointer > 0:
				pointer = next_characters[pointer]
		}
		console.log(`${pointer} points a character`)
		if (next_characters == undefined || next_characters == NaN) {
			console.log(`passed by this :P`)
			next_characters = characters
			___name = characters[pointer]
		} else {
			___name = next_characters[pointer]
		}
		console.log(`${next_characters} << debug`)
		console.log(`${___name}`)
		var list = []
		if (anime[__rank][___name][`life of ${___name}`]) {
			var tempx = {
				label: `life of ${___name}`,
				description: `${Object.keys(anime[__rank][___name][`life of ${___name}`]).length} directories...avaible about ${grammar_third(anime[__rank][___name]['about me!'].gender)} life!`,
				value: `life of ${___name}`,
			}
			list.push(tempx)
		}
		if (anime[__rank][___name]['personality']) {
			var tempx = {
				label: `personality`,
				description: `${Object.keys(anime[__rank][___name][`personality`]).length} directories...avaible about ${grammar_third(anime[__rank][___name]['about me!'].gender)} personality!`,
				value: `personality`,
			}
			list.push(tempx)
		}
		if (anime[__rank][___name]['characteristics']) {
			var tempx = {
				label: `characteristics`,
				description: `${Object.keys(anime[__rank][___name][`characteristics`]).length} directories...avaible about ${grammar_third(anime[__rank][___name]['about me!'].gender)} characteristics <3`,
				value: `characteristics`,
			}
			list.push(tempx)
		}
		if (anime[__rank][___name][`life of ${___name}`]) {
			if (anime[__rank][___name][`life of ${___name}`].identity && anime[__rank][___name][`life of ${___name}`].relationship.link[0].freinds && anime[__rank][___name][`personality`]['skills & talents'].link[0].skills && anime[__rank][___name]['characteristics'].physical.physics)  {
				var tempx = {
					label: `about me!`,
					description: `hy, my name is ${___name}, am a ${anime[__rank][___name]['about me!'].age} y/o ${convgen(anime[__rank][___name]['about me!'].gender)}...`,
					value: `about me!`,
				}
				list.push(tempx)
			}
		}
		console.log(list)
		const row = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
				.setCustomId('pass characters-anime-select')
				.setPlaceholder('Nothing selected')
				.addOptions(list),
		);
		if (list.length == 0) {
			var contextcont = `:sob: this character exist, but does not have any property\n\n**need some help:**\nthis mean this character does not have any freinds, relationship, or data, you can add data useing the \`+\` button:\nhttps://boukert.saubecity.repl.co/resquest/jp-nc/sekaii-no-hana/sdk/support/images/addvalue\nsome more innformation are:\n\`\`\`cs\nat sekaii #Objects.keys(anime[__rank][__name]).length == 0 <<<\nthere should be at least one value inside the character\n\noccured in ${interaction.channel.name} at ${interaction.createdAt}\nint #Objects.keys(anime[__rank][__name]).length >> 0\nint #Objects.keys(anime[__rank][__name]).length should be >> 1 or more\n\`\`\`\n:information_source: contact anyone of @dev if this seems chinese for u!`
			interaction.update({ content: contextcont, components: []})
			await new Promise(resolve => setTimeout(resolve, 1000))
			for (var i = 0; i < 49; i++) {
			contextcont = `:sob: this character exist, but does not have any property\n\n**need some help:**\nthis mean this character does not have any freinds, relationship, or data, you can add data useing the \`+\` button:\nhttps://boukert.saubecity.repl.co/resquest/jp-nc/sekaii-no-hana/sdk/support/images/addvalue\nsome more innformation are:\n\`\`\`cs\nat sekaii #Objects.keys(anime[__rank][__name]).length == 0 <<<\nthere should be at least one value inside the character\n\noccured in ${interaction.channel.name} at ${interaction.createdAt}\nint #Objects.keys(anime[__rank][__name]).length >> 0\nint #Objects.keys(anime[__rank][__name]).length should be >> 1 or more\n\`\`\`\n:information_source: contact anyone of @dev if this seems chinese for u!\n:radioactive: this message will delete itself in \`${49 - i}\` seconds <3`
			interaction.editReply(`${contextcont}`)
			await new Promise(resolve => setTimeout(resolve, 1000))
			}
			interaction.deleteReply()
			// my disappointment are immeasurable and my day is ruined :(
		} else {
			interaction.update({ content: `:heart: okay, you want to know more about ${___name}!`, components: [row]})
		}
		characters_import([___name, __rank])
	} else if (interaction.customId.startsWith('pass add-ch-list')) {
		used = process.memoryUsage().heapUsed / 1024 / 1024;
		propertyPointer = 0
		var buttons;
		// omg so fucking complicated am so tired i have no fucking life i just wanna die
		var list = []
		var characters = globalimports[1]
		var directory = globalimports[2]
		var __rank = globalimports[3]
		var gender;
		var next_characters = globalimports[4]
		console.log(pointer)
		var pointer = globalimports[5]
		var ___name;
		switch (pointer) {
			case undefined:
				console.log(`${interaction.customId}`)
				pointer = interaction.customId.match(/\d/g)
				var temp_pointer = parseInt(pointer);
				pointer = temp_pointer
				console.log(pointer)
				break;
			case pointer > 0:
				pointer = next_characters[pointer]
		}
		if (next_characters == undefined || next_characters == NaN) {
			console.log(`passed by this :P`)
			next_characters = characters
			___name = characters[pointer]
		} else {
			___name = next_characters[pointer]
		}
		console.log(__rank + ' ' + ___name)
		if (anime[__rank][___name]['about me!']) {
			gender = anime[__rank][___name]['about me!'].gender
		} else {
			gender = 'male'
			interaction.user.send(`:warning: this character does not have the required properties to be displayed, requires \`about me!\`\n`)
		}
		used = process.memoryUsage().heapUsed / 1024 / 1024;
		var __directories = [`life of ${___name}`, 'personality', 'characteristics', 'about me!']
		var __directories_origin = [`life of kunio-tojiro`, 'personality', 'characteristics']
		for (var i = 0; i < __directories.length; i++) {
			var toast_description
			if (__directories[i] == `life of ${___name}`) {
				toast_description = `add stuff about ${grammar_third(gender)} life, such as ${parsearr(Object.keys(anime.protagonist["kunio-tojiro"]["life of kunio-tojiro"]))}`
			} else if (__directories[i] == `personality`) {
				toast_description = `add properties about ${grammar_third(gender)} personality, such as ${parsearr(Object.keys(anime.protagonist["kunio-tojiro"]["personality"]))}`
			} else if (__directories[i] == `characteristics`) {
				toast_description = `add properties about ${grammar_third(gender)} characteristics, such as ${parsearr(Object.keys(anime.protagonist["kunio-tojiro"]["characteristics"]))}`
			} else if (__directories[i] == 'about me!') {
				toast_description = `modify ${grammar_third(gender)} about me!, such as name!`
			}
			toast_description = toast_description.substring(0, 97)
			toast_description += '...'
			var tempx = {
				label: `${__directories[i]}`,
				description: `${toast_description}`,
				value: `${__directories[i]}`
			}
			list.push(tempx)
		}
		var row = new MessageActionRow().addComponents(
			new MessageSelectMenu()
			.setCustomId('pass next-select-value-create')
			.setPlaceholder('where do you want to add your value!')
			.addOptions(list)
		)
		interaction.update({ content: `:yum: in witch category you want to add your property?\nur are the following directory \`${__rank}/${___name}\``, components: [row]})
		characters_import([__rank, ___name, gender])
	} else if (interaction.customId.startsWith('editor-process')) {
		used = process.memoryUsage().heapUsed / 1024 / 1024;
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory =  storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var ___value = storage[3]
		var types = scanKeys("protagonist", "kunio-tojiro", ___directory, ___value)
		var editorRowButtons = []
		var isCurrentEditing;
		isCurrentEditing = types[propertyPointer].value
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		if (typeof types[propertyPointer].value === "string") {
			editorRowButtons.push(new MessageButton().setCustomId('cc-string-replace').setLabel("Replace").setStyle("SUCCESS"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-string-add').setLabel("+=").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-string-backspace').setLabel("Backspace").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-string-fetch-word-remove').setLabel("Remove a word").setStyle("PRIMARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-string-reset').setLabel("Reset").setStyle("DANGER"))
			types[propertyPointer].value = ""
			var displayedString;
			if (types[propertyPointer].value.length <= 1763) {
				displayedString = types[propertyPointer].value.substring(types[propertyPointer].value.length - 1600, types[propertyPointer].value.length)
			}
			displayedString+= `**data type:**\`string\`   **string length**:\`    ${types[propertyPointer].value.length}`
			displayedString+= `\n**value key:** ${types[propertyPointer].key}`
			displayedString+= `\n\`\`\`cs\n`
			if (types[propertyPointer].value.length == 0) {
				displayedString+= `try writing something, use the "/send" command to send data to here!`
			} else {
				displayedString+= `${types[propertyPointer].value}`
			}
			
		} else if (typeof types[propertyPointer].value === "boolean") {
			editorRowButtons.push(new MessageButton().setCustomId('cc-boolean-switch').setLabel("T/F").setStyle("PRIMARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-boolean-false').setLabel("false").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-boolean-true').setLabel("true").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-boolean-random').setLabel("random").setStyle("SECONDARY").setDisabled(true))
			var displayedString;
			types[propertyPointer].value = false
			if (types[propertyPointer].value.length <= 1763) {
				displayedString = types[propertyPointer].value.substring(types[propertyPointer].value.length - 1600, types[propertyPointer].value.length)
			}
			displayedString+= `**data type:**\`boolean\``
			displayedString+= `\n**value key:** ${types[propertyPointer].key}`
			displayedString+= `\n\`\`\`cs\n`
			displayedString+= `# > ${types[propertyPointer].value} < #\`\`\``
			displayText+= displayedString
		} else if (typeof types[propertyPointer].value === "number") {
			editorRowButtons.push(new MessageButton().setCustomId('cc-number-equal').setLabel("=").setStyle("SUCCESS"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-number-add').setLabel("+=").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-number-remove').setLabel("-=").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-number-supadd-single').setLabel("+").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-number-supremove-single').setLabel("-").setStyle("SECONDARY"))
			var displayedString;
			types[propertyPointer].value = 0
			if (types[propertyPointer].value.length <= 1763) {
				displayedString = types[propertyPointer].value.substring(types[propertyPointer].value.length - 1600, types[propertyPointer].value.length)
			}
			displayedString+= `**data type:**\`number\``
			displayedString+= `\n**value key:** ${types[propertyPointer].key}`
			displayedString+= `\n\`\`\`cs\n`
			displayedString+= `> ${types[propertyPointer].value} <\`\`\``
			displayText+= displayedString
		} else if (types[propertyPointer].value instanceof Array) {
			editorRowButtons.push(new MessageButton().setCustomId('cc-array-replace').setLabel("replace").setStyle("PRIMARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-array-push').setLabel("push").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-array-unshift').setLabel("unshift").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-array-pop').setLabel("pop").setStyle("DANGER"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-array-shift').setLabel("shift").setStyle("DANGER"))
			var displayedString;
			displayedString += `**data type:**\`array/list\``
			displayedString += `\n**value key:** ${types[propertyPointer].key}`
			displayedString += `\n\`\`\`cs\n`
			for (var i = 0; i < types[propertyPointer].value.length; i++) {
				displayedString+= `${types[propertyPointer].value[i]} ! object with #length of ${types[propertyPointer].value[i].length}\n`
			}
			displayedString+= `\`\`\``
			displayText += displayedString
		}
		console.log(editorRowButtons.length)
		var editorRow = new MessageActionRow().addComponents(...editorRowButtons)
		var buttons_private_class = []
		buttons_private_class.push(new MessageButton().setCustomId('cc-abort').setLabel('abort process :(').setStyle('DANGER'))
		buttons_private_class.push(new MessageButton().setCustomId('cc-compile').setLabel('save & compile').setStyle('SUCCESS'))
		buttons_private_class.push(new MessageButton().setCustomId('cc-preview').setLabel('preview').setStyle('SECONDARY').setDisabled(true))
		buttons_private_class.push(new MessageButton().setCustomId('cc-np').setLabel('->').setStyle('SECONDARY'))
		var row = new MessageActionRow().addComponents(...buttons_private_class)
		var container = [row]
		if (editorRowButtons.length !== 0) {
			container.push(editorRow)
		}
		interaction.update({ content: `${displayText}`, components: container})
		propertyImport([__rank, ___name, ___directory, ___value, types])

		
	} else if (interaction.customId.startsWith('cc-np')) {
		used = process.memoryUsage().heapUsed / 1024 / 1024;
		propertyPointer++
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory =  storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		var editorRowButtons = []
		if (typeof types[propertyPointer].value === "string") {
			editorRowButtons.push(new MessageButton().setCustomId('cc-string-replace').setLabel("Replace").setStyle("SUCCESS"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-string-add').setLabel("+=").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-string-backspace').setLabel("Backspace").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-string-fetch-word-remove').setLabel("Remove a word").setStyle("PRIMARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-string-reset').setLabel("Reset").setStyle("DANGER"))
			var displayedString;
			if (types[propertyPointer].value.length <= 1763) {
				displayedString = types[propertyPointer].value.substring(types[propertyPointer].value.length - 1600, types[propertyPointer].value.length)
			}
			displayedString+= `**data type:**\`string\`   **string length**:\`${types[propertyPointer].value.length}`
			displayedString+= `\n**value key:** ${types[propertyPointer].key}`
			displayedString+= `\n\`\`\`cs\n`
			if (types[propertyPointer].value.length == 0) {
				displayedString+= `try writing something, use the "/send" command to send data to here!\`\`\``
			} else {
				displayedString+= `${types[propertyPointer].value}\`\`\``
			}
			displayText+= displayedString
		} else if (typeof types[propertyPointer].value === "boolean") {
			editorRowButtons.push(new MessageButton().setCustomId('cc-boolean-switch').setLabel("T/F").setStyle("PRIMARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-boolean-false').setLabel("false").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-boolean-true').setLabel("true").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-boolean-random').setLabel("random").setStyle("SECONDARY").setDisabled(true))
			var displayedString;
			if (types[propertyPointer].value.length <= 1763) {
				displayedString = types[propertyPointer].value.substring(types[propertyPointer].value.length - 1600, types[propertyPointer].value.length)
			}
			displayedString+= `**data type:**\`boolean\``
			displayedString+= `\n**value key:** ${types[propertyPointer].key}`
			displayedString+= `\n\`\`\`cs\n`
			displayedString+= `# > ${types[propertyPointer].value} < #\`\`\``
			displayText+= displayedString
		} else if (typeof types[propertyPointer].value === "number") {
			editorRowButtons.push(new MessageButton().setCustomId('cc-number-equal').setLabel("=").setStyle("SUCCESS"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-number-add').setLabel("+=").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-number-remove').setLabel("-=").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-number-supadd-single').setLabel("+").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-number-supremove-single').setLabel("-").setStyle("SECONDARY"))
			var displayedString;
			if (types[propertyPointer].value.length <= 1763) {
				displayedString = types[propertyPointer].value.substring(types[propertyPointer].value.length - 1600, types[propertyPointer].value.length)
			}
			displayedString += `**data type:**\`number\``
			displayedString += `\n**value key:** ${types[propertyPointer].key}`
			displayedString += `\n\`\`\`cs\n`
			displayedString += `> ${types[propertyPointer].value} <\`\`\``
			displayText += displayedString
		} else if (types[propertyPointer].value instanceof Array) {
			editorRowButtons.push(new MessageButton().setCustomId('cc-array-replace').setLabel("replace").setStyle("PRIMARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-array-push').setLabel("push").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-array-unshift').setLabel("unshift").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-array-pop').setLabel("pop").setStyle("DANGER"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-array-shift').setLabel("shift").setStyle("DANGER"))
			var displayedString;
			displayedString += `**data type:**\`array/list\``
			displayedString += `\n**value key:** ${types[propertyPointer].key}`
			displayedString += `\n\`\`\`cs\n`
			for (var i = 0; i < types[propertyPointer].value.length; i++) {
				displayedString+= `${types[propertyPointer].value[i]} ! object with #length of ${types[propertyPointer].value[i].length}\n`
			}
			displayedString+= `\`\`\``
			displayText += displayedString
		}
		var editorRow = new MessageActionRow().addComponents(...editorRowButtons)
		var buttons_private_class = []
		buttons_private_class.push(new MessageButton().setCustomId('cc-abort').setLabel('abort process :(').setStyle('DANGER'))
		buttons_private_class.push(new MessageButton().setCustomId('cc-compile').setLabel('save & compile').setStyle('SUCCESS'))
		buttons_private_class.push(new MessageButton().setCustomId('cc-bp').setLabel('<-').setStyle('SECONDARY'))
		buttons_private_class.push(new MessageButton().setCustomId('cc-preview').setLabel('preview').setStyle('PRIMARY').setDisabled(true))
		if (propertyPointer !== types.length - 1) {
			buttons_private_class.push(new MessageButton().setCustomId('cc-np').setLabel('->').setStyle('SECONDARY'))
		}
		var row = new MessageActionRow().addComponents(...buttons_private_class)
		var container = [row]
		if (editorRowButtons.length !== 0) {
			container.push(editorRow)
		}
		interaction.update({ content: `${displayText}`, components: container})
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-string-replace')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory =  storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		types[propertyPointer].value = `${input[0]}`
		editorStringManagement(interaction, types, displayText)
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-string-add')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory =  storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		types[propertyPointer].value+= ` ${input[0]}`
		editorStringManagement(interaction, types, displayText)
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-string-backspace')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory =  storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		console.log(types[propertyPointer].value)
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		types[propertyPointer].value = types[propertyPointer].value.substring(0, types[propertyPointer].value.length - 1)
		editorStringManagement(interaction, types, displayText)
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-string-fetch-word-remove')) {
		if (input[0].length !== 0) {
			var __rank = storage[0] // storage is a variable RESERVED only to data managament
			var ___name = storage[1]
			var ___directory = storage[2]
			if (___directory.startsWith('life of')) {
				___directory = "life of kunio-tojiro"
			}
			var types = storage[4]
			console.log(types[propertyPointer].value)
			var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
			var ___value = storage[3]
			var re = new RegExp(`${input[0]}`, "g")
			types[propertyPointer].value = types[propertyPointer].value.replace(re, "")
			editorStringManagement(interaction, types, displayText)
		    propertyImport([__rank, ___name, ___directory, ___value, types])
		} else {
			interaction.reply(`:no_entry: you should at least enter a word beford trying :no_entry:\nd'ont what to write  type \`/help regexp\` to know more!`)
		}
	} else if (interaction.customId.startsWith('cc-string-reset')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory =  storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		console.log(types[propertyPointer].value)
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		types[propertyPointer].value = ""
		editorStringManagement(interaction, types, displayText)
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-bp')) {
		propertyPointer-= 1
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory =  storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		var editorRowButtons = []
		if (typeof types[propertyPointer].value === "string") {
			editorRowButtons.push(new MessageButton().setCustomId('cc-string-replace').setLabel("Replace").setStyle("SUCCESS"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-string-add').setLabel("+=").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-string-backspace').setLabel("Backspace").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-string-fetch-word-remove').setLabel("Remove a word").setStyle("PRIMARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-string-reset').setLabel("Reset").setStyle("DANGER"))
			var displayedString;
			if (types[propertyPointer].value.length <= 1763) {
				displayedString = types[propertyPointer].value.substring(types[propertyPointer].value.length - 1600, types[propertyPointer].value.length)
			}
			displayedString+= `**data type:**\`string\`   **string length**:\`${types[propertyPointer].value.length}`
			displayedString+= `\n**value key:** ${types[propertyPointer].key}`
			displayedString+= `\n\`\`\`cs\n`
			if (types[propertyPointer].value.length == 0) {
				displayedString+= `try writing something, use the "/send" command to send data to here!\`\`\``
			} else {
				displayedString+= `${types[propertyPointer].value}\`\`\``
			}
			displayText+= displayedString
		} else if (typeof types[propertyPointer].value === "boolean") {
			editorRowButtons.push(new MessageButton().setCustomId('cc-boolean-switch').setLabel("T/F").setStyle("PRIMARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-boolean-false').setLabel("false").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-boolean-true').setLabel("true").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-boolean-random').setLabel("random").setStyle("SECONDARY").setDisabled(true))
			var displayedString;
			if (types[propertyPointer].value.length <= 1763) {
				displayedString = types[propertyPointer].value.substring(types[propertyPointer].value.length - 1600, types[propertyPointer].value.length)
			}
			displayedString+= `**data type:**\`boolean\``
			displayedString+= `\n**value key:** ${types[propertyPointer].key}`
			displayedString+= `\n\`\`\`cs\n`
			displayedString+= `# > ${types[propertyPointer].value} < #\`\`\``
			displayText+= displayedString
		} else if (typeof types[propertyPointer].value === "number") {
			editorRowButtons.push(new MessageButton().setCustomId('cc-number-equal').setLabel("=").setStyle("SUCCESS"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-number-add').setLabel("+=").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-number-remove').setLabel("-=").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-number-supadd-single').setLabel("+").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-number-supremove-single').setLabel("-").setStyle("SECONDARY"))
			var displayedString;
			if (types[propertyPointer].value.length <= 1763) {
				displayedString = types[propertyPointer].value.substring(types[propertyPointer].value.length - 1600, types[propertyPointer].value.length)
			}
			displayedString += `**data type:**\`number\``
			displayedString += `\n**value key:** ${types[propertyPointer].key}`
			displayedString += `\n\`\`\`cs\n`
			displayedString += `> ${types[propertyPointer].value} <\`\`\``
			displayText += displayedString
		} else if (types[propertyPointer].value instanceof Array) {
			editorRowButtons.push(new MessageButton().setCustomId('cc-array-replace').setLabel("replace").setStyle("PRIMARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-array-push').setLabel("push").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-array-unshift').setLabel("unshift").setStyle("SECONDARY"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-array-pop').setLabel("pop").setStyle("DANGER"))
			editorRowButtons.push(new MessageButton().setCustomId('cc-array-shift').setLabel("shift").setStyle("DANGER"))
			var displayedString;
			displayedString += `**data type:**\`array/list\``
			displayedString += `\n**value key:** ${types[propertyPointer].key}`
			displayedString += `\n\`\`\`cs\n`
			for (var i = 0; i < types[propertyPointer].value.length; i++) {
				displayedString+= `${types[propertyPointer].value[i]} ! object with #length of ${types[propertyPointer].value[i].length}\n`
			}
			displayedString+= `\`\`\``
			displayText += displayedString
		}
		var editorRow = new MessageActionRow().addComponents(...editorRowButtons)
		var buttons_private_class = []
		buttons_private_class.push(new MessageButton().setCustomId('cc-abort').setLabel('abort process :(').setStyle('DANGER'))
		buttons_private_class.push(new MessageButton().setCustomId('cc-compile').setLabel('save & compile').setStyle('SUCCESS'))
		if (propertyPointer !== 0) {
			buttons_private_class.push(new MessageButton().setCustomId('cc-bp').setLabel('<-').setStyle('SECONDARY'))
		}
		buttons_private_class.push(new MessageButton().setCustomId('cc-preview').setLabel('preview').setStyle('PRIMARY').setDisabled(true))
		if (propertyPointer !== types.length - 1) {
			buttons_private_class.push(new MessageButton().setCustomId('cc-np').setLabel('->').setStyle('SECONDARY'))
		}
		var row = new MessageActionRow().addComponents(...buttons_private_class)
		var container = [row]
		if (editorRowButtons.length !== 0) {
			container.push(editorRow)
		}
		interaction.update({ content: `${displayText}`, components: container})
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-boolean-switch')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory =  storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		console.log(types[propertyPointer].value)
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		if (types[propertyPointer].value == false) {
			types[propertyPointer].value = true
		} else if (types[propertyPointer].value == true) {
			types[propertyPointer].value = false
		}
		editorBooleanManagement(interaction, types, displayText)
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-boolean-false')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory =  storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		console.log(types[propertyPointer].value)
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		types[propertyPointer].value = false
		editorBooleanManagement(interaction, types, displayText)
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-boolean-true')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory =  storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		console.log(types[propertyPointer].value)
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		types[propertyPointer].value = true
		editorBooleanManagement(interaction, types, displayText)
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-number-equal')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory =  storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		types[propertyPointer].value = parseInt(input[0])
		editorNumberManagement(interaction, types, displayText)
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-number-add')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory = storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		if (isNaN(parseInt(input[0]))) {
			interaction.reply(`:no_entry: sorry, the content you sent is \`not a number (NaN)\`, here are some reason:\n-special characters \`,.:\` inside of **request**\n-non-numbers characters in ur **request**\n-using \`japanese\` as keyboard language (help below)\n:information_source: if you are using \`japanese (specially hiragana/katakana)\` as your keyboard, you may have to change the language to english`)
			await new Promise(resolve => setTimeout(resolve, 3000))
			interaction.deleteReply()
		} else {
			var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
			var ___value = storage[3]
			types[propertyPointer].value+= parseInt(input[0])
			editorNumberManagement(interaction, types, displayText)
		}
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-number-remove')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory = storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		if (isNaN(parseInt(input[0]))) {
			interaction.reply(`:no_entry: sorry, the content you sent is \`not a number (NaN)\`, here are some reason:\n-special characters \`,.:\` inside of **request**\n-non-numbers characters in ur **request**\n-using \`japanese\` as keyboard language (help below)\n:information_source: if you are using \`japanese (specially hiragana/katakana)\` as your keyboard, you may have to change the language to english`)
			await new Promise(resolve => setTimeout(resolve, 3000))
			interaction.deleteReply()
		} else {
			var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
			var ___value = storage[3]
			types[propertyPointer].value-= parseInt(input[0])
			editorNumberManagement(interaction, types, displayText)
		}
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-number-supadd-single')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory = storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		types[propertyPointer].value+= 1
		editorNumberManagement(interaction, types, displayText)
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-number-supremove-single')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory = storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		types[propertyPointer].value+= 1
		editorNumberManagement(interaction, types, displayText)
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-array-replace')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory = storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		types[propertyPointer].value = input[0].split(', ')
		editorArrayManagement(interaction, types, displayText)
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-array-push')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory = storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		types[propertyPointer].value.push(input[0])
		editorArrayManagement(interaction, types, displayText)
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-array-unshift')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory = storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		types[propertyPointer].value.unshift(input[0])
		editorArrayManagement(interaction, types, displayText)
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-array-pop')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory = storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		types[propertyPointer].value.pop()
		editorArrayManagement(interaction, types, displayText)
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-array-shift')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory = storage[2]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
		var types = storage[4]
		var displayText = `**current character:**:\`${___name}\`    **ready for display:**\`true\`    **language:**\`engrish\`   **current pointer:**:\`${propertyPointer}/${types.length - 1}\` **directory:**:\`protagonist/sato-naoki/personality/stress\``
		var ___value = storage[3]
		types[propertyPointer].value.shift()
		editorArrayManagement(interaction, types, displayText)
		propertyImport([__rank, ___name, ___directory, ___value, types])
	} else if (interaction.customId.startsWith('cc-compile')) {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory = storage[2]
		var ___value = storage[3]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
	
		var types = storage[4]
		interaction.channel.sendTyping()
		var displayedHeader = ""
		var displayedString = ""
		console.log(displayedString + "debuggb")
		var displayedFooter = ""
		for (var i = 0; i < types.length; i++) {
			if (types[i].value == undefined) {
				displayedHeader+= "\n> :x: those data does not respond to the minimum requirement to be added \`:(\`"
				displayedFooter+= `\n> [${___name}.${___directory}.${types[i].key}] this error looks like to be related with variable, you may text the developer :P`
			} else if (types[i].key == undefined) {
				displayedHeader = ">:heart: d'ont worry, this is not your fault"
			} else if (types[i].key == 'story') {
				if (types[i].value == "") {
					displayedHeader+= "\n> :u6709: the property \`story\` is required, leaving it may cause problems"
					displayedFooter+= `\n> [${___name}.${___directory}.${types[i].key}] if you do not want to put a 'story' just type 'comming soon'`
				}
			} else {
				if (types[i].value == "") {
					displayedHeader+= `\n> :information_source: the property \`${types[i].key}\` is empty but not mandatory`
					displayedFooter+= `\n> [${___name}.${___directory}.${types[i].key}] its okay, you can leave it like empty`
				} 
			}
			if (types[i].value.toString() == '[object Array]') {
				displayedHeader+= `\n> :closed_book: \`${types[i].key}\` is an empty list, you can leave it empty`
				displayedFooter+= `\n> [${___name}.${___directory}.${types[i].key}] its okay, you can leave it like empty`
			}
			 
		}
		var displayStringInInteraction = ""
		var propertiesStringInInteraction = ""
		for (var i = 0; i < types.length; i++) {
			if (types[i].key == "story") {
				propertiesStringInInteraction+= `\nproperty 'story' with length of #${types[i].value.length}`
			} else {
				propertiesStringInInteraction+= `\nproperty '${types[i].key}' is ${types[i].value} #type:${typeof types[i].value}`
			}
		}
		if (displayedHeader.length !== 0) {
			displayStringInInteraction = `we've found some unusual stuff or errors we found, just so you know: ${displayedHeader}\nsome note for you :P: \`\`\`cs${displayedFooter}\`\`\`\nif you want to verify what you've wrote!\`\`\`cs${propertiesStringInInteraction}\`\`\``
		} else {
			displayStringInInteraction = `:inbox_tray: ok <@${interaction.user.id}>, you've got everything rigth\nhere's the content that you wrote:\`\`\`cs${propertiesStringInInteraction}\`\`\``
		}
		propertyPointer++
		var buttons_private_class = []
		buttons_private_class.push(new MessageButton().setLabel('return').setStyle('SECONDARY').setCustomId('cc-bp'))
		buttons_private_class.push(new MessageButton().setLabel('continue').setStyle('SUCCESS').setCustomId('cc-userCondition-build'))
		const row = new MessageActionRow().addComponents(...buttons_private_class)
		interaction.update({ content: `${displayStringInInteraction}`, components: [row]})
	} else if (interaction.customId == 'cc-userCondition-build') {
		var headerString = `**avaible features / pre-usage condition (deleted)**`
		var displyedString = fs.readFile('./messages/propertyPushLicense.txt', 'utf-8', (err, data) => {
			if (!err) {
				var buttons_private_class = []
				buttons_private_class.push(new MessageButton().setLabel('return').setStyle('SECONDARY').setCustomId('cc-compile'))
				buttons_private_class.push(new MessageButton().setLabel('pull request').setStyle('SUCCESS').setCustomId('cc-pull-request'))
				buttons_private_class.push(new MessageButton().setLabel('commit changes').setStyle('SUCCESS').setCustomId('cc-createJson'))
				buttons_private_class.push(new MessageButton().setLabel('test changes').setStyle('PRIMARY').setCustomId('cc-emuluateJsonPre'))
				const row = new MessageActionRow().addComponents(...buttons_private_class)
				interaction.update({ content: `${headerString}\n${data}`, components: [row]})
			}
		})
	} else if (interaction.customId == 'cc-createJson') {
		var __rank = storage[0] // storage is a variable RESERVED only to data managament
		var ___name = storage[1]
		var ___directory = storage[2]
		var ___value = storage[3]
		if (___directory.startsWith('life of')) {
			___directory = "life of kunio-tojiro"
		}
        var buttons_private_class = []
		buttons_private_class.push(new MessageButton().setLabel('キル'))
		var row = new MessageActionRow().addComponents(...buttons_private_class)
		var types = storage[4]
		interaction.update({ content: `creating a new stream for \`${interaction.user.tag}\`...`, components: [row]})
		await new Promise(resolve => setTimeout(resolve, 1000))
		var displayText = `console output:\`\`\`cs\n`
		displayText += `sekaii-no-hana API data science compiler (2021-2022)\n all rigth reserved to anyone in the discord server`
		interaction.editReply(`${displayText}\`\`\``)
	}
});




function editorArrayManagement(interaction, types, displayText) {
	var editorRowButtons = []
	editorRowButtons.push(new MessageButton().setCustomId('cc-array-replace').setLabel("replace").setStyle("PRIMARY"))
	editorRowButtons.push(new MessageButton().setCustomId('cc-array-push').setLabel("push").setStyle("SECONDARY"))
	editorRowButtons.push(new MessageButton().setCustomId('cc-array-unshift').setLabel("unshift").setStyle("SECONDARY"))
	editorRowButtons.push(new MessageButton().setCustomId('cc-array-pop').setLabel("pop").setStyle("DANGER"))
	editorRowButtons.push(new MessageButton().setCustomId('cc-array-shift').setLabel("shift").setStyle("DANGER"))
	var displayedString;
	displayedString += `**data type:**\`array/list\``
	displayedString += `\n**value key:** ${types[propertyPointer].key}`
	displayedString += `\n\`\`\`cs\n`
	for (var i = 0; i < types[propertyPointer].value.length; i++) {
		displayedString+= `${types[propertyPointer].value[i]} ! object with #length of ${types[propertyPointer].value[i].length}\n`
	}
	displayedString+= `\`\`\``
	displayText += displayedString
	var editorRow = new MessageActionRow().addComponents(...editorRowButtons)
	var buttons_private_class = []
	buttons_private_class.push(new MessageButton().setCustomId('cc-abort').setLabel('abort process :(').setStyle('DANGER'))
	buttons_private_class.push(new MessageButton().setCustomId('cc-compile').setLabel('save & compile').setStyle('SUCCESS'))
	buttons_private_class.push(new MessageButton().setCustomId('cc-bp').setLabel('<-').setStyle('SECONDARY'))
	buttons_private_class.push(new MessageButton().setCustomId('cc-preview').setLabel('preview').setStyle('PRIMARY').setDisabled(true))
	if (propertyPointer !== types.length - 1) {
		buttons_private_class.push(new MessageButton().setCustomId('cc-np').setLabel('->').setStyle('SECONDARY'))
	}
	var row = new MessageActionRow().addComponents(...buttons_private_class)
	var container = [row]
	if (editorRowButtons.length !== 0) {
		container.push(editorRow)
	}
	interaction.update({ content: `${displayText}`, components: container })
}

function editorNumberManagement(interaction, types, displayText) {
	var editorRowButtons = []
	editorRowButtons.push(new MessageButton().setCustomId('cc-number-equal').setLabel("=").setStyle("SUCCESS"))
	editorRowButtons.push(new MessageButton().setCustomId('cc-number-add').setLabel("+=").setStyle("SECONDARY"))
	editorRowButtons.push(new MessageButton().setCustomId('cc-number-remove').setLabel("-=").setStyle("SECONDARY"))
	editorRowButtons.push(new MessageButton().setCustomId('cc-number-supadd-single').setLabel("+").setStyle("SECONDARY"))
	editorRowButtons.push(new MessageButton().setCustomId('cc-number-supremove-single').setLabel("-").setStyle("SECONDARY"))
	var displayedString;
	if (types[propertyPointer].value.length <= 1763) {
		displayedString = types[propertyPointer].value.substring(types[propertyPointer].value.length - 1600, types[propertyPointer].value.length)
	}
	displayedString += `**data type:**\`number\``
	displayedString += `\n**value key:** ${types[propertyPointer].key}`
	displayedString += `\n\`\`\`cs\n`
	displayedString += `> ${types[propertyPointer].value} <\`\`\`` 
	if (typeof types[propertyPointer].value !== "number") {
		displayedString+= `\n:no_entry: what you just entered is \`Not A Number (NaN)\`, please enter a valid number! :no_entry:`
	}
	displayText += displayedString
	var editorRow = new MessageActionRow().addComponents(...editorRowButtons)
	var buttons_private_class = []
	buttons_private_class.push(new MessageButton().setCustomId('cc-abort').setLabel('abort process :(').setStyle('DANGER'))
	buttons_private_class.push(new MessageButton().setCustomId('cc-compile').setLabel('save & compile').setStyle('SUCCESS'))
	buttons_private_class.push(new MessageButton().setCustomId('cc-bp').setLabel('<-').setStyle('SECONDARY'))
	buttons_private_class.push(new MessageButton().setCustomId('cc-preview').setLabel('preview').setStyle('PRIMARY').setDisabled(true))
	if (propertyPointer !== types.length - 1) {
		buttons_private_class.push(new MessageButton().setCustomId('cc-np').setLabel('->').setStyle('SECONDARY'))
	}
	var row = new MessageActionRow().addComponents(...buttons_private_class)
	var container = [row]
	if (editorRowButtons.length !== 0) {
		container.push(editorRow)
	}
	interaction.update({ content: `${displayText}`, components: container })
}

function editorBooleanManagement(interaction, types, displayText) {
	var editorRowButtons = []
	editorRowButtons.push(new MessageButton().setCustomId('cc-boolean-switch').setLabel("T/F").setStyle("PRIMARY"))
	editorRowButtons.push(new MessageButton().setCustomId('cc-boolean-false').setLabel("false").setStyle("SECONDARY"))
	editorRowButtons.push(new MessageButton().setCustomId('cc-boolean-true').setLabel("true").setStyle("SECONDARY"))
	editorRowButtons.push(new MessageButton().setCustomId('cc-boolean-random').setLabel("random").setStyle("SECONDARY").setDisabled(true))
	var displayedString;
	if (types[propertyPointer].value.length <= 1763) {
		displayedString = types[propertyPointer].value.substring(types[propertyPointer].value.length - 1600, types[propertyPointer].value.length)
	}
	displayedString += `**data type:**\`boolean\``
	displayedString += `\n**value key:** ${types[propertyPointer].key}`
	if (types[propertyPointer].value == true) {
		displayedString+= `\n\`\`\`md\n# > ${types[propertyPointer].value} < #`
	} else {
		displayedString+= `\n\`\`\`cs\n# > ${types[propertyPointer].value} < #`
	}
	displayedString+= `\nstated by ${interaction.user.tag} ${interaction.createdAt}`
	displayedString+= `\`\`\``
	displayText += displayedString
	var editorRow = new MessageActionRow().addComponents(...editorRowButtons)
	var buttons_private_class = []
	buttons_private_class.push(new MessageButton().setCustomId('cc-abort').setLabel('abort process :(').setStyle('DANGER'))
	buttons_private_class.push(new MessageButton().setCustomId('cc-compile').setLabel('save & compile').setStyle('SUCCESS'))
	buttons_private_class.push(new MessageButton().setCustomId('cc-bp').setLabel('<-').setStyle('SECONDARY'))
	buttons_private_class.push(new MessageButton().setCustomId('cc-preview').setLabel('preview').setStyle('PRIMARY').setDisabled(true))
	if (propertyPointer !== types.length - 1) {
		buttons_private_class.push(new MessageButton().setCustomId('cc-np').setLabel('->').setStyle('SECONDARY'))
	}
	var row = new MessageActionRow().addComponents(...buttons_private_class)
	var container = [row]
	if (editorRowButtons.length !== 0) {
		container.push(editorRow)
	}
	interaction.update({ content: `${displayText}`, components: container })
}


function editorStringManagement(interaction, types, displayText) {
	var editorRowButtons = []
	editorRowButtons.push(new MessageButton().setCustomId('cc-string-replace').setLabel("Replace").setStyle("SUCCESS"))
	editorRowButtons.push(new MessageButton().setCustomId('cc-string-add').setLabel("+=").setStyle("SECONDARY"))
	editorRowButtons.push(new MessageButton().setCustomId('cc-string-backspace').setLabel("Backspace").setStyle("SECONDARY"))
	editorRowButtons.push(new MessageButton().setCustomId('cc-string-fetch-word-remove').setLabel("Remove a word").setStyle("PRIMARY"))
	editorRowButtons.push(new MessageButton().setCustomId('cc-string-reset').setLabel("Reset").setStyle("DANGER"))
	var displayedString;
	displayedString += `**data type:**\`string\`   **string length**:\`${types[propertyPointer].value.length}\``
	displayedString += `\n**value key:** ${types[propertyPointer].key}`
	displayedString += `\n\`\`\`cs\n`
	if (types[propertyPointer].value.length == 0) {
		displayedString += `try writing something, use the "/send" command to send data to here!\`\`\``
	} else if (types[propertyPointer].value.length <= 1500){
		displayedString += `${types[propertyPointer].value}\`\`\``
	} else {
		displayedString += `${types[propertyPointer].value.substring(types[propertyPointer].value.length - 600, types[propertyPointer].value.length)}\`\`\``
	}
	displayText += displayedString
	displayText += `\n:information_source: you can add \`\\n\` to you text in order to break lines!`
	var editorRow = new MessageActionRow().addComponents(...editorRowButtons)
	var buttons_private_class = []
	buttons_private_class.push(new MessageButton().setCustomId('cc-abort').setLabel('abort process :(').setStyle('DANGER'))
	buttons_private_class.push(new MessageButton().setCustomId('cc-compile').setLabel('save & compile').setStyle('SUCCESS'))
	buttons_private_class.push(new MessageButton().setCustomId('cc-bp').setLabel('<-').setStyle('SECONDARY'))
	buttons_private_class.push(new MessageButton().setCustomId('cc-preview').setLabel('preview').setStyle('PRIMARY').setDisabled(true))
	if (propertyPointer !== types.length - 1) {
		buttons_private_class.push(new MessageButton().setCustomId('cc-np').setLabel('->').setStyle('SECONDARY'))
	}
	var row = new MessageActionRow().addComponents(...buttons_private_class)
	var container = [row]
	if (editorRowButtons.length !== 0) {
		container.push(editorRow)
	}
	interaction.update({ content: `${displayText}`, components: container })
}


// do not paste anything related to discord down here
// other functions

function update(options) {
	var tempjson;
}

function characters_import(content, __cd__) {
	globalimports = []
	

	for (var i = 0; i < content.length; i++) {
		globalimports.push(content[i])
	}
	console.log(globalimports)
}

async function updatereg(options) {
	if (input.length !== 0) {
		input.pop()
		input.push(options)
	} else if (input.length == 0) {
		input.push(options)
	}
	recursiontype = true
	return Promise.resolve(1)
}

async function finder() {
	if (input.length !== 0) {
		return true
	}
}

function once(fn, context) {
	var result;

	return function () {
		if (fn) {
			result = fn.apply(context || this, arguments);
			fn = null;
		}

		return result;
	};
}

function grammar(options) {
	if (options == 'female' || options == 'girl') {
		return 'she'
	} else if (options == 'male' || options == 'boy') {
		return 'he'
	} else {
		console.error('unable to process actions, this is a bug')
	}
}

function convgen(options) {
	if (options == 'female') {
		return 'girl'
	} else if (options == 'male') {
		return 'boy'
	}
}

function reconvgen(options) {
	if (options == 'girl') {
		return 'female'
	} else if (options == 'boy') {
		return 'male'
	} else {
		return options
	}
}

input[0] = "NaN"

function parsearr(linked, parsingsymbol) {
	if (parsingsymbol == undefined) {
		parsingsymbol = `,`
	}
	var freinds = linked;
	var text = ``;
	var tempmes = []
	for (var i = 0; i < freinds.length; i++) {
		var temp;
		if (freinds.length == 2 || 1 && parsingsymbol == undefined) {
			parsingsymbol = ` and`
		}
		if (i == linked.length - 1) {
			temp = ` ${freinds[i]}`
		} else if (i == 0) {
			temp = `${freinds[i]}${parsingsymbol}`
		} else if (i !== freinds.length) {
			temp = ` ${freinds[i]}${parsingsymbol}`
		}
		text += temp
	}
	return text
}

function grammar_second(options) {
	if (options == 'male') {
		return 'him'
	} else if (options == 'female') {
		return 'her'
	}
}

function grammar_third(options) {
	if (options == 'male') {
		return 'his'
	} else if (options == 'female') {
		return 'her'
	}
}

function scanKeys(__rank, ___name, ___directory, property, ___subprocess, interaction) {
	// wdamorer_y183j@vixej.com << my imaginary freind mail
	var ___value = property
	var link;
	var link_config = [];
	console.log(___name + ' << isCurrentDebugging')
	console.log(`starting to scan linking...`)
	if (___directory) {
		if (!___subprocess) {
			if (anime[__rank][___name][___directory][___value].link) {
				console.log(`[scanKeys/sekaii-no-hana] finds more value, linking the properties to a variable...`)
				link = anime[__rank][___name][___directory][___value].link[0]
				if (anime[__rank][___name][___directory][___value].story) {
					link_config.push({
						"key": "story",
						"value": anime[__rank][___name][___directory][___value].story,
						"type": "string"
					})
				}
			}
		} else if (___subprocess) {
			if (anime[__rank][___name][___directory][___subprocess][___value].link) {
				console.log(`[scanKeys/sekaii-no-hana] finds more value, linking the properties to a variable...`)
				link = anime[__rank][___name][___directory][___subprocess][___value].link[0]
				if (anime[__rank][___name][___directory][___subprocess][___value].story) {
					link_config.push({
						"key": "story",
						"value": anime[__rank][___name][___directory][___subprocess][___value].story,
						"type": "string"
					})
				}
			}
		} else {
			console.error(fs.readFile('./messages/scanKeys_onInvalidCharacter.txt', 'utf-8', (data, err) => {
				if (!err) {
					return data
				}
			}))
		}
	}
	if (link) {
		for (var i = 0; i < Object.keys(link).length; i++) {
			var temp_link_config = {
				"key": undefined,
				"value": undefined,
				"type": undefined
			}
			temp_link_config.key = Object.keys(link)[i]
			temp_link_config.value = link[Object.keys(link)[i]]
			if (typeof link[Object.keys(link)[i]] === 'boolean') {
				temp_link_config.type = 'boolean'
			} else if (typeof link[Object.keys(link)[i]] === 'number') {
				temp_link_config.type = 'number'
			} else if (typeof link[Object.keys(link)[i]] === 'string') {
				temp_link_config.type = 'string'
			} else if (link[Object.keys(link)[i]] instanceof Array) {
				temp_link_config.type = 'array'
			}
			console.log(temp_link_config)
			link_config.push(temp_link_config)
		}
	}
	console.log(link_config)
	return link_config
}

function mainScan(__rank, ___name, ___directory, property, ___subprocess) {

}



// character-create-functions

function pushchara(options) {
	var temp = `{
		"protagonist": {
			"sato-naoki": {
				"life of ${_name}": {
					"identity": {
						"story": "",
						"link": [{
							"define_as": [],
							"emotional_stuff": [],
							"passions": [],
							"others": []
						}]
					},
					"backstory & wound": {
						"story": "",
						"link": [{
							"with?": []
						}]
					},
					"relationship <indev>": {
						"story": "",
						"link": [{
							"closest": [],
							"freinds": [],
							"love?": "",
							"major_spent_time": [],
							"share_secret_with?": []
						}]
					},
					"education & finances": {
						"story": "",
						"link": [{
							"with": [],
							"places?": []
						}]
					},
					"family": {
						"story": "",
						"link": [{
							"story": "",
							"members": []
						}]
					}
				},
				"personality": {
					"emotional_range": {
						"story": "",
						"link": [{
							"what_he_loves?": [],
							"fellings?": []
						}]
					},
					"skills_talents": {
						"story": "",
						"link": [{
							"skills": [],
							"talents": []
						}]
					}
				},
				"characteristics": {
					"physical": {
						"physics": {
							"story": "",
							"heigth": 0,
							"experimental/weigth": 0,
							"decreptated/age": 0,
							"link": [{
								"user_phs <decreptated>": "",
								"tags": [],
								"cool": false,
								"cute": false,
								"hot": false,
								"attractive": false
							}]
						}
	
					},
					"powers/special-abilities": {
						"powers": {
							"story": "",
							"link": [{
								"powers": [],
								"linked_chr": []
							}]
						},
						"special-abilities": {
							"story": "",
							"link": [{
								"special-abilities": [],
								"temorary-special-abilities": [],
								"temporary-gone-special-abilities": [],
								"removed-special-abilities": [],
								"temporary-removed-special-abilities": []
							}]
						}
					},
					"mentally/inside": {
						"status": {
							"depressed": false,
							"lonely": false,
							"freindly": false
						},
						"secrets": {
							"secrets": [],
							"story": [],
							"link": [{
								"shared-secrets": 0,
								"shared-secrets-id": [],
								"shared-secrets-with": [],
								"request-sharing-but-refused": 0,
								"trust-more": "",
								"trust-least": ""
							}]
						},
						"want/needs/desire": {
							"story": "",
							"wants": [],
							"needs": [],
							"desire": [],
							"links": [{
								"experimental/chr-related": []
							}]
						},
						"interest": {
							"story": "",
							"link": [{
								"interest-array": [],
								"message-to-api-users": "user to get numbers of interest"
							}]
						}
					},
					"stress and pressure": {
						"story": "",
						"stressed-easely": false,
						"blood-pressure?": false,
						"link": [{
							"stress-type-decreptated": []
						}]
					}
				},
				"about me!": {
					"name": ${_name},
					"age": ${parseInt(_age)},
					"gender": ${_gender},
					"story": "",
					"link": [{
						"linking-relation": []
					}]
				},
				"others": {}
			},
			"yu_otosaka": "soon"
		}
	}
	`
}

var used = process.memoryUsage().heapUsed / 1024 / 1024;
client.login(token);
