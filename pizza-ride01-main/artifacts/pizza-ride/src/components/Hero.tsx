import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import heroImg from "@/assets/pizza-ride-logo.webp";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const jumpIn = {
  hidden: { opacity: 0, y: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    y: [0, -80, 0, -45, 0, -20, 0],
    scale: [0.5, 1.2, 0.9, 1.1, 0.95, 1.05, 1],
    transition: {
      duration: 0.7,
      ease: "easeOut",
      times: [0, 0.15, 0.35, 0.5, 0.65, 0.82, 1],
    },
  },
};

const floatEmojis = ["🍕", "🔥", "🧀", "🌶️", "🍅"];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-24 pb-12 overflow-hidden bg-background">
      {/* Floating particles */}
      {floatEmojis.map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl md:text-4xl select-none pointer-events-none -z-10"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={{
            opacity: [0, 0.6, 0.3, 0.6, 0],
            scale: [0, 1.4, 0.9, 1.3, 0],
            y: [0, -50, -20, -60, 0],
            rotate: [0, 20, -15, 25, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
          }}
        >
          {emoji}
        </motion.span>
      ))}

      {/* Background blobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-1/4 right-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/3"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10 -translate-x-1/4"
      />
      {/* Moving gradient orb */}
      <motion.div
        animate={{
          x: [0, 80, -40, 60, 0],
          y: [0, -50, 30, -20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-primary/8 rounded-full blur-[100px] -z-10"
      />

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Text side */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 text-secondary-foreground w-fit border border-secondary/30">
              <motion.div
                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Flame size={16} className="text-primary" />
              </motion.div>
              <span className="text-sm font-bold tracking-wide uppercase">
                The Best Pizza in Samalkha
              </span>
            </motion.div>

            <div className="text-5xl md:text-7xl font-display font-black leading-[1.05] text-foreground">
              {/* Line 1: "Hot, Fresh &" */}
              <div className="overflow-hidden">
                {["Hot,", "Fresh", "&"].map((word, i) => (
                  <motion.span
                    key={`l1-${i}`}
                    variants={jumpIn}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              {/* Line 2: "Ready to Ride." */}
              <div className="overflow-hidden">
                {["Ready", "to", "Ride."].map((word, i) => (
                  <motion.span
                    key={`l2-${i}`}
                    variants={jumpIn}
                    className={`inline-block mr-[0.3em] ${i === 2 ? "text-primary relative" : ""}`}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    {word}
                    {i === 2 && (
                      <motion.svg
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
                        className="absolute w-full h-3 -bottom-1 left-0 text-secondary"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 5 Q 50 10 100 5"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </motion.svg>
                    )}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-[480px] leading-relaxed">
              Real ingredients, bold flavors, and a wood-fired crunch you can't resist. Fast delivery straight to your door.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mt-4">
              <motion.a
                href="/menu"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 10,
                  delay: 0.4,
                }}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold uppercase tracking-wide text-sm md:text-base shadow-lg shadow-primary/25"
              >
                <motion.span
                  className="absolute inset-0 rounded-full bg-primary"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="relative z-10">View Menu</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="relative z-10"
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-4 mt-8 pt-8 border-t border-border">
              <div className="flex -space-x-3">
                {["RK", "SM", "AK", "VJ"].map((initials, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10, scale: 0 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.25, type: "spring", stiffness: 200 }}
                    whileHover={{ zIndex: 10, y: -6, scale: 1.2 }}
                    className="w-10 h-10 rounded-full border-2 border-background bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-xs shadow-sm relative"
                  >
                    {initials}
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.25 }}
                className="text-sm font-medium text-foreground"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="font-bold"
                >
                  500+
                </motion.span>{" "}
                happy customers in Samalkha
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, y: -120, scale: 0.5, rotate: -15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              type: "spring",
              stiffness: 120,
              damping: 8,
              mass: 0.6,
            }}
            className="relative"
          >
            <div className="relative aspect-square w-full max-w-[600px] mx-auto">
              {/* Rotating ring behind image */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border-2 border-dashed border-primary/20 rounded-full -z-5"
              />
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary/20 rounded-full blur-3xl -z-10"
              />
              <motion.img
                src={heroImg}
                alt="Delicious Pizza"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover rounded-full shadow-2xl border-8 border-background relative z-10"
              />

              {/* Float badge top-right */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                initial={{ opacity: 0, scale: 0.5, x: 30 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                className="absolute top-10 right-0 md:-right-10 bg-background p-4 rounded-2xl shadow-xl z-20 border border-border flex items-center gap-3"
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-primary"
                >
                  <Flame size={20} />
                </motion.div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Top Rated</p>
                  <p className="font-display font-black text-foreground">100% Fresh</p>
                </div>
              </motion.div>

              {/* Float badge bottom-left */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                initial={{ opacity: 0, scale: 0.5, x: -30 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                className="absolute bottom-10 left-0 md:-left-10 bg-background p-4 rounded-2xl shadow-xl z-20 border border-border flex items-center gap-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary"
                >
                  <Flame size={24} />
                </motion.div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Delivery</p>
                  <p className="font-display font-black text-foreground">Fast & Hot</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
