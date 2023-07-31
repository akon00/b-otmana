const Discord = require("discord.js");
const https = require("https");
const path = require("path");
const express = require("express");
const zip = require("file-zip");
const validator = require("validator");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const cookieParser = require("cookie-parser");
const fetch = require("node-fetch");
const csrf = require("csurf");
const ejs = require("ejs");
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const axios = require("axios");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const rate_limit = require("express-rate-limit");
const helmet = require("helmet");
const allbots = require("../utilities/bots_available");
const config = require("../config/config");
const config_json = require("./config.json")
require("../utilities/env");
const app = express();
const genids = require("../utilities/genids");
const url = require("url");
const MyBotsDb = require("../database/models/Bots");
const OrdersDb = require("../database/models/Orders");
const webutilit = require("../utilities/Webutilities");
const saveDb = require("../functions/saveDb.js")
const botdb = require('../functions/botdb')
module.exports = (client) => {
  const port = process.env.PORT;
  process.env.SESSION_SECRET = "bfksfysa7e32kdhayu292sz";
  for (let i = 0; i <= 15; i++) {
    process.env.SESSION_SECRET += Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6) + i;
  }
  app.set("view engine", "html");
  app.engine("html", ejs.renderFile);
  app.set("views", path.join(process.cwd(), "src", "views"));
  app.use("/css", express.static(path.join(__dirname, "../public/css")));
  app.use("/vendor", express.static(path.join(__dirname, "../public/vendor")));
  app.use("/js", express.static(path.join(__dirname, "../public/js")));
  app.use("/img", express.static(path.join(__dirname, "../public/images")));
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));
  passport.use(
    new Strategy(
      {
        clientID: process.env.ID,
        clientSecret: process.env.SECRET,
        callbackURL: process.env.CALLBACKURL,
        scope: ["identify", "guilds", "guilds.join"],
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile));
      }
    )
  );
  const limiter = rate_limit({
    windowMs: 60 * 1000, // 1 minute
    max: 30,
  });
  // app.use(limiter);
  app.use((req, res, next) => {
    res.setHeader("Permissions-Policy", "	accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()");
    res.removeHeader("replit-cluster");
    res.removeHeader("x-powered-by");
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  /* app.use(
   session({
    cookie: {
     expires: expire_date,
     secure: true,
     maxAge: expire_date,
    },
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
   })
  ); */

  /*app.use(
   session({
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
   })
  );*/
  const expire_date = 1000 * 60 * 60 * 24; // 1 day
  const sessionStore = new MemoryStore({
    checkPeriod: expire_date,
  });
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  const csrfProtection = csrf({ cookie: true });
  function current_time() {
    let current = new Date();
    let cDate = current.getFullYear() + "-" + (current.getMonth() + 1) + "-" + current.getDate();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    let dateTime = cDate + " " + cTime;
    return dateTime;
  }
  app.use(express.static(path.join(__dirname, "/public")));

  app.get(
    "/login",
    async (req, res, next) => {
      if (req.session.backURL) {
        req.session.backURL = req.session.backURL;
      } else if (req.headers.referer) {
        const parsed = url.parse(req.headers.referer);
        if (parsed.hostname === app.locals.domain) {
          req.session.backURL = parsed.path;
        }
      } else {
        req.session.backURL = "/";
      }
      next();
    },
    passport.authenticate("discord", { prompt: "none" })
  );

  const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  };

  app.get(
    "/callback",
    passport.authenticate("discord", {
      failureRedirect: "/",
    }),
    async (req, res) => {
      let maintanance = false;
      if (maintanance) {
        req.session.destroy();
        res.json({ login: false, message: "Website is currently on maintanance", logout: true });
        req.logout();
      } else {
         res.redirect(req.session.backURL || '/')
      }
    }
  );

  const cheakrole = async (req, res, next) => {
    if (req.isAuthenticated()) {
      try {
        let requseringuild = client.guilds.cache.get(config_json.server.id).members.cache.get(req.user.id);
        if (requseringuild.roles.cache.get(config_json.server.botcretorrole)) {
          next();
        } else {
          res.redirect("/?error=true&message=You Must Have Bot Maker Role.");
        }
      } catch (e) {
        res.redirect("/?error=true&message=You Must Join Our Discord Server.&redirect=/discord");
      }
    } else {
      res.redirect("/?error=true&message=You Must Login To Continue.&redirect=/login");
    }
  };

  app.get("/", async (req, res) => {
    res.render(""+process.cwd()+"/webSite/views/index.ejs", {
      team: config.teams,
      bot: client,
      user: req.user,
    });
  });

  app.get("/api/json", async (req, res) => {
    // TODO: Auto generate all_endpoints array.
    let all_endpoints = ["Ticket", "Chat"];
    res.json(JSON.parse(JSON.stringify(all_endpoints)));
  });

  app.post("/create-bot", csrfProtection, async (req, res, next) => {
    let err = false;
    console.log(req.body)
    if (config.whitelist_enabled) {
      if (config.allowed_ips.includes(req.connection.remoteAddress)) {
        if (config.debg) console.log(`::debug:: [${current_time()}] IP OK: ${req.connection.remoteAddress}`);
      } else {
        console.log("Bad IP requested: " + req.connection.remoteAddress);
        return res.json({ message: "Invaild IP! Your IP is not on the whitelist!", error: true });
      }
    }
    const data = req.body;
    const regex = /dnd|idle|online/;
    if (!req.body.token) {
      return res.status(422).json({ message: "No bot token provided!", error: true });
    }
    if (!regex.test(req.body.activity_type.toLowerCase())) {
      return res.redirect("/?error=true&message=Invaild activity type! Allowed types: [dnd|idle|online]");
    }
    if (!req.body.type) {
      return res.status(422).json({ message: "No bot type provided! You can fetch all allowed types in API (/)", error: true });
    }
    if (!req.body.id) {
      return res.status(422).json({ message: "No bot ID provided!", error: true });
    }
    if (isNaN(req.body.id)) {
      return res.status(422).json({ message: "Invaild bot ID provided (ID must be made up of numbers)", error: true });
    }
    if (!req.body.prefix || req.body.prefix.length > 5) {
      return res.redirect("/?error=true&message=Invaild prefix provided (Max 5 chars)")
    }
    if (!req.body.owner_id) {
      res.status(422);
      return res.json({ message: "No owner id provided", error: true });
    }
    if (isNaN(req.body.owner_id)) {
      return res.redirect("/?error=true&message=Invaild owner id provided (ID must be made up of numbers)");
    }
    if (!req.body.ticket) {
      return res.redirect("/?error=true&message=Please provide ticket channel")
    }

    // BOT TOKEN CHECK
    if (config.debug) console.info(`::debug:: [${current_time()}] Fetching bot token...`);
    const request = await fetch("https://discordapp.com/api/v9/users/@me", {
      method: "GET",
      headers: {
        authorization: `Bot ${req.body.token.toString()}`,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.code === 0) {
          err = true;
          return res.redirect("/?error=true&message=Invaild bot token! (Discord API error code: 0)");
        }
        webutilit(body);
      });
    if (config.debug) console.info(`::debug:: [${current_time()}] Fetching bot token done!`);

    // OWNER ID CHECK [WIP]
    /*
     if (config.debug) console.info(`::debug:: [${current_time()}] Fetching owner ID...`);
   const request_owner = await fetch(`https://discord.com/api/users/${req.body.owner_id}`, {
    method: "GET",
    headers: {
     authorization: `Bot ${process.env.BOT_TOKEN}`,
    },
   })
    .then((res) => res.json())
    .then((body) => {
     if (body.code) {
     return res.json({ message: "Invaild owner ID!", error: true });
       res.end()
     }
    });
   if (config.debug) console.info(`::debug:: [${current_time()}] Fetching owner ID done!`);
  
   // USER ID CHECK
   if (config.debug) console.info(`::debug:: [${current_time()}] Fetching user ID...`);
   const request_user = await fetch(`https://discord.com/api/users/${req.body.id}`, {
    method: "GET",
    headers: {
     authorization: `Bot ${process.env.BOT_TOKEN}`,
    },
   })
    .then((res) => res.json())
    .then((body) => {
     if (body.code) {
      return res.json({ message: "Invaild bot ID!", error: true });
     }
    });
   if (config.debug) console.info(`::debug:: [${current_time()}] Fetching user ID done!`);
  */
  if(err) return;
    const ticket = client.guilds.cache.get(config_json.server.id).channels.cache.find(tch => tch.name === req.body.ticket.split("#").join(""))
    if (!ticket || ticket == undefined) return res.redirect("/?error=true&message=Invaild ticket channel")
    ticket.send({
      content: `<@${req.body.owner_id}> Your Bot has been Created by: \`( ${client.users.cache.get(req.user.id).username} | ${req.user.id})\``,
        embeds: [new Discord.MessageEmbed().setTitle(`Your bot: \`${req.body.name}\` has been delivered!`).setThumbnail("https://cdn.discordapp.com/avatars/938176229918531604/42734fb78542cd411407f08a2f24fa03.webp?size=4096?width=644&height=644")
        .setDescription(`<@${req.body.id}> Is a __Hosted__ Discord Bot From <#942476219591557222>! It is a **\`${req.body.type} Bot\`**!\n\nTo use It's Command, type \`/help\`!\nIf you __don't__ see the SlashCommands, type \`${req.body.prefix}deploy\` to deploy them! Or __kick__ and re-add the bot to your server!\n\n> ***Want to order the Source Code? Order in <#931630052016271380>!***`).setColor("RANDOM")],
        components: [
          new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton().setLabel(`Invite ${req.body.name}`).setEmoji(`🔗`).setStyle("LINK").setURL(`https://discord.com/api/oauth2/authorize?client_id=${req.body.id}&permissions=8&scope=bot%20applications.commands`)
          
          ),
        ],
      }).catch(() => {})
    const reqdcuser = client.users.cache.get(req.body.owner_id);
    if (!reqdcuser || reqdcuser === null) console.log("Cant fetch: " + req.user.username + "in dicord");
    reqdcuser
      .send({
        content: `**Here Is Your BOT INFORAMTION EMBED! You can Also use this to Show PROOF that you OWN the bot!**`,
        embeds: [
          new Discord.MessageEmbed()
            .addFields([
              { name: "<a:bluebouncearrow:948357312500867082> Path", value: `\`\`\`yml\n/home/bots/services/${req.body.owner_id}/${req.body.type.split(" ").join("-")}/${req.body.name}\`\`\`` },
              { name: "<a:bluebouncearrow:948357312500867082> Server", value: `\`\`\`yml\n${Math.floor(Math.random() * 250) + 1}\`\`\`` },
              { name: "<a:bluebouncearrow:948357312500867082> Commands", value: `\`\`\`yml\npm2 list | grep "${req.body.type}" --ignore-case\`\`\`` },
              { name: "<a:bluebouncearrow:948357312500867082> Application Information", value: `\`\`\`yml\nLink: https://discord.com/developers/applications/${req.body.id}\nName: ${req.body.name}\nOwner: ${client.users.cache.get(req.body.owner_id).username ? client.users.cache.get(req.body.owner_id).username : "Azury Unknown User"}\`\`\`` }
            ])
            .setColor("RANDOM"),
        ],
      })
      .then((m) => m.pin().catch(() => { }))
      .catch(() => {
        console.log("::Error:: => Cant Send To Dm " + req.user.username);
      });
    reqdcuser
      .send({
        content: `<@${req.body.owner_id}> Your Bot has been Created by: \`( ${client.users.cache.get(req.user.id).username} | ${req.user.id})\``,
        embeds: [new Discord.MessageEmbed().setTitle(`${req.body.name} Is Online And Ready To Be Used!`).setThumbnail("https://cdn.discordapp.com/avatars/938176229918531604/42734fb78542cd411407f08a2f24fa03.webp?size=4096?width=644&height=644")
        .setDescription(`<@${req.body.id}> Is a __Hosted__ Discord Bot From <#942476219591557222>! It is a **\`${req.body.type} Bot\`**!\n\nTo use It's Command, type \`/help\`!\nIf you __don't__ see the SlashCommands, type \`${req.body.prefix}deploy\` to deploy them! Or __kick__ and re-add the bot to your server!\n\n> ***Want to order the Source Code? Order in <#931630052016271380>!***`).setColor("RANDOM")],
        components: [
          new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton().setLabel(`Invite ${req.body.name}`).setEmoji(`🔗`).setStyle("LINK").setURL(`https://discord.com/api/oauth2/authorize?client_id=${req.body.id}&permissions=8&scope=bot%20applications.commands`)
          
          ),
        ],
      })
      .catch(() => {
        null;
      });

    // For Bot Creator
    console.log(req.body.botmakerid)
    const botcreator = client.users.cache.get(req.body.botmakerid);
    const orderid = genids(16);
    console.log(botcreator)
    if (!botcreator || botcreator == null) console.log("err => 269");
    console.log("Trying")
    axios({
      method: 'post',
      url: process.env.API,
      data: {
        SECRECT: "6969",
        token: req.body.token,
        userid: req.body.owner_id,
        type: req.body.type,
        prefix: req.body.prefix,
        maker: botcreator.username,
        owner: reqdcuser.username,
        ownerId: req.body.owner_id,
        id: req.body.filename,
        _: req.body,
        statustxt: req.body.activity_status,
        statustype: req.body.activity_type
      }
    }).then(res => {
      console.log(res)
      const resjson = res.data;
      botdb(req.body.owner_id, req.body.id, resjson.path,69)
    })
    return res.redirect(`/?success=true&message=Please Notify The Customer And Ask Him/Her For Feedback`);
  });

  app.get("/logout", function (req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
    });
  });

  app.get("/createbot", csrfProtection, checkAuth, cheakrole, async (req, res) => {
    let ticketchannels = []
    const ticketch = client.guilds.cache.get(config_json.server.id)
    ticketch.channels.cache.get(config_json.server.ticketcatagory).children.forEach(c => {
      ticketchannels.push(c)
    })
    
    res.render(""+process.cwd()+"/webSite/views/create_bot.ejs", {
      config: config,
      csrfToken: req.csrfToken(),
      user: req.user,
      bot: client,
      channels: ticketchannels
    });
  });

  app.get("/error", async (req, res) => {
    res.render(""+process.cwd()+"/webSite/views/error.ejs", {
      errormsg: req.query.message ? req.query.message : "Unexpected error!",
      errorcode: req.query.code ? req.query.code : 404,
      errordetail: req.query.detail ? req.query.detail : "An error occurred while viewing this page!",
    });
  });

  /*app.get("/@mybots", checkAuth, async (req, res) => {
    res.render("mybots.ejs", {
      user: req.user,
      bot: client,
      botsdb: await MyBotsDb.find(),
    });
  }); 

  app.get("/bots", async (req, res) => {
    const orderdb = await MyBotsDb.find()
    res.render("bots.ejs", {
      db: orderdb,
      user: res.user,
    });
  }); */

  app.get("/team", (req, res) => {
    res.render(""+process.cwd()+"/webSite/views/team.ejs", {
      team: config.teams,
      bot: client,
      user: req.user,
    });
  });

  app.get("/pricing", async (req, res) => {
    res.render(""+process.cwd()+"/webSite/views/pricing.ejs", {
      paypalClientId: process.env.PAYPAL_CLIENT_ID,
      bot: client,
      user: req.user,
    });
  });

  app.get("*", function (req, res) {
    res.status(404).render(""+process.cwd()+"/webSite/views/404.ejs");
  });

  app.listen(port, () => {
    console.log(`[🚀 WebSite] Loaded on Port: ${port}`.green.bold);
  });
};
