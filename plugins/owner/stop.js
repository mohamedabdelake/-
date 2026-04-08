const test = async (m, { conn, bot }) => {
  m.react("🟢");
  
  conn.msgUrl(m.chat, "جاري إيقاف البوت...", { 
    title: "بوت واتساب",
    body: "سيتم إيقاف التشغيل بعد لحظات",
    img: "https://g.top4top.io/p_3700yob0b1.jpg",
    big: false 
  });
  
  setTimeout(() => {
    bot.stop();
  }, 1000);
};

test.category = "owner";
test.command = ["ايقاف", "stop"];
test.owner = true;

export default test;
