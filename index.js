import { Client } from 'whatsappy';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";

/* =========== Client ========== */
const client = new Client({
  phoneNumber: '212723620684', // Bot number
  prefix: [".", "/", "!"],
  fromMe: false,
  owners: [
  // Owner 1
    {
  "name": "ســونـيــڪ ءل غــداࢪࢪ",
  "jid": "212698078610@s.whatsapp.net",
  "lid": "275557199646830@lid"
    },
  // Owner 2
    {
  "name": "🍷✨𝙂𝘼𝘽𝙄𝙈𝘼𝙍𝙐✨🍷",
  "jid": "994403310944@s.whatsapp.net",
  "lid": "91865659486320@lid"
    },
  ],
  commandsPath: './plugins'
});

client.onGroupEvent(group);
client.onCommandAccess(access);

/* =========== Database ========== */
if (!global.db) {
    global.db = new UltraDB();
}

/* =========== Config ========== */
const { config } = client;
config.info = { 
  nameBot: "𝒌𝒂𝒌𝒂𝒔𝒉𝒊>", 
  nameChannel: "𝑩𝒐𝒕", 
  idChannel: "120363407317665766@newsletter",
  urls: {
    repo: "https://github.com/deveni0/Pomni-AI",
    api: "https://emam-api.web.id",
    channel: "https://whatsapp.com/channel/0029VbC9jBa7oQhlrjUPKa33"
  },
  copyright: { 
    pack: 'بـــــــ𝑲𝑨𝑲𝑨𝑺𝑯𝑰ــــــوت', 
    author: 'KAAKSHI'
  },
  images: [
    "https://i.pinimg.com/originals/11/26/97/11269786cdb625c60213212aa66273a9.png",
    "https://i.pinimg.com/originals/e2/21/20/e221203f319df949ee65585a657501a2.jpg",
    "https://i.pinimg.com/originals/bb/77/0f/bb770fad66a634a6b3bf93e9c00bf4e5.jpg"
  ]
};

/* =========== Start ========== */
client.start();
