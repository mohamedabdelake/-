const handler = async (m, { conn, command }) => {
  const participants = await conn.groupMetadata(m.chat).then(metadata => metadata.participants);
  const jids = participants.map(p => p.id);

  if (jids.length < 2) {
    return conn.sendMessage(m.chat, { text: "المجموعة صغيرة جداً" });
  }

  let randomIndex = Math.floor(Math.random() * jids.length);
  const randomUser = jids[randomIndex];
  const percentage = Math.floor(Math.random() * 100) + 1;

  let responseText = "";

  switch (command) {
    case "بيحبني":
      responseText = `أكثر شخص يحبك هو @${randomUser.split('@')[0]}، بنسبة ${percentage}%.`;
      break;
    case "بيكرهني":
      responseText = `أكثر شخص يكرهك هو @${randomUser.split('@')[0]}، بنسبة ${percentage}%.`;
      break;
    case "بيكراش":
      responseText = `المعجب بك هو @${randomUser.split('@')[0]}، بنسبة إعجاب ${percentage}%.`;
      break;
    default:
      return;
  }

  return conn.sendMessage(m.chat, {
    text: responseText,
    mentions: [randomUser]
  }, { quoted: m });
};

handler.usage = ["بيحبني", "بيكرهني", "بيكراش"];
handler.category = "group";
handler.command = ["بيحبني", "بيكرهني", "بيكراش"];

export default handler;
