async function handler(m, { conn, command, args }) {
    const chatId = m.chat;
    const subCmd = args[0]?.toLowerCase();

    const menu = `
نظام التفعيل والتشغيل:

.تفعيل ايقاف_الترحيب
- إيقاف ترحيب البوت بالأعضاء الجدد.

.تفعيل تشغيل_الترحيب
- تشغيل ترحيب البوت بالأعضاء الجدد.

.تفعيل تشغيل_الادمن
- جعل البوت يرد على المشرفين فقط.

.تفعيل ايقاف_الادمن
- جعل البوت يرد على جميع الأعضاء.

.تفعيل مطور_فقط
- جعل البوت يتفاعل مع المطورين فقط.

.تفعيل مطور_عام
- جعل البوت يتفاعل مع الجميع.

.تفعيل تشغيل_مضاد_الروابط
- تفعيل حذف الروابط تلقائياً.

.تفعيل ايقاف_مضاد_الروابط
- إيقاف حذف الروابط.
`;

    if (!subCmd) return m.reply(menu);

    let result;
    
    switch (subCmd) {
        case 'ايقاف_الترحيب':
            if (!m.isOwner && !m.isAdmin) {
                result = '❌ هذا الأمر للمشرفين فقط';
                break;
            }
            global.db.groups[chatId].noWelcome = true;
            result = '✅ تم إيقاف الترحيب\nلن يرحب البوت بالأعضاء الجدد.';
            break;
            
        case 'تشغيل_الترحيب':
            if (!m.isOwner && !m.isAdmin) {
                result = '❌ هذا الأمر للمشرفين فقط';
                break;
            }
            global.db.groups[chatId].noWelcome = false;
            result = '✅ تم تشغيل الترحيب\nسيرحب البوت بالأعضاء الجدد.';
            break;
            
        case 'تشغيل_الادمن':
            if (!m.isOwner && !m.isAdmin) {
                result = '❌ هذا الأمر للمشرفين فقط';
                break;
            }
            global.db.groups[chatId].adminOnly = true;
            result = '✅ تم تفعيل وضع المشرفين\nسيتفاعل البوت مع المشرفين فقط.';
            break;
            
        case 'ايقاف_الادمن':
            if (!m.isOwner && !m.isAdmin) {
                result = '❌ هذا الأمر للمشرفين فقط';
                break;
            }
            global.db.groups[chatId].adminOnly = false;
            result = '✅ تم إلغاء وضع المشرفين\nسيتفاعل البوت مع جميع الأعضاء.';
            break;
            
        case 'مطور_فقط':
            if (!m.isOwner) {
                result = '❌ هذا الأمر للمطور فقط';
                break;
            }
            global.db.ownerOnly = true;
            result = '✅ تم تفعيل وضع المطورين فقط\nسيتفاعل البوت مع المطورين فقط.';
            break;
            
        case 'مطور_عام':
            if (!m.isOwner) {
                result = '❌ هذا الأمر للمطور فقط';
                break;
            }
            global.db.ownerOnly = false;
            result = '✅ تم تفعيل وضع الجميع\nسيتفاعل البوت مع جميع المستخدمين.';
            break;
            
        case 'تشغيل_مضاد_الروابط':
            if (!m.isOwner && !m.isAdmin) {
                result = '❌ هذا الأمر للمشرفين فقط';
                break;
            }
            global.db.groups[chatId].antiLink = true;
            result = '✅ تم تفعيل حماية الروابط\nسيتم حذف أي رابط يتم إرساله.';
            break;
            
        case 'ايقاف_مضاد_الروابط':
            if (!m.isOwner && !m.isAdmin) {
                result = '❌ هذا الأمر للمشرفين فقط';
                break;
            }
            global.db.groups[chatId].antiLink = false;
            result = '✅ تم إيقاف حماية الروابط\nلن يتم حذف الروابط.';
            break;
            
        default:
            return m.reply(menu);
    }
    
    if (result) {
        if (result.startsWith('❌')) return m.reply(result);
        m.reply(result);
    }
};

handler.usage = ['تفعيل'];
handler.category = 'admin';
handler.command = ['تفعيل'];

export default handler;
