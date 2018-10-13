const discord = require("discord.js");
const botconfig = require('../botconfig.json');
module.exports.run = async (bot, message, args) => {
  let co = botconfig.colour
  message.delete();
  let embed = new discord.RichEmbed()
  .setColor(co)
  .addField("Here is the YouTube link", "https://www.youtube.com/channel/UCDKKP4OjVd5Iqf9-uUsGA9Q")
  
  message.channel.send(embed).then(msg => {msg.delete(30000)})
}
module.exports.help = {
    name: "youtube"
}