const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0R2azU0VXdXS1A1TGhraXkrS29JQTh5OVBldFdCem05dVhVTVVzOHFFdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVHhPNURZc2Nrc3lHVldzL3psVjhtaEs5ZHlaUUYxeW1nR1ZGbDRtZ3hSTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXQURKZGIrdDc0QmRIdzBJNnlvSnl0YjdNYU9mN3VyZDVmVXFuMHNqVzMwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWaTJXWVFiUFpaRzRnLzdkVzltR2hmbW12cmdLQXNzRzhhTUU3NUhXUzNBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJPWE8yMVMwOThvc1FIcjk3TnIrSXhqUDBVMGl3dHNLaGoyVEJLbE16Vk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlkxdU0yV0NqMFVTdnloVGoyZjdZSmlIcXJRRzJUQ2JZRGI5V0F4YmJLek09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU8yb21SSEsxNEFGUjJhOERlYzBNRFdCTXJuZTdqT2tOdUo2UHFRMFRFZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTXI1SWpldHZhU05tVWlRWGxUaUs2NnlkYmR3aVVHa01VZTlIQm1pTm1sVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilc4QjA5bDc4YlJldHJsWDRGRXNZYXpvb0hxS2VVajk3WjlZbzFLZVVpaDkvS2pKV0tVYlFYOFVuZXNKQmJZY0RlMWtTZUtqZG9DWkZiRnEwUms2NkF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM4LCJhZHZTZWNyZXRLZXkiOiJraGtwb1FrWmR2SnVmR3BMMmZrT2Q0K2FxR1JFK0ZCU2FtR3JnSTFzV2tvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJHTmp4OF9SVlN1R0RjNnhiRmhtampBIiwicGhvbmVJZCI6Ijg5YmY4OGNmLWZmODEtNDQyMC05MDRlLWMxNzQxZTRlMDU5MiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1R3BTSzlmaW1UWldhNzh1NDlXV2RLZUdFVEE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHMyU2Y2STN4SU9CNW9KOUF5T0dUeGlLWmkwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ijk2OUtYMUE5IiwibWUiOnsiaWQiOiIyNjA5NzM3NjI5NTM6NzBAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lucXI2d0ZFSjdOOUxzR0dBa2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlFnRzFyUytyVUxkN29JYkp2cUFqSnozL3ZDdVJNNURBTnRna0djb01zZzQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImQxN0swMThUVGNEOTh6VkVNdkRzd3pXZGx2RnVrbXkzZWlBV20zLzVVQzNlbkttU3hTZm9KZU81OGpNZlNhNWRoNEhWeXkzKzk0NmdKcFFIY1JpdUN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiIyR0MxWVBNaSt2Z0JQNm96RVVZMjU4RG8xTG5zNGJkL3RVc3hvZkhBZTNITFJaNVM5NStaTzJnQUlIcFBWYzdMdmhCNDQyVTU5Z2RBMkVORnhqTXlEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MDk3Mzc2Mjk1Mzo3MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVSUJ0YTB2cTFDM2U2Q0d5YjZnSXljOS83d3JrVE9Rd0RiWUpCbktETElPIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM2MjU1MTQ4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUlEbyJ9',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/Popkiddevs/POPKID-XTECH',
    OWNER_NAME : process.env.OWNER_NAME || "𝛭𝛯𝐿𝐿𝛩",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "260973762953",
    ANTICALL: process.env.ANTICALL || "non",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTOREAD_MESSAGES: process.env.AUTOREAD_MESSAGES || "non",
    AUTO_REACT: process.env.AUTO_REACTION || "non",
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    CAPTION : process.env.CAPTION || "ᴘᴏᴡᴇʀᴇᴅ ʙʏ BELTAH-MD",
    BOT : process.env.BOT_NAME || 'BELTAH-MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "yes",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    CHATBOT : process.env.PM_CHATBOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
