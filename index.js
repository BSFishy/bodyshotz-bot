// Keep bot running

const http = require("http");
const express = require("express");
const app = express();
let child_process = require("child_process");
let d = Date(Date.now());
let date = d.toString();

app.get("/", (request, response) => {
    console.log(date + " Ping Received");
    response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
    child_process.exec("refresh", function (error, stdout) {
        console.log(stdout);
    });
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 900000);

//----------------------------------------------------------


// Requires
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const fs = require("fs");
const bot = new Discord.Client({
    disableEveryone: true
});

let guild = undefined;
let devBot = undefined;

//console.log(bot.guilds.keyArray().join(", "));
//const guild = bot.guilds.get("319947092833337344");
//if(guild === undefined) console.log("undefined");
//const devBot = guild.members.get("500713287516815376");

//----------------------------------------------------------

// Data
bot.commands = new Discord.Collection();


// Get commands from commands folder

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    // Log commands
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("There are no commands to load...");
        return;
    }

    jsfile.forEach((f) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

//----------------------------------------------------------
//autorole
bot.on("guildMemberAdd", member => {

    let role = member.guild.roles.get("361168852257734658");

    member.addRole(role);

});

bot.on("ready", async () => {

    console.log("I am now up!");

    bot.user.setActivity("!help");
});

//----------------------------------------------------------

bot.on("message", async message => {
    if(guild === undefined) guild = message.guild;
    if(devBot === undefined) devBot = guild.members.get("500713287516815376");

    if(devBot.presence.status !== "offline" && devBot.id !== bot.user.id) return;

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if (message.member.roles.keyArray().includes("405506751149113355")) {
        await message.delete();
        return;
    }

    let prefix = botconfig.prefix;
    if (!message.content.startsWith(prefix)) return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);

});

bot.login(process.env.TOKEN);