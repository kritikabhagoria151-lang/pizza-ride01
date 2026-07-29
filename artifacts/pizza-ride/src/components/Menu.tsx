import { motion } from "framer-motion";

// Pizza images
import farmhouseImg from "@/assets/menu-farmhouse.jpg";
import tandooriPaneerPizzaImg from "@/assets/menu-veg-tandoori-paneer.jpg";
import zestyTangyImg from "@/assets/menu-pizza-zesty-tangy.jpg";
import makhaniPizzaImg from "@/assets/menu-veg-paneer-makhani.jpg";
import classicalPizzaImg from "@/assets/menu-veg-veggie-supreme.jpg";
import spicyPaneerPizzaImg from "@/assets/menu-paneer-tikka.jpg";
import delightCheeseImg from "@/assets/menu-pizza-delight-cheese.jpg";
import tikkiCrushImg from "@/assets/menu-pizza-tikki-crush.jpg";
import margheritaImg from "@/assets/menu-margherita.jpg";
import tomatoPizzaImg from "@/assets/menu-pizza-tomato.jpg";
import onionPizzaImg from "@/assets/menu-pizza-onion.jpg";
import capsicumPizzaImg from "@/assets/menu-pizza-capsicum.jpg";
import cornPizzaImg from "@/assets/menu-pizza-corn.jpg";
import onionCornPizzaImg from "@/assets/menu-pizza-onion-corn.png";
import cornPaneerPizzaImg from "@/assets/menu-pizza-corn-paneer.jpg";
import paneerCornPizzaImg from "@/assets/menu-pizza-paneer-corn.jpg";
import singleCheeseImg from "@/assets/menu-pizza-single-cheese.jpg";
import cheeseCornPizzaImg from "@/assets/menu-pizza-cheese-corn.jpg";
import doubleCheeseImg from "@/assets/menu-pizza-double-cheese.jpg";
import cheeseGrillSandwichImg from "@/assets/menu-sandwich-cheese-grill.jpg";
import alooTikkiWrapImg from "@/assets/menu-wrap-aloo-tikki.jpg";
import cheeseSpicyWrapImg from "@/assets/menu-wrap-cheese-spicy.jpg";
import gardenFreshImg from "@/assets/menu-veg-garden-fresh.jpg";
import galleryPizzaImg from "@/assets/gallery-pizza.avif";
import signaturePizzaImg from "@/assets/feature-pizza.avif";

// Burger images
import allotikkiBurgerImg from "@/assets/menu-burger-aloo-tikki.jpg";
import veggiBurgerImg from "@/assets/menu-burger-double-cheese-veg.jpg";
import cheesyBurgerImg from "@/assets/menu-burger-paneer-zinger.jpg";
import paneerBurgerImg from "@/assets/menu-burger-paneer.jpg";
import jumboBurgerImg from "@/assets/menu-burger-bbq-smash.jpg";

// Sandwich & wrap images
import vegGrillSandwichImg from "@/assets/menu-sandwich-veg-grilled.jpg";
import spicySandwichImg from "@/assets/menu-sandwich-club.jpg";
import eggCheeseSandwichImg from "@/assets/menu-sandwich-egg-cheese.jpg";
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
import orangeJuiceImg from "@/assets/menu-drink-orange-juice.jpg";
import strawberryShakeImg from "@/assets/menu-drink-strawberry-shake.jpg";
import butterscotchShakeImg from "@/assets/menu-drink-butterscotch-shake.jpg";
import vanillaShakeImg from "@/assets/menu-drink-vanilla-shake.jpg";
import chocoOreoShakeImg from "@/assets/menu-drink-oreo-shake.jpg";
import blackCurrantImg from "@/assets/menu-drink-black-currant.jpg";
import coldCoffeeImg from "@/assets/menu-drink-cold-coffee.jpg";

// Fries & sides images
import vegPocketImg from "@/assets/menu-sides-veg-pocket.jpg";
import paneerPocketImg from "@/assets/menu-sides-cheese-pocket.jpg";
import cheeseDipImg from "@/assets/menu-dip-cheese.jpg";
import spiceDipImg from "@/assets/menu-dip-spice.jpg";
import tandooriDipImg from "@/assets/menu-dip-tandoori.jpg";
import chillyDipImg from "@/assets/menu-dip-chilly.jpg";
import paneerSaladImg from "@/assets/menu-sides-paneer-salad.jpg";

// Fries & sides images
import saltedFriesImg from "@/assets/menu-fries-classic.jpg";
import periPeriFriesImg from "@/assets/menu-fries-peri-peri.jpg";
import masalaFriesImg from "@/assets/menu-fries-masala.jpg";
import cheeseFriesImg from "@/assets/menu-fries-cheese.jpg";

type MenuItemSize = { label: string; price: number };
type MenuItem = {
  name: string;
  description: string;
  price: number;
  sizes?: MenuItemSize[];
  badge?: string;
  image: string;
};
type Category = { id: string; label: string; emoji: string; items: MenuItem[] };

const categories: Category[] = [
  {
    id: "pizzas",
    label: "Pizzas",
    emoji: "🍕",
    items: [
      { name: "Farm House", description: "Onion, Capsicum, Corn, Mushroom", price: 160, sizes: [{ label: "Reg", price: 160 }, { label: "Med", price: 310 }, { label: "Large", price: 400 }], badge: "Bestseller", image: farmhouseImg },
      { name: "Tandoori Paneer", description: "Onion, Paneer, Red Paprika", price: 160, sizes: [{ label: "Reg", price: 160 }, { label: "Med", price: 310 }, { label: "Large", price: 400 }], image: tandooriPaneerPizzaImg },
      { name: "Zesty Tangy Pizza", description: "Onion, Corn, Paneer", price: 160, sizes: [{ label: "Reg", price: 160 }, { label: "Med", price: 310 }, { label: "Large", price: 400 }], image: zestyTangyImg },
      { name: "Makhani Pizza", description: "Makhani Sauce, Capsicum, Paneer", price: 160, sizes: [{ label: "Reg", price: 160 }, { label: "Med", price: 310 }, { label: "Large", price: 400 }], badge: "Local Fav", image: makhaniPizzaImg },
      { name: "Classical Pizza", description: "Onion, Capsicum, Corn, Mushroom, Paneer", price: 210, sizes: [{ label: "Reg", price: 210 }, { label: "Med", price: 340 }, { label: "Large", price: 450 }], image: classicalPizzaImg },
      { name: "Spicy Paneer", description: "Onion, Paneer, Red Paprika", price: 210, sizes: [{ label: "Reg", price: 210 }, { label: "Med", price: 340 }, { label: "Large", price: 450 }], badge: "Spicy 🌶️", image: spicyPaneerPizzaImg },
      { name: "Delight Extra Cheese", description: "Capsicum, Mushroom, Jalapeno", price: 210, sizes: [{ label: "Reg", price: 210 }, { label: "Med", price: 340 }, { label: "Large", price: 450 }], image: delightCheeseImg },
      { name: "Tikki Crush Pizza", description: "Mushroom, Jalapeno, Paneer, Red Paprika, Tikki Crush", price: 210, sizes: [{ label: "Reg", price: 210 }, { label: "Med", price: 340 }, { label: "Large", price: 450 }], badge: "Must Try", image: tikkiCrushImg },
      { name: "Tomato Pizza", description: "Single topping — fresh tomato", price: 59, image: tomatoPizzaImg },
      { name: "Onion Pizza", description: "Single topping — golden onion", price: 70, image: onionPizzaImg },
      { name: "Capsicum Pizza", description: "Single topping — crisp capsicum", price: 70, image: capsicumPizzaImg },
      { name: "Corn Pizza", description: "Single topping — sweet corn", price: 80, image: cornPizzaImg },
      { name: "Onion & Corn", description: "Double topping", price: 90, image: onionCornPizzaImg },
      { name: "Onion & Capsicum", description: "Double topping", price: 90, image: gardenFreshImg },
      { name: "Onion & Paneer", description: "Double topping", price: 100, image: tandooriPaneerPizzaImg },
      { name: "Corn & Paneer", description: "Double topping", price: 100, image: cornPaneerPizzaImg },
      { name: "Paneer & Corn", description: "Double topping", price: 100, image: paneerCornPizzaImg },
      { name: "Single Cheese", description: "Veg Treat — all veggies with single cheese", price: 110, image: singleCheeseImg },
      { name: "Cheese & Corn", description: "Veg Treat — all veggies with cheese & corn", price: 130, image: cheeseCornPizzaImg },
      { name: "Double Cheese", description: "Veg Treat — all veggies with double cheese", price: 150, image: doubleCheeseImg },
      { name: "Pizza Ride Special", description: "All Veggies with Loaded Cheese", price: 259, sizes: [{ label: "Reg", price: 259 }, { label: "Med", price: 349 }, { label: "Large", price: 449 }], badge: "🌟 Signature", image: signaturePizzaImg },
    ],
  },
  {
    id: "burgers",
    label: "Burgers",
    emoji: "🍔",
    items: [
      { name: "Allo Tikki Burger", description: "Crispy spiced potato tikki patty with fresh veggies.", price: 40, badge: "Budget Pick", image: allotikkiBurgerImg },
      { name: "Veggi Burger", description: "Classic veggie patty with fresh toppings.", price: 50, image: veggiBurgerImg },
      { name: "Cheese Spicy Burger", description: "Spicy patty loaded with gooey cheese.", price: 70, image: cheesyBurgerImg },
      { name: "Paneer Burger", description: "Juicy paneer patty with mint mayo.", price: 70, image: paneerBurgerImg },
      { name: "Jumbo Burger", description: "Double patty, extra cheese, fully loaded.", price: 99, badge: "Bestseller", image: jumboBurgerImg },
    ],
  },
  {
    id: "sandwich",
    label: "Sandwich",
    emoji: "🥪",
    items: [
      { name: "Veg Grill Sandwich", description: "Grilled with cheese, cucumber, tomato, and green chutney.", price: 70, image: vegGrillSandwichImg },
      { name: "Spicy Paneer Sandwich", description: "Spicy paneer stuffing with fresh veggies in toasted bread.", price: 90, image: spicySandwichImg },
      { name: "Cheese Grill Sandwich", description: "Simple, delicious cheese grilled sandwich.", price: 90, image: cheeseGrillSandwichImg },
    ],
  },
  {
    id: "wraps",
    label: "Wraps",
    emoji: "🌯",
    items: [
      { name: "Allo Tikki Wrap", description: "Spiced potato tikki in a soft wrap with chutneys.", price: 60, image: alooTikkiWrapImg },
      { name: "Cheese Spicy Wrap", description: "Spicy filling with melted cheese in a fresh wrap.", price: 90, image: cheeseSpicyWrapImg },
      { name: "Paneer Wrap", description: "Soft paneer with mint chutney, onions, and veggies.", price: 110, image: paneerWrapImg },
    ],
  },
  {
    id: "pasta",
    label: "Pasta",
    emoji: "🍝",
    items: [
      { name: "Red Sauce Pasta", description: "Penne in rich spiced tomato red sauce.", price: 109, image: redSauceImg },
      { name: "White Sauce Pasta", description: "Creamy béchamel white sauce pasta.", price: 109, image: whiteSauceImg },
      { name: "Tandoori Sauce Pasta", description: "Smoky tandoori flavoured sauce pasta.", price: 119, badge: "Chef's Pick", image: tandooriPastaImg },
      { name: "Makhani Sauce Pasta", description: "Rich makhani sauce — buttery and aromatic.", price: 119, image: makhaniPastaImg },
      { name: "Mix Sauce Pasta", description: "Best of all sauces mixed together.", price: 149, badge: "Loaded", image: mixSauceImg },
    ],
  },
  {
    id: "garlic-bread",
    label: "Garlic Breads",
    emoji: "🧄",
    items: [
      { name: "Plain Garlic Bread", description: "Soft bread with garlic butter.", price: 81, image: plainGarlicImg },
      { name: "Veg Loaded Garlic Bread", description: "Garlic bread with veg filling and melted cheese.", price: 110, badge: "Must Try", image: vegLoadedGarlicImg },
      { name: "Laden Garlic Bread", description: "Generously loaded with extra toppings.", price: 120, image: ladenGarlicImg },
    ],
  },
  {
    id: "drinks",
    label: "Shakes & Drinks",
    emoji: "🥤",
    items: [
      { name: "Strawberry Shake", description: "Thick creamy strawberry milkshake.", price: 90, image: strawberryShakeImg },
      { name: "Butterscotch Shake", description: "Rich butterscotch milkshake.", price: 90, image: butterscotchShakeImg },
      { name: "Vanilla Shake", description: "Classic smooth vanilla milkshake.", price: 90, image: vanillaShakeImg },
      { name: "Choco Oreo Shake", description: "Crushed Oreos blended in chocolate shake.", price: 90, badge: "Fan Fav", image: chocoOreoShakeImg },
      { name: "Black Current Shake", description: "Refreshing black currant flavoured milkshake.", price: 90, image: blackCurrantImg },
      { name: "Cold Coffee", description: "Chilled creamy cold coffee blended to perfection.", price: 120, image: coldCoffeeImg },
      { name: "Soft Drink", description: "Chilled soft drink — Pepsi, 7Up, Mirinda & more.", price: 30, image: orangeJuiceImg },
    ],
  },
  {
    id: "fries",
    label: "Fries & Sides",
    emoji: "🍟",
    items: [
      { name: "Salted Fries", description: "Golden crispy fries with sea salt.", price: 65, image: saltedFriesImg },
      { name: "Peri Peri Fries", description: "Fries tossed in bold peri-peri spice.", price: 69, image: periPeriFriesImg },
      { name: "Masala Fries", description: "Fries dusted with chaat masala.", price: 69, image: masalaFriesImg },
      { name: "Cheese Peri Peri Fries", description: "Peri peri fries topped with cheese sauce.", price: 99, badge: "Popular", image: cheeseFriesImg },
      { name: "Veg Pocket", description: "Crispy pocket filled with spiced veggies.", price: 59, image: vegPocketImg },
      { name: "Paneer Pocket", description: "Crispy pocket with gooey paneer filling.", price: 89, image: paneerPocketImg },
      { name: "Cheese Dip", description: "Creamy cheese dipping sauce.", price: 30, image: cheeseDipImg },
      { name: "Spice Dip", description: "Spicy tangy dipping sauce.", price: 30, image: spiceDipImg },
      { name: "Tandoori Dip", description: "Smoky tandoori dip.", price: 30, image: tandooriDipImg },
      { name: "Chilly Dip", description: "Hot chilly sauce dip.", price: 30, image: chillyDipImg },
      { name: "Paneer Salad", description: "Fresh salad with paneer, onion, and veggies.", price: 100, image: paneerSaladImg },
    ],
  },
];

function ItemCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
      className="group flex flex-col bg-background rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {item.badge && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
            {item.badge}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1 gap-2">
          <h5 className="font-bold text-foreground text-base leading-snug">{item.name}</h5>
          <span className="font-bold text-primary text-sm shrink-0">
            {item.sizes ? `from ₹${item.price}` : `₹${item.price}`}
          </span>
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
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Our Menu</h2>
          <h3 className="text-4xl md:text-5xl font-display font-black text-foreground mb-4">
            Fast. Fresh. <br /> Delicious.
          </h3>
          <p className="text-muted-foreground text-lg">
            Real Pizza Ride menu — every item made fresh to order in Samalkha.
          </p>
        </div>

        {/* All categories stacked */}
        <div className="space-y-20">
          {categories.map((cat) => (
            <div key={cat.id} id={`cat-${cat.id}`}>
              {/* Category heading */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">{cat.emoji}</span>
                <h4 className="text-2xl md:text-3xl font-display font-black text-foreground">{cat.label}</h4>
                <div className="flex-1 h-px bg-border ml-2" />
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {cat.items.map((item, idx) => (
                  <ItemCard key={item.name} item={item} index={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
