const discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const { Command } = require("discord.js-commando");

module.exports = class SteamCommand extends Command {
    constructor(client) {
        super(client, {
            name: "steam",
            group: "links",
            memberName: "steam",
            description: "Get the link of our Steam Group",
            examples: ["steam"],
        });
    }

    async run(message) {
        let co = botconfig.colour;
        message.delete();
        let embed = new discord.RichEmbed()
            .setColor(co)
            .addField("Here is the Steam link", "[Click Here](https://steamcommunity.com/groups/bodyshotz)");

        message.channel.send(embed).then(msg => {msg.delete(30000);});
    }
};

// const discord = require("discord.js");
// const botconfig = require("../botconfig.json");
//
// module.exports.run = async (bot, message) => {
//     let co = botconfig.colour;
//     message.delete();
//     let embed = new discord.RichEmbed()
//         .setColor(co)
//         .addField("Here is the Steam link", "[Click Here](https://steamcommunity.com/groups/bodyshotz)");
//
//     message.channel.send(embed).then(msg => {msg.delete(30000);});
// };
//
// module.exports.help = {
//     name: "steam"
// };