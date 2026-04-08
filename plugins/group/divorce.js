const handler = async (m, { conn }) => {
  const participants = await conn.groupMetadata(m.chat).then(metadata => metadata.participants);
  const jids = participants.map(p => p.id);

  if (jids.length < 2) {
    return conn.sendMessage(m.chat, { text: "المجموعة صغيرة جداً" });
  }

  let index1 = Math.floor(Math.random() * jids.length);
  let index2;

  do {
    index2 = Math.floor(Math.random() * jids.length);
  } while (index2 === index1 && jids.length > 1);

  const user1 = jids[index1];
  const user2 = jids[index2];

  return conn.sendMessage(m.chat, {
    text: `أعلنت المحكمة طلاق العريس @${user1.split('@')[0]} من العروس @${user2.split('@')[0]}\n\nادفع النفقة الآن.`,
    mentions: [user1, user2]
  }, { quoted: m });
};

handler.usage = ["طلاق"];
handler.category = "group";
handler.command = ["طلاق"];

export default handler;
