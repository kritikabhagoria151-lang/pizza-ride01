import { motion } from "framer-motion";

// Pizza images
import farmhouseImg from "@/assets/menu-farmhouse.webp";
import tandooriPaneerPizzaImg from "@/assets/menu-veg-tandoori-paneer.webp";
import zestyTangyImg from "@/assets/menu-pizza-zesty-tangy.webp";
import makhaniPizzaImg from "@/assets/menu-veg-paneer-makhani.webp";
import classicalPizzaImg from "@/assets/menu-veg-veggie-supreme.webp";
import spicyPaneerPizzaImg from "@/assets/menu-paneer-tikka.webp";
import delightCheeseImg from "@/assets/menu-pizza-delight-cheese.webp";
import tikkiCrushImg from "@/assets/menu-pizza-tikki-crush.webp";
import margheritaImg from "@/assets/menu-margherita.webp";
import tomatoPizzaImg from "@/assets/menu-pizza-tomato.webp";
import onionPizzaImg from "@/assets/menu-pizza-onion.webp";
import capsicumPizzaImg from "@/assets/menu-pizza-capsicum.webp";
import cornPizzaImg from "@/assets/menu-pizza-corn.webp";
import onionCornPizzaImg from "@/assets/menu-pizza-onion-corn.webp";
import cornPaneerPizzaImg from "@/assets/menu-pizza-corn-paneer.webp";
import paneerCornPizzaImg from "@/assets/menu-pizza-paneer-corn.webp";
import singleCheeseImg from "@/assets/menu-pizza-single-cheese.webp";
import cheeseCornPizzaImg from "@/assets/menu-pizza-cheese-corn.webp";
import doubleCheeseImg from "@/assets/menu-pizza-double-cheese.webp";
import cheeseGrillSandwichImg from "@/assets/menu-sandwich-cheese-grill.webp";
import alooTikkiWrapImg from "@/assets/menu-wrap-aloo-tikki.webp";
import cheeseSpicyWrapImg from "@/assets/menu-wrap-cheese-spicy.webp";
import paneerWrapNewImg from "@/assets/menu-wrap-paneer.webp";
import tandooriPastaNewImg from "@/assets/menu-pasta-tandoori-new.webp";
import mixSaucePastaImg from "@/assets/menu-pasta-mix-sauce.webp";
import makhaniPastaNewImg from "@/assets/menu-pasta-makhani-new.webp";
import coldCoffeeNewImg from "@/assets/menu-drink-cold-coffee-new.webp";
import vegPocketNewImg from "@/assets/menu-sides-veg-pocket-new.webp";
import gardenFreshImg from "@/assets/menu-veg-garden-fresh.webp";
import galleryPizzaImg from "@/assets/gallery-pizza.avif";
import signaturePizzaImg from "@/assets/feature-pizza.avif";

// Burger images
import allotikkiBurgerImg from "@/assets/menu-burger-aloo-tikki.webp";
import veggiBurgerImg from "@/assets/menu-burger-double-cheese-veg.webp";
import cheesyBurgerImg from "@/assets/menu-burger-paneer-zinger.webp";
import paneerBurgerImg from "@/assets/menu-burger-paneer.webp";
import jumboBurgerImg from "@/assets/menu-burger-bbq-smash.webp";

// Sandwich & wrap images
import vegGrillSandwichImg from "@/assets/menu-sandwich-veg-grilled.webp";
import spicySandwichImg from "@/assets/menu-sandwich-club.webp";
import eggCheeseSandwichImg from "@/assets/menu-sandwich-egg-cheese.webp";
import allotikkiWrapImg from "@/assets/menu-wrap-paneer-tikka.webp";
import cheeseWrapImg from "@/assets/menu-wrap-bbq-chicken.webp";
import paneerWrapImg from "@/assets/menu-wrap-shawarma.webp";

// Pasta images
import redSauceImg from "@/assets/menu-pasta-arrabbiata.webp";
import whiteSauceImg from "@/assets/menu-pasta-alfredo.webp";
import tandooriPastaImg from "@/assets/menu-pasta-pink-sauce.webp";
import makhaniPastaImg from "@/assets/menu-pasta-bolognese.webp";
import mixSauceImg from "@/assets/menu-pasta-mac-cheese.webp";

// Garlic bread images
import plainGarlicImg from "@/assets/menu-garlic-bread-classic.webp";
import vegLoadedGarlicImg from "@/assets/menu-garlic-bread-cheese.webp";
import ladenGarlicImg from "@/assets/menu-garlic-bread-stuffed.webp";

// Drink images
import orangeJuiceImg from "@/assets/menu-drink-orange-juice.webp";
import strawberryShakeImg from "@/assets/menu-drink-strawberry-shake.webp";
import butterscotchShakeImg from "@/assets/menu-drink-butterscotch-shake.webp";
import vanillaShakeImg from "@/assets/menu-drink-vanilla-shake.webp";
import chocoOreoShakeImg from "@/assets/menu-drink-oreo-shake.webp";
import blackCurrantImg from "@/assets/menu-drink-black-currant.webp";
import coldCoffeeImg from "@/assets/menu-drink-cold-coffee.webp";

// Fries & sides images
import vegPocketImg from "@/assets/menu-sides-veg-pocket.webp";
import paneerPocketImg from "@/assets/menu-sides-cheese-pocket.webp";
import cheeseDipImg from "@/assets/menu-dip-cheese.webp";
import spiceDipImg from "@/assets/menu-dip-spice.webp";
import tandooriDipImg from "@/assets/menu-dip-tandoori.webp";
import chillyDipImg from "@/assets/menu-dip-chilly.webp";
import paneerSaladImg from "@/assets/menu-sides-paneer-salad.webp";

// Fries & sides images
import saltedFriesImg from "@/assets/menu-fries-classic.webp";
import periPeriFriesImg from "@/assets/menu-fries-peri-peri.webp";
import masalaFriesImg from "@/assets/menu-fries-masala.webp";
import cheeseFriesImg from "@/assets/menu-fries-cheese.webp";

type MenuItemSize = { label: string; price: number };
type MenuItem = {
  name: string;
  description: string;
  price: number;
  sizes?: MenuItemSize[];
  badge?: string;
  image: string;
  alt?: string;
};
type Category = { id: string; label: string; emoji: string; items: MenuItem[] };

const categories: Category[] = [
  {
    id: "pizzas",
    label: "Pizzas",
    emoji: "🍕",
    items: [
      { name: "Farm House", description: "Onion, Capsicum, Corn, Mushroom", price: 160, sizes: [{ label: "Reg", price: 160 }, { label: "Med", price: 310 }, { label: "Large", price: 400 }], badge: "Bestseller", image: farmhouseImg, alt: "Farm House Pizza with Onion Capsicum Corn and Mushroom — Pizza Ride Samalkha, Bestseller, starting from ₹160" },
      { name: "Tandoori Paneer", description: "Onion, Paneer, Red Paprika", price: 160, sizes: [{ label: "Reg", price: 160 }, { label: "Med", price: 310 }, { label: "Large", price: 400 }], image: tandooriPaneerPizzaImg, alt: "Tandoori Paneer Pizza with Onion Paneer and Red Paprika — Pizza Ride Samalkha, starting from ₹160" },
      { name: "Zesty Tangy Pizza", description: "Onion, Corn, Paneer", price: 160, sizes: [{ label: "Reg", price: 160 }, { label: "Med", price: 310 }, { label: "Large", price: 400 }], image: zestyTangyImg, alt: "Zesty Tangy Pizza with Onion Corn and Paneer — Pizza Ride Samalkha, starting from ₹160" },
      { name: "Makhani Pizza", description: "Makhani Sauce, Capsicum, Paneer", price: 160, sizes: [{ label: "Reg", price: 160 }, { label: "Med", price: 310 }, { label: "Large", price: 400 }], badge: "Local Fav", image: makhaniPizzaImg, alt: "Makhani Pizza with Makhani Sauce Capsicum and Paneer — Pizza Ride Samalkha, Local Favourite, starting from ₹160" },
      { name: "Classical Pizza", description: "Onion, Capsicum, Corn, Mushroom, Paneer", price: 210, sizes: [{ label: "Reg", price: 210 }, { label: "Med", price: 340 }, { label: "Large", price: 450 }], image: classicalPizzaImg, alt: "Classical Pizza with Onion Capsicum Corn Mushroom and Paneer — Pizza Ride Samalkha, starting from ₹210" },
      { name: "Spicy Paneer", description: "Onion, Paneer, Red Paprika", price: 210, sizes: [{ label: "Reg", price: 210 }, { label: "Med", price: 340 }, { label: "Large", price: 450 }], badge: "Spicy 🌶️", image: spicyPaneerPizzaImg, alt: "Spicy Paneer Pizza with Onion Paneer and Red Paprika — Pizza Ride Samalkha, Spicy, starting from ₹210" },
      { name: "Delight Extra Cheese", description: "Capsicum, Mushroom, Jalapeno", price: 210, sizes: [{ label: "Reg", price: 210 }, { label: "Med", price: 340 }, { label: "Large", price: 450 }], image: delightCheeseImg, alt: "Delight Extra Cheese Pizza with Capsicum Mushroom and Jalapeno — Pizza Ride Samalkha, starting from ₹210" },
      { name: "Tikki Crush Pizza", description: "Mushroom, Jalapeno, Paneer, Red Paprika, Tikki Crush", price: 210, sizes: [{ label: "Reg", price: 210 }, { label: "Med", price: 340 }, { label: "Large", price: 450 }], badge: "Must Try", image: tikkiCrushImg, alt: "Tikki Crush Pizza with Mushroom Jalapeno Paneer Red Paprika and Tikki Crush — Pizza Ride Samalkha, Must Try, starting from ₹210" },
      { name: "Tomato Pizza", description: "Single topping — fresh tomato", price: 59, image: tomatoPizzaImg, alt: "Tomato Pizza with single topping fresh tomato — Pizza Ride Samalkha, only ₹59" },
      { name: "Onion Pizza", description: "Single topping — golden onion", price: 70, image: onionPizzaImg, alt: "Onion Pizza with single topping golden onion — Pizza Ride Samalkha" },
      { name: "Capsicum Pizza", description: "Single topping — crisp capsicum", price: 70, image: capsicumPizzaImg, alt: "Capsicum Pizza with single topping crisp capsicum — Pizza Ride Samalkha, only ₹70" },
      { name: "Corn Pizza", description: "Single topping — sweet corn", price: 80, image: cornPizzaImg, alt: "Corn Pizza with single topping sweet corn — Pizza Ride Samalkha, only ₹80" },
      { name: "Onion & Corn", description: "Double topping", price: 90, image: onionCornPizzaImg, alt: "Onion and Corn Pizza double topping — Pizza Ride Samalkha, only ₹90" },
      { name: "Onion & Capsicum", description: "Double topping", price: 90, image: gardenFreshImg, alt: "Onion and Capsicum Pizza double topping — Pizza Ride Samalkha, only ₹90" },
      { name: "Onion & Paneer", description: "Double topping", price: 100, image: tandooriPaneerPizzaImg, alt: "Onion and Paneer Pizza double topping — Pizza Ride Samalkha, only ₹100" },
      { name: "Corn & Paneer", description: "Double topping", price: 100, image: cornPaneerPizzaImg, alt: "Corn and Paneer Pizza double topping with stretchy cheese — Pizza Ride Samalkha, only ₹100" },
      { name: "Paneer & Corn", description: "Double topping", price: 100, image: paneerCornPizzaImg, alt: "Paneer and Corn Pizza double topping with fresh herbs — Pizza Ride Samalkha, only ₹100" },
      { name: "Single Cheese", description: "Veg Treat — all veggies with single cheese", price: 110, image: singleCheeseImg, alt: "Single Cheese Pizza veg treat with all veggies and single cheese — Pizza Ride Samalkha, only ₹110" },
      { name: "Cheese & Corn", description: "Veg Treat — all veggies with cheese & corn", price: 130, image: cheeseCornPizzaImg, alt: "Cheese and Corn Pizza veg treat with all veggies cheese and corn — Pizza Ride Samalkha, only ₹130" },
      { name: "Double Cheese", description: "Veg Treat — all veggies with double cheese", price: 150, image: doubleCheeseImg, alt: "Double Cheese Pizza veg treat with all veggies and double cheese — Pizza Ride Samalkha" },
      { name: "Pizza Ride Special", description: "All Veggies with Loaded Cheese", price: 259, sizes: [{ label: "Reg", price: 259 }, { label: "Med", price: 349 }, { label: "Large", price: 449 }], badge: "🌟 Signature", image: signaturePizzaImg, alt: "Pizza Ride Special Signature Pizza with all veggies and loaded cheese — Pizza Ride Samalkha, starting from ₹259" },
    ],
  },
  {
    id: "burgers",
    label: "Burgers",
    emoji: "🍔",
    items: [
      { name: "Allo Tikki Burger", description: "Crispy spiced potato tikki patty with fresh veggies.", price: 40, badge: "Budget Pick", image: allotikkiBurgerImg, alt: "Allo Tikki Burger with crispy spiced potato tikki patty and fresh veggies — Pizza Ride Samalkha, Budget Pick, only ₹40" },
      { name: "Veggi Burger", description: "Classic veggie patty with fresh toppings.", price: 50, image: veggiBurgerImg, alt: "Veggi Burger with classic veggie patty and fresh toppings — Pizza Ride Samalkha, only ₹50" },
      { name: "Cheese Spicy Burger", description: "Spicy patty loaded with gooey cheese.", price: 70, image: cheesyBurgerImg, alt: "Cheese Spicy Burger with spicy patty loaded with gooey cheese — Pizza Ride Samalkha, only ₹70" },
      { name: "Paneer Burger", description: "Juicy paneer patty with mint mayo.", price: 70, image: paneerBurgerImg, alt: "Paneer Burger with juicy paneer patty and mint mayo — Pizza Ride Samalkha, only ₹70" },
      { name: "Jumbo Burger", description: "Double patty, extra cheese, fully loaded.", price: 99, badge: "Bestseller", image: jumboBurgerImg, alt: "Jumbo Burger with double patty extra cheese fully loaded — Pizza Ride Samalkha, Bestseller, only ₹99" },
    ],
  },
  {
    id: "sandwich",
    label: "Sandwich",
    emoji: "🥪",
    items: [
      { name: "Veg Grill Sandwich", description: "Grilled with cheese, cucumber, tomato, and green chutney.", price: 70, image: vegGrillSandwichImg, alt: "Veg Grill Sandwich with fresh vegetables grilled — Pizza Ride Samalkha, only ₹70" },
      { name: "Spicy Paneer Sandwich", description: "Spicy paneer stuffing with fresh veggies in toasted bread.", price: 90, image: spicySandwichImg, alt: "Spicy Paneer Sandwich with paneer and spicy filling — Pizza Ride Samalkha, only ₹90" },
      { name: "Cheese Grill Sandwich", description: "Simple, delicious cheese grilled sandwich.", price: 90, image: cheeseGrillSandwichImg, alt: "Cheese Grill Sandwich with melted cheese grilled bread — Pizza Ride Samalkha, only ₹90" },
    ],
  },
  {
    id: "wraps",
    label: "Wraps",
    emoji: "🌯",
    items: [
      { name: "Allo Tikki Wrap", description: "Spiced potato tikki in a soft wrap with chutneys.", price: 60, image: alooTikkiWrapImg, alt: "Allo Tikki Wrap with spiced potato tikki in soft wrap with chutneys — Pizza Ride Samalkha, only ₹60" },
      { name: "Cheese Spicy Wrap", description: "Spicy filling with melted cheese in a fresh wrap.", price: 90, image: cheeseSpicyWrapImg, alt: "Cheese Spicy Wrap with spicy filling and melted cheese in fresh wrap — Pizza Ride Samalkha, only ₹90" },
      { name: "Paneer Wrap", description: "Soft paneer with mint chutney, onions, and veggies.", price: 110, image: paneerWrapNewImg, alt: "Paneer Wrap with soft paneer mint chutney onions and veggies — Pizza Ride Samalkha, only ₹110" },
    ],
  },
  {
    id: "pasta",
    label: "Pasta",
    emoji: "🍝",
    items: [
      { name: "Red Sauce Pasta", description: "Penne in rich spiced tomato red sauce.", price: 109, image: redSauceImg, alt: "Red Sauce Pasta penne in rich spiced tomato red sauce — Pizza Ride Samalkha, only ₹109" },
      { name: "White Sauce Pasta", description: "Creamy béchamel white sauce pasta.", price: 109, image: whiteSauceImg, alt: "White Sauce Pasta creamy bechamel white sauce pasta — Pizza Ride Samalkha, only ₹109" },
      { name: "Tandoori Sauce Pasta", description: "Smoky tandoori flavoured sauce pasta.", price: 119, badge: "Chef's Pick", image: tandooriPastaNewImg, alt: "Tandoori Sauce Pasta smoky tandoori flavoured sauce pasta — Pizza Ride Samalkha, Chefs Pick, only ₹119" },
      { name: "Makhani Sauce Pasta", description: "Rich makhani sauce — buttery and aromatic.", price: 119, image: makhaniPastaNewImg, alt: "Makhani Sauce Pasta rich makhani sauce buttery and aromatic — Pizza Ride Samalkha, only ₹119" },
      { name: "Mix Sauce Pasta", description: "Best of all sauces mixed together.", price: 149, badge: "Loaded", image: makhaniPastaNewImg, alt: "Mix Sauce Pasta best of all sauces mixed together — Pizza Ride Samalkha, Loaded, only ₹149" },
    ],
  },
  {
    id: "garlic-bread",
    label: "Garlic Breads",
    emoji: "🧄",
    items: [
      { name: "Plain Garlic Bread", description: "Soft bread with garlic butter.", price: 81, image: plainGarlicImg, alt: "Plain Garlic Bread soft bread with garlic butter — Pizza Ride Samalkha, only ₹81" },
      { name: "Veg Loaded Garlic Bread", description: "Garlic bread with veg filling and melted cheese.", price: 110, badge: "Must Try", image: vegLoadedGarlicImg, alt: "Veg Loaded Garlic Bread with veg filling and melted cheese — Pizza Ride Samalkha, Must Try, only ₹110" },
      { name: "Laden Garlic Bread", description: "Generously loaded with extra toppings.", price: 120, image: ladenGarlicImg, alt: "Laden Garlic Bread generously loaded with extra toppings — Pizza Ride Samalkha, only ₹120" },
    ],
  },
  {
    id: "drinks",
    label: "Shakes & Drinks",
    emoji: "🥤",
    items: [
      { name: "Strawberry Shake", description: "Thick creamy strawberry milkshake.", price: 90, image: strawberryShakeImg, alt: "Strawberry Shake thick creamy strawberry milkshake with whipped cream — Pizza Ride Samalkha, only ₹90" },
      { name: "Butterscotch Shake", description: "Rich butterscotch milkshake.", price: 90, image: butterscotchShakeImg, alt: "Butterscotch Shake rich butterscotch milkshake with caramel topping — Pizza Ride Samalkha, only ₹90" },
      { name: "Vanilla Shake", description: "Classic smooth vanilla milkshake.", price: 90, image: vanillaShakeImg, alt: "Vanilla Shake classic smooth vanilla milkshake — Pizza Ride Samalkha, only ₹90" },
      { name: "Choco Oreo Shake", description: "Crushed Oreos blended in chocolate shake.", price: 90, badge: "Fan Fav", image: chocoOreoShakeImg, alt: "Choco Oreo Shake crushed Oreos blended in chocolate shake — Pizza Ride Samalkha, Fan Favourite, only ₹90" },
      { name: "Black Current Shake", description: "Refreshing black currant flavoured milkshake.", price: 90, image: blackCurrantImg, alt: "Black Current Shake refreshing black currant flavoured milkshake — Pizza Ride Samalkha, only ₹90" },
      { name: "Cold Coffee", description: "Chilled creamy cold coffee blended to perfection.", price: 120, image: coldCoffeeNewImg, alt: "Cold Coffee chilled creamy cold coffee blended to perfection — Pizza Ride Samalkha, only ₹120" },
      { name: "Soft Drink", description: "Chilled soft drink — Pepsi, 7Up, Mirinda & more.", price: 30, image: orangeJuiceImg, alt: "Soft Drink chilled Pepsi 7Up Mirinda and more — Pizza Ride Samalkha, only ₹30" },
    ],
  },
  {
    id: "fries",
    label: "Fries & Sides",
    emoji: "🍟",
    items: [
      { name: "Salted Fries", description: "Golden crispy fries with sea salt.", price: 65, image: saltedFriesImg, alt: "Salted Fries golden crispy fries with sea salt — Pizza Ride Samalkha, only ₹65" },
      { name: "Peri Peri Fries", description: "Fries tossed in bold peri-peri spice.", price: 69, image: periPeriFriesImg, alt: "Peri Peri Fries tossed in bold peri peri spice — Pizza Ride Samalkha, only ₹69" },
      { name: "Masala Fries", description: "Fries dusted with chaat masala.", price: 69, image: masalaFriesImg, alt: "Masala Fries dusted with chaat masala — Pizza Ride Samalkha, only ₹69" },
      { name: "Cheese Peri Peri Fries", description: "Peri peri fries topped with cheese sauce.", price: 99, badge: "Popular", image: cheeseFriesImg, alt: "Cheese Peri Peri Fries peri peri fries topped with cheese sauce — Pizza Ride Samalkha, Popular, only ₹99" },
      { name: "Veg Pocket", description: "Crispy pocket filled with spiced veggies.", price: 59, image: vegPocketNewImg, alt: "Veg Pocket crispy pocket filled with spiced veggies — Pizza Ride Samalkha, only ₹59" },
      { name: "Paneer Pocket", description: "Crispy pocket with gooey paneer filling.", price: 89, image: paneerPocketImg, alt: "Paneer Pocket crispy pocket with gooey paneer filling — Pizza Ride Samalkha, only ₹89" },
      { name: "Cheese Dip", description: "Creamy cheese dipping sauce.", price: 30, image: cheeseDipImg, alt: "Cheese Dip creamy cheese dipping sauce — Pizza Ride Samalkha, only ₹30" },
      { name: "Spice Dip", description: "Spicy tangy dipping sauce.", price: 30, image: spiceDipImg, alt: "Spice Dip spicy tangy dipping sauce — Pizza Ride Samalkha, only ₹30" },
      { name: "Tandoori Dip", description: "Smoky tandoori dip.", price: 30, image: tandooriDipImg, alt: "Tandoori Dip smoky tandoori dipping sauce — Pizza Ride Samalkha, only ₹30" },
      { name: "Chilly Dip", description: "Hot chilly sauce dip.", price: 30, image: chillyDipImg, alt: "Chilly Dip hot chilly sauce dip — Pizza Ride Samalkha, only ₹30" },
      { name: "Paneer Salad", description: "Fresh salad with paneer, onion, and veggies.", price: 100, image: paneerSaladImg, alt: "Paneer Salad fresh salad with paneer onion cucumber tomato and veggies — Pizza Ride Samalkha, only ₹100" },
    ],
  },
];

function ItemCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 120, rotateY: 12, scale: 0.85 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: (index % 6) * 0.1,
        type: "spring",
        stiffness: 80,
        damping: 12,
        mass: 0.8,
      }}
      whileHover={{ y: -12, scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
      className="group flex flex-col bg-background rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-shadow duration-300"
      style={{ perspective: 600 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.alt ?? item.name}
          loading="lazy"
          whileHover={{ scale: 1.15, rotate: 2 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />
        {item.badge && (
          <motion.span
            initial={{ opacity: 0, scale: 0, rotate: -45 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + (index % 6) * 0.08, type: "spring", stiffness: 200 }}
            className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow"
          >
            {item.badge}
          </motion.span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1 gap-2">
          <h5 className="font-bold text-foreground text-base leading-snug">{item.name}</h5>
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + (index % 6) * 0.08, type: "spring" }}
            className="font-bold text-primary text-sm shrink-0"
          >
            {item.sizes ? `from ₹${item.price}` : `₹${item.price}`}
          </motion.span>
        </div>
        <p className="text-muted-foreground text-xs flex-grow mb-3">{item.description}</p>
        {item.sizes && (
          <div className="flex gap-1 mb-3">
            {item.sizes.map((s) => (
              <span key={s.label} className="flex-1 text-center text-[10px] bg-secondary/10 text-secondary-foreground rounded-lg py-1 font-semibold leading-tight">
                {s.label}<br />
                <span className="font-bold text-primary">₹{s.price}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Menu() {
  return (
    <section id="menu" className="py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-secondary font-bold tracking-widest uppercase text-sm mb-3"
          >
            Our Menu
          </motion.h2>
          <h3 className="text-4xl md:text-5xl font-display font-black text-foreground mb-4">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              className="inline-block"
            >
              Fast.{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, type: "spring", stiffness: 120 }}
              className="inline-block"
            >
              Fresh.{" "}
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
              className="inline-block text-primary"
            >
              Delicious.
            </motion.span>
          </h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-muted-foreground text-lg"
          >
            Real Pizza Ride menu — every item made fresh to order in Samalkha.
          </motion.p>
        </motion.div>

        {/* All categories stacked */}
        <div className="space-y-20">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.id}
              id={`cat-${cat.id}`}
              initial={{ opacity: 0, x: catIdx % 2 === 0 ? -100 : 100, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 70,
                damping: 14,
                mass: 0.9,
              }}
            >
              {/* Category heading */}
              <div className="flex items-center gap-3 mb-8">
                <motion.span
                  initial={{ opacity: 0, scale: 0, rotate: -360 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 8,
                    mass: 0.5,
                  }}
                  className="text-3xl"
                >
                  {cat.emoji}
                </motion.span>
                <h4 className="text-2xl md:text-3xl font-display font-black text-foreground">{cat.label}</h4>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1 h-px bg-border ml-2 origin-left"
                />
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {cat.items.map((item, idx) => (
                  <ItemCard key={item.name} item={item} index={idx} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
