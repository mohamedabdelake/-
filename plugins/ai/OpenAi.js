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

  const { api } = bot.config.info.urls;
  const url = api + `/home/sections/Ai/api/Ai/CustomPrompt?q=${encodeURIComponent(text)}`;
  const response = await fetch(url);
  const { data } = await response.json();
  m.reply(data);
};

handler.usage = ["اوبن"];
handler.category = "ai";
handler.command = ["اوبن"];

export default handler;
