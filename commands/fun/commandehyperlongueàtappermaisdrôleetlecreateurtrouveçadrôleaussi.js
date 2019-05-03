module.exports.run = async (client, message, args) => {
	if(message.guild && message.guild.me.hasPermission('MANAGE_MESSAGES', true)) message.delete();
    message.author.send("Wasn't it too long to write that ? "+message.author);
}
module.exports.config = {
	category: "hidden",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["lol"],
	serverForced: false
}

module.exports.help = {
	description: "GG ! You had the courage to write it down !",
	utilisations: `verylongtowritebutfunnycommandandthecreatorfinditfunnytoo`,
	exemples: ``
}
