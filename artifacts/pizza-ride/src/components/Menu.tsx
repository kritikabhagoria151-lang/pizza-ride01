import { motion } from "framer-motion";
import margheritaImg from "@/assets/menu-margherita.jpg";
import pepperoniImg from "@/assets/menu-pepperoni.jpg";
import paneerTikkaImg from "@/assets/menu-paneer-tikka.jpg";
import bbqChickenImg from "@/assets/menu-bbq-chicken.jpg";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const featuredPizzas = [
  {
    id: "margherita",
    name: "Classic Margherita",
    description: "San Marzano tomato sauce, fresh mozzarella, basil, and extra virgin olive oil.",
    price: 199,
    image: margheritaImg,
    badge: "Bestseller",
  },
  {
    id: "pepperoni",
    name: "Double Pepperoni",
    description: "Loaded with crispy pepperoni slices, mozzarella, and our signature rich tomato base.",
    price: 349,
    image: pepperoniImg,
  },
  {
    id: "paneertikka",
    name: "Paneer Tikka",
    description: "Spiced paneer chunks, red onions, capsicum, mint mayo, and gooey mozzarella.",
    price: 299,
    image: paneerTikkaImg,
    badge: "Local Favorite",
  },
  {
    id: "bbqchicken",
    name: "BBQ Chicken",
    description: "Smoky BBQ sauce drizzle, grilled chicken, red onions, and melted cheese.",
    price: 349,
    image: bbqChickenImg,
  },
];

const classicMenu = [
  { name: "Farmhouse Special", description: "Mushroom, onion, crisp capsicum, and fresh tomato.", price: 249 },
  { name: "Spicy Veggie", description: "Jalapenos, golden corn, black olives, and spicy red paprika.", price: 279 },
  { name: "Chicken Tikka", description: "Tandoori chicken tikka, onions, and green chilies.", price: 329 },
  { name: "Meat Lovers", description: "Pepperoni, grilled chicken, sausage, and extra cheese.", price: 399 },
];

export default function Menu() {
  const { toast } = useToast();

  const handleAddToOrder = (name: string) => {
    toast({
      title: "Added to Order!",
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <section id="menu" className="py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Our Menu</h2>
          <h3 className="text-4xl md:text-5xl font-display font-black text-foreground mb-6">
            Crafted with Passion. <br /> Baked to Perfection.
          </h3>
          <p className="text-muted-foreground text-lg">
            Every pizza is hand-stretched and baked in our high-heat ovens for that perfect crispy, chewy crust.
          </p>
        </div>

        {/* Featured Pizzas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {featuredPizzas.map((pizza, index) => (
            <motion.div
              key={pizza.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col bg-background rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {pizza.badge && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                    {pizza.badge}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-display font-bold text-xl text-foreground leading-tight">
                    {pizza.name}
                  </h4>
                  <span className="font-bold text-primary text-lg ml-2 shrink-0">
                    ₹{pizza.price}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm flex-grow mb-6">
                  {pizza.description}
                </p>
                
                <button 
                  onClick={() => handleAddToOrder(pizza.name)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-secondary/10 hover:bg-secondary text-secondary-foreground font-bold rounded-xl transition-colors"
                >
                  <Plus size={18} /> Add to Order
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Classics List */}
        <div className="max-w-4xl mx-auto bg-background rounded-3xl p-8 md:p-12 border border-border shadow-sm relative overflow-hidden">
          {/* decorative watermark */}
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none text-primary font-display font-black text-9xl">
            MENU
          </div>
          
          <h4 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
            More Classic Rides
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {classicMenu.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col border-b border-border border-dashed pb-4 last:border-0 md:last:border-b md:[&:nth-last-child(2)]:border-0"
              >
                <div className="flex justify-between items-baseline mb-1">
                  <h5 className="font-bold text-foreground text-lg">{item.name}</h5>
                  <div className="flex items-center gap-3">
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
      </div>
    </section>
  );
}
