
if (!process.env.PORT) throw new Error("Provide SitePORT in .env: PORT");
if (!process.env.SECRET) throw new Error("Provide ClientSecret in .env: SECRET");
if (!process.env.ID) throw new Error("Provide ClientID in .env: ID");
if (!process.env.token) throw new Error("Provide Manager bot TOKEN in .env: token");
