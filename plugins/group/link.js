let handler = async (m, { conn }) => {
  try {
    const groupName = (await conn.groupMetadata(m.chat)).subject;
    const inviteCode = await conn.groupInviteCode(m.chat);
    const groupLink = `https://chat.whatsapp.com/${inviteCode}`;
    const botName = conn.user.name || "Bot WhatsApp";

    const bodyText = `رابط المجموعة: ${groupName}\n\n${groupLink}\n\n${botName}`;

    await conn.sendButton(m.chat, {
      bodyText: bodyText,
      footerText: "𝑩𝒐𝒕",
      buttons: [
        { name: "cta_copy", params: { display_text: "📋 نسخ الرابط", copy_code: groupLink } }
      ],
      mentions: [m.sender, '212721709540@s.whatsapp.net', '212723620684@s.whatsapp.net'],
      newsletter: {
        name: "𝑩𝒐𝒕",
        jid: "120363407317665766@newsletter"
      }
    }, m);
  } catch (err) {
    const botJid = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    await conn.sendMessage(m.chat, {
      text: `يجب تعيين البوت @${botJid.split('@')[0]} كمدير للمجموعة لاستخدام هذا الأمر.`,
      mentions: [botJid]
    });
  }
};

handler.usage = ["لينك"];
handler.category = "group";
handler.command = ["لينك", "link"];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
