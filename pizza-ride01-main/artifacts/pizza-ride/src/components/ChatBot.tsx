import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mic, MicOff, Volume2, VolumeX, Loader2 } from "lucide-react";
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
      "Hello! I'm PizzaBot, Pizza Ride's online assistant. Ask me about our menu, prices, timings or delivery.",
      "Welcome to Pizza Ride! I can help you with the menu, prices, location and timings.",
      "Hi there! I'm PizzaBot. What would you like to know about Pizza Ride?",
    ]);
  }

  if (/kaise ho|kaisa hai|kya haal|kya chal|how are you|what.?up/.test(q)) {
    return "I'm doing great, thank you! How can I help you today - the menu, prices, or something else?";
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
    if (/jumbo|big|bada/.test(q)) return " JUMBO - 99\nDouble patty + extra cheese + fully loaded!"; 
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
  if (/garlic|bread/.test(q)) return "Garlic bread options:\n Plain 81 - Soft bread + garlic butter\n Veg Loaded 110 (must try) - Veg filling + melted cheese\n Laden 120 - Extra toppings\nVeg Loaded zaroor try kariye!";
  if (/shake|drink|coffee|cold coffee|beverage|peene|piyo/.test(q)) {
    if (/price|kitna|kitne/.test(q)) return "Drinks prices:\n Strawberry/Butterscotch/Vanilla/Black Current 90 | Choco Oreo 90 | Cold Coffee 120 | Soft Drink 30\nStarts at 30!";
    if (/oreo|choco/.test(q)) return " CHOCO OREO - 90\nCrushed Oreos + chocolate shake - classic favourite!";
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
  if (/order|delivery|deliver|home delivery|parcel|takeaway|booking|mangwana/.test(q)) return "To place an order:\n1. Browse the Menu section on this website.\n2. Choose what you would like.\n3. Order by phone or visit the store in Samalkha.\nDelivery and takeaway are available.\n\nContact details are in the \"Visit Us\" section.";
  if (/contact|phone|number|call|mobile|tele|email/.test(q)) return "Our contact details are in the \"Visit Us\" section at the bottom of the page - phone number, address and map.\nYou can call us, and delivery is available in Samalkha.";
  if (/offer|discount|coupon|deal|bachat|sasta|free|combo|affordable/.test(q)) return "About offers:\n CHEAP: Tomato Pizza 59 | Aloo Tikki 40 | Veg Pocket 59 | Soft Drink 30 | Dips 30\n BEST VALUE: Pizza Ride Special 259 (3-4 people can easily share!)\nKeep visiting the restaurant for new offers!";
  if (/review|rating|feedback|kaisa|quality|taste|test|kaisa hai|kaisa lagta/.test(q)) return "We're proud of our feedback!\n 500+ HAPPY CUSTOMERS in Samalkha!\n Most loved: Farm House | Pizza Ride Special | Makhani | Jumbo Burger | Choco Oreo Shake\n\"Fresh ingredients and bold flavours!\" - try and become a fan!";
  if (/about|about.?us|kya ho|kya hai ye|pizza.?ride/.test(q)) return "About Pizza Ride, from the heart!\n Samalkha, Haryana - our own store!\n 100% Vegetarian | 500+ Happy Customers\n Fresh Ingredients + Bold Flavours | Fast Delivery | Wood-fired pizza\nIt's your city's own pizza place - come try it!";
  if (/best|recommend|suggestion|kaunsa|konsa|popular|bestseller|accha|sahi|top|batao/.test(q)) return "Here are my TOP 6:\n1. Pizza Ride Special 259 - Only at our place!\n2. Farm House 160 - Our bestseller!\n3. Makhani 160 - Local favorite!\n4. Tikki Crush 210 - Unique taste!\n5. Jumbo Burger 99 - Double patty + cheese!\n6. Choco Oreo Shake 90 - Oreo + Chocolate!\nA good place to start!";

  return pick([
    "I can help you with the Pizza Ride menu, prices, timings or location. What would you like to know?",
    "That's outside my knowledge - but I can tell you about our full menu, prices and bestsellers!",
    "Let me know what you need - menu, prices, location or offers - and I'll help you.",
  ]);
}

const MENU_ITEMS: { re: RegExp; reply: string }[] = [
  { re: /red.?sauce|tomato.?sauce|रेड ?सॉस|टमाटर ?सॉस/, reply: "RED SAUCE PASTA - 109\n\nPenne in spiced tomato red sauce - teekha aur tangy." },
  { re: /white.?sauce|alfredo|व्हाइट ?सॉस/, reply: "WHITE SAUCE PASTA - 109\n\nCreamy bechamel sauce - smooth aur comfort food." },
  { re: /mix.?sauce|pink.?sauce|मिक्स ?सॉस/, reply: "MIX SAUCE PASTA - 149\n\nSab sauces ka combo - best of everything." },
  { re: /tandoori.*(pasta|पास्ता)|(pasta|पास्ता).*tandoori/, reply: "TANDOORI PASTA - 119\n\nSmoky tandoori flavour - unique taste." },
  { re: /makhani.*(pasta|पास्ता)|(pasta|पास्ता).*makhani|मखानी ?पास्ता/, reply: "MAKHANI PASTA - 119\n\nButtery makhani sauce - comfort food." },
  { re: /cheese[ ]?(?:&|and|एंड)[ ]?corn|cheese.?corn|चीज़ ?कॉर्न/, reply: "CHEESE & CORN - 130\n\nCreamy cheese + crunchy corn - best combo!" },
  { re: /cheese.?peri|चीज़ ?पेरी/, reply: "CHEESE PERI PERI - 99\n\nPeri peri spice + cheese sauce." },
  { re: /cheese[ ]?spicy|spicy.?burger|चीज़ ?स्पाइसी/, reply: "CHEESE SPICY BURGER - 70\n\nSpicy patty + gooey cheese - spice lovers ke liye." },
  { re: /double.?cheese|डबल ?चीज़|डबल ?चीज/, reply: "DOUBLE CHEESE PIZZA - 150\n\nVeggies + double cheese - cheese lovers ke liye perfect." },
  { re: /single.?cheese|सिंगल ?चीज़/, reply: "SINGLE CHEESE PIZZA - 110\n\nVeggies + single cheese - budget friendly." },
  { re: /black.?current|ब्लैक ?करंट/, reply: "BLACK CURRENT SHAKE - 90\n\nRefreshing aur fruity." },
  { re: /cold.?coffee|कोल्ड ?कॉफी/, reply: "COLD COFFEE - 120\n\nChilled, creamy aur strong - coffee lovers ke liye." },
  { re: /butterscotch|बटरस्कॉच/, reply: "BUTTERSCOTCH SHAKE - 90\n\nSweet aur creamy - classic taste." },
  { re: /oreo|choco|ओरियो|चॉकलेट/, reply: "CHOCO OREO SHAKE - 90\n\nCrushed Oreos + chocolate shake - classic favourite!" },
  { re: /strawberry|स्ट्रॉबेरी/, reply: "STRAWBERRY SHAKE - 90\n\nFresh strawberry flavour - thick aur creamy." },
  { re: /vanilla|वनीला|वेनिला/, reply: "VANILLA SHAKE - 90\n\nClassic, simple aur perfect." },
  { re: /soft.?drink|pepsi|7up|mirinda|cola|सॉफ्ट ?ड्रिंक/, reply: "SOFT DRINK - 30\n\nPepsi, 7Up, Mirinda - chilled, sirf 30 mein." },
  { re: /veg[ ]?loaded|वेज ?लोडेड/, reply: "VEG LOADED GARLIC BREAD - 110\n\nVeg filling + melted cheese - must try!" },
  { re: /^.*\bladen\b|लादेन/, reply: "LADEN GARLIC BREAD - 120\n\nExtra toppings loaded." },
  { re: /^.*\bplain\b|प्लेन/, reply: "PLAIN GARLIC BREAD - 81\n\nSoft bread + garlic butter." },
  { re: /(?:^|[^a-z])tomato(?:[^a-z]|$)|टमाटर/, reply: "TOMATO PIZZA - 59\n\nFresh tomato - sabse sasta pizza." },
  { re: /onion[ ]?(?:&|and|एंड)[ ]?corn|प्याज ?कॉर्न/, reply: "ONION & CORN - 90\n\nFresh onion + sweet corn combo." },
  { re: /onion[ ]?(?:&|and|एंड)[ ]?capsicum/, reply: "ONION & CAPSICUM - 90\n\nFresh veggies combo." },
  { re: /onion[ ]?(?:&|and|एंड)[ ]?paneer|पनीर.*प्याज/, reply: "ONION & PANEER - 100\n\nOnion + paneer - creamy aur tasty." },
  { re: /corn[ ]?(?:&|and|एंड)[ ]?paneer/, reply: "CORN & PANEER - 100\n\nCorn + paneer combo." },
  { re: /spicy.?paneer.*(sandwich|सैंडविच)|(sandwich|सैंडविच).*spicy.?paneer/, reply: "SPICY PANEER SANDWICH - 90\n\nSpicy paneer + fresh veggies + toasted bread." },
  { re: /tandoori.?paneer|तंदूरी ?पनीर/, reply: "TANDOORI PANEER PIZZA - 160 / 310 / 400\n\nOnion, Paneer, Red Paprika - smoky tandoori flavour." },
  { re: /spicy.?paneer|स्पाइसी ?पनीर|मसालेदार ?पनीर/, reply: "SPICY PANEER PIZZA - 210 / 340 / 450\n\nOnion, Paneer, Red Paprika - teekha flavour." },
  { re: /(?:^|[^a-z])makhani(?:[^a-z]|$)|मखानी/, reply: "MAKHANI PIZZA - 160 / 310 / 400\n\nMakhani sauce, Capsicum, Paneer - buttery flavour." },
  { re: /zesty|tangy|ज़ेस्टी/, reply: "ZESTY TANGY PIZZA - 160 / 310 / 400\n\nOnion, Corn, Paneer - tangy aur zesty taste." },
  { re: /(?:^|[^a-z])classical(?:[^a-z]|$)|क्लासिकल/, reply: "CLASSICAL PIZZA - 210 / 340 / 450\n\nOnion, Capsicum, Corn, Mushroom, Paneer - sab kuch ek mein." },
  { re: /delight|extra.?cheese|डिलाइट/, reply: "DELIGHT EXTRA CHEESE PIZZA - 210 / 340 / 450\n\nCapsicum, Mushroom, Jalapeno - zyada cheese ke saath." },
  { re: /tikki.?crush|टिक्की ?क्रश/, reply: "TIKKI CRUSH PIZZA - 210 / 340 / 450\n\nMushroom, Jalapeno, Paneer, Red Paprika, Tikki Crush - unique taste." },
  { re: /ride.?special|(?:^|[^a-z])special(?:[^a-z]|$)|स्पेशल/, reply: "PIZZA RIDE SPECIAL - 259 / 349 / 449\n\nAll veggies + loaded cheese - sirf hamare yahan!" },
  { re: /farm.?house|फार्म ?हाउस/, reply: "FARM HOUSE PIZZA - 160 / 310 / 400\n\nOnion, Capsicum, Corn, Mushroom - sabse zyada bikne wala!" },
  { re: /aloo.?tikki|आलू ?टिक्की/, reply: "ALOO TIKKI - Burger 40 | Wrap 60\n\nCrispy tikki + fresh veggies." },
  { re: /jumbo|जंबो/, reply: "JUMBO BURGER - 99\n\nDouble patty + extra cheese + fully loaded!" },
  { re: /veggi|veggie|वेजी/, reply: "VEGGI BURGER - 50\n\nFresh veggies ka patty - classic aur tasty." },
  { re: /paneer.*burger|बर्गर.*पनीर/, reply: "PANEER BURGER - 70\n\nJuicy paneer patty + mint mayo." },
  { re: /veg.?pocket|वेज ?पॉकेट/, reply: "VEG POCKET - 59\n\nCrispy pocket + spiced veggies - sirf 59." },
  { re: /paneer.?pocket|पनीर ?पॉकेट/, reply: "PANEER POCKET - 89\n\nCrispy + gooey paneer." },
  { re: /paneer.?salad|पनीर ?सलाद/, reply: "PANEER SALAD - 100\n\nHealthy aur tasty - fresh paneer + veggies." },
  { re: /peri.?peri|पेरी ?पेरी/, reply: "PERI PERI FRIES - 69 | Cheese Peri Peri 99\n\nSpicy fries option." },
  { re: /(?:^|[^a-z])masala(?:[^a-z]|$)|मसाला/, reply: "MASALA FRIES - 69\n\nSpiced masala fries - teekha aur crunchy." },
  { re: /(?:^|[^a-z])salted(?:[^a-z]|$)|सॉल्टेड/, reply: "SALTED FRIES - 65\n\nClassic salted fries." },
  { re: /(?:^|[^a-z])tandoori(?:[^a-z]|$)|तंदूरी/, reply: "TANDOORI OPTIONS - Tandoori Paneer Pizza 160/310/400 | Tandoori Pasta 119 | Tandoori Dip 30" },
  { re: /(?:^|[^a-z])corn(?:[^a-z]|$)|कॉर्न/, reply: "CORN PIZZA - 80\n\nSweet corn - simple aur tasty." },
  { re: /(?:^|[^a-z])onion(?:[^a-z]|$)|प्याज/, reply: "ONION PIZZA - 70\n\nFresh onion - classic topping." },
  { re: /capsicum|शिमला ?मिर्च/, reply: "CAPSICUM PIZZA - 70\n\nFresh capsicum - crunchy." },
  { re: /dips?|डिप्स/, reply: "DIPS - 30 each\n\nCheese | Spice | Tandoori | Chilly." },
  { re: /(?:^|[^a-z])paneer(?:[^a-z]|$)|पनीर/, reply: "PANEER ITEMS:\n Pizza - Onion & Paneer 100 | Corn & Paneer 100 | Tandoori Paneer 160 | Spicy Paneer 210\n Burger 70 | Wrap 110 | Pocket 89 | Salad 100" },
];

function findItemReply(input: string): string | null {
  const q = input.toLowerCase();
  for (const item of MENU_ITEMS) {
    if (item.re.test(q)) return item.reply;
  }
  return null;
}

function getSmartReply_lang(input: string, lang: "hi" | "hinglish" | "en"): string {
  const itemReply = findItemReply(input);
  if (itemReply) return itemReply;
  if (lang === "en" && !/[\u0900-\u097F]/.test(input)) return getEnglishReply(input);
  return getSmartReply(input);
}

function getSmartReply(input: string): string {
  const q = input.toLowerCase();

  if (/^(hi|hello|hey|namaste|namaskar|hii|helo|sup|yo)\b/.test(q)) {
    return pick([
      "Hello! Main PizzaBot hoon - Pizza Ride ka online assistant. Menu, prices ya timings - kya jaankari chahiye?",
      "Namaste! Pizza Ride mein aapka swagat hai. Bataaiye, kya help kar sakta hoon?",
      "Hi! Main PizzaBot hoon. Menu, prices, location - jo chaahiye, poochhiye.",
    ]);
  }

  if (/kaise ho|kaisa hai|kya haal|kya chal|how are you|what.?up/.test(q)) {
    return "Main badhiya hoon, shukriya! Aapko menu, prices ya koi aur jaankari chahiye?";
  }

  if (/tumhara naam|kaun ho|tum kaun|naam kya|who are you/.test(q)) {
    return "Main PizzaBot hoon - Pizza Ride ka online assistant. Menu, prices, timings aur location ke baare mein bata sakta hoon.";
  }

  if (/thank|shukriya|dhanyavad|thanks|meherbani/.test(q)) {
    return pick([
      "Shukriya! Aapka swagat hai. Kisi bhi waqt poochhiye.",
      "Helping you is my job - koi aur jaankari chahiye?",
      "Koi baat nahi! Aur kuch jaanna hai?",
    ]);
  }

  if (/bye|alvida|goodbye|tata|chalo|nikal|ja raha|chal|phir milte/.test(q)) {
    return pick([
      "Bye! Pizza Ride par phir se aaiye. Have a great day!",
      "Phir milte hain! Jab bhi pizza ka mann kare, Pizza Ride yaad kariye.",
      "Thank you for visiting us. Alvida!",
    ]);
  }

  if (/poora menu|full menu|sab items|saare items|complete list|dikhao sab|pura menu|sab dikhao/.test(q)) {
    return "Pura menu le lijiye:\n\n PIZZAS (59-449):\nTomato 59 | Onion 70 | Capsicum 70 | Corn 80\nOnion & Corn 90 | Onion & Capsicum 90\nOnion & Paneer 100 | Corn & Paneer 100 | Paneer & Corn 100\nSingle Cheese 110 | Cheese & Corn 130 | Double Cheese 150\nFarm House 160/310/400 * | Tandoori Paneer 160/310/400\nZesty Tangy 160/310/400 | Makhani 160/310/400\nClassical 210/340/450 | Spicy Paneer 210/340/450\nDelight Extra Cheese 210/340/450 | Tikki Crush 210/340/450\nPizza Ride Special 259/349/449\n\n BURGERS:\nAloo Tikki 40 | Veggi 50 | Cheese Spicy 70 | Paneer 70 | Jumbo 99 *\n\n SANDWICH:\nVeg Grill 70 | Spicy Paneer 90 | Cheese Grill 90\n\n WRAPS:\nAloo Tikki 60 | Cheese Spicy 90 | Paneer 110\n\n PASTA:\nRed Sauce 109 | White Sauce 109 | Tandoori 119 | Makhani 119 | Mix Sauce 149\n\n GARLIC BREADS:\nPlain 81 | Veg Loaded 110 | Laden 120\n\n SHAKES & DRINKS:\nStrawberry/Butterscotch/Vanilla 90 | Choco Oreo 90 | Black Current 90 | Cold Coffee 120 | Soft Drink 30\n\n FRIES & SIDES:\nSalted 65 | Peri Peri 69 | Masala 69 | Cheese Peri Peri 99\nVeg Pocket 59 | Paneer Pocket 89 | Dips 30 | Paneer Salad 100\n\nKuch specific chahiye toh poochhiye!";
  }

  if (/pizza|pizze/.test(q)) {
    if (/best|recommend|suggestion|kaunsa|konsa|popular|bestseller|accha|sahi|batao/.test(q)) {
      return "Ye try kariye:\n\n Farm House - 160\nSabse zyada bikne wala! Onion, Capsicum, Corn, Mushroom - fresh veggies loaded.\n\n Makhani Pizza - 160\nMakhani sauce, Capsicum, Paneer - buttery aur tasty!\n\n Tikki Crush - 210\nMushroom, Jalapeno, Paneer, Red Paprika, Tikki Crush - unique maza!\n\n Pizza Ride Special - 259\nAll veggies + loaded cheese - sirf hamare yahan!\n\nShuruaat ke liye Farm House try kariye, phir Special!";
    }
    if (/price|rate|kitna|kitne|cost|charge|menga|sasta/.test(q)) {
      return "Pizza ke prices:\n\n Budget: Tomato 59 | Onion 70 | Capsicum 70 | Corn 80 | Onion & Corn 90 | Single Cheese 110\n\n Mid: Cheese & Corn 130 | Double Cheese 150 | Farm House 160 | Tandoori 160 | Zesty Tangy 160 | Makhani 160\n\n Premium: Classical 210 | Spicy Paneer 210 | Delight 210 | Tikki Crush 210 | Pizza Ride Special 259\n\n Reg / Med (+150) / Large (+240)\n\nSabse sasta 59 aur sabse loaded 259!";
    }
    if (/farm.?house/.test(q)) {
      return " FARM HOUSE - 160 (Reg) / 310 (Med) / 400 (Large)\n\nKya hai: Onion, Capsicum, Corn, Mushroom - sab fresh veggies!\nKyun khaas: Sabse zyada bikne wala!\nSizes: Reg / Med / Large\n\nEk baar try kariye - pakka pasand aayega!";
    }
    if (/tandoori.?paneer/.test(q) && !/pasta/.test(q)) {
      return " TANDOORI PANEER - 160/310/400\n\nOnion, Paneer, Red Paprika - smoky tandoori flavour!\nSizes: Reg/Med/Large";
    }
    if (/zesty|tangy/.test(q)) {
      return " ZESTY TANGY - 160/310/400\n\nOnion, Corn, Paneer - tangy aur zesty taste!\nThoda different hai, mast hai!";
    }
    if (/makhani/.test(q) && !/pasta/.test(q)) {
      return "Ek LOCAL FAVOURITE!\n\n MAKHANI - 160/310/400\n\nMakhani Sauce, Capsicum, Paneer - buttery comfort food!\nMakhani paneer pasand hai toh zaroor try kariye!";
    }
    if (/classical/.test(q)) {
      return " CLASSICAL - 210/340/450\n\nOnion, Capsicum, Corn, Mushroom, Paneer - sab kuch hai!\nJab sab chahiye ek mein - ye lo!";
    }
    if (/spicy.?paneer/.test(q)) {
      return " SPICY PANEER - 210/340/450\n\nOnion, Paneer, Red Paprika - teekha flavour!\nMirchi pasand hai toh ye try kariye!";
    }
    if (/delight|extra.?cheese/.test(q)) {
      return " DELIGHT EXTRA CHEESE - 210/340/450\n\nCapsicum, Mushroom, Jalapeno - CHEESE ka maharaja!\nCheese lover ho? Ye tumhara pizza hai!";
    }
    if (/tikki.?crush/.test(q)) {
      return " TIKKI CRUSH - 210/340/450\n\nMushroom, Jalapeno, Paneer, Red Paprika, Tikki Crush!\nUnique taste - Try Must hai!";
    }
    if (/ride.?special|special/.test(q)) {
      return " PIZZA RIDE SPECIAL - 259/349/449\n\nAll veggies + loaded cheese!\nSirf Pizza Ride mein milta hai - zaroor try kariye!";
    }
    if (/tomato/.test(q) && !/sauce/.test(q)) {
      return " TOMATO - 59\n\nSabse sasta pizza! Fresh tomato - sirf 59 mein!";
    }
    if (/double.?cheese/.test(q)) {
      return " DOUBLE CHEESE - 150\n\nAll veggies + DOUBLE cheese! Cheese lovers ke liye perfect!";
    }
    if (/single.?cheese/.test(q)) {
      return " SINGLE CHEESE - 110\n\nAll veggies + single cheese - budget friendly aur tasty!";
    }
    if (/cheese.?corn/.test(q)) {
      return " CHEESE & CORN - 130\n\nCreamy cheese + crunchy corn = MAST COMBO!";
    }
    return "Pizza bite kijiye aur zyada details ke liye:\n\n Budget: Tomato 59 | Onion 70 | Capsicum 70 | Corn 80\n Double: Onion & Corn 90 | Onion & Capsicum 90 | Paneer combos 100\n Cheese: Single 110 | Cheese & Corn 130 | Double 150\n Special: Farm House 160 | Tandoori 160 | Zesty 160 | Makhani 160 | Classical 210 | Spicy 210 | Tikki Crush 210 | Ride Special 259\n\nKaunsa try karna hai?";
  }

  if (/burger/.test(q)) {
    if (/price|kitna|kitne/.test(q)) return "Burger ke prices:\n Aloo Tikki 40 (Budget favourite) | Veggi 50 | Cheese Spicy 70 | Paneer 70 | Jumbo 99 *\nSabse sasta 40 aur best 99!";
    if (/aloo.?tikki|tikki/.test(q)) return " ALOO TIKKI - 40\nSabse sasta aur crispy! Crispy tikki + fresh veggies. 40 mein itna accha!";
    if (/jumbo|big|bada/.test(q)) return " JUMBO - 99 *\nDouble patty + extra cheese + loaded!\nEk baar try kariye - best burger!";
    if (/paneer.?burger/.test(q)) return " PANEER - 70\nPaneer lovers ke liye! Juicy paneer patty + mint mayo. Soft aur tasty!";
    if (/cheese.?spicy|spicy.?burger/.test(q)) return " CHEESE SPICY - 70\nSpicy patty + gooey cheese! Spice lovers ke liye perfect.";
    if (/veggi|veggie/.test(q)) return " VEGGI - 50\nClassic - simple aur tasty! Fresh veggies ka patty.";
    return "Burgers fresh aur tasty:\n Aloo Tikki 40 | Veggi 50 | Cheese Spicy 70 | Paneer 70 | Jumbo 99 *\nKaunsa try karna hai?";
  }

  if (/pasta/.test(q)) {
    if (/price|kitna|kitne/.test(q)) return "Pasta ke prices:\n Red Sauce 109 | White 109 | Tandoori 119 | Makhani 119 | Mix 149\n109 se shuru!";
    if (/red.?sauce|tomato.?sauce/.test(q)) return " RED SAUCE - 109\nPenne in spiced tomato red sauce - teekha aur tangy!";
    if (/white.?sauce|alfredo/.test(q)) return " WHITE SAUCE - 109\nCreamy bechamel - smooth aur comfort food!";
    if (/tandoori/.test(q)) return " TANDOORI - 119 Chef's Pick!\nSmoky tandoori flavour - unique taste! Ek baar try karo!";
    if (/makhani/.test(q) && !/pizza/.test(q)) return " MAKHANI - 119\nButtery makhani sauce - comfort food hai ye!";
    if (/mix.?sauce|pink.?sauce/.test(q)) return " MIX SAUCE - 149 Loaded!\nSab sauces ka combo - best of everything!";
    return "Pasta fresh aur tasty:\n Red Sauce 109 | White 109 | Tandoori 119 | Makhani 119 | Mix 149\nKaunsa try karna hai?";
  }

  if (/sandwich/.test(q)) return "Sandwich tasty hain:\n Veg Grill 70 - Cheese, cucumber, tomato, green chutney grilled!\n Spicy Paneer 90 - Spicy paneer + fresh veggies + toasted bread\n Cheese Grill 90 - Simple aur delicious!\nSab crispy hain! Kaunsa?";

  if (/wrap|roll/.test(q)) return "Wraps available hain:\n Aloo Tikki 60 - Spiced tikki + chutneys\n Cheese Spicy 90 - Spicy filling + melted cheese\n Paneer 110 - Soft paneer + mint chutney + veggies\nFresh aur mazedar!";

  if (/garlic|bread/.test(q)) return "Garlic bread options:\n Plain 81 - Soft bread + garlic butter\n Veg Loaded 110 (must try) - Veg filling + melted cheese\n Laden 120 - Extra toppings\nVeg Loaded zaroor try kariye!";

  if (/shake|drink|coffee|cold coffee|beverage|peene|piyo/.test(q)) {
    if (/price|kitna|kitne/.test(q)) return "Drinks ke prices:\n Strawberry/Butterscotch/Vanilla/Black Current 90 | Choco Oreo 90 | Cold Coffee 120 | Soft Drink 30\n30 se shuru!";
    if (/oreo|choco/.test(q)) return " CHOCO OREO - 90\nCrushed Oreos + chocolate shake - classic favourite!";
    if (/cold.?coffee/.test(q)) return " COLD COFFEE - 120\nChilled, creamy, perfect! Coffee lovers ke liye strong aur smooth!";
    if (/strawberry/.test(q)) return " STRAWBERRY - 90\nFresh strawberry flavour - thick aur creamy!";
    if (/butterscotch/.test(q)) return " BUTTERSCOTCH - 90\nSweet aur creamy - classic taste!";
    if (/vanilla/.test(q)) return " VANILLA - 90\nClassic - simple aur perfect! Kabhi galat nahi ho sakta!";
    if (/black.?currant|currant/.test(q)) return " BLACK CURRENT - 90\nRefreshing aur fruity! Fresh aur mazedaar!";
    if (/soft.?drink|pepsi|cold.?drink|cola/.test(q) && !/coffee/.test(q)) return " SOFT DRINK - 30\nPepsi, 7Up, Mirinda - sirf 30 mein chilled!";
    return "Drinks options:\n Strawberry/Butterscotch/Vanilla 90 | Choco Oreo 90 | Black Current 90 | Cold Coffee 120 | Soft Drink 30\nKonsa try karna hai?";
  }

  if (/fries|sides|pocket|dip|salad/.test(q)) {
    if (/price|kitna|kitne/.test(q)) return "Fries ke prices:\n Salted 65 | Peri Peri 69 | Masala 69 | Cheese Peri Peri 99 | Veg Pocket 59 | Paneer Pocket 89 | Dips 30 | Salad 100\n30 se shuru!";
    if (/cheese.?peri|cheese.?fries/.test(q)) return " CHEESE PERI PERI - 99\nPeri peri spice + cheese sauce = MAST COMBO!";
    if (/veg.?pocket/.test(q)) return " VEG POCKET - 59\nCrispy pocket + spiced veggies - sirf 59!";
    if (/paneer.?pocket/.test(q)) return " PANEER POCKET - 89\nCrispy + gooey paneer! Mazedar option.";
    if (/paneer.?salad/.test(q)) return " PANEER SALAD - 100\nHealthy aur tasty! Fresh paneer + veggies.";
    if (/dip|sauce/.test(q)) return "DIPS - 30 each:\n Cheese | Spice | Tandoori | Chilly\nKisi bhi item ke saath lagao!";
    return "Fries options:\n Salted 65 | Peri Peri 69 | Masala 69 | Cheese Peri Peri 99\n Veg Pocket 59 | Paneer Pocket 89 | Dips 30 | Salad 100\nKaunsa try karna hai?";
  }

  if (/veg|vegetarian|non.?veg|chicken|mutton|egg|meat/.test(q)) {
    if (/non.?veg|chicken|mutton|egg|meat/.test(q)) return "Pizza Ride 100% VEGETARIAN hai!\nFresh veggies, paneer, cheese - itna tasty ki non-veg ki zaroorat nahi padegi!";
    return "Haan, 100% VEGETARIAN!\nFresh veggies, paneer, cheese, herbs - sab natural! Pure aur tasty!";
  }

  if (/price|rate|kitna|kitne|cost|bill|charge|sasta|mehnga/.test(q)) return "Prices:\n Pizzas 59-449 | Burgers 40-99 | Sandwich 70-90 | Wraps 60-110 | Pasta 109-149 | Garlic 81-120 | Drinks 30-120 | Fries 30-100\n Sabse sasta: Tomato Pizza 59 | Sabse popular: Farm House 160\nPocket friendly!";

  if (/location|address|kahan|kidhar|where|map|direction|route|samalkha|pahunchna|aana|nahi pata/.test(q)) return "Hamara restaurant Samalkha, Haryana mein hai!\nWebsite ke bottom mein \"Visit Us\" section mein Google Maps, address aur phone available hai.\nGoogle Maps par search kariye: \"Pizza Ride Samalkha\".";

  if (/time|timing|hours|open|close|kab|kitne baje|shaam|subah|dopahar|din|raat/.test(q)) return "Timing note kar lo!\n Khula hai: Monday to Sunday, 12:00 PM - 12:00 AM (midnight)\n 7 days khula hai!\nFresh hot pizza milega!";

  if (/order|delivery|deliver|home delivery|parcel|takeaway|booking|mangwana/.test(q)) return "Order karne ke liye:\n1. Menu section mein item chuniye.\n2. Apni choice decide kijiye.\n3. Phone se ya seedha restaurant aa kar order kariye.\n\nDelivery aur takeaway dono available hain. Contact number aur address website ke \"Visit Us\" section mein hain.";

  if (/contact|phone|number|call|mobile|tele|email/.test(q)) return "Aapke liye contact details website ke \"Visit Us\" section mein hain - phone number, address aur map. Delivery Samalkha mein available hai.";

  if (/offer|discount|coupon|deal|bachat|sasta|free|combo|affordable/.test(q)) return "Abhi regular prices hain, lekin:\n SASTE - Tomato Pizza 59 | Aloo Tikki 40 | Veg Pocket 59 | Soft Drink 30 | Dips 30\n BEST VALUE - Pizza Ride Special 259 (3-4 log aaram se kha sakte hain)\nNaye offers ke liye restaurant mein visit karte rahiye!";

  if (/review|rating|feedback|kaisa|quality|taste|test|kaisa hai|kaisa lagta/.test(q)) return "Pizza Ride par Samalkha mein 500+ khush customers!\n Sabse zyada pasand: Farm House | Pizza Ride Special | Makhani | Jumbo Burger | Choco Oreo Shake\n Fresh ingredients aur bold flavours - try kar ke dekhiye!";

  if (/about|about.?us|kya ho|kya hai ye|pizza.?ride/.test(q)) return "Pizza Ride ke baare mein:\n Samalkha, Haryana - hamari apni dukaan!\n 100% Vegetarian | 500+ Happy Customers\n Fresh Ingredients + Bold Flavours | Fast Delivery\nApne sheher ka pizza, aa kar try kariye!";

  if (/best|recommend|suggestion|kaunsa|konsa|popular|bestseller|accha|sahi|top|batao/.test(q)) return "Ye TOP 6 recommend karta hoon:\n1. Pizza Ride Special 259 - Sirf hamare yahan!\n2. Farm House 160 - Sabse zyada bikne wala!\n3. Makhani 160 - Local Favourite!\n4. Tikki Crush 210 - Unique taste!\n5. Jumbo Burger 99 - Double patty + cheese!\n6. Choco Oreo Shake 90 - Oreo + Chocolate!\nYe shuruaat ke liye kafi hain!";

  return pick([
    "Sawai ko main nahi samajh paya. Kripya menu, prices, timings ya location ke baare mein poochhiye.",
    "Ye mere knowledge se bahar hai. Main Pizza Ride ke menu, prices, best items aur timings ke baare mein bata sakta hoon.",
    "Kuch aur poochhiye - menu, prices, ya best-sellers? Main help karne ke liye yahan hoon.",
  ]);
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! Main PizzaBot - Pizza Ride ka online assistant. Menu, prices, timings, location ya delivery - jo poochhna ho, poochhiye. Hindi, English ya Hinglish - sab mein jawab aur voice milega!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading] = useState(false);
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
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const userMsg: Message = { role: "user", content: trimmed };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setInput("");

      const reply = getSmartReply_lang(trimmed, detectLang(trimmed));

      const botMsg: Message = { role: "assistant", content: reply };
      const finalMessages = [...updatedMessages, botMsg];
      setMessages(finalMessages);

      if (voiceOutput) speak(reply, finalMessages.length - 1, langForText(reply));
    },
    [messages, voiceOutput, speak]
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
                <p className="text-primary-foreground/75 text-xs">Pizza Ride Assistant - Online</p>
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
                    className="shrink-0 whitespace-nowrap inline-flex items-center min-h-[44px] text-xs bg-secondary/15 hover:bg-primary/15 border border-border rounded-full px-4 py-2.5 transition-colors disabled:opacity-40"
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
              <p className="text-center text-[10px] text-muted-foreground mt-2">Voice input &bull; Voice reply &bull; Hindi / English</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
