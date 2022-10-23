const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "remove",
  description: `Xóa bài hát khỏi hàng chờ.`,
  usage: "[số thứ tự bài hát]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["rm"],

  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.players.get(message.guild.id);
    const song = player.queue.slice(args[0] - 1, 1);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Không có gì đang phát ngay bây giờ...**"
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Bạn phải ở trong một kênh thoại để sử dụng lệnh này!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        "❌ | **Bạn phải ở cùng kênh thoại với BOT để sử dụng lệnh này!**"
      );

    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return message.channel.send("Không có gì trong hàng chờ để xóa");
    let rm = new MessageEmbed()
      .setDescription(
        `✅ **|** Đã xoá bài hát số **\`${Number(args[0])}\`** trong hàng chờ!`
      )
      .setColor("GREEN");
    if (isNaN(args[0]))
      rm.setDescription(
        `**Cách sử dụng - **${client.botconfig.prefix}\`remove [số]\``
      );
    if (args[0] > player.queue.length)
      rm.setDescription(`Hàng chờ chỉ có ${player.queue.length} bài hát!`);
    await message.channel.send(rm);
    player.queue.remove(Number(args[0]) - 1);
  },

  SlashCommand: {
    options: [
      {
        name: "track",
        value: "[số]",
        type: 4,
        required: true,
        description: "Xóa bài hát khỏi hàng chờ.",
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
      let player = await client.Manager.get(interaction.guild_id);
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      const song = player.queue.slice(args[0] - 1, 1);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Không có gì đang phát ngay bây giờ...**"
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
          "❌ | **Bạn phải ở cùng kênh thoại với BOT để sử dụng lệnh này!**"
        );

      if (!player.queue || !player.queue.length || player.queue.length === 0)
        return client.sendTime("❌ | **Không có gì đang phát ngay bây giờ...**");
      let rm = new MessageEmbed()
        .setDescription(
          `✅ | **Bài hát đã xoá** \`${Number(args[0])}\` trong hàng chờ!`
        )
        .setColor("GREEN");
      if (isNaN(args[0]))
        rm.setDescription(`**Cách sử dụng:** \`${GuildDB.prefix}remove [số]\``);
      if (args[0] > player.queue.length)
        rm.setDescription(`Hàng chờ chỉ có ${player.queue.length} bài hát!`);
      await interaction.send(rm);
      player.queue.remove(Number(args[0]) - 1);
    },
  },
};
