import fs from "fs";
import path from "path";

const group = async (ctx, event, eventType) => {
    try {
        if (!event?.participants) return null;

        const participants = event.participants.filter(p => p?.phoneNumber).map(p => p.phoneNumber);
        const author = event.author;
        let txt;

        const users = participants.length 
            ? participants.map(p => '@' + p.split('@')[0]).join(' و ') 
            : 'لا يوجد مستخدمين';
        const authorTag = author ? '@' + author.split('@')[0] : 'غير معروف';

        const messages = {
            add: `مرحباً ${users}${authorTag === users ? "" : `\nبواسطة ${authorTag}`}`,
            remove: `تم إزالة ${users} من المجموعة${authorTag === users ? "" : `\nبواسطة ${authorTag}`}`,
            promote: `تهانينا للرفع مشرف ${users}\nبواسطة ${authorTag}`,
            demote: `تم خفض ${users} إلى عضو عادي\nبواسطة ${authorTag}`
        };

        txt = messages[eventType];
        if (!txt) return null;
        
        if (global.db.groups[event.chat].noWelcome === true) return 9999;

        const img = ["remove", "add"].includes(eventType) 
            ? (event.userUrl || "https://files.catbox.moe/hm9iq4.jpg") 
            : "https://files.catbox.moe/hm9iq4.jpg";

        await ctx.sock.msgUrl(event.chat, txt, {
            img,
            title: ctx.config?.info.nameBot || "بوت واتساب",
            body: "بوت واتساب بسيط وسهل التعديل",
            mentions: author ? [author, ...participants] : participants,
            newsletter: {
                name: '𝑩𝒐𝒕',
                jid: '120363407317665766@newsletter'
            },
            big: ["remove", "add"].includes(eventType)
        });

    } catch (e) {
        console.error(e);
    }
    return null;
};

const access = async (msg, checkType, time) => {
    const conn = await msg.client();
    
    const quoted = {
        key: {
            participant: `${msg.sender.split('@')[0]}@s.whatsapp.net`,
            remoteJid: 'status@broadcast',
            fromMe: false,
        },
        message: {
            contactMessage: {
                displayName: `${msg.pushName}`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${msg.pushName}\nitem1.TEL;waid=${msg.sender.split('@')[0]}:${msg.sender.split('@')[0]}\nEND:VCARD`,
            },
        },
        participant: '0@s.whatsapp.net',
    };
    
    const messages = {
        cooldown: `انتظر ${time || 'بعض الثواني'} ثانية ثم حاول مرة أخرى.\nهذا الأمر لا يسمح بالتكرار السريع.`,
        owner: `هذا الأمر متاح للمطورين فقط.`,
        group: `هذا الأمر يعمل فقط في المجموعات.`,
        admin: `هذا الأمر متاح للمشرفين فقط. أنت عضو عادي.`,
        private: `هذا الأمر يعمل فقط في المحادثة الخاصة.`,
        botAdmin: `يجب أن يكون البوت مشرفاً في المجموعة لتنفيذ هذا الأمر.`,
        disabled: `هذا الأمر متوقف حالياً (قيد الصيانة). سيعمل قريباً.`,
        error: `حدث خطأ في الأمر. يرجى الاتصال بالمطورين.\nاكتب .المطور للحصول على أرقامهم.`
    };
    
    if (conn && messages[checkType]) {
        await conn.msgUrl(msg.chat, messages[checkType], {
            img: "https://i.pinimg.com/originals/02/c3/51/02c351dfd4eb72a62f225ce964dc510d.jpg",
            title: "تنبيهات البوت",
            body: "اقرأ الرسالة لمعرفة التفاصيل",
            newsletter: {
                name: '𝑩𝒐𝒕',
                jid: '120363407317665766@newsletter'
            },
            big: false
        }, quoted);
    }
    return null;
};

export { access, group };
