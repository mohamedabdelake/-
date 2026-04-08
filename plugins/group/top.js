const handler = async (m, { conn, args }) => {
  const participants = await conn.groupMetadata(m.chat).then(metadata => metadata.participants);
  const jids = participants.map(p => p.id);

  if (jids.length < 2) {
    return conn.sendMessage(m.chat, { text: "المجموعة صغيرة جداً" });
  }

  const shuffledJids = [...jids].sort(() => Math.random() - 0.5);
  const topUsers = shuffledJids.slice(0, Math.min(10, jids.length));

  const emojis = ["😂", "🤬", "🙂", "😎"];
  let em = emojis[Math.floor(Math.random() * emojis.length)];
  let messageText = `${em} قائمة أكثر 10 أشخاص ${args.join(' ')} ${em}\n\n`;

  topUsers.forEach((user, index) => {
    let percentage;
    if (index === 0) {
      percentage = Math.floor(Math.random() * 15) + 90; // 90-104%
    } else if (index === 1) {
      percentage = Math.floor(Math.random() * 15) + 80; // 80-94%
    } else if (index === 2) {
      percentage = Math.floor(Math.random() * 15) + 70; // 70-84%
    } else if (index === 3) {
      percentage = Math.floor(Math.random() * 15) + 60; // 60-74%
    } else if (index === 4) {
      percentage = Math.floor(Math.random() * 15) + 50; // 50-64%
    } else {
      percentage = Math.floor(Math.random() * 40) + 30; // 30-69%
    }
    
    const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "👤";
    messageText += `${medal} ${index + 1}. @${user.split('@')[0]} - نسبة ${percentage}%\n`;
  });

  // إرسال النتيجة مع زر نسخ
  await conn.sendButton(m.chat, {
    bodyText: messageText,
    footerText: "𝑩𝒐𝒕",
    buttons: [
      { name: "cta_copy", params: { display_text: "📋 نسخ القائمة", copy_code: messageText } }
    ],
    mentions: topUsers,
    newsletter: {
      name: "𝑩𝒐𝒕",
      jid: "120363407317665766@newsletter"
    }
  }, m);
};

handler.usage = ["توب"];
handler.category = "group";
handler.command = ["توب"];

export default handler;
