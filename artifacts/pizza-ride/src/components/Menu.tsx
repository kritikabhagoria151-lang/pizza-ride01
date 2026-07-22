import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Pizza images
import farmhouseImg from "@/assets/menu-farmhouse.jpg";
import tandooriPaneerImg from "@/assets/menu-veg-tandoori-paneer.jpg";
import zestyTangyImg from "@/assets/menu-veg-cheese-corn.jpg";
import makhaniImg from "@/assets/menu-veg-paneer-makhani.jpg";
import classicalImg from "@/assets/menu-veg-garden-fresh.jpg";
import spicyPaneerImg from "@/assets/menu-chicken-tikka-pizza.jpg";
import delightImg from "@/assets/menu-veg-mushroom.jpg";
import tikkiCrushImg from "@/assets/menu-veg-veggie-supreme.jpg";
import margheritaImg from "@/assets/menu-margherita.jpg";
import pepperoniImg from "@/assets/menu-pepperoni.jpg";

// Burger images
import allotikkiBurgerImg from "@/assets/menu-burger-aloo-tikki.jpg";
import veggiBurgerImg from "@/assets/menu-burger-double-cheese-veg.jpg";
import cheesyBurgerImg from "@/assets/menu-burger-paneer-zinger.jpg";
import jumboBurgerImg from "@/assets/menu-burger-bbq-smash.jpg";

// Sandwich & wrap images
import vegGrillSandwichImg from "@/assets/menu-sandwich-veg-grilled.jpg";
import spicySandwichImg from "@/assets/menu-sandwich-club.jpg";
import allotikkiWrapImg from "@/assets/menu-wrap-paneer-tikka.jpg";
import cheeseWrapImg from "@/assets/menu-wrap-bbq-chicken.jpg";
import paneerWrapImg from "@/assets/menu-wrap-shawarma.jpg";

// Pasta images
import redSauceImg from "@/assets/menu-pasta-arrabbiata.jpg";
import whiteSauceImg from "@/assets/menu-pasta-alfredo.jpg";
import tandooriPastaImg from "@/assets/menu-pasta-pink-sauce.jpg";
import makhaniPastaImg from "@/assets/menu-pasta-bolognese.jpg";
import mixSauceImg from "@/assets/menu-pasta-mac-cheese.jpg";

// Garlic bread images
import plainGarlicImg from "@/assets/menu-garlic-bread-classic.jpg";
import vegLoadedGarlicImg from "@/assets/menu-garlic-bread-cheese.jpg";
import ladenGarlicImg from "@/assets/menu-garlic-bread-stuffed.jpg";

// Drink images
import strawberryShakeImg from "@/assets/menu-drink-strawberry-shake.jpg";
import butterscotchShakeImg from "@/assets/menu-drink-mango-lassi.jpg";
import vanillaShakeImg from "@/assets/menu-drink-cold-coffee.jpg";
import chocoOreoShakeImg from "@/assets/menu-drink-oreo-shake.jpg";
import lemonadeImg from "@/assets/menu-drink-masala-lemonade.jpg";

// Fries images
import saltedFriesImg from "@/assets/menu-fries-classic.jpg";
import periPeriFriesImg from "@/assets/menu-fries-peri-peri.jpg";
import masalaFriesImg from "@/assets/menu-fries-masala.jpg";
import cheeseFriesImg from "@/assets/menu-fries-cheese.jpg";

import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type MenuItemSize = { label: string; price: number };

type MenuItem = {
  name: string;
  description: string;
  price: number;
  sizes?: MenuItemSize[];
  badge?: string;
  image?: string;
};

type Category = {
  id: string;
  label: string;
  emoji: string;
  items: MenuItem[];
};

const categories: Category[] = [
  {
    id: "veg1",
    label: "Veg 1 Pizzas",
    emoji: "🍕",
    items: [
      {
        name: "Farm House",
        description: "Onion, Capsicum, Corn, Mushroom — classic loaded veg.",
        price: 160,
        sizes: [{ label: "Reg", price: 160 }, { label: "Med", price: 310 }, { label: "Large", price: 400 }],
        badge: "Bestseller",
        image: farmhouseImg,
      },
      {
        name: "Tandoori Paneer",
        description: "Onion, Paneer, Red Paprika — spiced tandoori flavour.",
        price: 160,
        sizes: [{ label: "Reg", price: 160 }, { label: "Med", price: 310 }, { label: "Large", price: 400 }],
        image: tandooriPaneerImg,
      },
      {
        name: "Zesty Tangy Pizza",
        description: "Onion, Corn, Paneer — tangy and fresh every bite.",
        price: 160,
        sizes: [{ label: "Reg", price: 160 }, { label: "Med", price: 310 }, { label: "Large", price: 400 }],
        image: zestyTangyImg,
      },
      {
        name: "Makhani Pizza",
        description: "Makhani Sauce, Capsicum, Paneer — rich and creamy.",
        price: 160,
        sizes: [{ label: "Reg", price: 160 }, { label: "Med", price: 310 }, { label: "Large", price: 400 }],
        badge: "Local Favorite",
        image: makhaniImg,
      },
    ],
  },
  {
    id: "veg2",
    label: "Veg 2 Pizzas",
    emoji: "🧀",
    items: [
      {
        name: "Classical Pizza",
        description: "Onion, Capsicum, Corn, Mushroom, Paneer — the full veg combo.",
        price: 210,
        sizes: [{ label: "Reg", price: 210 }, { label: "Med", price: 340 }, { label: "Large", price: 450 }],
        image: classicalImg,
      },
      {
        name: "Spicy Paneer",
        description: "Onion, Paneer, Red Paprika — bold and spicy.",
        price: 210,
        sizes: [{ label: "Reg", price: 210 }, { label: "Med", price: 340 }, { label: "Large", price: 450 }],
        badge: "Spicy 🌶️",
        image: spicyPaneerImg,
      },
      {
        name: "Delight Extra Cheese",
        description: "Capsicum, Mushroom, Jalapeno — loaded with extra cheese.",
        price: 210,
        sizes: [{ label: "Reg", price: 210 }, { label: "Med", price: 340 }, { label: "Large", price: 450 }],
        image: delightImg,
      },
      {
        name: "Tikki Crush Pizza",
        description: "Mushroom, Jalapeno, Paneer, Red Paprika, Tikki Crush — a flavour bomb.",
        price: 210,
        sizes: [{ label: "Reg", price: 210 }, { label: "Med", price: 340 }, { label: "Large", price: 450 }],
        badge: "Must Try",
        image: tikkiCrushImg,
      },
    ],
  },
  {
    id: "toppings",
    label: "Toppings Pizzas",
    emoji: "🫙",
    items: [
      { name: "Tomato Pizza", description: "Single topping — fresh tomato base.", price: 59, image: margheritaImg },
      { name: "Onion Pizza", description: "Single topping — golden caramelised onion.", price: 70, image: pepperoniImg },
      { name: "Capsicum Pizza", description: "Single topping — crisp green capsicum.", price: 70, image: zestyTangyImg },
      { name: "Corn Pizza", description: "Single topping — sweet golden corn.", price: 80, image: farmhouseImg },
      { name: "Onion & Corn", description: "Double topping — onion with sweet corn.", price: 90 },
      { name: "Onion & Capsicum", description: "Double topping — classic combo.", price: 90 },
      { name: "Onion & Paneer", description: "Double topping — onion with soft paneer.", price: 100 },
      { name: "Corn & Paneer", description: "Double topping — corn with paneer.", price: 100 },
      { name: "Paneer & Corn", description: "Double topping — paneer with corn.", price: 100 },
    ],
  },
  {
    id: "special",
    label: "Pizza Special",
    emoji: "⭐",
    items: [
      {
        name: "Single Cheese (Veg Treat)",
        description: "All veggies with single cheese — Veg Treat special.",
        price: 110,
        image: classicalImg,
      },
      {
        name: "Cheese & Corn (Veg Treat)",
        description: "All veggies with cheese & corn — Veg Treat special.",
        price: 130,
        image: zestyTangyImg,
      },
      {
        name: "Double Cheese (Veg Treat)",
        description: "All veggies with double cheese — Veg Treat special.",
        price: 150,
        image: delightImg,
      },
      {
        name: "Pizza Ride Special",
        description: "All Veggies with Loaded Cheese — our signature special.",
        price: 259,
        sizes: [{ label: "Reg", price: 259 }, { label: "Med", price: 349 }, { label: "Large", price: 449 }],
        badge: "🌟 Signature",
        image: tikkiCrushImg,
      },
    ],
  },
  {
    id: "burgers",
    label: "Burgers",
    emoji: "🍔",
    items: [
      { name: "Allo Tikki Burger", description: "Crispy spiced potato tikki patty with fresh veggies and chutney.", price: 40, badge: "Budget Pick", image: allotikkiBurgerImg },
      { name: "Veggi Burger", description: "Classic veggie patty burger with fresh toppings.", price: 50, image: veggiBurgerImg },
      { name: "Cheese Spicy Burger", description: "Spicy veggie patty loaded with gooey cheese.", price: 70, image: cheesyBurgerImg },
      { name: "Paneer Burger", description: "Juicy paneer patty with mint mayo and fresh veggies.", price: 70, image: allotikkiBurgerImg },
      { name: "Jumbo Burger", description: "Our biggest burger — stacked high with double patty and extra cheese.", price: 99, badge: "Bestseller", image: jumboBurgerImg },
    ],
  },
  {
    id: "sandwich-wraps",
    label: "Sandwich & Wraps",
    emoji: "🥪",
    items: [
      { name: "Veg Grill Sandwich", description: "Grilled with cheese, cucumber, tomato, and green chutney.", price: 70, image: vegGrillSandwichImg },
      { name: "Spicy Paneer Sandwich", description: "Spicy paneer stuffing with fresh veggies in toasted bread.", price: 90, image: spicySandwichImg },
      { name: "Cheese Grill Sandwich", description: "Simple, delicious cheese grilled sandwich.", price: 30, badge: "Best Value", image: vegGrillSandwichImg },
      { name: "Allo Tikki Wrap", description: "Spiced potato tikki in a soft wrap with chutneys.", price: 60, image: allotikkiWrapImg },
      { name: "Cheese Spicy Wrap", description: "Spicy filling with melted cheese wrapped up fresh.", price: 90, image: cheeseWrapImg },
      { name: "Paneer Wrap", description: "Soft paneer with mint chutney, onions, and veggies in a wrap.", price: 110, image: paneerWrapImg },
    ],
  },
  {
    id: "pasta",
    label: "Pasta",
    emoji: "🍝",
    items: [
      { name: "Red Sauce Pasta", description: "Penne in a rich spiced tomato red sauce.", price: 109, image: redSauceImg },
      { name: "White Sauce Pasta", description: "Creamy béchamel white sauce pasta.", price: 109, image: whiteSauceImg },
      { name: "Tandoori Sauce Pasta", description: "Smoky tandoori flavoured sauce pasta.", price: 119, badge: "Chef's Pick", image: tandooriPastaImg },
      { name: "Makhani Sauce Pasta", description: "Rich makhani sauce — buttery and aromatic.", price: 115, image: makhaniPastaImg },
      { name: "Mix Sauce Pasta", description: "Best of all sauces mixed together for maximum flavour.", price: 149, badge: "Loaded", image: mixSauceImg },
    ],
  },
  {
    id: "garlic-bread",
    label: "Garlic Breads",
    emoji: "🧄",
    items: [
      { name: "Plain Garlic Bread", description: "Soft bread loaded with garlic butter — simple and satisfying.", price: 81, image: plainGarlicImg },
      { name: "Veg Loaded Garlic Bread", description: "Garlic bread stuffed with veg filling and melted cheese.", price: 110, badge: "Must Try", image: vegLoadedGarlicImg },
      { name: "Laden Garlic Bread", description: "Generously loaded garlic bread with extra toppings.", price: 120, image: ladenGarlicImg },
    ],
  },
  {
    id: "drinks",
    label: "Shakes & Drinks",
    emoji: "🥤",
    items: [
      { name: "Strawberry Shake", description: "Thick creamy strawberry milkshake.", price: 90, image: strawberryShakeImg },
      { name: "Butterscotch Shake", description: "Rich butterscotch flavoured milkshake.", price: 90, image: butterscotchShakeImg },
      { name: "Vanilla Shake", description: "Classic smooth vanilla milkshake.", price: 90, image: vanillaShakeImg },
      { name: "Choco Oreo Shake", description: "Crushed Oreos blended in a chocolate shake.", price: 90, badge: "Fan Fav", image: chocoOreoShakeImg },
      { name: "Special Shake", description: "Our special house-blend milkshake.", price: 120, image: lemonadeImg },
    ],
  },
  {
    id: "sides",
    label: "Fries & Sides",
    emoji: "🍟",
    items: [
      { name: "Salted Fries", description: "Golden crispy fries with sea salt.", price: 65, image: saltedFriesImg },
      { name: "Peri Peri Fries", description: "Fries tossed in bold peri-peri spice.", price: 69, image: periPeriFriesImg },
      { name: "Masala Fries", description: "Fries dusted with chaat masala and spices.", price: 69, image: masalaFriesImg },
      { name: "Cheese Peri Peri Fries", description: "Peri peri fries topped with cheese sauce.", price: 99, badge: "Popular", image: cheeseFriesImg },
      { name: "Veg Pocket", description: "Crispy pocket filled with spiced veggies.", price: 59 },
      { name: "Cheese Pocket", description: "Crispy pocket with gooey cheese filling.", price: 89 },
      { name: "Cheese Dip", description: "Creamy cheese dipping sauce.", price: 30 },
      { name: "Spice Dip", description: "Spicy tangy dipping sauce.", price: 30 },
      { name: "Tandoori Dip", description: "Smoky tandoori flavoured dip.", price: 30 },
      { name: "Chilly Dip", description: "Hot chilly sauce dip.", price: 30 },
      { name: "Paneer Salad", description: "Fresh salad with paneer, onion, and veggies.", price: 100 },
    ],
  },
];

export default function Menu() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("veg1");

  const handleAddToOrder = (name: string) => {
    toast({
      title: "Added to Order!",
      description: `${name} has been added to your cart.`,
    });
  };

  const current = categories.find((c) => c.id === activeCategory)!;
  const withImage = current.items.filter((i) => i.image);
  const listItems = current.items.filter((i) => !i.image);

  return (
    <section id="menu" className="py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Our Menu</h2>
          <h3 className="text-4xl md:text-5xl font-display font-black text-foreground mb-6">
            Fast. Fresh. <br /> Delicious.
          </h3>
          <p className="text-muted-foreground text-lg">
            Real Pizza Ride menu — wood-fired flavours, made fresh every order.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 border ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                  : "bg-background text-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Image cards */}
            {withImage.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {withImage.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="group flex flex-col bg-background rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {item.badge && (
                        <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                          {item.badge}
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-display font-bold text-xl text-foreground leading-tight">{item.name}</h4>
                        <span className="font-bold text-primary text-lg ml-2 shrink-0">
                          {item.sizes ? `from ₹${item.price}` : `₹${item.price}`}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm flex-grow mb-3">{item.description}</p>
                      {item.sizes && (
                        <div className="flex gap-2 mb-4">
                          {item.sizes.map((s) => (
                            <span key={s.label} className="flex-1 text-center text-xs bg-secondary/10 text-secondary-foreground rounded-lg py-1.5 font-semibold">
                              {s.label}<br />
                              <span className="font-bold text-primary">₹{s.price}</span>
                            </span>
                          ))}
                        </div>
                      )}
                      <button
                        onClick={() => handleAddToOrder(item.name)}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-secondary/10 hover:bg-secondary text-secondary-foreground font-bold rounded-xl transition-colors"
                      >
                        <Plus size={18} /> Add to Order
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* List items (no photo) */}
            {listItems.length > 0 && (
              <div className="max-w-4xl mx-auto bg-background rounded-3xl p-8 md:p-12 border border-border shadow-sm relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none text-primary font-display font-black text-9xl">
                  {current.emoji}
                </div>
                <h4 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
                  {withImage.length > 0 ? "More Options" : current.label}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {listItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.07 }}
                      className="flex flex-col border-b border-border border-dashed pb-4 last:border-0"
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h5 className="font-bold text-foreground text-lg">{item.name}</h5>
                          {item.badge && (
                            <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 ml-2 shrink-0">
                          <span className="font-bold text-primary">₹{item.price}</span>
                          <button
                            onClick={() => handleAddToOrder(item.name)}
                            className="w-8 h-8 rounded-full bg-secondary/10 hover:bg-secondary text-secondary-foreground flex items-center justify-center transition-colors"
                            aria-label="Add to order"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
