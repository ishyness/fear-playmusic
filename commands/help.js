const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Thông tin về từng lệnh riêng",
  usage: "[lệnh cần giải đáp]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["command", "commands", "cmd"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmd) =>
        `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
    );

    let Embed = new MessageEmbed()
      .setAuthor(
        `Tất cả lệnh của ${client.user.username} Music`,
        client.botconfig.IconURL
      )
      .setColor(client.botconfig.EmbedColor)
      .setImage("https://pbs.twimg.com/profile_images/1115158697976770560/p1_a7nJX_400x400.jpg")
      .setTimestamp()
      .setFooter(
        `Để nhận thông tin của từng loại lệnh ${
          GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
        }help [lệnh cần tìm] | Chúc một ngày tốt lành!`
      ).setDescription(`${Commands.join("\n")}
  
  FEAR Music BOT version: v${require("../package.json").version}
  [✨ Support Server](${
    client.botconfig.SupportServer
  }) | [Discord](https://discord.gg/63A5DSP5ZZ) | [Dashboard](${
      client.botconfig.Website
    }) | By [SrymC](https://discord.gg/63A5DSP5ZZ))`);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmd)
        return client.sendTime(
          message.channel,
          `❌ | Không thể tìm thấy lệnh đó.`
        );

      let embed = new MessageEmbed()
        .setAuthor(`Command: ${cmd.name}`, client.botconfig.IconURL)
        .setDescription(cmd.description)
        .setColor("GREEN")
        //.addField("Name", cmd.name, true)
        .addField("Viết tắt", `\`${cmd.aliases.join(", ")}\``, true)
        .addField(
          "Cách sử dụng",
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
          true
        )
        .addField(
          "Quyền",
          "Thành viên: " +
            cmd.permissions.member.join(", ") +
            "\nBot: " +
            cmd.permissions.channel.join(", "),
          true
        )
        .setFooter(
          `Prefix - ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },

  SlashCommand: {
    options: [
      {
        name: "command",
        description: "Nhận thông tin về một lệnh.",
        value: "command",
        type: 3,
        required: false,
      },
    ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */

    run: async (client, interaction, args, { GuildDB }) => {
      let Commands = client.commands.map(
        (cmd) =>
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
      );

      let Embed = new MessageEmbed()
        .setAuthor(
          `Lệnh của ${client.user.username}`,
          client.botconfig.IconURL
        )
        .setColor(client.botconfig.EmbedColor)
        .setFooter(
          `Để hiểu thêm về tính năng của 1 lệnh nào đó, hãy ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }help [lệnh cần tìm hiểu] | Một ngày tốt lành nhé😘!`
        ).setDescription(`${Commands.join("\n")}
  
  FEAR Music Bot Ver v${require("../package.json").version}
  [✨ Support Server](${
    client.botconfig.SupportServer
  }) | [Discord]](https://discord.gg/63A5DSP5ZZ) | [Dashboard](${
        client.botconfig.Website
      }) | By [SrymC](https://discord.gg/63A5DSP5ZZ)`);
      if (!args) return interaction.send(Embed);
      else {
        let cmd =
          client.commands.get(args[0].value) ||
          client.commands.find(
            (x) => x.aliases && x.aliases.includes(args[0].value)
          );
        if (!cmd)
          return client.sendTime(
            interaction,
            `❌ | Không tìm thấy lệnh đó.`
          );

        let embed = new MessageEmbed()
          .setAuthor(`Lệnh: ${cmd.name}`, client.botconfig.IconURL)
          .setDescription(cmd.description)
          .setColor("GREEN")
          //.addField("Name", cmd.name, true)
          .addField("Viết tắt", cmd.aliases.join(", "), true)
          .addField(
            "Cách sử dụng",
            `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
              cmd.name
            }\`${cmd.usage ? " " + cmd.usage : ""}`,
            true
          )
          .addField(
            "Quyền",
            "Thành viên: " +
              cmd.permissions.member.join(", ") +
              "\nBot: " +
              cmd.permissions.channel.join(", "),
            true
          )
          .setFooter(
            `Ký hiệu lệnh - ${
              GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
            }`
          );

        interaction.send(embed);
      }
    },
  },
};
