const example = async (m, { conn }) => {

await conn.sendButton(m.chat, {
  imageUrl: "https://i.pinimg.com/736x/f3/5d/2e/f35d2ed376e03aa254e7f34b4b94992e.jpg",
  bodyText: "مرحباً! هذا هو نص الرسالة",
  footerText: "نص التذييل",
  buttons: [
    // 1. رد سريع
    { name: "quick_reply", params: { display_text: "👍 رد سريع", id: "quick1" } },
    { name: "quick_reply", params: { display_text: "👎 رد آخر", id: "quick2" } },
    
    // 2. زر رابط
    { name: "cta_url", params: { display_text: "🔗 رابط جوجل", url: "https://google.com" } },
    
    // 3. زر اتصال
    { name: "cta_call", params: { display_text: "📞 اتصل بالمطور", phone_number: "212721709540" } },
    
    // 4. زر نسخ
    { name: "cta_copy", params: { display_text: "📋 نسخ الرمز", copy_code: "ABC123XYZ" } },
    
    // 5. قائمة منسدلة (اختيار واحد)
    { name: "single_select", params: { 
      title: "📋 اختر خياراً",
      sections: [{
        title: "القائمة",
        rows: [
          { title: "الخيار الأول", description: "وصف الخيار الأول", id: "opt1" },
          { title: "الخيار الثاني", description: "وصف الخيار الثاني", id: "opt2" }
        ]
      }]
    }},
    
    // 6. طلب الإذن بالاتصال
    { name: "call_permission_request", params: { 
      display_text: "📞 طلب اتصال",
      phone_number: "212723620684",
      duration: 60
    }}
  ],
  mentions: [m.sender],
  newsletter: {
      name: '𝑩𝒐𝒕',
      jid: '120363407317665766@newsletter'
    },
  interactiveConfig: {
    buttons_limits: 1, // يجب أن يكون واحداً
    list_title: "الخيارات المتاحة",
    button_title: "اضغط هنا",
    canonical_url: "https://example.com"
  }
}, m);

};
example.usage = ["تست3"];
example.category = "example";
example.command = ["تست3"];
export default example;
