import { motion } from "framer-motion";
import { Timer, Leaf, Flame, Heart } from "lucide-react";
import featurePizzaImg from "@/assets/feature-pizza.avif";
import featureBurgerImg from "@/assets/feature-burger.webp";
import featureShakeImg from "@/assets/feature-shake.jpg";

const features = [
  {
    icon: <Flame size={32} />,
    title: "Wood-Fired Magic",
    description: "Baked at 400°C for that perfect blistered crust and authentic smoky flavor you can't get anywhere else.",
  },
  {
    icon: <Leaf size={32} />,
    title: "Fresh Ingredients",
    description: "We source the freshest local produce and hand-stretch our dough daily. No frozen bases, ever.",
  },
  {
    icon: <Timer size={32} />,
    title: "Fast Delivery",
    description: "Hot pizza shouldn't wait. Our riders know Samalkha like the back of their hand for lightning-fast drops.",
  },
  {
    icon: <Heart size={32} />,
    title: "Local Love",
    description: "Born and baked in Samalkha. We're a neighborhood joint that treats every customer like family.",
  },
];

export default function Features() {
  return (
    <section id="why-us" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Photo Grid Row */}
        <div className="grid grid-cols-3 gap-4 mb-20">
          {[
            { src: featurePizzaImg, alt: "Fresh Pizza", label: "🍕 Pizzas" },
            { src: featureBurgerImg, alt: "Juicy Burger", label: "🍔 Burgers" },
            { src: featureShakeImg, alt: "Creamy Shake", label: "🥤 Shakes" },
          ].map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg group"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-white font-display font-black text-lg drop-shadow-lg">
                {photo.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Features + Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-14 h-14 bg-secondary/20 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="font-display font-bold text-xl text-foreground mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 flex flex-col items-start"
          >
            <h2 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Why Choose Us</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-foreground mb-6 leading-tight">
              Not Your Average <span className="text-primary">Pizza Joint.</span>
            </h3>
            <p className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed">
              We started Pizza Ride with one simple mission: to bring proper, high-quality pizza to Samalkha. No cardboard crusts, no stingy toppings. Just big, bold flavors made with passion and delivered fast.
            </p>

            <a
              href="#menu"
              className="inline-flex items-center justify-center bg-foreground text-background hover:bg-foreground/90 px-8 py-4 rounded-full font-bold uppercase tracking-wide transition-transform hover:-translate-y-1 shadow-lg"
            >
              Taste the Difference
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
