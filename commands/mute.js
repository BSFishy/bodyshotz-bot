const Discord = require("discord.js");
const sleep = require('util').promisify(setTimeout);

module.exports.run = async (bot, message, args) => {

    let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!message.deleted) {
        try {
            message.delete();
        } catch (e) { }
    }

    if (!message.member.hasPermission("MUTE_MEMBERS")) return await message.channel.send("**ERROR:** You do not have permission to do this.").then(msg => {
        msg.delete(10000)
    });

    let timeString = args[1];
    if(!timeString)
        timeString = "5m";

    let mReason = args.slice(2).join(" ");
    if (!mReason)
        mReason = "No reason specified";

    if (!tomute) return await message.channel.send("**ERROR:** User not found! Make sure you are @mentioning them!").then(msg => {
        msg.delete(10000)
    });

    let muterole = message.guild.roles.get("405506751149113355");

    if (!muterole) return await message.channel.send("**Please create a role called `muted` and turn off `Send Messages` and `Add Reactions` for that role.**").then(msg => {
        msg.delete(10000)
    });

    await(tomute.addRole(muterole.id, mReason));
    await(tomute.setMute(true, mReason));

    await message.channel.send(`**<@${tomute.id}> has been muted for ${timeString}!**`).then(msg => {
        msg.delete(30000)
    });

    let sicon = bot.user.displayAvatarURL;
    let tmEmbed = new Discord.RichEmbed()

        .setTitle("User Muted!")
        .setThumbnail(sicon)
        .setColor("#33333a")
        .addField("Muted User", `${tomute} with ID: ${tomute.id}`)
        .addField("Muted By", `${message.author} with ID: ${message.author.id}`)
        .addField("Reason", mReason)
        .setTimestamp()
        .setFooter('When');

    let tmChannel = message.guild.channels.get("361172650657185817");
    if (!tmChannel) return await message.channel.send("**Please create a channel called `mod-logs` and send Fyrlex#2740 the channel ID!**").then(msg => {
        msg.delete(10000)
    });

    await tmChannel.send(tmEmbed);

    /// UNMUTE
    let time = stringToDuration(timeString);

    await sleep(time);

    // if still muted
    if (tomute.serverMute || tomute.roles.keyArray().includes(muterole.id)) {
        await(tomute.setMute(false, "Auto unmuting"));
        await(tomute.removeRole(muterole.id));

        await message.channel.send(`**<@${tomute.id}> has been auto-unmuted.**`).then(msg => {
            msg.delete(30000)
        });

        let tumEmbed = new Discord.RichEmbed()
            .setTitle("User unmuted!")
            .setThumbnail(sicon)
            .setColor("#33333a")
            .addField("Unmuted User", `${tomute} with ID: ${tomute.id}`)
            .addField("Auto-unmuted By", `${message.author} with ID: ${message.author.id}`)
            .setTimestamp()
            .setFooter('When');

        await tmChannel.send(tumEmbed);
    }
};

module.exports.help = {
    name: "mute"
};

//const regex = /(?<amount>[0-9]+)(?<frequency>(second|minute|hour|day)[s]?|[smhd])/i;
const regex = /([0-9]+)((second|minute|hour|day)[s]?|[smhd])/i;

function stringToDuration(input) {
    let matched = regex.exec(input);
    let time = 0;

    if(matched === null)
        return 5 * 60 * 1000;

    let amount = matched[1];
    let frequency = matched[2];

    switch (frequency.toLowerCase()) {
        case "s" || "second" || "seconds":
            time = amount;
            break;
        case "m" || "minute" || "minutes":
            time = amount * 60;
            break;
        case "h" || "hour" || "hours":
            time = amount * 60 * 60;
            break;
        case "d" || "day" || "days":
            time = amount * 60 * 60 * 24;
            break;
        default:
            time = 5 * 60;
            break;
    }

    return time * 1000;
}