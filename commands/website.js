const discord = require("discord.js");
const botconfig = require('../botconfig.json');
module.exports.run = async (bot, message, args) => {
  let co = botconfig.colour
  message.delete();
  let embed = new discord.RichEmbed()
  .setColor(co)
  .addField("Here is the Website link", "https://bsfish.tk")
  
  message.channel.send(embed).then(msg => {msg.delete(30000)})
}
module.exports.help = {
    name: "website"
}