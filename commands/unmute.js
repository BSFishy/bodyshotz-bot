const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
    message.delete();

  let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);

  if(!tomute) return message.channel.send("**ERROR:** User not found! Make sure you are @mentioning them!").then(msg => {msg.delete(5000)})    
        
  if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("**ERROR:** You do not have permission to do this.").then(msg => {msg.delete(5000)})

  let muterole = message.guild.roles.get("361168852257734658");
  let regularRole = message.guild.roles.get("405506751149113355");

      tomute.addRole(regularRole);
      tomute.removeRole(muterole.id);
  
      message.channel.send(`**<@${tomute.id}> has been unmuted!**`).then(msg => {msg.delete(10000)})
  }
module.exports.help = {
  name: "unmute"
}
