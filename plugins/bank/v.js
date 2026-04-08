const handler = async (m, { conn, command, text }) => {
    if (!global.db?.users[m.sender]) {
        global.db.users[m.sender] = {};
    }
    
    const user = global.db.users[m.sender];
    
    if (command === "تسجيل") {
        if (!text) {
            return m.reply(`طريقة التسجيل:
تسجيل الاسم|العمر

مثال:
تسجيل فينوم|20`);
        }
        
        const [name, age] = text.split('|').map(s => s.trim());
        
        if (!name || !age) {
            return m.reply(`خطأ: يجب كتابة الاسم والعمر مفصولين بـ |
مثال: تسجيل فينوم|20`);
        }
        
        if (isNaN(age) || age < 1 || age > 30) {
            return m.reply(`خطأ: العمر يجب أن يكون رقماً بين 1 و 30`);
        }
        
        user.name = name;
        user.age = parseInt(age);
        
        const profilePic = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://i.pinimg.com/originals/11/26/97/11269786cdb625c60213212aa66273a9.png');
        
        const msg = `تم التسجيل بنجاح

@${m.sender.split('@')[0]}
الاسم: ${name}
العمر: ${age} سنة

أهلاً وسهلاً في السيرك 🎭`;

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
    
    else if (command === "حذف_تسجيلي") {
        if (!user.name && !user.age) {
            return m.reply(`ليس لديك تسجيل لحذفه\nاكتب .تسجيل اسم|عمر للتسجيل`);
        }
        
        delete user.name;
        delete user.age;
        
        const profilePic = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://i.pinimg.com/originals/11/26/97/11269786cdb625c60213212aa66273a9.png');
        
        const msg = `تم حذف التسجيل

@${m.sender.split('@')[0]}
تم حذف بياناتك بنجاح

يمكنك التسجيل مرة أخرى 📝`;

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
};

handler.usage = ["تسجيل", "حذف_تسجيلي"];
handler.category = "bank";
handler.command = ["تسجيل", "حذف_تسجيلي"];

export default handler;
