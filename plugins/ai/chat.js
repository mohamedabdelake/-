import { AiChat } from "../../system/utils.js";

const handler = async (m, { conn, text, bot }) => {
  if (!text) return m.reply("ضع نصاً بجانب الأمر");

  // التحقق مما إذا كان السؤال عن المطور
  const lowerText = text.toLowerCase();
  const developerKeywords = [
    "من طورك", "من صنعك", "مين عملك", "مين عمل البوت", "منشئك", "المطور", "صانعك",
    "who developed you", "who created you", "your developer", "creator", "maker"
  ];
  
  const isAskingAboutDeveloper = developerKeywords.some(keyword => lowerText.includes(keyword));
  
  if (isAskingAboutDeveloper) {
    const developerName = "سونــيــڪ ءل غــداࢪࢪ";
    return m.reply(`تم تطويري بواسطة ${developerName}`);
  }

  // الرد العادي باستخدام الذكاء الاصطناعي
  const res = await AiChat({ text });
  m.reply(res);
};

handler.usage = ["بوت"];
handler.category = "ai";
handler.command = ["بوت"];

export default handler;
