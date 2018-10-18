
module.exports.run = async (bot, message, args) => {
    let reply = args.join(" ");

    message.channel.send(reply);
};

module.exports.help = {
    name: "say"
};