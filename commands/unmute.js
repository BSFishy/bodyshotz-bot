const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    message.delete();

    let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);

    if (!tomute) return message.channel.send("**ERROR:** User not found! Make sure you are @mentioning them!").then(msg => {
        msg.delete(5000)
    });

    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("**ERROR:** You do not have permission to do this.").then(msg => {
        msg.delete(5000)
    });

    let muterole = message.guild.roles.get("361168852257734658");

    if(tomute.roles.keyArray().includes(muterole.id)) {
        await tomute.removeRole(muterole.id);

        message.channel.send(`**<@${tomute.id}> has been unmuted!**`).then(msg => {
            msg.delete(10000)
        })
    }

    if(tomute.serverMute){
        await tomute.setMute(false, "Manual unmute");
    }

    let tmChannel = message.guild.channels.get("361172650657185817");
    if (!tmChannel) return message.channel.send("**Please create a channel called `mod-logs` and send Fyrlex#2740 the channel ID!**").then(msg => {
        msg.delete(5000)
    });

    let sicon = bot.user.displayAvatarURL;
    let tumEmbed = new Discord.RichEmbed()
        .setTitle("User unmuted!")
        .setThumbnail(sicon)
        .setColor("#33333a")
        .addField("Unmuted User", `${tomute} with ID: ${tomute.id}`)
        .addField("Manually unmuted By", `${message.author} with ID: ${message.author.id}`)
        //.addField("Reason", mReason)
        .setTimestamp()
        .setFooter('When');

    tmChannel.send(tumEmbed);
};

module.exports.help = {
    name: "unmute"
};
