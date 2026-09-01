import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX, Loader2 } from "lucide-react";
import pizzaRideLogo from "@/assets/pizza-ride-logo.jpeg";

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
  "�Ÿ�† Best kya hai?",
  "�Ÿ’� Prices batao",
  "⏰ Kab khule ho?",
  "�Ÿ“� Location",
];

function pick(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getSmartReply(input: string): string {
  const q = input.toLowerCase();

  // Greetings
  if (/^(hi|hello|hey|namaste|namaskar|hii|helo|sup|yo)\b/.test(q)) {
    return pick([
      "Arrey hello yaar! Kaise ho? Main PizzaBot �€” Pizza Ride ka dost! Batao kya help karu? Menu, price, ya bas baat karni hai? �Ÿ˜„",
      "Hey bhai! Kya haal hai? Main PizzaBot �€” sab bataunga! Pizza, burger, pasta �€” jo poochna hai poochho! �Ÿ˜Š",
      "Hello hello! Welcome! Main PizzaBot �€” tumhara friendly assistant! Bolo kya chahiye? �Ÿ”�",
    ]);
  }

  // Personal
  if (/kaise ho|kaisa hai|kya haal|kya chal|how are you|what.?up/.test(q)) {
    return "Bilkul first class hoon yaar! Pizza banane ki taiyaari chal rahi hai! Tum batao kaise ho? Kuch order karne ka mann hai kya? �Ÿ˜„";
  }

  if (/tumhara naam|kaun ho|tum kaun|naam kya|who are you/.test(q)) {
    return "Bhai main PizzaBot hoon! Pizza Ride ka apna assistant. Menu jaanta hoon, prices pata hain, aur tumhari help ke liye hamesha ready hoon! �Ÿ˜Ž";
  }

  // Thank you
  if (/thank|shukriya|dhanyavad|thanks|meherbani/.test(q)) {
    return pick([
      "Yaar koi shukriya nahi! Tumhari help karna mera kaam hai. Kabhi bhi aana, kabhi bhi poochho! �Ÿ˜Š",
      "Arrey bhai, dost hain hum �€” shukriya mat bolo! ❤️ Aur batao kya chahiye!",
      "Hoye hoye, itna formality! Dost hain na, no shukriya! Bas aate raho! �Ÿ˜„",
    ]);
  }

  // Goodbye
  if (/bye|alvida|goodbye|tata|chalo|nikal|ja raha|chal|phir milte/.test(q)) {
    return pick([
      "Bye yaar! Aana zaroor �€” Pizza Ride mein hamesha welcome! Take care! �Ÿ˜Š",
      "Chal bhai, phir milte hain! Jab bhi pizza ka mann kare, seedha aa jana! �Ÿ‘‹",
      "Alvida nahi, phir milte hain! Tumhara wait rahega! Bye! �Ÿ˜„",
    ]);
  }

  // Full menu
  if (/poora menu|full menu|sab items|saare items|complete list|dikhao sab|pura menu|sab dikhao/.test(q)) {
    return "Arrey waah poora menu? Lelo yaar! �Ÿ˜„\n\n PIZZAS (�‚�59�€“�‚�449):\nTomato �‚�59 | Onion �‚�70 | Capsicum �‚�70 | Corn �‚�80\nOnion & Corn �‚�90 | Onion & Capsicum �‚�90\nOnion & Paneer �‚�100 | Corn & Paneer �‚�100 | Paneer & Corn �‚�100\nSingle Cheese �‚�110 | Cheese & Corn �‚�130 | Double Cheese �‚�150\nFarm House �‚�160/310/400 ⭐ | Tandoori Paneer �‚�160/310/400\nZesty Tangy �‚�160/310/400 | Makhani �‚�160/310/400 �Ÿ��\nClassical �‚�210/340/450 | Spicy Paneer �‚�210/340/450 �ŸŒ�️\nDelight Extra Cheese �‚�210/340/450 | Tikki Crush �‚�210/340/450 �Ÿ”�\nPizza Ride Special �‚�259/349/449 �ŸŒŸ\n\n�Ÿ�” BURGERS:\nAloo Tikki �‚�40 | Veggi �‚�50 | Cheese Spicy �‚�70 | Paneer �‚�70 | Jumbo �‚�99 ⭐\n\n�Ÿ�� SANDWICH:\nVeg Grill �‚�70 | Spicy Paneer �‚�90 | Cheese Grill �‚�90\n\n�ŸŒ� WRAPS:\nAloo Tikki �‚�60 | Cheese Spicy �‚�90 | Paneer �‚�110\n\n�Ÿ�� PASTA:\nRed Sauce �‚�109 | White Sauce �‚�109 | Tandoori �‚�119 �Ÿ‘��€��Ÿ�� | Makhani �‚�119 | Mix Sauce �‚�149\n\n�Ÿ�„ GARLIC BREADS:\nPlain �‚�81 | Veg Loaded �‚�110 �Ÿ”� | Laden �‚�120\n\n�Ÿ�� SHAKES & DRINKS:\nStrawberry/Butterscotch/Vanilla �‚�90 | Choco Oreo �‚�90 ❤️ | Black Current �‚�90 | Cold Coffee �‚�120 | Soft Drink �‚�30\n\n�Ÿ�Ÿ FRIES & SIDES:\nSalted �‚�65 | Peri Peri �‚�69 | Masala �‚�69 | Cheese Peri Peri �‚�99 �Ÿ”�\nVeg Pocket �‚�59 | Paneer Pocket �‚�89 | Dips �‚�30 | Paneer Salad �‚�100\n\nKuch specific chahiye toh bolo! �Ÿ˜‹";
  }

  // Pizza
  if (/pizza|pizze/.test(q)) {
    if (/best|recommend|suggestion|kaunsa|konsa|popular|bestseller|accha|sahi|batao/.test(q)) {
      return "Yaar ye try karna zaroor! �Ÿ”�\n\n Farm House �€” �‚�160\nSabse zyada bikne wala! Onion, Capsicum, Corn, Mushroom �€” fresh veggies loaded.\n\n Makhani Pizza �€” �‚�160\nYe hamara Local Fav hai! Makhani sauce, Capsicum, Paneer �€” buttery masti!\n\n Tikki Crush �€” �‚�210\nMushroom, Jalapeno, Paneer, Red Paprika, Tikki Crush �€” ek baar khaoge toh baar baar maangoge! �Ÿ”�\n\n Pizza Ride Special �€” �‚�259\nYe hamari jaan hai! �ŸŒŸ All veggies + loaded cheese �€” sirf hamare yahan!\n\nMere hisaab se �€” pehle Farm House try karo, phir Special! Dono alag hain! �Ÿ˜‹";
    }
    if (/price|rate|kitna|kitne|cost|charge|menga|sasta/.test(q)) {
      return "Pizza ke prices sunke khush ho jaoge yaar! �Ÿ˜„\n\n�Ÿ’� Budget: Tomato �‚�59 | Onion �‚�70 | Capsicum �‚�70 | Corn �‚�80 | Onion & Corn �‚�90 | Single Cheese �‚�110\n\n Mid: Cheese & Corn �‚�130 | Double Cheese �‚�150 | Farm House �‚�160 | Tandoori �‚�160 | Zesty Tangy �‚�160 | Makhani �‚�160\n\n�Ÿ�† Premium: Classical �‚�210 | Spicy Paneer �‚�210 | Delight �‚�210 | Tikki Crush �‚�210 | Pizza Ride Special �‚�259\n\n�Ÿ“� Reg / Med (+�‚�150) / Large (+�‚�240)\n\nSabse sasta �‚�59 aur sabse loaded �‚�259! �Ÿ”�";
    }
    if (/farm.?house/.test(q)) {
      return "Arrey ye toh hamara RAJA hai! �Ÿ‘‘\n\n FARM HOUSE �€” �‚�160 (Reg) / �‚�310 (Med) / �‚�400 (Large)\n\nKya hai: Onion, Capsicum, Corn, Mushroom �€” sab fresh veggies!\nKyun khaas: Sabse zyada bikne wala! Log baar baar aate hain.\nSizes: Reg / Med / Large\n\nEk baar try karo, pakka ho jaega! ⭐�Ÿ”�";
    }
    if (/tandoori.?paneer/.test(q) && !/pasta/.test(q)) {
      return " TANDOORI PANEER �€” �‚�160/310/400\n\nOnion, Paneer, Red Paprika �€” smoky tandoori flavour!\nMuh mein ghol jaata hai yaar! �Ÿ˜‹ Sizes: Reg/Med/Large";
    }
    if (/zesty|tangy/.test(q)) {
      return " ZESTY TANGY �€” �‚�160/310/400\n\nOnion, Corn, Paneer �€” tangy aur zesty taste!\nThoda different hai, mast hai! �Ÿ˜‹";
    }
    if (/makhani/.test(q) && !/pasta/.test(q)) {
      return "Ye hamara LOCAL FAV hai yaar! �Ÿ��\n\n MAKHANI �€” �‚�160/310/400\n\nMakhani Sauce, Capsicum, Paneer �€” buttery comfort food!\nMakhani paneer pasand hai toh pakka try karo! �Ÿ��";
    }
    if (/classical/.test(q)) {
      return " CLASSICAL �€” �‚�210/340/450\n\nOnion, Capsicum, Corn, Mushroom, Paneer �€” sab kuch hai!\nJab sab chahiye ek mein �€” ye lo! �Ÿ˜‹";
    }
    if (/spicy.?paneer/.test(q)) {
      return " SPICY PANEER �€” �‚�210/340/450 �ŸŒ�️\n\nOnion, Paneer, Red Paprika �€” teekha hai yaar!\nMirchi wale ho toh ye try karo �€” aankhein khul jaengi! �Ÿ˜‚�Ÿ”�";
    }
    if (/delight|extra.?cheese/.test(q)) {
      return " DELIGHT EXTRA CHEESE �€” �‚�210/340/450\n\nCapsicum, Mushroom, Jalapeno �€” CHEESE ka maharaja! �Ÿ�€�Ÿ�€\nCheese lover ho? Ye tumhara pizza hai! �Ÿ˜‹";
    }
    if (/tikki.?crush/.test(q)) {
      return " TIKKI CRUSH �€” �‚�210/340/450 �Ÿ”�\n\nMushroom, Jalapeno, Paneer, Red Paprika, Tikki Crush!\nUnique taste �€” Try Must hai! �Ÿ”�";
    }
    if (/ride.?special|special/.test(q)) {
      return " PIZZA RIDE SPECIAL �€” �‚�259/349/449 �ŸŒŸ\n\nYaar ye hamari JAAN hai! ❤️ All veggies + loaded cheese!\nSirf Pizza Ride mein milta hai �€” ye try karna MAT bhoolna! �Ÿ���Ÿ”�";
    }
    if (/tomato/.test(q) && !/sauce/.test(q)) {
      return " TOMATO �€” �‚�59\n\nSabse sasta pizza! Fresh tomato �€” sirf �‚�59 mein! �Ÿ˜„";
    }
    if (/double.?cheese/.test(q)) {
      return " DOUBLE CHEESE �€” �‚�150 �Ÿ�€�Ÿ�€\n\nAll veggies + DOUBLE cheese! Ek baar khaoge toh mood ban jaega! �Ÿ˜‹";
    }
    if (/single.?cheese/.test(q)) {
      return " SINGLE CHEESE �€” �‚�110\n\nAll veggies + single cheese �€” budget friendly aur tasty! �Ÿ˜Š";
    }
    if (/cheese.?corn/.test(q)) {
      return " CHEESE & CORN �€” �‚�130\n\nCreamy cheese + crunchy corn = MAST COMBO! �ŸŒ��Ÿ�€";
    }
    return "Bhai pizza toh hamari jaan hai! \n\n�Ÿ’� Budget: Tomato �‚�59 | Onion �‚�70 | Capsicum �‚�70 | Corn �‚�80\n�Ÿ�— Double: Onion & Corn �‚�90 | Onion & Capsicum �‚�90 | Paneer combos �‚�100\n�Ÿ�€ Cheese: Single �‚�110 | Cheese & Corn �‚�130 | Double �‚�150\n�Ÿ�† Special: Farm House �‚�160 | Tandoori �‚�160 | Zesty �‚�160 | Makhani �‚�160 | Classical �‚�210 | Spicy �‚�210 | Tikki Crush �‚�210 | Ride Special �‚�259 �ŸŒŸ\n\nKaunsa try karna hai yaar? �Ÿ˜‹";
  }

  // Burger
  if (/burger/.test(q)) {
    if (/price|kitna|kitne/.test(q)) return "Burger ke prices yaar:\n�Ÿ�” Aloo Tikki �‚�40 (Budget king!) | Veggi �‚�50 | Cheese Spicy �‚�70 | Paneer �‚�70 | Jumbo �‚�99 ⭐\nSabse sasta �‚�40 aur best �‚�99! �Ÿ”�";
    if (/aloo.?tikki|tikki/.test(q)) return "�Ÿ�” ALOO TIKKI �€” �‚�40\nSabse sasta aur crispy! �Ÿ’� Crispy tikki + fresh veggies. �‚�40 mein itna accha! �Ÿ˜‹";
    if (/jumbo|big|bada/.test(q)) return "�Ÿ�” JUMBO �€” �‚�99 ⭐\nYe hamara SHER hai! �Ÿ�� Double patty + extra cheese + loaded!\nEk baar kha ke dekho, baaki bhool jaoge! �Ÿ”�";
    if (/paneer.?burger/.test(q)) return "�Ÿ�” PANEER �€” �‚�70\nPaneer lovers ke liye! �Ÿ�€ Juicy paneer patty + mint mayo. Soft aur tasty! �Ÿ˜‹";
    if (/cheese.?spicy|spicy.?burger/.test(q)) return "�Ÿ�” CHEESE SPICY �€” �‚�70 �ŸŒ�️\nSpicy patty + gooey cheese! Teekha hai yaar �€” spice lovers ke liye! �Ÿ”�";
    if (/veggi|veggie/.test(q)) return "�Ÿ�” VEGGI �€” �‚�50\nClassic �€” simple aur tasty! Fresh veggies ka patty. �Ÿ˜Š";
    return "Yaar burgers bhi mast hai! �Ÿ�”\n�€� Aloo Tikki �‚�40 | Veggi �‚�50 | Cheese Spicy �‚�70 | Paneer �‚�70 | Jumbo �‚�99 ⭐\nKaunsa try karna hai yaar? �Ÿ˜‹";
  }

  // Pasta
  if (/pasta/.test(q)) {
    if (/price|kitna|kitne/.test(q)) return "Pasta ke prices:\n�Ÿ�� Red Sauce �‚�109 | White �‚�109 | Tandoori �‚�119 �Ÿ‘��€��Ÿ�� | Makhani �‚�119 | Mix �‚�149\n�‚�109 se shuru! �Ÿ”�";
    if (/red.?sauce|tomato.?sauce/.test(q)) return "�Ÿ�� RED SAUCE �€” �‚�109\nPenne in spiced tomato red sauce �€” teekha aur tangy! �ŸŒ�️�Ÿ˜‹";
    if (/white.?sauce|alfredo/.test(q)) return "�Ÿ�� WHITE SAUCE �€” �‚�109\nCreamy bechamel �€” smooth aur comfort food! �Ÿ��";
    if (/tandoori/.test(q)) return "�Ÿ�� TANDOORI �€” �‚�119 �Ÿ‘��€��Ÿ�� Chef's Pick!\nSmoky tandoori flavour �€” unique taste! Ek baar try karo! �Ÿ”�";
    if (/makhani/.test(q) && !/pizza/.test(q)) return "�Ÿ�� MAKHANI �€” �‚�119\nButtery makhani sauce �€” comfort food hai ye! �Ÿ��";
    if (/mix.?sauce|pink.?sauce/.test(q)) return "�Ÿ�� MIX SAUCE �€” �‚�149 �Ÿ“� Loaded!\nSab sauces ka combo �€” best of everything! �Ÿ˜‹";
    return "Yaar pasta bhi ekdum fresh hai! �Ÿ��\n�€� Red Sauce �‚�109 | White �‚�109 | Tandoori �‚�119 �Ÿ‘��€��Ÿ�� | Makhani �‚�119 | Mix �‚�149 �Ÿ“�\nKaunsa try karna hai? �Ÿ˜‹";
  }

  // Sandwich
  if (/sandwich/.test(q)) return "Yaar sandwich bohot tasty hai! �Ÿ��\n�€� Veg Grill �‚�70 �€” Cheese, cucumber, tomato, green chutney grilled!\n�€� Spicy Paneer �‚�90 �€” Spicy paneer + fresh veggies + toasted bread\n�€� Cheese Grill �‚�90 �€” Simple aur delicious!\nSab crispy hain! Kaunsa? �Ÿ˜‹";

  // Wraps
  if (/wrap|roll/.test(q)) return "Wraps bhi mast hai yaar! �ŸŒ�\n�€� Aloo Tikki �‚�60 �€” Spiced tikki + chutneys\n�€� Cheese Spicy �‚�90 �€” Spicy filling + melted cheese\n�€� Paneer �‚�110 �€” Soft paneer + mint chutney + veggies\nFresh wraps �€” maza aata hai! �Ÿ˜‹";

  // Garlic bread
  if (/garlic|bread/.test(q)) return "Garlic bread alag level hai yaar! �Ÿ�„\n�€� Plain �‚�81 �€” Soft bread + garlic butter\n�€� Veg Loaded �‚�110 (MUST TRY! �Ÿ”�) �€” Veg filling + melted cheese\n�€� Laden �‚�120 �€” Extra toppings loaded!\nYaar Veg Loaded zaroor try karna! �Ÿ˜‹";

  // Shakes & Drinks
  if (/shake|drink|coffee|cold coffee|beverage|peene|piyo/.test(q)) {
    if (/price|kitna|kitne/.test(q)) return "Drinks ke prices:\n�Ÿ�� Strawberry/Butterscotch/Vanilla/Black Current �‚�90 | Choco Oreo �‚�90 ❤️ | Cold Coffee �‚�120 | Soft Drink �‚�30\n�‚�30 se shuru! �Ÿ”�";
    if (/oreo|choco/.test(q)) return "�Ÿ�� CHOCO OREO �€” �‚�90 ❤️\nCrushed Oreos + chocolate shake = HEAVEN!\nFan favourite hai yaar �€” Oreo lovers ke liye BOMB! �Ÿ��";
    if (/cold.?coffee/.test(q)) return "�˜• COLD COFFEE �€” �‚�120\nChilled, creamy, perfect! Coffee lovers ke liye strong aur smooth! �˜•";
    if (/strawberry/.test(q)) return "�Ÿ�� STRAWBERRY �€” �‚�90\nFresh strawberry flavour �€” pink aur pretty! �Ÿ�“ Thick aur creamy!";
    if (/butterscotch/.test(q)) return "�Ÿ�� BUTTERSCOTCH �€” �‚�90\nSweet aur creamy �€” purane zamane ka taste! �Ÿ��";
    if (/vanilla/.test(q)) return "�Ÿ�� VANILLA �€” �‚�90\nClassic �€” simple aur perfect! �Ÿ�� Kabhi galat nahi ho sakta!";
    if (/black.?currant|currant/.test(q)) return "�Ÿ�� BLACK CURRENT �€” �‚�90\nRefreshing aur fruity! �Ÿ’œ Fresh aur mazedaar!";
    if (/soft.?drink|pepsi|cold.?drink|cola/.test(q) && !/coffee/.test(q)) return "�Ÿ�� SOFT DRINK �€” �‚�30\nPepsi, 7Up, Mirinda �€” sirf �‚�30 mein chilled! �Ÿ��";
    return "Drinks bhi acche hain yaar! �Ÿ��\n�€� Strawberry/Butterscotch/Vanilla �‚�90 | Choco Oreo �‚�90 ❤️ | Black Current �‚�90 | Cold Coffee �‚�120 | Soft Drink �‚�30\nKonsa try karna hai? �Ÿ˜‹";
  }

  // Fries & Sides
  if (/fries|sides|pocket|dip|salad/.test(q)) {
    if (/price|kitna|kitne/.test(q)) return "Fries ke prices:\n�Ÿ�Ÿ Salted �‚�65 | Peri Peri �‚�69 | Masala �‚�69 | Cheese Peri Peri �‚�99 �Ÿ”� | Veg Pocket �‚�59 | Paneer Pocket �‚�89 | Dips �‚�30 | Salad �‚�100\n�‚�30 se shuru!";
    if (/cheese.?peri|cheese.?fries/.test(q)) return "�Ÿ�Ÿ CHEESE PERI PERI �€” �‚�99 �Ÿ”�\nPeri peri spice + cheese sauce = MAST COMBO! �Ÿ�€�ŸŒ�️";
    if (/veg.?pocket/.test(q)) return "�Ÿ�Ÿ VEG POCKET �€” �‚�59\nCrispy pocket + spiced veggies �€” sirf �‚�59! �Ÿ˜‹";
    if (/paneer.?pocket/.test(q)) return "�Ÿ�Ÿ PANEER POCKET �€” �‚�89\nCrispy + gooey paneer! �Ÿ�€ Maza aa jaega!";
    if (/paneer.?salad/.test(q)) return "�Ÿ�Ÿ PANEER SALAD �€” �‚�100\nHealthy aur tasty! Fresh paneer + veggies. �Ÿ�—";
    if (/dip|sauce/.test(q)) return "DIPS �€” �‚�30 each:\n�Ÿ�€ Cheese | �ŸŒ�️ Spice | �Ÿ”� Tandoori | �Ÿ�‘ Chilly\nKisi bhi item ke saath lagao!";
    return "Fries bhi hain yaar! �Ÿ�Ÿ\n�€� Salted �‚�65 | Peri Peri �‚�69 | Masala �‚�69 | Cheese Peri Peri �‚�99 �Ÿ”�\n�€� Veg Pocket �‚�59 | Paneer Pocket �‚�89 | Dips �‚�30 | Salad �‚�100\nKaunsa try karna hai? �Ÿ˜‹";
  }

  // Veg/Non-veg
  if (/veg|vegetarian|non.?veg|chicken|mutton|egg|meat/.test(q)) {
    if (/non.?veg|chicken|mutton|egg|meat/.test(q)) return "Sorry yaar! �Ÿ™� Pizza Ride 100% VEGETARIAN hai! �ŸŒ�\nSirf fresh veggies, paneer, cheese �€” lekin itna tasty hai ki non-veg ki zaroorat nahi padegi! �Ÿ˜‹";
    return "Haan bhai! �œ… 100% VEGETARIAN! �ŸŒ�\nFresh veggies, paneer, cheese, herbs �€” sab natural! Pure aur tasty! �Ÿ˜‹❤️";
  }

  // Price
  if (/price|rate|kitna|kitne|cost|bill|charge|sasta|mehnga/.test(q)) return "Yaar prices dekh ke khush ho jaoge! �Ÿ˜„\n Pizzas �‚�59�€“�‚�449 | �Ÿ�” Burgers �‚�40�€“�‚�99 | �Ÿ�� Sandwich �‚�70�€“�‚�90 | �ŸŒ� Wraps �‚�60�€“�‚�110 | �Ÿ�� Pasta �‚�109�€“�‚�149 | �Ÿ�„ Garlic �‚�81�€“�‚�120 | �Ÿ�� Drinks �‚�30�€“�‚�120 | �Ÿ�Ÿ Fries �‚�30�€“�‚�100\n�Ÿ”� Sabse sasta: Tomato Pizza �‚�59 | Sabse popular: Farm House �‚�160\nPocket friendly hai yaar! �Ÿ’�";

  // Location
  if (/location|address|kahan|kidhar|where|map|direction|route|samalkha|pahunchna|aana|nahi pata/.test(q)) return "Yaar hum hain Samalkha, Haryana! �Ÿ“�\nWebsite ke bottom mein \"Visit Us\" mein Google Maps, address, phone sab hai!\nYa Google Maps pe search karo \"Pizza Ride Samalkha\" �€” seedha aa jaega! �Ÿš—";

  // Timing
  if (/time|timing|hours|open|close|kab|kitne baje|shaam|subah|dopahar|din|raat/.test(q)) return "Timing note kar lo! ⏰\n�ŸŒž Khula hai: Monday to Sunday, 12:00 PM - 12:00 AM (midnight)\n�Ÿ“… 7 days khula hai!\nFresh hot pizza milega! 🍕🔥";

  // Order
  if (/order|delivery|deliver|home delivery|parcel|takeaway|booking|mangwana/.test(q)) return "Order karna easy hai yaar! �Ÿ“�\n1️�ƒ� Menu dekho\n2️�ƒ� Decide karo kya chahiye\n3️�ƒ� Seedha aa jao ya phone karo\n4️�ƒ� Delivery Samalkha mein hai!\n5️�ƒ� Takeaway bhi hai!\nFresh aur hot �€” jaldi aao! �Ÿ˜‹";

  // Contact
  if (/contact|phone|number|call|mobile|tele|email/.test(q)) return "Contact sab Website ke bottom mein \"Visit Us\" mein hai! �Ÿ“ž\n�Ÿ“� Phone �€” seedha call karo\n�Ÿ“� Email �€” message karo\n�Ÿ“� Address �€” map ke saath!\nCall karke order bhi kar sakte ho! �Ÿ˜Š";

  // Offers
  if (/offer|discount|coupon|deal|bachat|sasta|free|combo|affordable/.test(q)) return "Offers ki baat? Yaar abhi regular prices hain lekin �€”\n�Ÿ’� SASTE: Tomato Pizza �‚�59 | Aloo Tikki �‚�40 | Veg Pocket �‚�59 | Soft Drink �‚�30 | Dips �‚�30\n�Ÿ”� BEST VALUE: Pizza Ride Special �‚�259 (3-4 log aaram se kha sakte hain!)\nRestaurant pe visit karte raho! �Ÿ”�";

  // Reviews
  if (/review|rating|feedback|kaisa|quality|taste|test|kaisa hai|kaisa lagta/.test(q)) return "Yaar feedback sunke confidence badhta hai! �Ÿ˜„\n⭐ 500+ HAPPY CUSTOMERS in Samalkha!\n�Ÿ�† Sabse zyada pasand: Farm House | Pizza Ride Special | Makhani | Jumbo Burger | Choco Oreo Shake\n\"Fresh ingredients aur bold flavours!\" �€” try karke dekho, fan ho jaoge! �Ÿ”�❤️";

  // About
  if (/about|about.?us|kya ho|kya hai ye|pizza.?ride/.test(q)) return "Pizza Ride ke baare mein? Dil se bata raha hoon! ❤️\n�Ÿ�� Samalkha, Haryana �€” hamari apni dukaan!\n 100% Vegetarian | ⭐ 500+ Happy Customers\n�Ÿ”� Fresh Ingredients + Bold Flavours | �š� Fast Delivery | �Ÿ‘��€��Ÿ�� Wood-fired pizza\nApne sheher ka pizza hai yaar �€” aa ke try karo! �Ÿ˜‹";

  // Best items
  if (/best|recommend|suggestion|kaunsa|konsa|popular|bestseller|accha|sahi|top|batao/.test(q)) return "Arrey bhai, ye TOP 6 try karna! �Ÿ”�\n�Ÿ�‡ Pizza Ride Special �‚�259 �€” Sirf hamare yahan!\n�Ÿ�ˆ Farm House �‚�160 �€” Sabse zyada bikne wala!\n�Ÿ�‰ Makhani �‚�160 �€” Local Fav!\n4️�ƒ� Tikki Crush �‚�210 �€” Unique taste!\n5️�ƒ� Jumbo Burger �‚�99 �€” Double patty + cheese!\n6️�ƒ� Choco Oreo Shake �‚�90 �€” Oreo + Chocolate = HEAVEN!\nYe 6 nahi try kiye toh kuch nahi kiya yaar! �Ÿ˜‹�Ÿ”�";

  // Default �€” friendly, never rude, always invites more chat
  return pick([
    "Hmm, ye toh mast sawaal hai! �Ÿ˜„ Lekin iska jawab mere paas nahi hai yaar. Par pizza, burger, pasta, shakes �€” in sab ke secrets jaanta hoon! Kuch poochho na?",
    "Yaar ye mera topic se thoda bahar hai �Ÿ˜… Main toh khana aur Pizza Ride ka expert hoon! Menu sunaun? Ya prices? �Ÿ˜‹",
    "Interesting! �Ÿ�” Ye mujhe nahi pata tha... lekin ye batao �€” Farm House try kiya kabhi? Nahi?! Toh aaj hi plan banao! �Ÿ”�",
  ]);
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Arrey hello yaar! Main PizzaBot �€” tumhara apna dost! �Ÿ˜„ Kuch bhi poochho �€” menu, prices, best pizza, location... ya bas aise hi baat karo, maza aa jaega! Hindi, English, Hinglish �€” jo bolo! �Ÿ”�",
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

  const speak = useCallback((text: string, index: number) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
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
          reply = data.reply ?? data.fallback ?? getSmartReply(trimmed);
        } catch {
          reply = getSmartReply(trimmed);
        }

        const botMsg: Message = { role: "assistant", content: reply };
        const finalMessages = [...updatedMessages, botMsg];
        setMessages(finalMessages);

        if (voiceOutput) speak(reply, finalMessages.length - 1);
      } catch {
        setMessages((prev) => [...prev, { role: "assistant", content: "Arrey yaar, network mein thodi dikkat ho gayi �Ÿ˜… Ek baar dobara bhejo na message! �Ÿ™�" }]);
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
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center"
        aria-label="Open chatbot"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={26} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={26} />
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
            className="fixed bottom-28 right-6 z-50 w-[340px] sm:w-[380px] bg-background border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "calc(100vh - 180px)" }}
          >
            <div className="bg-primary text-primary-foreground px-5 py-4 flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl shrink-0"><img src={pizzaRideLogo} alt="PizzaBot" className="w-8 h-8 rounded-full object-cover" /></div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-base leading-tight">PizzaBot</p>
                <p className="text-primary-foreground/75 text-xs">Pizza Ride Dost �€� Online</p>
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
                    <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center text-sm shrink-0 mt-1"><img src={pizzaRideLogo} alt="PizzaBot" className="w-7 h-7 rounded-full object-cover" /></div>
                  )}
                  <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border border-border text-foreground rounded-bl-sm"}`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    {msg.role === "assistant" && (
                      <button onClick={() => speakingIndex === i ? stopSpeaking() : speak(msg.content, i)} className="mt-1.5 text-muted-foreground hover:text-primary transition-colors" title={speakingIndex === i ? "Stop" : "Listen"}>
                        {speakingIndex === i ? <VolumeX size={13} /> : <Volume2 size={13} />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center text-sm shrink-0 mt-1"><img src={pizzaRideLogo} alt="PizzaBot" className="w-7 h-7 rounded-full object-cover" /></div>
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
              <p className="text-center text-[10px] text-muted-foreground mt-2">�ŸŽ� Voice input �€� �Ÿ”Š Voice reply �€� �ŸŒ� Any language</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

