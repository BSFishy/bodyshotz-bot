const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
    message.delete();

  let vmute = message.mentions.members.first() || message.guild.members.get(args[0]);

  if (!vmute) return message.channel.send("**ERROR:** User not found! Make sure you are @mentioning them!").then(msg => {msg.delete(5000)})    
  if (!vmute.hasPermission("CONNECT")) return ("**ERROR:** This user is already muted!")
  
  if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("**ERROR:** You do not have permission to do this.").then(msg => {msg.delete(5000)})
// remove permission for tagged user??
  vmute.remove("CONNECT")
  message.channel.send(vmute + " has been Voice Muted!")
  
  }

module.exports.help = {
  name: "vmute"
}
