import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import { uploadToCatbox } from "../../system/utils.js";

const handler = async (m, { conn, command }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';

  if (!mime) throw 'قم بالرد على صورة أو فيديو أو صوت.';
  
  const media = await q.download();
  const link = await uploadToCatbox(media);
  
  await conn.sendButton(m.chat, {
    imageUrl: link,
    bodyText: `تم الرفع بنجاح عبر catbox.moe\n${link}`,
    footerText: "𝑩𝒐𝒕",
    buttons: [
      { name: "cta_copy", params: { display_text: "نسخ الرابط", copy_code: link } }
    ],
    mentions: [m.sender, '212721709540@s.whatsapp.net', '212723620684@s.whatsapp.net'],
    newsletter: {
      name: '𝑩𝒐𝒕',
      jid: '120363407317665766@newsletter'
    }
  }, m);
};

handler.usage = ["لرابط"];
handler.category = "tools";
handler.command = ['لرابط', 'image2url'];

export default handler;
