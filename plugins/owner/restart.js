const test = async (m, { conn, bot }) => {
  m.react("🟢");
  
  conn.msgUrl(m.chat, "جاري إعادة تشغيل البوت...", { 
    title: "بوت واتساب",
    body: "سيتم إعادة التشغيل بعد لحظات",
    img: "https://g.top4top.io/p_3700yob0b1.jpg",
    big: false 
  });
  
  setTimeout(() => {
    bot.restart();
  }, 1000);
};

test.usage = ["رستارت"];
test.category = "owner";
test.command = ["رستارت", "restart"];
test.owner = true;

export default test;
