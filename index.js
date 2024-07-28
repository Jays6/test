require("dotenv").config();

const {
  Client,
  Collection,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  User,
} = require("discord.js");

const mongoose = require("mongoose");

const colors = require("colors");

const client = new Client({
  fetchAllMembers: true,
  intents: 32767,
});

client.commands = new Collection();
client.preCommands = new Collection();
client.aliases = new Collection();
client.config = require("./config");
client.color = "#95C1D5";

["events", "preCommands"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

process.on("uncaughtException", function (err) {
  console.log(colors.red(err.stack));
});

require("./database/connection/connect");
client.on("ready", async (client) => {
  // console.clear();
  console.log(
    `
[ Bot Name: ${client.user.username}#${client.user.discriminator} ]
[ Bot Id: ${client.user.id} ]
[ Number Of Bot Have Join Servers: ${client.guilds.cache.size} ]
      `
  );
});

const CharModel = require("./database/models/userData");

client.on("messageCreate", async (message) => {
  const characterData = await CharModel.findOne({
    userID: message.author.id,
  });

  if (message.content.startsWith("-character-1")) {
    let charfind = characterData?.characters?.find(
      (c) => c.character == "character-1"
    );
    if (charfind) {
      let char1 = new MessageEmbed()
        .setThumbnail(charfind.avatar)
        .setDescription(`${charfind.character} - <@${characterData.userID}>`)
        .setFields(
          {
            name: `: اسم الشخصية`,
            value: `${charfind.usrName}`,
          },
          {
            name: `: عمر الشخصية`,
            value: `${charfind.userage}`,
          },
          {
            name: `: تاريخ الولادة`,
            value: `${charfind.birthday}`,
          },
          {
            name: `: مكان الولادة`,
            value: `${charfind.bornAt}`,
          },
          {
            name: `: اسم الشخص`,
            value: `${message.member.displayName}`,
          }
        );
      message.reply({ embeds: [char1] });
    } else {
      return message.reply({ content: `انت لا تمتلك هذه الشخصية` });
    }
  }
});

client.on("messageCreate", async (message) => {
  const characterData = await CharModel.findOne({
    userID: message.author.id,
  });

  if (message.content.startsWith("-character-2")) {
    let charfind = characterData?.characters?.find(
      (c) => c.character == "character-2"
    );
    if (charfind) {
      let char1 = new MessageEmbed()
        .setThumbnail(charfind.avatar)
        .setDescription(`${charfind.character} - <@${characterData.userID}>`)
        .setFields(
          {
            name: `: اسم الشخصية`,
            value: `${charfind.usrName}`,
          },
          {
            name: `: عمر الشخصية`,
            value: `${charfind.userage}`,
          },
          {
            name: `: تاريخ الولادة`,
            value: `${charfind.birthday}`,
          },
          {
            name: `: مكان الولادة`,
            value: `${charfind.bornAt}`,
          },
          {
            name: `: اسم الشخص`,
            value: `${message.member.displayName}`,
          }
        );
      message.reply({ embeds: [char1] });
    } else {
      return message.reply({ content: `انت لا تمتلك هذه الشخصية` });
    }
  }
});

client.on("messageCreate", async (message) => {
  const characterData = await CharModel.findOne({
    userID: message.author.id,
  });

  if (message.content.startsWith("-character-3")) {
    let charfind = characterData?.characters?.find(
      (c) => c.character == "character-3"
    );
    if (charfind) {
      let char1 = new MessageEmbed()
        .setThumbnail(charfind.avatar)
        .setDescription(`${charfind.character} - <@${characterData.userID}>`)
        .setFields(
          {
            name: `: اسم الشخصية`,
            value: `${charfind.usrName}`,
          },
          {
            name: `: عمر الشخصية`,
            value: `${charfind.userage}`,
          },
          {
            name: `: تاريخ الولادة`,
            value: `${charfind.birthday}`,
          },
          {
            name: `: مكان الولادة`,
            value: `${charfind.bornAt}`,
          },
          {
            name: `: اسم الشخص`,
            value: `${message.member.displayName}`,
          }
        );
      message.reply({ embeds: [char1] });
    } else {
      return message.reply({ content: `انت لا تمتلك هذه الشخصية` });
    }
  }
});

// حذف كل الرسائل في روم معين

const channelId = "1266583992275177514"; // Replace with the actual channel ID
client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  try {
    const channel = await client.channels.fetch(channelId);

    // Fetch messages in the channel
    const messages = await channel.messages.fetch({ limit: 100 });

    // Delete messages in bulk
    await channel.bulkDelete(messages);

    return channel.send("``- تم حذف كل رسائل الروم -``");
  } catch (error) {
    console.error(`Error deleting messages: ${error.message}`);
  }
});

client.on("messageDelete", (message) => {
  if (message.author.bot) return;
  const usermentioned = message.mentions.users.first();
  if (usermentioned) {
    let ghostping = new MessageEmbed()
      .setTitle("Ghost ping detected")
      .setDescription(
        `**${message.author.tag}** - \`(${message.author.id})\` ghost pinged ${usermentioned} \n\n **Original Message**\n${message.content}`
      );
    message.channel.send({ embeds: [ghostping] });
  }
});
/*
// Change Nickname
client.on("messageCreate", async (message) => {
  const changenameroomId = "1195797149821194300";
  const mentionedUser = message.mentions.members.first();

  if (mentionedUser?.user?.id === message.guild.ownerId) {
    return;
  }
  if (mentionedUser) {
    const newNickname = message.content
      .replace(`<@${mentionedUser.id}>`, "")
      .trim();

    try {
      const targetChannel = message.guild.channels.cache.get(changenameroomId);

      if (!targetChannel || message.channel.id !== targetChannel.id) return;

      const bannedWords = ["هومو", "منيك", "خنزير"]; // Add your swear words here

      // Check if the new nickname contains any banned words
      if (
        bannedWords.some((word) =>
          newNickname.toLowerCase().includes(word.toLowerCase())
        )
      ) {
        message.react("❌");

        return message.reply("``- لا يمكن للأسم ان يحتوي على كلمات ممنوعة -``");
      }

      if (newNickname === mentionedUser.nickname) {
        message.react("❌");
        return message.reply(
          "``- الرجاء تغيير الاسم واعادة المحاولة لاحقا -``"
        );
      }

      if (mentionedUser && !newNickname) {
        message.react("✅");
        message.reply("``- تم اعادة الاسم الاصلي- ``");
        return await mentionedUser.setNickname(mentionedUser.user.username);
      }

      if (mentionedUser.manageable) {
        await mentionedUser.setNickname(newNickname);
        message.react("✅");
        message.reply("``- تم تغيير الاسم - ``");
      }
    } catch (error) {
      console.error(`Error changing nickname: ${error.message}`);
    }
  }
});
*/

client.login(process.env.TOKEN);
