import { motion } from "framer-motion";
import { Link } from "wouter";
import galleryPizzaVideo from "@/assets/gallery-pizza-video.mp4";
import galleryBurgerImg from "@/assets/gallery-burger-new.webp";
import galleryShakeImg from "@/assets/gallery-shake-new.webp";

type GalleryItem = {
  alt: string;
  label: string;
  sub: string;
  span: string;
  delay: number;
  video?: string;
  src?: string;
};

const photos: GalleryItem[] = [
  { video: galleryPizzaVideo, alt: "Fresh Pizza", label: "🍕 Pizzas", sub: "Wood-fired perfection", span: "lg:col-span-2", delay: 0 },
  { src: galleryBurgerImg, alt: "Juicy Burger", label: "🍔 Burgers", sub: "Stacked & loaded", span: "", delay: 0.1 },
  { src: galleryShakeImg, alt: "Creamy Shake", label: "🥤 Shakes", sub: "Thick & creamy", span: "", delay: 0.2 },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-card relative overflow-hidden">
      {/* Animated background stripe */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary origin-left"
      />

      <div className="container mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-secondary font-bold tracking-widest uppercase text-sm mb-3"
          >
            The Vibe
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-black text-foreground mb-6"
          >
            Catch the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Pizza Ride
            </span>{" "}
            Energy.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            From the fiery oven to the perfect cheese pull, get a glimpse of what happens in our kitchen.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={false}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.55, delay: photo.delay, ease: "easeOut" }}
              className={`rounded-3xl overflow-hidden relative group cursor-pointer ${photo.span}`}
              style={{ willChange: "transform" }}
            >
              {photo.video ? (
                <video
                  src={photo.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <img
                  src={photo.src}
                  alt={photo.alt}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}

              {/* Default overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

            </motion.div>
          ))}
        </div>

        {/* Interlinking CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground text-lg mb-8">
            Like what you see? Taste it for yourself.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold uppercase tracking-wide text-sm md:text-base shadow-lg shadow-primary/25 hover:-translate-y-1 transition-transform"
            >
              Order From Our Menu →
            </Link>
            <Link
              href="/location"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary/30 text-foreground px-8 py-4 rounded-full font-bold uppercase tracking-wide text-sm md:text-base hover:border-primary hover:text-primary transition-colors"
            >
              Visit Our Outlet →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
