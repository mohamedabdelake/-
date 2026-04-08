import { Scrapy } from "whatsappy";

const handler = async (m, { conn, command, text }) => {
  if (!text) throw 'ضع رابط الفيديو بعد الأمر';
  
  if (!text.match(/youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\//)) {
    throw 'الرابط غير صحيح. يرجى وضع رابط يوتيوب صحيح';
  }
  
  const isAudio = command === "يوت_اغنيه" || command === "ytmp3";
  const res = await (isAudio ? Scrapy.ytmp3(text) : Scrapy.ytmp4(text));
  
  if (!res?.status) throw 'فشل في جلب البيانات من الرابط';
  
  const type = isAudio ? 'أغاني' : 'فيديوهات';
  let caption = `يوتيوب ${type}\n\nالعنوان: ${res.title}\nالقناة: ${res.channel}\nالجودة: ${res.quality}\n\nالرجاء الانتظار قليلاً...`;
  
  await conn.sendMessage(m.chat, { 
    text: caption,
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
  });
  
  await conn.sendMessage(m.chat, isAudio ? { 
    audio: { url: res.downloadUrl }, 
    mimetype: 'audio/mpeg',
    fileName: res.filename
  } : { 
    video: { url: res.downloadUrl }, 
    caption: res.title
  }, { quoted: m });
};

handler.usage = ["يوتيوب", "يوت_اغنيه"];
handler.category = "downloads";
handler.command = ['يوت_اغنيه', 'يوتيوب', "ytmp3", "ytmp4"];

export default handler;
