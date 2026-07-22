import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import margheritaImg from "@/assets/menu-margherita.jpg";
import pepperoniImg from "@/assets/menu-pepperoni.jpg";
import paneerTikkaImg from "@/assets/menu-paneer-tikka.jpg";
import bbqChickenImg from "@/assets/menu-bbq-chicken.jpg";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type MenuItem = {
  name: string;
  description: string;
  price: number;
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
    id: "pizza",
    label: "Pizzas",
    emoji: "🍕",
    items: [
      { name: "Classic Margherita", description: "San Marzano tomato sauce, fresh mozzarella, basil, and extra virgin olive oil.", price: 199, badge: "Bestseller", image: margheritaImg },
      { name: "Double Pepperoni", description: "Loaded with crispy pepperoni slices, mozzarella, and our signature rich tomato base.", price: 349, image: pepperoniImg },
      { name: "Paneer Tikka", description: "Spiced paneer chunks, red onions, capsicum, mint mayo, and gooey mozzarella.", price: 299, badge: "Local Favorite", image: paneerTikkaImg },
      { name: "BBQ Chicken", description: "Smoky BBQ sauce drizzle, grilled chicken, red onions, and melted cheese.", price: 349, image: bbqChickenImg },
      { name: "Farmhouse Special", description: "Mushroom, onion, crisp capsicum, and fresh tomato.", price: 249 },
      { name: "Spicy Veggie", description: "Jalapenos, golden corn, black olives, and spicy red paprika.", price: 279 },
      { name: "Chicken Tikka", description: "Tandoori chicken tikka, onions, and green chilies.", price: 329 },
      { name: "Meat Lovers", description: "Pepperoni, grilled chicken, sausage, and extra cheese.", price: 399 },
    ],
  },
  {
    id: "veg-pizza",
    label: "Veg Treat Pizzas",
    emoji: "🥦",
    items: [
      { name: "Garden Fresh", description: "Loaded with fresh bell peppers, onions, tomatoes, and sweet corn on herbed tomato sauce.", price: 219, badge: "Pure Veg" },
      { name: "Paneer Makhani", description: "Rich makhani sauce base, paneer cubes, caramelized onions, and coriander.", price: 279 },
      { name: "Veggie Supreme", description: "Mushrooms, olives, jalapenos, capsicum, sweet corn, and double cheese.", price: 269 },
      { name: "Cheese & Corn Fiesta", description: "Creamy white sauce, golden corn, and a generous mozzarella melt.", price: 239, badge: "Kids Favorite" },
      { name: "Spicy Tandoori Paneer", description: "Tandoori spiced paneer, red onion rings, mint chutney drizzle.", price: 299 },
      { name: "Mushroom Delight", description: "Sautéed mushrooms, garlic cream sauce, parsley, and mozzarella.", price: 259 },
    ],
  },
  {
    id: "burgers",
    label: "Burgers",
    emoji: "🍔",
    items: [
      { name: "Classic Chicken Burger", description: "Crispy fried chicken fillet, lettuce, tomato, and our signature sauce in a toasted bun.", price: 149, badge: "Bestseller" },
      { name: "Aloo Tikki Burger", description: "Golden spiced potato patty with mint chutney, onions, and fresh veggies.", price: 99 },
      { name: "BBQ Smash Burger", description: "Double smashed beef patty, cheddar cheese, caramelized onion, and smoky BBQ sauce.", price: 199 },
      { name: "Paneer Zinger", description: "Crispy paneer patty, coleslaw, chipotle mayo, and pickled jalapeños.", price: 159 },
      { name: "Chicken Tikka Burger", description: "Tandoori marinated chicken, lettuce, mint mayo, and crispy onions.", price: 169 },
      { name: "Double Cheese Veg", description: "Spicy veggie patty, double cheddar, tomato, and mustard mayo.", price: 139 },
    ],
  },
  {
    id: "wraps",
    label: "Sandwich Wraps",
    emoji: "🌯",
    items: [
      { name: "Chicken Shawarma Wrap", description: "Juicy marinated chicken, garlic sauce, pickles, and fresh veggies in a soft tortilla.", price: 139, badge: "Fan Favorite" },
      { name: "Paneer Tikka Wrap", description: "Grilled paneer tikka, onion rings, mint chutney, and crispy lettuce.", price: 119 },
      { name: "Club Sandwich", description: "Triple-layer toasted sandwich with chicken, egg, cheese, lettuce, and tomato.", price: 149 },
      { name: "Veg Grilled Sandwich", description: "Stuffed with cheese, cucumber, tomato, and green chutney on grilled bread.", price: 89 },
      { name: "BBQ Chicken Wrap", description: "Smoky BBQ pulled chicken, coleslaw, and cheddar in a whole wheat wrap.", price: 159 },
      { name: "Egg & Cheese Sandwich", description: "Fluffy scrambled eggs, cheddar, and sriracha mayo on toasted brioche.", price: 109 },
    ],
  },
  {
    id: "pasta",
    label: "Pasta",
    emoji: "🍝",
    items: [
      { name: "Penne Arrabbiata", description: "Penne in spicy tomato arrabbiata sauce with garlic, chili flakes, and fresh basil.", price: 179, badge: "Spicy Pick" },
      { name: "Creamy Alfredo", description: "Fettuccine tossed in rich parmesan cream sauce with butter and cracked pepper.", price: 199 },
      { name: "Chicken Pesto Pasta", description: "Fusilli with basil pesto, grilled chicken strips, cherry tomatoes, and pine nuts.", price: 229 },
      { name: "Veggie Pink Sauce Pasta", description: "Penne in a velvety tomato-cream sauce with assorted fresh vegetables.", price: 189 },
      { name: "Bolognese", description: "Slow-cooked minced chicken in rich tomato-herb sauce over spaghetti.", price: 219 },
      { name: "Mac & Cheese", description: "Elbow pasta baked in a gooey four-cheese sauce with a golden breadcrumb crust.", price: 169, badge: "Kids Favorite" },
    ],
  },
  {
    id: "garlic-bread",
    label: "Garlic Breads",
    emoji: "🧄",
    items: [
      { name: "Classic Garlic Bread", description: "Soft baguette loaded with garlic butter and herbs, toasted to golden perfection.", price: 79, badge: "Must Try" },
      { name: "Cheese Garlic Bread", description: "Generous mozzarella melt over garlicky herbed butter on crispy bread.", price: 109 },
      { name: "Stuffed Garlic Bread", description: "Oozing with cheese, jalapenos, and corn inside a crispy garlic-butter crust.", price: 139 },
      { name: "Paneer Garlic Bread", description: "Spiced paneer stuffing with mozzarella inside a garlic-butter bun.", price: 149 },
      { name: "Chicken Garlic Bread", description: "Shredded chicken, herbs, and cheese stuffed in toasted garlic bread.", price: 159 },
      { name: "Garlic Breadsticks (6 pcs)", description: "Thin crispy breadsticks brushed with garlic butter and oregano, served with dip.", price: 99 },
    ],
  },
  {
    id: "drinks",
    label: "Shakes & Drinks",
    emoji: "🥤",
    items: [
      { name: "Classic Cold Coffee", description: "Chilled espresso blended with milk, ice, and a hint of vanilla.", price: 99, badge: "Bestseller" },
      { name: "Strawberry Milkshake", description: "Thick and creamy shake with fresh strawberries and vanilla ice cream.", price: 119 },
      { name: "Mango Lassi", description: "Chilled yogurt blended with ripe Alphonso mangoes and a pinch of cardamom.", price: 89 },
      { name: "Oreo Shake", description: "Crushed Oreos blended with ice cream and milk for the ultimate indulgence.", price: 129 },
      { name: "Masala Lemonade", description: "Fresh lime juice with black salt, cumin, and a hint of mint — refreshingly desi.", price: 69 },
      { name: "Coca-Cola / Pepsi", description: "Chilled 300ml can of your favourite fizzy drink.", price: 49 },
      { name: "Fresh Orange Juice", description: "Freshly squeezed orange juice served chilled.", price: 79 },
    ],
  },
  {
    id: "sides",
    label: "Fries & Sides",
    emoji: "🍟",
    items: [
      { name: "Classic Salted Fries", description: "Golden crispy fries seasoned with sea salt — the perfect side.", price: 79, badge: "Crowd Pleaser" },
      { name: "Peri Peri Fries", description: "Crispy fries tossed in our bold peri-peri spice blend.", price: 99 },
      { name: "Cheese Fries", description: "Hot fries smothered in gooey cheddar cheese sauce.", price: 119 },
      { name: "Loaded Masala Fries", description: "Fries topped with chaat masala, onions, tomatoes, and tangy tamarind chutney.", price: 129 },
      { name: "Onion Rings (6 pcs)", description: "Thick-cut onion rings in a crispy golden batter, served with ranch dip.", price: 109 },
      { name: "Coleslaw", description: "Creamy homemade coleslaw — a great companion to any meal.", price: 59 },
      { name: "Chicken Wings (6 pcs)", description: "Crispy wings tossed in your choice of BBQ or buffalo sauce.", price: 179 },
    ],
  },
];

export default function Menu() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("pizza");

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
            Crafted with Passion. <br /> Baked to Perfection.
          </h3>
          <p className="text-muted-foreground text-lg">
            From wood-fired pizzas to sizzling burgers — everything made fresh, every time.
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
            {/* Image cards (for items with photos) */}
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
                        <span className="font-bold text-primary text-lg ml-2 shrink-0">₹{item.price}</span>
                      </div>
                      <p className="text-muted-foreground text-sm flex-grow mb-6">{item.description}</p>
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
                        <div className="flex items-center gap-2">
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
