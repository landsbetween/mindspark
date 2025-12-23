export async function POST(request) {
  const { email, phone, telegram, message } = await request.json();

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const e = (email || "—").toString().trim();
  const p = (phone || "—").toString().trim();
  const tg = (telegram || "—").toString().trim();
  const msg = (message || "—").toString().trim();

  const text =
`✅ *Новая заявка (MindSpark)*

\`\`\`
Email     | ${e}
Телефон   | ${p}
Telegram  | ${tg}
Сообщение | ${msg}
\`\`\``;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });

  return Response.json({ ok: true });
}
