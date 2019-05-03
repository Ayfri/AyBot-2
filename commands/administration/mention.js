const argsError = require("../../functions/argsError");
const getThing = require("../../functions/getThing");
module.exports.run = async (client, message, args) => {
	let role = await getThing("role", message, args.join(" "));

	if(!role) return message.channel.send(argsError("The role wasn't found.", "Argument error.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	if(!role.mentionable && !role.editable) return message.channel.send(argsError("The bot hasn't got the permissions to mention this role.", "Permissions error.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	
	if(!role.mentionable) return role.edit({'mentionnable':'true'}).then(message.channel.send(`${role}`).then( role.edit({'mentionnable':'false'}).then(message.delete())));
	if(role.mentionable) return message.channel.send(`${role}`).then(m => {if(message.guild.me.hasPermission('MANAGE_MESSAGES', true)) message.delete()});
}
module.exports.config = {
	category: "administration",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	englishName: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["ment"],
	serverForced: true
}

module.exports.help = {
	description: "Give the possibility to mention a role with its name or its ID.",
	utilisations: `mention [ID/role name]`,
	exemples: ``
}
