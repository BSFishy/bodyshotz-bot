const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete()
  
  let sicon = bot.user.displayAvatarURL;
  let hEmbed = new Discord.RichEmbed()
  .setTitle("Help Menu")
  .setThumbnail(sicon)
  .setColor("#33333a")
  .addField("!help", " Help Menu", true)
  .addField("!mute", "Mute a user", true)
  .addField("!steam", "Steam link", true)
  .addField("!unmute", "Help menu", true) 
  .addField("!website", "Website link", true)
  .addField("!youtube", "YouTube link", true)

  message.channel.send(hEmbed).then(msg => {msg.delete(20000)})
}

module.exports.help = {
    name: "help"
}