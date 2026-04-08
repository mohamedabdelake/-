const cooldown = new Map();

const handler = async (m, { conn }) => {
    const target = await m.lid2jid(m.quoted?.sender) || m.mentionedJid?.[0];
    
    if (!target) return m.reply(`🕊️ رد على رسالة العضو أو اذكر العضو\nمثال: .سرقة @user`);
    if (target === m.sender) return m.reply(`❌ لا يمكنك سرقة نفسك`);
    
    const userTarget = global.db?.users[target];
    if (!userTarget?.xp) return m.reply(`❌ هذا العضو ليس لديه نقاط`);
    if (userTarget.xp < 50) return m.reply(`🤲 هذا الشخص فقير! لديه ${userTarget.xp} نقطة فقط\nدعه يجمع بعض النقاط أولاً`);
    
    const now = Date.now();
    const lastSteal = cooldown.get(m.sender) || 0;
    if (now - lastSteal < 3600000) {
        const remaining = Math.ceil((3600000 - (now - lastSteal)) / 60000);
        return m.reply(`⏳ انتظر ${remaining} دقيقة قبل محاولة السرقة مرة أخرى`);
    }
    
    const userSender = global.db.users[m.sender] || {};
    const stealAmount = Math.floor(Math.random() * 201) + 100;
    const success = Math.random() < 0.7;
    
    cooldown.set(m.sender, now);
    
    if (!success) {
        const penalty = Math.floor(stealAmount / 2);
        userSender.xp = Math.max(0, (userSender.xp || 0) - penalty);
        const pic = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://i.pinimg.com/originals/11/26/97/11269786cdb625c60213212aa66273a9.png');
        await conn.sendMessage(m.chat, {
            image: { url: pic },
            caption: `❌ فشلت السرقة

@${m.sender.split('@')[0]}
😭 تم اكتشافك!
💸 خسرت ${penalty} نقطة

حاول بعد ساعة ⏳`,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: m });
        return;
    }
    
    if (userTarget.xp < stealAmount) {
        const available = userTarget.xp;
        userSender.xp = (userSender.xp || 0) + available;
        userTarget.xp = 0;
        const pic = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://i.pinimg.com/originals/11/26/97/11269786cdb625c60213212aa66273a9.png');
        await conn.sendMessage(m.chat, {
            image: { url: pic },
            caption: `✅ نجحت السرقة

@${m.sender.split('@')[0]}
سرقت من @${target.split('@')[0]}
💰 +${available} نقطة
⚠️ سلبته كل ما لديه!

استمر ولا تتوقف 🔥`,
            contextInfo: { mentionedJid: [m.sender, target] }
        }, { quoted: m });
        return;
    }
    
    userTarget.xp -= stealAmount;
    userSender.xp = (userSender.xp || 0) + stealAmount;
    
    const pic = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://i.pinimg.com/originals/11/26/97/11269786cdb625c60213212aa66273a9.png');
    await conn.sendMessage(m.chat, {
        image: { url: pic },
        caption: `✅ نجحت السرقة

@${m.sender.split('@')[0]}
سرقت من @${target.split('@')[0]}
💰 +${stealAmount} نقطة

استمر ولا تتوقف 🔥`,
        contextInfo: { mentionedJid: [m.sender, target] }
    }, { quoted: m });
};

handler.usage = ["سرقة"];
handler.category = "games";
handler.command = ["سرقة", "steal"];

export default handler;
