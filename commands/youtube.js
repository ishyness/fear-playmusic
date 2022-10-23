const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "youtube",
  description: "Bắt đầu xem YouTube cùng nhau",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["yt"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {require("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Bạn phải ở trong kênh thoại để phát nội dung nào đó!**"
      );
    if (
      !message.member.voice.channel
        .permissionsFor(message.guild.me)
        .has("CREATE_INSTANT_INVITE")
    )
      return client.sendTime(
        message.channel,
        "❌ | **Bot không có quyền tạo lời mời**"
      );

    let Invite = await message.member.voice.channel.activityInvite(
      "880218394199220334"
    ); //Made using discordjs-activity package
    let embed = new MessageEmbed()
      .setAuthor(
        "Xem YouTube cùng nhau",
        "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1"
      )
      .setColor("#FF0000").setDescription(`
Sử dụng **YouTube Together** bạn có thể xem YouTube với bạn bè của mình trong Kênh thoại. Nhấp chuột *Xem Youtube cùng nhau* để tham gia!

__**[Xem Youtube cùng nhau](https://discord.com/invite/${Invite.code})**__

⚠ **Note:** Chỉ hoạt động trên PC
`);
    message.channel.send(embed);
  },
  SlashCommand: {
    options: [],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | Bạn phải ở trong một kênh thoại để sử dụng lệnh này."
        );
      if (
        !member.voice.channel
          .permissionsFor(guild.me)
          .has("CREATE_INSTANT_INVITE")
      )
        return client.sendTime(
          interaction,
          "❌ | **Bot không có quyền tạo lời mời**"
        );

      let Invite = await member.voice.channel.activityInvite(
        "755600276941176913"
      ); //Made using discordjs-activity package
      let embed = new MessageEmbed()
        .setAuthor(
          "Xem Youtube cùng nhau",
          "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1"
        )
        .setColor("#FF0000").setDescription(`
Sử dụng **Xem Youtube cùng nhau** bạn có thể xem YouTube với bạn bè của mình trong Kênh thoại. Nhấp chuột *Xem Youtube cùng nhau* để tham gia!

__**[Xem Youtube cùng nhau](https://discord.com/invite/${Invite.code})**__

⚠ **Note:** Chỉ hoạt động trên PC
`);
      interaction.send(embed.toJSON());
    },
  },
};
