const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);
    message.delete();

    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("**ERROR:** You do not have permission to do this.").then(msg => {msg.delete(5000)})  

    let mReason = args.join(" ").slice(22);
    if(!mReason) return message.channel.send("**ERROR:** No reason provided for muting " + (tomute)).then(msg => {msg.delete(5000)})  

    if(!tomute) return message.channel.send("**ERROR:** User not found! Make sure you are @mentioning them!").then(msg => {msg.delete(5000)})   
        
    if(tomute.hasPermission("ADMINISTRATOR")) return message.channel.send("**ERROR:** That user cannot be muted!").then(msg => {msg.delete(5000)})  


    let muterole = message.guild.roles.find(`name`, "muted");
    let crankedRole = message.guild.roles.find(`name`, "Cranked");

    tomute.removeRole(crankedRole);

    if(!muterole) return message.channel.send("**Please create a role called `muted` and turn off `Send Messages` and `Add Reactions` for that role.**").then(msg => {msg.delete(5000)})  

    await(tomute.addRole(muterole.id));
  
    message.channel.send(`**<@${tomute.id}> has been muted!**`).then(msg => {msg.delete(10000)})

    let sicon = bot.user.displayAvatarURL;
    let tmEmbed = new Discord.RichEmbed()
    
      .setTitle("User Muted!")
      .setThumbnail(sicon)
      .setColor("#33333a")
      .addField("Muted User", `${tomute} with ID: ${tomute.id}`)
      .addField("Muted By", `${message.author} with ID: ${message.author.id}`)
      .addField("Reason", mReason)
      .setTimestamp()
      .setFooter('When')

    let tmChannel = message.guild.channels.get("361172650657185817");
    if(!tmChannel) return message.channel.send("**Please create a channel called `mod-logs` and send Fyrlex#2740 the channel ID!**").then(msg => {msg.delete(5000)})

    tmChannel.send(tmEmbed);
}

module.exports.help = {
  name: "mute"
}
