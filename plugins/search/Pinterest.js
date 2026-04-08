async function test(m, { conn, bot, text }) {
  try {
    if (!text) return m.reply("اكتب كلمة البحث باللغة الإنجليزية للحصول على الصور.");
    
    const res = await bot.Api.search.pinterestImages({ q: text });
    const arr = res.data;
    
    if (!arr || arr.length === 0) {
      return m.reply("لا توجد نتائج للبحث.");
    }
    
    const start = Math.floor(Math.random() * (arr.length - 10));
    const selectedImages = arr.slice(start, start + 10);

    const cards = selectedImages.map((item, index) => {
      const title = item.title && item.title !== 'No title' ? item.title : `صورة ${index + 1}`;
      
      return {
        imageUrl: item.url,
        bodyText: title,
        footerText: item.owner ? `👤 ${item.owner} • Pinterest` : '📌 صورة من Pinterest',
        buttons: [
          { name: 'cta_url', params: { display_text: '🔗 عرض الصورة', url: item.pinUrl || item.url } },
          { name: 'cta_copy', params: { display_text: '📋 نسخ الرابط', copy_code: item.url } }
        ]
      };
    });

    return await conn.sendCarousel(m.chat, {
      headerText: `📸 نتائج البحث عن: ${text}`,
      globalFooterText: 'اسحب لليمين →',
      cards: cards,
      mentions: [m.sender],
      newsletter: {
        name: '𝑩𝒐𝒕',
        jid: '120363407317665766@newsletter'
      }
    });
    
  } catch (error) {
    console.error(error.message);
    m.react("❌");
    m.reply("حدث خطأ أثناء البحث، حاول مرة أخرى.");
  }
}

test.category = "search";
test.usage = ["بينترست"];
test.command = ["بين", "بينترست", "pinterest"];
export default test;
