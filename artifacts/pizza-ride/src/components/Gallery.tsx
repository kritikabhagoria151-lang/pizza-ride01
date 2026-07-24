import { motion } from "framer-motion";
import galleryPizzaImg from "@/assets/gallery-pizza.avif";
import galleryBurgerImg from "@/assets/gallery-burger.webp";
import galleryShakeImg from "@/assets/gallery-shake.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const photos = [
  { src: galleryPizzaImg, alt: "Fresh Pizza", span: "lg:col-span-2", delay: 0 },
  { src: galleryBurgerImg, alt: "Juicy Burger", span: "", delay: 0.1 },
  { src: galleryShakeImg, alt: "Creamy Shake", span: "", delay: 0.2 },
  { src: gallery3, alt: "Fresh Ingredients", span: "", delay: 0.3 },
  { src: gallery4, alt: "Steaming Hot Pizza", span: "lg:col-span-2", delay: 0.4 },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-card relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">The Vibe</h2>
          <h3 className="text-4xl md:text-5xl font-display font-black text-foreground mb-6">
            Catch the <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Pizza Ride</span> Energy.
          </h3>
          <p className="text-muted-foreground text-lg">
            From the fiery oven to the perfect cheese pull, get a glimpse of what happens in our kitchen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: photo.delay }}
              className={`rounded-3xl overflow-hidden relative group ${photo.span}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
