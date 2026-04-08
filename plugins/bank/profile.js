async function handler(m, { conn, bot }) {
    const user = global.db?.users[m.sender] || {};
    const xp = user.xp || 0;
    const level = user.level || 0;
    const nameLevel = user.nameLevel || 'مشاهد';
    const cookies = user.cookies || 0;
    const warnings = user.warnings || 0;
    const banned = user.banned || false;
    const premium = user.premium || false;
    const name = user.name || 'غير مسجل';
    const age = user.age || 'غير مسجل';
    
    const pushName = m.pushName || m.sender.split('@')[0];
    const phoneNumber = m.sender.split('@')[0];
    
    const nextLevelXp = (() => {
        const levels = [100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800, 4700, 5700, 6800, 8000, 9300, 10700, 12200, 13800, 15500, 17500, 20000];
        return levels[level] || levels[levels.length - 1];
    })();
    
    const xpProgress = Math.min(100, Math.floor((xp / nextLevelXp) * 100));
    const status = banned ? 'محظور' : (premium ? 'بريميوم' : 'عادي');
    
    const profilePic = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://i.pinimg.com/originals/11/26/97/11269786cdb625c60213212aa66273a9.png');
    
    const msg = `بروفايل ${pushName}

الرقم: ${phoneNumber}
الاسم: ${pushName}
الاسم المسجل: ${name}
العمر: ${age}
اللقب: ${nameLevel}
المستوى: ${level}
النقاط: ${xp} / ${nextLevelXp}
التقدم: ${'⬜'.repeat(Math.floor(xpProgress / 10))}${'⬛'.repeat(10 - Math.floor(xpProgress / 10))} ${xpProgress}%
الكوكيز: ${cookies}
التحذيرات: ${warnings}
الحالة: ${status}

استمر في التفاعل لترفع مستواك 🚀`;
    
    const cfg = bot.config.info;
    await conn.sendMessage(m.chat, {
        image: { url: profilePic },
        caption: msg,
        contextInfo: {
            mentionedJid: [m.sender],
            isForwarded: true,
            forwardingScore: 1,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363407317665766@newsletter',
                newsletterName: '𝑩𝒐𝒕',
                serverMessageId: 0
            }
        }
    }, { quoted: m });
}

handler.usage = ["بروفايل"];
handler.category = "bank";
handler.command = ["بروفايل", "profile", "my"];

export default handler;
