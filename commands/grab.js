const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "grab",
  description: "Lưu bài hát hiện tại vào Tin nhắn trực tiếp của bạn",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["save"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Không có gì đang phát ngay bây giờ...**"
      );
    if (!player.playing)
      return client.sendTime(
        message.channel,
        "❌ | **Không có gì đang phát ngay bây giờ...**"
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Bạn phải ở trong một kênh thoại bằng cách sử dụng lệnh này!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        "❌ | **Bạn phải ở cùng kênh thoại với BOT để sử dụng lệnh này!**"
      );
    message.author
      .send(
        new MessageEmbed()
          .setTimestamp()
          .setAuthor(
            `Đã lưu bài hát`,
            client.user.displayAvatarURL({
              dynamic: true,
            })
          )
          .setThumbnail(
            `https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`
          )
          .setURL(player.queue.current.uri)
          .setColor(client.botconfig.EmbedColor)
          .setTitle(`**${player.queue.current.title}**`)
          .addField(
            `⌛ Thời lượng: `,
            `\`${prettyMilliseconds(player.queue.current.duration, {
              colonNotation: true,
            })}\``,
            true
          )
          .addField(`🎵 Nghệ sĩ: `, `\`${player.queue.current.author}\``, true)
          .addField(
            `▶ Play it:`,
            `\`${
              GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
            }play ${player.queue.current.uri}\``
          )
          .addField(`🔎 Lưu tại:`, `<#${message.channel.id}>`)
          .setFooter(
            `Được yêu cầu bởi: ${player.queue.current.requester.tag}`,
            player.queue.current.requester.displayAvatarURL({
              dynamic: true,
            })
          )
      )
      .catch((e) => {
        return message.channel.send("**❌ Bạn đã vô hiệu hoá tin nhắn từ người lạ.**");
      });

    client.sendTime(message.channel, "✅ | **Check tin nhắn của bạn!**");
  },
  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const user = client.users.cache.get(interaction.member.user.id);
      const member = guild.members.cache.get(interaction.member.user.id);
      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Không có bài hát nào đang được chơi...**"
        );
      if (!player.playing)
        return client.sendTime(
          interaction,
          "❌ | **Không có bài hát nào đang được chơi...**"
        );
      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | **Bạn phải ở trong một kênh thoại để sử dụng lệnh này.**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          "❌ | **Bạn phải ở cùng kênh thoại với tôi để sử dụng lệnh này!**"
        );
      try {
        let embed = new MessageEmbed()
          .setAuthor(`Đã lưu bài hát: `, client.user.displayAvatarURL())
          .setThumbnail(
            `https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`
          )
          .setURL(player.queue.current.uri)
          .setColor(client.botconfig.EmbedColor)
          .setTimestamp()
          .setTitle(`**${player.queue.current.title}**`)
          .addField(
            `⌛ Thời lượng: `,
            `\`${prettyMilliseconds(player.queue.current.duration, {
              colonNotation: true,
            })}\``,
            true
          )
          .addField(`🎵 Nghệ sĩ: `, `\`${player.queue.current.author}\``, true)
          .addField(
            `▶ Play it:`,
            `\`${
              GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
            }play ${player.queue.current.uri}\``
          )
          .addField(`🔎 Đã lưu tại:`, `<#${interaction.channel_id}>`)
          .setFooter(
            `Requested by: ${player.queue.current.requester.tag}`,
            player.queue.current.requester.displayAvatarURL({
              dynamic: true,
            })
          );
        user.send(embed);
      } catch (e) {
        return client.sendTime(interaction, "**❌ Bạn đã tắt tin nhắn từ người lạ.**");
      }

      client.sendTime(interaction, "✅ | **Check tin nhắn của bạn !**");
    },
  },
};
