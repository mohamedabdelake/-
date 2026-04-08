const example = async (m, { conn }) => {

await conn.sendCarousel(m.chat, {
  headerText: '📸 معرض الصور',
  globalFooterText: 'اسحب لليمين →',
  cards: [
    {
      imageUrl: 'https://g.top4top.io/p_3700yob0b1.jpg',
      bodyText: '*أنمي 1*',
      footerText: '🌸 نمط كيوت',
      buttons: [
        { name: 'quick_reply', params: { display_text: '👍 إعجاب', id: 'like1' } },
        { name: 'cta_url', params: { display_text: '🔗 تحميل', url: 'https://example.com/img1' } }
      ]
    },
    {
      imageUrl: 'https://h.top4top.io/p_37009f24s1.jpg',
      bodyText: '*أنمي 2*',
      footerText: '✨ شخصية جميلة',
      buttons: [
        { name: 'quick_reply', params: { display_text: '❤️ حب', id: 'love2' } },
        { name: 'cta_copy', params: { display_text: '📋 نسخ الرابط', copy_code: 'https://example.com/img2' } }
      ]
    },
    {
      imageUrl: 'https://i.top4top.io/p_37000qovy1.jpg',
      bodyText: '*أنمي 3*',
      footerText: '🎨 عمل فني رائع',
      buttons: [
        { 
          name: 'single_select', 
          params: { 
            title: '📁 خيارات إضافية',
            sections: [{
              title: 'اختر إجراء',
              rows: [
                { title: 'حفظ في المعرض', id: 'save3' },
                { title: 'مشاركة مع صديق', id: 'share3' },
                { title: 'الإبلاغ عن الصورة', id: 'report3' }
              ]
            }]
          } 
        }
      ]
    }
  ],
  mentions: [m.sender],
  newsletter: {
      name: '𝑩𝒐𝒕',
      jid: '120363407317665766@newsletter'
    },
}, m)

};
example.usage = ["تست4"];
example.category = "example";
example.command = ["تست4"];
export default example;
