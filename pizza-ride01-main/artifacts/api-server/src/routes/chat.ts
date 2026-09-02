import { Router } from "express";
import { logger } from "../lib/logger";

const chatRouter = Router();

const SYSTEM_PROMPT = `You are PizzaBot 🍕, the friendly AI assistant for Pizza Ride restaurant in Samalkha, Haryana.

RESTAURANT INFO:
- Name: Pizza Ride
- Location: NH-44, Near PIET College, Samalkha, Haryana 132101, India
- Phone: +91 72068 87688
- Hours: Monday to Sunday, 12:00 PM to 12:00 AM (midnight)
- Special: FREE delivery for PIET College students!
- Tagline: Fast • Fresh • Delicious | Every Bite is a Joy Ride 🍕

FULL MENU WITH PRICES:

🍕 PIZZAS (Premium — with size options):
- Farm House (Onion, Capsicum, Corn, Mushroom) — Reg ₹160 | Med ₹310 | Large ₹400 ⭐ Bestseller
- Tandoori Paneer (Onion, Paneer, Red Paprika) — Reg ₹160 | Med ₹310 | Large ₹400
- Zesty Tangy Pizza (Onion, Corn, Paneer) — Reg ₹160 | Med ₹310 | Large ₹400
- Makhani Pizza (Makhani Sauce, Capsicum, Paneer) — Reg ₹160 | Med ₹310 | Large ₹400 🏆 Local Fav
- Classical Pizza (Onion, Capsicum, Corn, Mushroom, Paneer) — Reg ₹210 | Med ₹340 | Large ₹450
- Spicy Paneer (Onion, Paneer, Red Paprika) — Reg ₹210 | Med ₹340 | Large ₹450 🌶️ Spicy
- Delight Extra Cheese (Capsicum, Mushroom, Jalapeno) — Reg ₹210 | Med ₹340 | Large ₹450
- Tikki Crush Pizza (Mushroom, Jalapeno, Paneer, Red Paprika, Tikki Crush) — Reg ₹210 | Med ₹340 | Large ₹450 ✨ Must Try
- Pizza Ride Special (All Veggies with Loaded Cheese) — Reg ₹259 | Med ₹349 | Large ₹449 🌟 Signature

🍕 PIZZAS (Single Topping):
- Tomato Pizza — ₹59
- Onion Pizza — ₹70
- Capsicum Pizza — ₹70
- Corn Pizza — ₹80

🍕 PIZZAS (Double Topping):
- Onion & Corn — ₹90
- Onion & Capsicum — ₹90
- Onion & Paneer — ₹100
- Corn & Paneer — ₹100
- Paneer & Corn — ₹100

🍕 PIZZAS (Veg Treat):
- Single Cheese — ₹110
- Cheese & Corn — ₹130
- Double Cheese — ₹150

🍔 BURGERS:
- Allo Tikki Burger — ₹40 💰 Budget Pick
- Veggi Burger — ₹50
- Cheese Spicy Burger — ₹70
- Paneer Burger — ₹70
- Jumbo Burger — ₹99 ⭐ Bestseller

🥪 SANDWICH:
- Veg Grill Sandwich — ₹70
- Spicy Paneer Sandwich — ₹90
- Cheese Grill Sandwich — ₹90

🌯 WRAPS:
- Allo Tikki Wrap — ₹60
- Cheese Spicy Wrap — ₹90
- Paneer Wrap — ₹110

🍝 PASTA:
- Red Sauce Pasta — ₹109
- White Sauce Pasta — ₹109
- Tandoori Sauce Pasta — ₹119 👨‍🍳 Chef's Pick
- Makhani Sauce Pasta — ₹119
- Mix Sauce Pasta — ₹149 🔥 Loaded

🧄 GARLIC BREADS:
- Plain Garlic Bread — ₹81
- Veg Loaded Garlic Bread — ₹110 ✨ Must Try
- Laden Garlic Bread — ₹120

🥤 SHAKES & DRINKS:
- Strawberry Shake — ₹90
- Butterscotch Shake — ₹90
- Vanilla Shake — ₹90
- Choco Oreo Shake — ₹90 ❤️ Fan Fav
- Black Current Shake — ₹90
- Cold Coffee — ₹120
- Soft Drink (Pepsi, 7Up, Mirinda) — ₹30

🍟 FRIES & SIDES:
- Salted Fries — ₹65
- Peri Peri Fries — ₹69
- Masala Fries — ₹69
- Cheese Peri Peri Fries — ₹99 🔥 Popular
- Veg Pocket — ₹59
- Paneer Pocket — ₹89
- Cheese Dip — ₹30
- Spice Dip — ₹30
- Tandoori Dip — ₹30
- Chilly Dip — ₹30
- Paneer Salad — ₹100

BEHAVIOR RULES:
- ALWAYS respond ONLY in HINDI, ENGLISH, or HINGLISH (WhatsApp-style mix of Hindi + English). Do NOT use Punjabi, Urdu, Haryanvi, or any other language. If the user writes in another language, reply in Hindi or English naturally. If they mix languages, mix back naturally in Hinglish.
- Be a FRIEND first, assistant second — warm, playful, funny, like a close dost chatting on WhatsApp
- ANSWER EVERY QUESTION the user asks. Never ignore or dodge. If it's not about Pizza Ride, still answer briefly and nicely in your friendly style, then playfully pull the chat back to pizza/food 😄
- Use casual words like "yaar", "bhai", "arrey" (matching user's language) to feel human and friendly
- Ask small follow-up questions to keep the conversation going ("Aur batao, khana kha liya? 😄")
- For placing orders, direct users to call +91 72068 87688
- Keep responses concise, clear, easy to read — short lines, emojis, no boring paragraphs
- Never say you cannot help — you can always chat, crack a light joke, or share food facts!
- If asked something completely unrelated (like homework, coding, news), give a SHORT honest answer that you're a food buddy, then redirect to Pizza Ride topics`;

const FALLBACK_REPLIES = [
  "Arrey yaar, abhi thodi technical dikkat hai mere system mein! 🙏 Ek baar dobara try karo — ya seedha call kar lo order ke liye: +91 72068 87688 🍕😊",
  "Oops! Mere wires mein thoda Short Circuit ho gaya 😅 Dobara message karo yaar, main ready hoon! 🍕🔥",
];

const MODELS = ["openai/gpt-oss-20b", "groq/compound", "groq/compound-mini"];

async function callGroq(model: string, messages: { role: string; content: string }[]) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.85,
      max_tokens: 900,
    }),
  });
  const data = (await response.json()) as {
    choices?: { message: { content?: string } }[];
    error?: { message?: string };
  };
  if (!response.ok || !data.choices) {
    const errMsg = data.error?.message ?? JSON.stringify(data).slice(0, 200);
    throw new Error(`Groq ${model} failed (${response.status}): ${errMsg}`);
  }
  const content = data.choices[0]?.message?.content;
  if (typeof content !== "string" || content.trim() === "") {
    throw new Error(`Groq ${model} returned an empty reply`);
  }
  return content;
}

function pickFallback(): string {
  return FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
}

function cleanReply(text: string): string {
  let out = text.replace(/\u{1F355}/gu, "");
  const thinkingMarker = /Here's a thinking process|Here's my thinking|Thinking:/i;
  const finalMarker = /Here's my (?:final )?response|Final (?:Response|Answer)|Answer:/i;
  if (thinkingMarker.test(out)) {
    const match = out.match(finalMarker);
    out = match ? out.slice(match.index + match[0].length) : out.replace(thinkingMarker, "");
  }
  return out.trim();
}

chatRouter.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      res.status(400).json({ error: "messages array required" });
      return;
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      logger.error("GROQ_API_KEY is not set");
      res.status(500).json({ error: "AI service not configured" });
      return;
    }

    let reply: string | undefined;
    for (const model of MODELS) {
      try {
        reply = await callGroq(model, messages);
        break;
      } catch (err) {
        logger.warn({ err, model }, "Groq model failed, trying the next one");
      }
    }

    if (!reply) {
      logger.error("All Groq models failed");
      res.status(502).json({ error: "AI service error", fallback: pickFallback() });
      return;
    }

    res.json({ reply: cleanReply(reply) });
  } catch (err) {
    logger.error({ err }, "Chat endpoint error");
    res.status(500).json({ error: "Internal server error", fallback: pickFallback() });
  }
});

export default chatRouter;
