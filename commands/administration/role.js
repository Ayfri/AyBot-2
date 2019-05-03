const argsError = require("../../functions/argsError");
module.exports.run = async (client, message, args, argsError) => {
	let role = args[0];
	let guildRoles = message.guild.roles.array();
	if(role === "all") {
		let roleOf = args[1];
		role = args[2];
		try {
			for(let roletoFind of guildRoles) {
				if(roletoFind.name.includes(roleOf)) roleOf = roletoFind;
			}
			for(let roletoFind2 of guildRoles) {
				if(roletoFind2.name.includes(role)) role = roletoFind2;
			}
		} catch(e) { return message.channel.send(argsError("The role wasn't found.", "Error on the first argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3)))); }

		let membersRole = message.guild.roles.get(roleOf.id).members;
		membersRole.forEach(member => {
			member.addRole(role.id);
		});
		return message.channel.send(`The role \`${role.name}\` was given to all the members who have the role \`${roleOf.name}\`.`);
	} else try {
		for(let roletoFind of guildRoles) {
			if(roletoFind.name.includes(role)) role = roletoFind;
		}
	} catch(e) { return message.channel.send(argsError("The role wasn't found.", "Error on the second argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3)))); }

	if(message.guild.roles.has(role.id)) {
		message.guild.members.forEach(member => {
			member.addRole(role);
		});
		return message.channel.send(`The role \`${role.name}\` was given to all members.`);
	}
	return message.channel.send(argsError("The role wasn't found.", "Error on the argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
}
module.exports.config = {
	category: "administration",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	englishName: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: [],
	serverForced: true
}

module.exports.help = {
	description: "Give the possibility to give a role to everyone or to give a role to all members who have a specific role.",
	utilisations: `role [name of the role to give]\nrole all [role name] [name of the role to give]`,
	exemples: `role Member\nrole all Member Developer`
}
