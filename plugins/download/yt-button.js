const handler = async (m, { conn, text }) => {
    if (!text) return m.reply("اكتب نص الفيديو أو الأغنية");

    const res = await fetch(`https://emam-api.web.id/home/sections/Search/api/YouTube/search?q=${text}`);
    const { data } = await res.json();
    const { title, image, timestamp: time, url } = data[0];

    await conn.sendButton(m.chat, {
        imageUrl: image,
        bodyText: `${title} | ${time}`,
        footerText: "تحميل من يوتيوب",
        buttons: [
            { name: "quick_reply", params: { display_text: "تحميل الصوت", id: `.يوت_اغنيه ${url}` } },
            { name: "quick_reply", params: { display_text: "تحميل الفيديو", id: `.يوتيوب ${url}` } }
        ],
        mentions: [m.sender],
        newsletter: { name: "𝑩𝒐𝒕", jid: "120363407317665766@newsletter" }
    }, m);
};

handler.usage = ["فيديو", "اغنيه", "شغل"];
handler.category = "downloads";
handler.command = ["اغنيه", "فيديو", "اغنية", "play", "video"];

export default handler;
