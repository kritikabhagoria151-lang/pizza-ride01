import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX, Loader2 } from "lucide-react";
const robotLogo = "/images/robot.webp";

type Message = { role: "user" | "assistant"; content: string };

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: Event) => void) | null;
  onend: (() => void) | null;
}
declare const webkitSpeechRecognition: new () => SpeechRecognitionInstance;

const API_URL = `${window.location.origin}/api/chat`;

const QUICK_CHIPS = [
  "Menu dikhao",
  "Best kya hai?",
  "Prices batao",
  "Kab khule ho?",
  "Location",
];

function pick(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function detectUserLang(text: string): "hi-IN" | "en-IN" {
  if (/[\u0900-\u097F]/.test(text)) return "hi-IN";
  if (/(yaar|haiy|hai|karo|karke|chahiye|kitna|kya|kaise|batao|poochho|achha|sabse|bhai|nhi|nahi|aur|mast|maza|aana|jao|sunao|dekha|wala|kab)/i.test(text)) return "hi-IN";
  return "en-IN";
}

function pickVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === lang && /google|neha|madhur|swara/i.test(v.name)) ||
    voices.find((v) => v.lang === lang) ||
    null
  );
}

function detectLang(input: string): "hi" | "hinglish" | "en" {
  if (/[\u0900-\u097F]/.test(input)) return "hi";
  if (/(yaar|hai|nahi|nhi|karo|kya|kaise|batao|chahiye|kitna|acha|akcha|mast|bhai|saath|dekh|mangwana)/i.test(input)) return "hinglish";
  return "en";
}

function langForText(text: string): "hi-IN" | "en-IN" {
  if (/[\u0900-\u097F]/.test(text)) return "hi-IN";
  if (/(yaar|hai|nahi|nhi|karo|kaise|batao|chahiye|kitna|bhai|mast|dekh|mangwana)/i.test(text)) return "hi-IN";
  return "en-IN";
}

function getEnglishReply(input: string): string {
  const q = input.toLowerCase();

  if (/^(hi|hello|hey|namaste|namaskar|hii|helo|sup|yo)\b/.test(q)) {
    return pick([
      "Hey there! How are you? I'm PizzaBot - Pizza Ride's friend! Tell me what you need - menu, prices, or just a chat?",
      "Hello friend! What's up? I'm PizzaBot - I know everything about our pizzas, burgers, pasta and more!",
      "Hi! Welcome! I'm PizzaBot - your friendly assistant! Just ask me anything!",
    ]);
  }

  if (/kaise ho|kaisa hai|kya haal|kya chal|how are you|what.?up/.test(q)) {
    return "I'm doing great, thanks! The kitchen is busy making fresh pizzas! How about you? Feel like ordering something today?";
  }

  if (/tumhara naam|kaun ho|tum kaun|naam kya|who are you/.test(q)) {
    return "I'm PizzaBot - Pizza Ride's own assistant! I know our full menu, prices, and I'm always ready to help you!";
  }

  if (/thank|shukriya|dhanyavad|thanks|meherbani/.test(q)) {
    return pick([
      "No need to thank me! Helping you is my job. Come back anytime!",
      "We're friends - no formalities! What else can I get for you?",
      "You're welcome! Just drop by whenever you're craving a pizza!",
    ]);
  }

  if (/bye|goodbye|tata|chalo|nikal|ja raha|phir milte/.test(q)) {
    return pick([
      "Bye! Do visit Pizza Ride - you're always welcome! Take care!",
      "See you soon! Whenever you crave pizza, just walk in!",
      "Not goodbye, but see you later! We'll be waiting!",
    ]);
  }

  if (/poora menu|full menu|sab items|saare items|complete list|dikhao sab|pura menu|sab dikhao|menu/.test(q)) {
    return "Here is our full menu!\n\n PIZZAS (59-449):\nTomato 59 | Onion 70 | Capsicum 70 | Corn 80\nOnion & Corn 90 | Onion & Capsicum 90\nOnion & Paneer 100 | Corn & Paneer 100\nSingle Cheese 110 | Cheese & Corn 130 | Double Cheese 150\nFarm House 160/310/400 | Tandoori Paneer 160/310/400\nZesty Tangy 160/310/400 | Makhani 160/310/400\nClassical 210/340/450 | Spicy Paneer 210/340/450\nDelight Extra Cheese 210/340/450 | Tikki Crush 210/340/450\nPizza Ride Special 259/349/449\n\n BURGERS:\nAloo Tikki 40 | Veggi 50 | Cheese Spicy 70 | Paneer 70 | Jumbo 99\n\n SANDWICH:\nVeg Grill 70 | Spicy Paneer 90 | Cheese Grill 90\n\n WRAPS:\nAloo Tikki 60 | Cheese Spicy 90 | Paneer 110\n\n PASTA:\nRed Sauce 109 | White Sauce 109 | Tandoori 119 | Makhani 119 | Mix Sauce 149\n\n GARLIC BREAD:\nPlain 81 | Veg Loaded 110 | Laden 120\n\n SHAKES & DRINKS:\nStrawberry/Butterscotch/Vanilla 90 | Choco Oreo 90 | Black Current 90 | Cold Coffee 120 | Soft Drink 30\n\n FRIES & SIDES:\nSalted 65 | Peri Peri 69 | Masala 69 | Cheese Peri Peri 99\nVeg Pocket 59 | Paneer Pocket 89 | Dips 30 | Paneer Salad 100\n";
  }

  if (/pizza|pizze/.test(q)) {
    if (/best|recommend|suggestion|kaunsa|konsa|popular|bestseller|accha|sahi|batao/.test(q)) {
      return "You must try these!\n\n Farm House - 160\nOur bestseller! Onion, Capsicum, Corn, Mushroom - loaded with fresh veggies.\n\n Makhani Pizza - 160\nOur local favorite! Makhani sauce, Capsicum, Paneer - buttery goodness!\n\n Tikki Crush - 210\nMushroom, Jalapeno, Paneer, Red Paprika - you'll want it again and again!\n\n Pizza Ride Special - 259\nOur signature! All veggies + loaded cheese - only at our place!\n\nMy advice - try Farm House first, then the Special!";
    }
    if (/price|rate|kitna|kitne|cost|charge|menga|sasta/.test(q)) {
      return "Here are the pizza prices!\n\n Budget: Tomato 59 | Onion 70 | Capsicum 70 | Corn 80 | Onion & Corn 90 | Single Cheese 110\n\n Mid: Cheese & Corn 130 | Double Cheese 150 | Farm House 160 | Tandoori 160 | Zesty Tangy 160 | Makhani 160\n\n Premium: Classical 210 | Spicy Paneer 210 | Delight 210 | Tikki Crush 210 | Pizza Ride Special 259\n\n Regular / Medium (+150) / Large (+240)\n\nCheapest 59, most loaded 259!";
    }
    if (/farm.?house/.test(q)) {
      return "This is our KING!\n\n FARM HOUSE - 160 (Reg) / 310 (Med) / 400 (Large)\n\nWhat's in it: Onion, Capsicum, Corn, Mushroom - all fresh veggies!\nWhy special: Our bestseller! People keep coming back.\n\nTry it once - you'll be hooked!";
    }
    if (/tandoori.?paneer/.test(q) && !/pasta/.test(q)) {
      return " TANDOORI PANEER - 160/310/400\n\nOnion, Paneer, Red Paprika - smoky tandoori flavour!\nSizes: Reg/Med/Large";
    }
    if (/zesty|tangy/.test(q)) {
      return " ZESTY TANGY - 160/310/400\n\nOnion, Corn, Paneer - tangy and zesty taste!\nSomething different, and delicious!";
    }
    if (/makhani/.test(q) && !/pasta/.test(q)) {
      return "Our LOCAL FAV!\n\n MAKHANI - 160/310/400\n\nMakhani Sauce, Capsicum, Paneer - buttery comfort food!";
    }
    if (/classical/.test(q)) {
      return " CLASSICAL - 210/340/450\n\nOnion, Capsicum, Corn, Mushroom, Paneer - everything in one!";
    }
    if (/spicy.?paneer/.test(q)) {
      return " SPICY PANEER - 210/340/450\n\nOnion, Paneer, Red Paprika - it's spicy!\nFor spice lovers - eyes will open wide!";
    }
    if (/delight|extra.?cheese/.test(q)) {
      return " DELIGHT EXTRA CHEESE - 210/340/450\n\nCapsicum, Mushroom, Jalapeno - KING of cheese!\nCheese lover? This is your pizza!";
    }
    if (/tikki.?crush/.test(q)) {
      return " TIKKI CRUSH - 210/340/450\n\nMushroom, Jalapeno, Paneer, Red Paprika, Tikki Crush!\nUnique taste - a must try!";
    }
    if (/ride.?special|special/.test(q)) {
      return " PIZZA RIDE SPECIAL - 259/349/449\n\nOur signature! All veggies + loaded cheese!\nOnly at Pizza Ride - don't forget to try it!";
    }
    if (/tomato/.test(q) && !/sauce/.test(q)) {
      return " TOMATO - 59\n\nOur cheapest pizza! Fresh tomato - just 59!";
    }
    if (/double.?cheese/.test(q)) {
      return " DOUBLE CHEESE - 150\n\nAll veggies + DOUBLE cheese!";
    }
    if (/single.?cheese/.test(q)) {
      return " SINGLE CHEESE - 110\n\nAll veggies + single cheese - budget friendly and tasty!";
    }
    if (/cheese.?corn/.test(q)) {
      return " CHEESE & CORN - 130\n\nCreamy cheese + crunchy corn = GREAT COMBO!";
    }
    return "Pizza is our passion!\n\n Budget: Tomato 59 | Onion 70 | Capsicum 70 | Corn 80\n Combos: Onion & Corn 90 | Onion & Capsicum 90 | Paneer combos 100\n Cheese: Single 110 | Cheese & Corn 130 | Double 150\n Special: Farm House 160 | Tandoori 160 | Zesty 160 | Makhani 160 | Classical 210 | Spicy 210 | Tikki Crush 210 | Ride Special 259\n\nWhich one would you like to try?";
  }

  if (/burger/.test(q)) {
    if (/price|kitna|kitne/.test(q)) return "Burger prices:\n Aloo Tikki 40 (Budget king!) | Veggi 50 | Cheese Spicy 70 | Paneer 70 | Jumbo 99\nCheapest 40, best 99!";
    if (/aloo.?tikki|tikki/.test(q)) return " ALOO TIKKI - 40\nCheapest and crispy! Crispy tikki + fresh veggies. Great at just 40!";
    if (/jumbo|big|bada/.test(q)) return " JUMBO - 99\nOur SHER! Double patty + extra cheese + fully loaded!"; 
    if (/paneer.?burger/.test(q)) return " PANEER - 70\nFor paneer lovers! Juicy paneer patty + mint mayo. Soft and tasty!";
    if (/cheese.?spicy|spicy.?burger/.test(q)) return " CHEESE SPICY - 70\nSpicy patty + gooey cheese! For spice lovers!";
    if (/veggi|veggie/.test(q)) return " VEGGI - 50\nClassic - simple and tasty! Fresh veggie patty.";
    return "Our burgers are great too!\n Aloo Tikki 40 | Veggi 50 | Cheese Spicy 70 | Paneer 70 | Jumbo 99\nWhich one would you like?";
  }

  if (/pasta/.test(q)) {
    if (/price|kitna|kitne/.test(q)) return "Pasta prices:\n Red Sauce 109 | White 109 | Tandoori 119 | Makhani 119 | Mix 149\nStarts at 109!";
    if (/red.?sauce|tomato.?sauce/.test(q)) return " RED SAUCE - 109\nPenne in spiced tomato red sauce - tangy!";
    if (/white.?sauce|alfredo/.test(q)) return " WHITE SAUCE - 109\nCreamy bechamel - smooth and comforting!";
    if (/tandoori/.test(q)) return " TANDOORI - 119 Chef's Pick!\nSmoky tandoori flavour - unique! Try it once!";
    if (/makhani/.test(q) && !/pizza/.test(q)) return " MAKHANI - 119\nButtery makhani sauce - comfort food!";
    if (/mix.?sauce|pink.?sauce/.test(q)) return " MIX SAUCE - 149 Loaded!\nCombo of all sauces - best of everything!";
    return "Fresh pasta!\n Red Sauce 109 | White 109 | Tandoori 119 | Makhani 119 | Mix 149\nWhich one?";
  }

  if (/sandwich/.test(q)) return "Our sandwiches are super tasty!\n Veg Grill 70 - Cheese, cucumber, tomato, green chutney, grilled!\n Spicy Paneer 90 - Spicy paneer + fresh veggies + toasted bread\n Cheese Grill 90 - Simple and delicious!\nAll crispy! Which one?";
  if (/wrap|roll/.test(q)) return "Our wraps are great too!\n Aloo Tikki 60 - Spiced tikki + chutneys\n Cheese Spicy 90 - Spicy filling + melted cheese\n Paneer 110 - Soft paneer + mint chutney + veggies\nFresh wraps!";
  if (/garlic|bread/.test(q)) return "Garlic bread is next level!\n Plain 81 - Soft bread + garlic butter\n Veg Loaded 110 (MUST TRY!) - Veg filling + melted cheese\n Laden 120 - Extra toppings loaded!\nDo try the Veg Loaded!";
  if (/shake|drink|coffee|cold coffee|beverage|peene|piyo/.test(q)) {
    if (/price|kitna|kitne/.test(q)) return "Drinks prices:\n Strawberry/Butterscotch/Vanilla/Black Current 90 | Choco Oreo 90 | Cold Coffee 120 | Soft Drink 30\nStarts at 30!";
    if (/oreo|choco/.test(q)) return " CHOCO OREO - 90\nCrushed Oreos + chocolate shake = HEAVEN!\nA fan favourite for Oreo lovers!";
    if (/cold.?coffee/.test(q)) return " COLD COFFEE - 120\nChilled, creamy, perfect! Strong and smooth for coffee lovers!";
    if (/strawberry/.test(q)) return " STRAWBERRY - 90\nFresh strawberry flavour - pink and pretty! Thick and creamy!";
    if (/butterscotch/.test(q)) return " BUTTERSCOTCH - 90\nSweet and creamy - old school taste!";
    if (/vanilla/.test(q)) return " VANILLA - 90\nClassic - simple and perfect! Never goes wrong!";
    if (/black.?currant|currant/.test(q)) return " BLACK CURRENT - 90\nRefreshing and fruity!";
    if (/soft.?drink|pepsi|cold.?drink|cola/.test(q) && !/coffee/.test(q)) return " SOFT DRINK - 30\nPepsi, 7Up, Mirinda - just 30, chilled!";
    return "Great drinks!\n Strawberry/Butterscotch/Vanilla 90 | Choco Oreo 90 | Black Current 90 | Cold Coffee 120 | Soft Drink 30\nWhich one?";
  }

  if (/fries|sides|pocket|dip|salad/.test(q)) {
    if (/price|kitna|kitne/.test(q)) return "Fries prices:\n Salted 65 | Peri Peri 69 | Masala 69 | Cheese Peri Peri 99 | Veg Pocket 59 | Paneer Pocket 89 | Dips 30 | Salad 100\nStarts at 30!";
    if (/cheese.?peri|cheese.?fries/.test(q)) return " CHEESE PERI PERI - 99\nPeri peri spice + cheese sauce = GREAT COMBO!";
    if (/veg.?pocket/.test(q)) return " VEG POCKET - 59\nCrispy pocket + spiced veggies - just 59!";
    if (/paneer.?pocket/.test(q)) return " PANEER POCKET - 89\nCrispy + gooey paneer!";
    if (/paneer.?salad/.test(q)) return " PANEER SALAD - 100\nHealthy and tasty! Fresh paneer + veggies.";
    if (/dip|sauce/.test(q)) return "DIPS - 30 each:\n Cheese | Spice | Tandoori | Chilly\nPairs with any item!";
    return "We have fries too!\n Salted 65 | Peri Peri 69 | Masala 69 | Cheese Peri Peri 99\n Veg Pocket 59 | Paneer Pocket 89 | Dips 30 | Salad 100\nWhich one?";
  }

  if (/veg|vegetarian|non.?veg|chicken|mutton|egg|meat/.test(q)) {
    if (/non.?veg|chicken|mutton|egg|meat/.test(q)) return "Sorry! Pizza Ride is 100% VEGETARIAN!\nOnly fresh veggies, paneer, cheese - but so tasty you won't miss non-veg!";
    return "Yes! 100% VEGETARIAN!\nFresh veggies, paneer, cheese, herbs - all natural!";
  }

  if (/price|rate|kitna|kitne|cost|bill|charge|sasta|mehnga/.test(q)) return "Great news - our prices!\n Pizzas 59-449 | Burgers 40-99 | Sandwich 70-90 | Wraps 60-110 | Pasta 109-149 | Garlic 81-120 | Drinks 30-120 | Fries 30-100\n Cheapest: Tomato Pizza 59 | Most popular: Farm House 160\nPocket friendly!";
  if (/location|address|kahan|kidhar|where|map|direction|route|samalkha|pahunchna|aana|nahi pata/.test(q)) return "We are in Samalkha, Haryana!\nAt the bottom of this website under \"Visit Us\" you'll find Google Maps, address and phone!\nOr search \"Pizza Ride Samalkha\" on Google Maps - you'll find us easily!";
  if (/time|timing|hours|open|close|kab|kitne baje|shaam|subah|dopahar|din|raat/.test(q)) return "Note down our timing!\n Open: Monday to Sunday, 12:00 PM - 12:00 AM (midnight)\n Open all 7 days!\nFresh hot pizza awaits!";
  if (/order|delivery|deliver|home delivery|parcel|takeaway|booking|mangwana/.test(q)) return "Ordering is easy!\n1. See the menu\n2. Decide what you want\n3. Walk in or call us\n4. Delivery available in Samalkha!\n5. Takeaway also available!\nFresh and hot - come soon!";
  if (/contact|phone|number|call|mobile|tele|email/.test(q)) return "Contact details are in the \"Visit Us\" section at the bottom of the website!\n Phone - call us directly\n Address - with the map!\nYou can also order by calling!";
  if (/offer|discount|coupon|deal|bachat|sasta|free|combo|affordable/.test(q)) return "About offers:\n CHEAP: Tomato Pizza 59 | Aloo Tikki 40 | Veg Pocket 59 | Soft Drink 30 | Dips 30\n BEST VALUE: Pizza Ride Special 259 (3-4 people can easily share!)\nKeep visiting the restaurant for new offers!";
  if (/review|rating|feedback|kaisa|quality|taste|test|kaisa hai|kaisa lagta/.test(q)) return "We're proud of our feedback!\n 500+ HAPPY CUSTOMERS in Samalkha!\n Most loved: Farm House | Pizza Ride Special | Makhani | Jumbo Burger | Choco Oreo Shake\n\"Fresh ingredients and bold flavours!\" - try and become a fan!";
  if (/about|about.?us|kya ho|kya hai ye|pizza.?ride/.test(q)) return "About Pizza Ride, from the heart!\n Samalkha, Haryana - our own store!\n 100% Vegetarian | 500+ Happy Customers\n Fresh Ingredients + Bold Flavours | Fast Delivery | Wood-fired pizza\nIt's your city's own pizza place - come try it!";
  if (/best|recommend|suggestion|kaunsa|konsa|popular|bestseller|accha|sahi|top|batao/.test(q)) return "Here are my TOP 6!\n1. Pizza Ride Special 259 - Only at our place!\n2. Farm House 160 - Our bestseller!\n3. Makhani 160 - Local favorite!\n4. Tikki Crush 210 - Unique taste!\n5. Jumbo Burger 99 - Double patty + cheese!\n6. Choco Oreo Shake 90 - Oreo + Chocolate = HEAVEN!\nIf you haven't tried these, you've missed something!";

  return pick([
    "Hmm, that's a great question! But I don't have that answer. However, I know all the secrets of our pizzas, burgers, pasta and shakes! Ask me something!",
    "That's a bit outside my topic - I'm an expert in food and Pizza Ride! Want to hear the menu? Or the prices?",
    "Interesting! I don't know that... but tell me - have you ever tried Farm House? No?! Then plan it for today!",
  ]);
}

function getSmartReply_lang(input: string, lang: "hi" | "hinglish" | "en"): string {
  if (lang === "en" && !/[\u0900-\u097F]/.test(input)) return getEnglishReply(input);
  return getSmartReply(input);
}

function getSmartReply(input: string): string {
  const q = input.toLowerCase();

  if (/^(hi|hello|hey|namaste|namaskar|hii|helo|sup|yo)\b/.test(q)) {
    return pick([
      "Arrey hello yaar! Kaise ho? Main PizzaBot - Pizza Ride ka dost! Batao kya help karu? Menu, price, ya bas baat karni hai?",
      "Hey bhai! Kya haal hai? Main PizzaBot - sab bataunga! Pizza, burger, pasta - jo poochna hai poochho!",
      "Hello hello! Welcome! Main PizzaBot - tumhara friendly assistant! Bolo kya chahiye?",
    ]);
  }

  if (/kaise ho|kaisa hai|kya haal|kya chal|how are you|what.?up/.test(q)) {
    return "Bilkul first class hoon yaar! Pizza banane ki taiyaari chal rahi hai! Tum batao kaise ho? Kuch order karne ka mann hai kya?";
  }

  if (/tumhara naam|kaun ho|tum kaun|naam kya|who are you/.test(q)) {
    return "Bhai main PizzaBot hoon! Pizza Ride ka apna assistant. Menu jaanta hoon, prices pata hain, aur tumhari help ke liye hamesha ready hoon!";
  }

  if (/thank|shukriya|dhanyavad|thanks|meherbani/.test(q)) {
    return pick([
      "Yaar koi shukriya nahi! Tumhari help karna mera kaam hai. Kabhi bhi aana, kabhi bhi poochho!",
      "Arrey bhai, dost hain hum - shukriya mat bolo! Aur batao kya chahiye!",
      "Hoye hoye, itna formality! Dost hain na, no shukriya! Bas aate raho!",
    ]);
  }

  if (/bye|alvida|goodbye|tata|chalo|nikal|ja raha|chal|phir milte/.test(q)) {
    return pick([
      "Bye yaar! Aana zaroor - Pizza Ride mein hamesha welcome! Take care!",
      "Chal bhai, phir milte hain! Jab bhi pizza ka mann kare, seedha aa jana!",
      "Alvida nahi, phir milte hain! Tumhara wait rahega! Bye!",
    ]);
  }

  if (/poora menu|full menu|sab items|saare items|complete list|dikhao sab|pura menu|sab dikhao/.test(q)) {
    return "Arrey waah poora menu? Lelo yaar!\n\n PIZZAS (59-449):\nTomato 59 | Onion 70 | Capsicum 70 | Corn 80\nOnion & Corn 90 | Onion & Capsicum 90\nOnion & Paneer 100 | Corn & Paneer 100 | Paneer & Corn 100\nSingle Cheese 110 | Cheese & Corn 130 | Double Cheese 150\nFarm House 160/310/400 * | Tandoori Paneer 160/310/400\nZesty Tangy 160/310/400 | Makhani 160/310/400\nClassical 210/340/450 | Spicy Paneer 210/340/450\nDelight Extra Cheese 210/340/450 | Tikki Crush 210/340/450\nPizza Ride Special 259/349/449\n\n BURGERS:\nAloo Tikki 40 | Veggi 50 | Cheese Spicy 70 | Paneer 70 | Jumbo 99 *\n\n SANDWICH:\nVeg Grill 70 | Spicy Paneer 90 | Cheese Grill 90\n\n WRAPS:\nAloo Tikki 60 | Cheese Spicy 90 | Paneer 110\n\n PASTA:\nRed Sauce 109 | White Sauce 109 | Tandoori 119 | Makhani 119 | Mix Sauce 149\n\n GARLIC BREADS:\nPlain 81 | Veg Loaded 110 | Laden 120\n\n SHAKES & DRINKS:\nStrawberry/Butterscotch/Vanilla 90 | Choco Oreo 90 | Black Current 90 | Cold Coffee 120 | Soft Drink 30\n\n FRIES & SIDES:\nSalted 65 | Peri Peri 69 | Masala 69 | Cheese Peri Peri 99\nVeg Pocket 59 | Paneer Pocket 89 | Dips 30 | Paneer Salad 100\n\nKuch specific chahiye toh bolo!";
  }

  if (/pizza|pizze/.test(q)) {
    if (/best|recommend|suggestion|kaunsa|konsa|popular|bestseller|accha|sahi|batao/.test(q)) {
      return "Yaar ye try karna zaroor!\n\n Farm House - 160\nSabse zyada bikne wala! Onion, Capsicum, Corn, Mushroom - fresh veggies loaded.\n\n Makhani Pizza - 160\nYe hamara Local Fav hai! Makhani sauce, Capsicum, Paneer - buttery masti!\n\n Tikki Crush - 210\nMushroom, Jalapeno, Paneer, Red Paprika, Tikki Crush - ek baar khaoge toh baar baar maangoge!\n\n Pizza Ride Special - 259\nYe hamari jaan hai! All veggies + loaded cheese - sirf hamare yahan!\n\nMere hisaab se - pehle Farm House try karo, phir Special! Dono alag hain!";
    }
    if (/price|rate|kitna|kitne|cost|charge|menga|sasta/.test(q)) {
      return "Pizza ke prices sunke khush ho jaoge yaar!\n\n Budget: Tomato 59 | Onion 70 | Capsicum 70 | Corn 80 | Onion & Corn 90 | Single Cheese 110\n\n Mid: Cheese & Corn 130 | Double Cheese 150 | Farm House 160 | Tandoori 160 | Zesty Tangy 160 | Makhani 160\n\n Premium: Classical 210 | Spicy Paneer 210 | Delight 210 | Tikki Crush 210 | Pizza Ride Special 259\n\n Reg / Med (+150) / Large (+240)\n\nSabse sasta 59 aur sabse loaded 259!";
    }
    if (/farm.?house/.test(q)) {
      return "Arrey ye toh hamara RAJA hai!\n\n FARM HOUSE - 160 (Reg) / 310 (Med) / 400 (Large)\n\nKya hai: Onion, Capsicum, Corn, Mushroom - sab fresh veggies!\nKyun khaas: Sabse zyada bikne wala! Log baar baar aate hain.\nSizes: Reg / Med / Large\n\nEk baar try karo, pakka ho jaega!";
    }
    if (/tandoori.?paneer/.test(q) && !/pasta/.test(q)) {
      return " TANDOORI PANEER - 160/310/400\n\nOnion, Paneer, Red Paprika - smoky tandoori flavour!\nMuh mein ghol jaata hai yaar! Sizes: Reg/Med/Large";
    }
    if (/zesty|tangy/.test(q)) {
      return " ZESTY TANGY - 160/310/400\n\nOnion, Corn, Paneer - tangy aur zesty taste!\nThoda different hai, mast hai!";
    }
    if (/makhani/.test(q) && !/pasta/.test(q)) {
      return "Ye hamara LOCAL FAV hai yaar!\n\n MAKHANI - 160/310/400\n\nMakhani Sauce, Capsicum, Paneer - buttery comfort food!\nMakhani paneer pasand hai toh pakka try karo!";
    }
    if (/classical/.test(q)) {
      return " CLASSICAL - 210/340/450\n\nOnion, Capsicum, Corn, Mushroom, Paneer - sab kuch hai!\nJab sab chahiye ek mein - ye lo!";
    }
    if (/spicy.?paneer/.test(q)) {
      return " SPICY PANEER - 210/340/450\n\nOnion, Paneer, Red Paprika - teekha hai yaar!\nMirchi wale ho toh ye try karo - aankhein khul jaengi!";
    }
    if (/delight|extra.?cheese/.test(q)) {
      return " DELIGHT EXTRA CHEESE - 210/340/450\n\nCapsicum, Mushroom, Jalapeno - CHEESE ka maharaja!\nCheese lover ho? Ye tumhara pizza hai!";
    }
    if (/tikki.?crush/.test(q)) {
      return " TIKKI CRUSH - 210/340/450\n\nMushroom, Jalapeno, Paneer, Red Paprika, Tikki Crush!\nUnique taste - Try Must hai!";
    }
    if (/ride.?special|special/.test(q)) {
      return " PIZZA RIDE SPECIAL - 259/349/449\n\nYaar ye hamari JAAN hai! All veggies + loaded cheese!\nSirf Pizza Ride mein milta hai - ye try karna MAT bhoolna!";
    }
    if (/tomato/.test(q) && !/sauce/.test(q)) {
      return " TOMATO - 59\n\nSabse sasta pizza! Fresh tomato - sirf 59 mein!";
    }
    if (/double.?cheese/.test(q)) {
      return " DOUBLE CHEESE - 150\n\nAll veggies + DOUBLE cheese! Ek baar khaoge toh mood ban jaega!";
    }
    if (/single.?cheese/.test(q)) {
      return " SINGLE CHEESE - 110\n\nAll veggies + single cheese - budget friendly aur tasty!";
    }
    if (/cheese.?corn/.test(q)) {
      return " CHEESE & CORN - 130\n\nCreamy cheese + crunchy corn = MAST COMBO!";
    }
    return "Bhai pizza toh hamari jaan hai!\n\n Budget: Tomato 59 | Onion 70 | Capsicum 70 | Corn 80\n Double: Onion & Corn 90 | Onion & Capsicum 90 | Paneer combos 100\n Cheese: Single 110 | Cheese & Corn 130 | Double 150\n Special: Farm House 160 | Tandoori 160 | Zesty 160 | Makhani 160 | Classical 210 | Spicy 210 | Tikki Crush 210 | Ride Special 259\n\nKaunsa try karna hai yaar?";
  }

  if (/burger/.test(q)) {
    if (/price|kitna|kitne/.test(q)) return "Burger ke prices yaar:\n Aloo Tikki 40 (Budget king!) | Veggi 50 | Cheese Spicy 70 | Paneer 70 | Jumbo 99 *\nSabse sasta 40 aur best 99!";
    if (/aloo.?tikki|tikki/.test(q)) return " ALOO TIKKI - 40\nSabse sasta aur crispy! Crispy tikki + fresh veggies. 40 mein itna accha!";
    if (/jumbo|big|bada/.test(q)) return " JUMBO - 99 *\nYe hamara SHER hai! Double patty + extra cheese + loaded!\nEk baar kha ke dekho, baaki bhool jaoge!";
    if (/paneer.?burger/.test(q)) return " PANEER - 70\nPaneer lovers ke liye! Juicy paneer patty + mint mayo. Soft aur tasty!";
    if (/cheese.?spicy|spicy.?burger/.test(q)) return " CHEESE SPICY - 70\nSpicy patty + gooey cheese! Teekha hai yaar - spice lovers ke liye!";
    if (/veggi|veggie/.test(q)) return " VEGGI - 50\nClassic - simple aur tasty! Fresh veggies ka patty.";
    return "Yaar burgers bhi mast hai!\n Aloo Tikki 40 | Veggi 50 | Cheese Spicy 70 | Paneer 70 | Jumbo 99 *\nKaunsa try karna hai yaar?";
  }

  if (/pasta/.test(q)) {
    if (/price|kitna|kitne/.test(q)) return "Pasta ke prices:\n Red Sauce 109 | White 109 | Tandoori 119 | Makhani 119 | Mix 149\n109 se shuru!";
    if (/red.?sauce|tomato.?sauce/.test(q)) return " RED SAUCE - 109\nPenne in spiced tomato red sauce - teekha aur tangy!";
    if (/white.?sauce|alfredo/.test(q)) return " WHITE SAUCE - 109\nCreamy bechamel - smooth aur comfort food!";
    if (/tandoori/.test(q)) return " TANDOORI - 119 Chef's Pick!\nSmoky tandoori flavour - unique taste! Ek baar try karo!";
    if (/makhani/.test(q) && !/pizza/.test(q)) return " MAKHANI - 119\nButtery makhani sauce - comfort food hai ye!";
    if (/mix.?sauce|pink.?sauce/.test(q)) return " MIX SAUCE - 149 Loaded!\nSab sauces ka combo - best of everything!";
    return "Yaar pasta bhi ekdum fresh hai!\n Red Sauce 109 | White 109 | Tandoori 119 | Makhani 119 | Mix 149\nKaunsa try karna hai?";
  }

  if (/sandwich/.test(q)) return "Yaar sandwich bohot tasty hai!\n Veg Grill 70 - Cheese, cucumber, tomato, green chutney grilled!\n Spicy Paneer 90 - Spicy paneer + fresh veggies + toasted bread\n Cheese Grill 90 - Simple aur delicious!\nSab crispy hain! Kaunsa?";

  if (/wrap|roll/.test(q)) return "Wraps bhi mast hai yaar!\n Aloo Tikki 60 - Spiced tikki + chutneys\n Cheese Spicy 90 - Spicy filling + melted cheese\n Paneer 110 - Soft paneer + mint chutney + veggies\nFresh wraps - maza aata hai!";

  if (/garlic|bread/.test(q)) return "Garlic bread alag level hai yaar!\n Plain 81 - Soft bread + garlic butter\n Veg Loaded 110 (MUST TRY!) - Veg filling + melted cheese\n Laden 120 - Extra toppings loaded!\nYaar Veg Loaded zaroor try karna!";

  if (/shake|drink|coffee|cold coffee|beverage|peene|piyo/.test(q)) {
    if (/price|kitna|kitne/.test(q)) return "Drinks ke prices:\n Strawberry/Butterscotch/Vanilla/Black Current 90 | Choco Oreo 90 | Cold Coffee 120 | Soft Drink 30\n30 se shuru!";
    if (/oreo|choco/.test(q)) return " CHOCO OREO - 90\nCrushed Oreos + chocolate shake = HEAVEN!\nFan favourite hai yaar - Oreo lovers ke liye BOMB!";
    if (/cold.?coffee/.test(q)) return " COLD COFFEE - 120\nChilled, creamy, perfect! Coffee lovers ke liye strong aur smooth!";
    if (/strawberry/.test(q)) return " STRAWBERRY - 90\nFresh strawberry flavour - pink aur pretty! Thick aur creamy!";
    if (/butterscotch/.test(q)) return " BUTTERSCOTCH - 90\nSweet aur creamy - purane zamane ka taste!";
    if (/vanilla/.test(q)) return " VANILLA - 90\nClassic - simple aur perfect! Kabhi galat nahi ho sakta!";
    if (/black.?currant|currant/.test(q)) return " BLACK CURRENT - 90\nRefreshing aur fruity! Fresh aur mazedaar!";
    if (/soft.?drink|pepsi|cold.?drink|cola/.test(q) && !/coffee/.test(q)) return " SOFT DRINK - 30\nPepsi, 7Up, Mirinda - sirf 30 mein chilled!";
    return "Drinks bhi acche hain yaar!\n Strawberry/Butterscotch/Vanilla 90 | Choco Oreo 90 | Black Current 90 | Cold Coffee 120 | Soft Drink 30\nKonsa try karna hai?";
  }

  if (/fries|sides|pocket|dip|salad/.test(q)) {
    if (/price|kitna|kitne/.test(q)) return "Fries ke prices:\n Salted 65 | Peri Peri 69 | Masala 69 | Cheese Peri Peri 99 | Veg Pocket 59 | Paneer Pocket 89 | Dips 30 | Salad 100\n30 se shuru!";
    if (/cheese.?peri|cheese.?fries/.test(q)) return " CHEESE PERI PERI - 99\nPeri peri spice + cheese sauce = MAST COMBO!";
    if (/veg.?pocket/.test(q)) return " VEG POCKET - 59\nCrispy pocket + spiced veggies - sirf 59!";
    if (/paneer.?pocket/.test(q)) return " PANEER POCKET - 89\nCrispy + gooey paneer! Maza aa jaega!";
    if (/paneer.?salad/.test(q)) return " PANEER SALAD - 100\nHealthy aur tasty! Fresh paneer + veggies.";
    if (/dip|sauce/.test(q)) return "DIPS - 30 each:\n Cheese | Spice | Tandoori | Chilly\nKisi bhi item ke saath lagao!";
    return "Fries bhi hain yaar!\n Salted 65 | Peri Peri 69 | Masala 69 | Cheese Peri Peri 99\n Veg Pocket 59 | Paneer Pocket 89 | Dips 30 | Salad 100\nKaunsa try karna hai?";
  }

  if (/veg|vegetarian|non.?veg|chicken|mutton|egg|meat/.test(q)) {
    if (/non.?veg|chicken|mutton|egg|meat/.test(q)) return "Sorry yaar! Pizza Ride 100% VEGETARIAN hai!\nSirf fresh veggies, paneer, cheese - lekin itna tasty hai ki non-veg ki zaroorat nahi padegi!";
    return "Haan bhai! 100% VEGETARIAN!\nFresh veggies, paneer, cheese, herbs - sab natural! Pure aur tasty!";
  }

  if (/price|rate|kitna|kitne|cost|bill|charge|sasta|mehnga/.test(q)) return "Yaar prices dekh ke khush ho jaoge!\n Pizzas 59-449 | Burgers 40-99 | Sandwich 70-90 | Wraps 60-110 | Pasta 109-149 | Garlic 81-120 | Drinks 30-120 | Fries 30-100\n Sabse sasta: Tomato Pizza 59 | Sabse popular: Farm House 160\nPocket friendly hai yaar!";

  if (/location|address|kahan|kidhar|where|map|direction|route|samalkha|pahunchna|aana|nahi pata/.test(q)) return "Yaar hum hain Samalkha, Haryana!\nWebsite ke bottom mein \"Visit Us\" mein Google Maps, address, phone sab hai!\nYa Google Maps pe search karo \"Pizza Ride Samalkha\" - seedha aa jaega!";

  if (/time|timing|hours|open|close|kab|kitne baje|shaam|subah|dopahar|din|raat/.test(q)) return "Timing note kar lo!\n Khula hai: Monday to Sunday, 12:00 PM - 12:00 AM (midnight)\n 7 days khula hai!\nFresh hot pizza milega!";

  if (/order|delivery|deliver|home delivery|parcel|takeaway|booking|mangwana/.test(q)) return "Order karna easy hai yaar!\n1. Menu dekho\n2. Decide karo kya chahiye\n3. Seedha aa jao ya phone karo\n4. Delivery Samalkha mein hai!\n5. Takeaway bhi hai!\nFresh aur hot - jaldi aao!";

  if (/contact|phone|number|call|mobile|tele|email/.test(q)) return "Contact sab Website ke bottom mein \"Visit Us\" mein hai!\n Phone - seedha call karo\n Email - message karo\n Address - map ke saath!\nCall karke order bhi kar sakte ho!";

  if (/offer|discount|coupon|deal|bachat|sasta|free|combo|affordable/.test(q)) return "Offers ki baat? Yaar abhi regular prices hain lekin -\n SASTE: Tomato Pizza 59 | Aloo Tikki 40 | Veg Pocket 59 | Soft Drink 30 | Dips 30\n BEST VALUE: Pizza Ride Special 259 (3-4 log aaram se kha sakte hain!)\nRestaurant pe visit karte raho!";

  if (/review|rating|feedback|kaisa|quality|taste|test|kaisa hai|kaisa lagta/.test(q)) return "Yaar feedback sunke confidence badhta hai!\n 500+ HAPPY CUSTOMERS in Samalkha!\n Sabse zyada pasand: Farm House | Pizza Ride Special | Makhani | Jumbo Burger | Choco Oreo Shake\n\"Fresh ingredients aur bold flavours!\" - try karke dekho, fan ho jaoge!";

  if (/about|about.?us|kya ho|kya hai ye|pizza.?ride/.test(q)) return "Pizza Ride ke baare mein? Dil se bata raha hoon!\n Samalkha, Haryana - hamari apni dukaan!\n 100% Vegetarian | 500+ Happy Customers\n Fresh Ingredients + Bold Flavours | Fast Delivery | Wood-fired pizza\nApne sheher ka pizza hai yaar - aa ke try karo!";

  if (/best|recommend|suggestion|kaunsa|konsa|popular|bestseller|accha|sahi|top|batao/.test(q)) return "Arrey bhai, ye TOP 6 try karna!\n1. Pizza Ride Special 259 - Sirf hamare yahan!\n2. Farm House 160 - Sabse zyada bikne wala!\n3. Makhani 160 - Local Fav!\n4. Tikki Crush 210 - Unique taste!\n5. Jumbo Burger 99 - Double patty + cheese!\n6. Choco Oreo Shake 90 - Oreo + Chocolate = HEAVEN!\nYe 6 nahi try kiye toh kuch nahi kiya yaar!";

  return pick([
    "Hmm, ye toh mast sawaal hai! Lekin iska jawab mere paas nahi hai yaar. Par pizza, burger, pasta, shakes - in sab ke secrets jaanta hoon! Kuch poochho na?",
    "Yaar ye mera topic se thoda bahar hai Main toh khana aur Pizza Ride ka expert hoon! Menu sunaun? Ya prices?",
    "Interesting! Ye mujhe nahi pata tha... lekin ye batao - Farm House try kiya kabhi? Nahi?! Toh aaj hi plan banao!",
  ]);
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Arrey hello yaar! Main PizzaBot - tumhara apna dost! Kuch bhi poochho - menu, prices, best pizza, location... ya bas aise hi baat karo, maza aa jaega! Hindi, English, Hinglish - jo bolo, wahi jawab + awaaz!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceOutput, setVoiceOutput] = useState(true);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    const load = () => window.speechSynthesis.getVoices();
    load();
    window.speechSynthesis.addEventListener?.("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener?.("voiceschanged", load);
  }, []);

  const speak = useCallback((text: string, index: number, lang: "hi-IN" | "en-IN" = "hi-IN") => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    const voice = pickVoice(lang);
    if (voice) utterance.voice = voice;
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onstart = () => setSpeakingIndex(index);
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);
    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setSpeakingIndex(null);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: Message = { role: "user", content: trimmed };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setInput("");
      setLoading(true);

      const userLang = detectLang(trimmed);

      try {
        let reply: string;
        try {
          const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
            }),
          });
          const data = await res.json();
          reply = data.reply ?? data.fallback ?? getSmartReply_lang(trimmed, userLang);
        } catch {
          reply = getSmartReply_lang(trimmed, userLang);
        }

        const botMsg: Message = { role: "assistant", content: reply };
        const finalMessages = [...updatedMessages, botMsg];
        setMessages(finalMessages);

        if (voiceOutput) speak(reply, finalMessages.length - 1, langForText(reply));
      } catch {
        setMessages((prev) => [...prev, { role: "assistant", content: "Arrey yaar, network mein thodi dikkat ho gayi. Ek baar dobara bhejo na message!" }]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, voiceOutput, speak]
  );

  const startListening = useCallback(() => {
    const SpeechRecognition = typeof webkitSpeechRecognition !== "undefined" ? webkitSpeechRecognition : null;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Chrome.");
      return;
    }
    stopSpeaking();
    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
      sendMessage(transcript);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, [sendMessage, stopSpeaking]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.1, rotate: [0, -6, 6, 0] }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
        style={{
          boxShadow: "0 12px 30px rgba(0,0,0,0.35), 0 4px 8px rgba(0,0,0,0.25), inset 0 -6px 12px rgba(0,0,0,0.25), inset 0 6px 12px rgba(255,255,255,0.35)",
          border: "3px solid rgba(255,255,255,0.4)",
        }}
        aria-label="Open chatbot"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={30} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <img
                src={robotLogo}
                alt="Chat"
                className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover"
                style={{
                  filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))",
                  border: "2px solid rgba(255,255,255,0.5)",
                }}
              />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30 pointer-events-none" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.93 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed bottom-28 right-6 z-50 w-[340px] max-w-[calc(100vw-3rem)] sm:w-[380px] bg-background border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "calc(100vh - 180px)" }}
          >
            <div className="bg-primary text-primary-foreground px-5 py-4 flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl shrink-0"><img src={robotLogo} alt="PizzaBot" className="w-8 h-8 rounded-full object-cover" /></div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-base leading-tight">PizzaBot</p>
                <p className="text-primary-foreground/75 text-xs">Pizza Ride Dost - Online</p>
              </div>
              <div className="flex gap-2 items-center">
                <button onClick={() => { if (voiceOutput) stopSpeaking(); setVoiceOutput((v) => !v); }} className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors" title={voiceOutput ? "Mute" : "Unmute"}>
                  {voiceOutput ? <Volume2 size={15} /> : <VolumeX size={15} />}
                </button>
                <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors">
                  <X size={15} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center text-sm shrink-0 mt-1"><img src={robotLogo} alt="PizzaBot" className="w-7 h-7 rounded-full object-cover" /></div>
                  )}
                  <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border border-border text-foreground rounded-bl-sm"}`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    {msg.role === "assistant" && (
                      <button onClick={() => speakingIndex === i ? stopSpeaking() : speak(msg.content, i, langForText(msg.content))} className="mt-1.5 text-muted-foreground hover:text-primary transition-colors" title={speakingIndex === i ? "Stop" : "Listen"}>
                        {speakingIndex === i ? <VolumeX size={13} /> : <Volume2 size={13} />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center text-sm shrink-0 mt-1"><img src={robotLogo} alt="PizzaBot" className="w-7 h-7 rounded-full object-cover" /></div>
                  <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1 items-center">
                      <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="px-3 py-3 border-t border-border shrink-0 bg-background">
              <div className="flex gap-1.5 overflow-x-auto pb-2.5 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {QUICK_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip)}
                    disabled={loading || listening}
                    className="shrink-0 whitespace-nowrap text-xs bg-secondary/15 hover:bg-primary/15 border border-border rounded-full px-3 py-1.5 transition-colors disabled:opacity-40"
                  >
                    {chip}
                  </button>
                ))}
              </div>
              {listening && (
                <div className="text-center text-xs text-primary font-medium mb-2 flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  Bol rahe ho... (Speaking...)
                </div>
              )}
              <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2 items-center">
                <button type="button" onClick={listening ? stopListening : startListening} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${listening ? "bg-red-500 text-white animate-pulse" : "bg-secondary/15 text-foreground hover:bg-primary/10"}`} title={listening ? "Stop" : "Voice input"}>
                  {listening ? <MicOff size={17} /> : <Mic size={17} />}
                </button>
                <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Kuch bhi poochho... (Any language)" className="flex-1 bg-card border border-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" disabled={loading || listening} />
                <button type="submit" disabled={!input.trim() || loading} className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 shrink-0">
                  {loading ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
                </button>
              </form>
              <p className="text-center text-[10px] text-muted-foreground mt-2">Voice input - Voice reply - Any language</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
