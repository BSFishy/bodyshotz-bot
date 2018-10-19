const { Command } = require("discord.js-commando");

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: "say",
            group: "fun",
            memberName: "say",
            description: "Make the bot say what you said",
            examples: ["say message"],
            args: [
                {
                    key: "content",
                    prompt: "What is the message that should be posted?",
                    type: "string",
                },
            ],
        });
    }

    async run(message, { content }) {
        //let reply = args.join(" ");
        let reply = content;
        message.channel.send(reply);
    }
};

//
// module.exports.run = async (bot, message, args) => {
//     let reply = args.join(" ");
//
//     message.channel.send(reply);
// };
//
// module.exports.help = {
//     name: "say"
// };