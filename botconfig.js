module.exports = {
  Admins: ["1001781433385365526"], // ID của người qản lý
  ExpressServer: true, // If you wanted to make the website run or not
  DefaultPrefix: process.env.Prefix || ">", // Default prefix, Server Admins can change the prefix
  Port: 3000, //Which port website gonna be hosted
  SupportServer: "https://discord.gg/63A5DSP5ZZ", // Support Server Link
  Token: process.env.Token || "MTAyNTk5MzI3NzMyNzAyMDA1Mw.GWw9gs.pGZFH5CjuBVTb-XUZMvK9lkkaZQNwCzLSTOOjQ", // Discord Bot Token
  ClientID: process.env.Discord_ClientID || "1030586678970163221", // Discord Client ID
  ClientSecret: process.env.Discord_ClientSecret || "QSYs0aCnc9UoJV2z3cItGSeKxB99m-Qu", // Discord Client Secret
  Scopes: ["identify", "guilds", "applications.commands"], // Discord OAuth2 Scopes
  ServerDeafen: true, // If you want bot to stay deafened
  DefaultVolume: 100, // Sets the default volume of the bot, You can change this number anywhere from 1 to 9007199254740991 (JS Integer limit. If you do set it to that, you're a monster.)
  CallbackURL: "/api/callback", // Discord API Callback url. Do not touch it if you don't know what you are doing. All you need to change for website to work is on line 20.
  "24/7": true, // Make the bot stays in VC 24/7 (when you reboot the bot will **not** automatically rejoin.)
  CookieSecret: "Pikachu is cute", // A cookie for you, cookie for me. make sure you change this value!
  IconURL:
    "https://i.imgur.com/7oKYTa0.png", // link icon của bot
  EmbedColor: "#36393F", // Color of most embeds | Custom Hex value are supported. I.e: "#36393F"
  Permissions: 2205281600, // Bot Inviting Permissions
  Website: process.env.Website || "https://example.com", // Website where it is hosted at includes http or https || Use "0.0.0.0" if you using Heroku || Do not include /api/callback. Just the website url. I.e. "https://foo.bar"
  // If you get invalid oauth, make sure on the discord developer page you set the oauth url to something like: https://example.com/api/callback.

  Presence: {
    status: "online", // You can show online, idle, and dnd
    name: "Make by SrymC - FEAR only (>help để biết thông tin chi tiết)", // The message shown
    type: "STREAMING", // PLAYING, WATCHING, LISTENING, STREAMING trạng thái
  },

  // You need a lavalink server for this bot to work!!!!
  // Lavalink server; public lavalink -> https://lavzzzzzzzzzzzzzzzzzzzzzzzalink-list.darrennathanael.com/; create one yourself -> https://darrennathanael.com/post/how-to-lavalink
  Lavalink: {
    id: "Main", //- Used for indentifier. You can set this to whatever you want.
    host: "lavalink.snoopee.co.uk", //- The host name or IP of the lavalink server.
    port: 2333, // The port that lavalink is listening to. This must be a number!
    pass: "realserver", //- The password of the lavalink server.
    secure: false, // Set this to true if the lavalink uses SSL. if not set it to false.
    retryAmount: 100, //- The amount of times to retry connecting to the node if connection got dropped.
    retryDelay: 20, //- Delay between reconnect attempts if connection is lost.
  },
  // Spotify Integration, allows you to enter a spotify link.
  Spotify: {
    ClientID: process.env.Spotify_ClientID || "8c412721154a4b5d8600ed92bac51bbe", // Spotify Client ID
    ClientSecret: process.env.Spotify_ClientSecret || "3787c2adecb44a118733b831cf022094", // Spotify Client Secret
  },
};
