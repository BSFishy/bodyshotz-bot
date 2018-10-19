const discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const { Command } = require("discord.js-commando");

module.exports = class YoutubeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "youtube",
            group: "links",
            memberName: "youtube",
            description: "Get the link to our youtube channel",
            examples: ["youtube"]
        });
    }

    async run(message) {
        let co = botconfig.colour;
        message.delete();
        let embed = new discord.RichEmbed()
            .setColor(co)
            .addField("Here is the YouTube link", "https://www.youtube.com/channel/UCDKKP4OjVd5Iqf9-uUsGA9Q");

        message.channel.send(embed).then(msg => {
            msg.delete(30000);
        });
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
//         .addField("Here is the YouTube link", "https://www.youtube.com/channel/UCDKKP4OjVd5Iqf9-uUsGA9Q");
//
//     message.channel.send(embed).then(msg => {
//         msg.delete(30000);
//     });
// };
//
// module.exports.help = {
//     name: "youtube"
// };