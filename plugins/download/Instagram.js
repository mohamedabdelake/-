const insta = async (m, { text, Api, conn }) => {
  if (!text) return m.reply("ضع الرابط بعد الأمر");
  
  const { status, data } = await Api.download.instagram({ url: text })
  
  try {
    if (status !== 'success') {
      return m.react("❌");
    }

    if (Array.isArray(data)) {
      let thumbnail;
      let video;
      
      for (let item of data) {
        if (item.type === "thumbnail") {
          thumbnail = item.url;
        } else if (item.type === "video") {
          video = item.url;
        }
      }
      
      if (thumbnail) {
        await conn.sendMessage(m.chat, { 
          image: { url: thumbnail },
          caption: "صورة معاينة من انستغرام"
        });
      }
      
      if (video) {
        await conn.sendMessage(m.chat, { 
          video: { url: video }, 
          caption: "تم تحميل الفيديو من انستغرام بنجاح"
        });
      } else {
        m.reply("لا يوجد فيديو في هذا المنشور");
      }
    }
  } catch (error) {
    console.error(error.message);
    m.reply(error.message);
  }
};
insta.usage = ["انستا"];
insta.category = "downloads";
insta.command = ["انستا", "instagram", "ig"];
insta.admin = false;
export default insta;
