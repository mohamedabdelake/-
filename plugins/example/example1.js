/* 
بواسطة: ســونـيــڪ ءل غــداࢪࢪ
*/

const example = async (m, { conn }) => {

conn.msgUrl(m.chat,
  '*🔥 عرض خاص*',
  {
    img: 'https://example.com/promo.jpg',
    title: 'خصم 50%',
    body: 'لفترة محدودة',
    big: true,
    mentions: ['212721709540@s.whatsapp.net', '212723620684@s.whatsapp.net'],
    newsletter: {
      name: '𝑩𝒐𝒕',
      jid: '120363407317665766@newsletter'
    }
  },
  m
)

};

example.usage = ["تست1"]

/* ↓ قسم الأمر ↓ */
example.category = "example"

/* ↓ استخدم الأوامر ↓ */
example.command = ["تست1"]

/* ↓ إيقاف الأمر ↓ */
example.disabled = false // إذا جعلتها true، لن يعمل الأمر

/* ↓ مدة التبريد بين الاستخدامات (بالمللي ثانية) لمنع التكرار ↓ */
example.cooldown = 1000; // يمكنك زيادة الثواني

/* ↓ استخدام الأمر بدون بادئة أم لا ↓ */
example.usePrefix = false; // إذا جعلتها true، لن يحتاج الأمر إلى بادئة

export default example;
