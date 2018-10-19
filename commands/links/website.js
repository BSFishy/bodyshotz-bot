const discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const { Command } = require("discord.js-commando");

module.exports = class WebsiteCommand extends Command {
    constructor(client) {
        super(client, {
            name: "website",
            group: "links",
            memberName: "website",
            description: "Get the link to our website",
            examples: ["website"]
        });
    }

    async run(message) {
        let co = botconfig.colour;
        message.delete();
        let embed = new discord.RichEmbed()
            .setColor(co)
            .addField("Here is the Website link", "https://bsfish.tk");

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
//         .addField("Here is the Website link", "https://bsfish.tk");
//
//     message.channel.send(embed).then(msg => {msg.delete(30000);});
// };
//
// module.exports.help = {
//     name: "website"
// };