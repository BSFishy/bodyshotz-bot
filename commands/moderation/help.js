const { stripIndents, oneLine } = require("common-tags");
const { Command } = require("discord.js-commando");
//const Command = require('../base');
//const { disambiguation } = require('../../util');
const { disambiguation } = require("discord.js-commando").util;

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            group: "moderation",
            memberName: "help",
            aliases: ["commands"],
            description: "Displays a list of available commands, or detailed information for a specified command.",
            details: oneLine`
				The command may be part of a command name or a whole command name.
				If it isn't specified, all available commands will be listed.
			`,
            examples: ["help", "help prefix"],
            guarded: true,

            args: [
                {
                    key: "command",
                    prompt: "Which command would you like to view the help for?",
                    type: "string",
                    default: ""
                }
            ]
        });
    }

    async run(msg, args) {
        if(!msg.deleted) {
            try {
                msg.delete();
            } catch (e) {
                console.log(`Could not delete message: ${msg}`);
            }
        }

        const groups = this.client.registry.groups;
        const commands = this.client.registry.findCommands(args.command, false, msg);
        const showAll = args.command && args.command.toLowerCase() === "all";
        const messages = [];

        if(args.command && !showAll) {
            if(commands.length === 1) {
                let help = stripIndents`
					${oneLine`
						__Command **${commands[0].name}**:__ ${commands[0].description}
						${commands[0].guildOnly ? " (Usable only in servers)" : ""}
						${commands[0].nsfw ? " (NSFW)" : ""}
					`}

					**Format:** ${msg.anyUsage(`${commands[0].name}${commands[0].format ? ` ${commands[0].format}` : ""}`)}
				`;
                if(commands[0].aliases.length > 0) help += `\n**Aliases:** ${commands[0].aliases.join(", ")}`;
                help += `\n${oneLine`
					**Group:** ${commands[0].group.name}
					(\`${commands[0].groupID}:${commands[0].memberName}\`)
				`}`;
                if(commands[0].details) help += `\n**Details:** ${commands[0].details}`;
                if(commands[0].examples) help += `\n**Examples:**\n${commands[0].examples.join("\n")}`;

                try {
                    messages.push(await msg.channel.send(help).then(msg => {msg.delete(30000);}));
                } catch(err) {
                    messages.push(await msg.reply("Unable to send you the help DM. You probably have DMs disabled.").then(msg => {msg.delete(30000);}));
                }
            } else if(commands.length > 15) {
                msg.reply("Multiple commands found. Please be more specific.").then(msg => {msg.delete(30000);});
            } else if(commands.length > 1) {
                msg.reply(disambiguation(commands, "commands")).then(msg => {msg.delete(30000);});
            } else {
                msg.reply(
                    `Unable to identify command. Use ${msg.usage(
                        null, msg.channel.type === "dm" ? null : undefined, msg.channel.type === "dm" ? null : undefined
                    )} to view the list of all commands.`
                ).then(msg => {msg.delete(30000);});
            }
        } else {
            try {
                messages.push(await msg.channel.send(stripIndents`
					${oneLine`
						To run a command in ${msg.guild ? msg.guild.name : "any server"},
						use ${Command.usage("command", msg.guild ? msg.guild.commandPrefix : null, this.client.user)}.
						For example, ${Command.usage("prefix", msg.guild ? msg.guild.commandPrefix : null, this.client.user)}.
					`}
					To run a command in this DM, simply use ${Command.usage("command", null, null)} with no prefix.

					Use ${this.usage("<command>", null, null)} to view detailed information about a specific command.
					Use ${this.usage("all", null, null)} to view a list of *all* commands, not just available ones.

					__**${showAll ? "All commands" : `Available commands in ${msg.guild || "this DM"}`}**__

					${(showAll ? groups : groups.filter(grp => grp.commands.some(cmd => cmd.isUsable(msg))))
        .map(grp => stripIndents`
							__${grp.name}__
							${(showAll ? grp.commands : grp.commands.filter(cmd => cmd.isUsable(msg)))
        .map(cmd => `**${cmd.name}:** ${cmd.description}${cmd.nsfw ? " (NSFW)" : ""}`).join("\n")
}
						`).join("\n\n")
}
				`, { split: true }).then(msg => {msg.delete(30000);}));
            } catch(err) {
                messages.push(await msg.reply("Construct the help message.").then(msg => {msg.delete(30000);}));
            }
        }
    }
};