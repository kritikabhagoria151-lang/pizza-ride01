import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import heroImg from "@/assets/pizza-ride-logo.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-24 pb-12 overflow-hidden bg-background">
      {/* Background Decorative Blob */}
      <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10 -translate-x-1/4" />

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 text-secondary-foreground w-fit border border-secondary/30">
              <Flame size={16} className="text-primary animate-pulse" />
              <span className="text-sm font-bold tracking-wide uppercase">
                The Best Pizza in Samalkha
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-black leading-[1.05] text-foreground">
              Hot, Fresh & <br />
              <span className="text-primary relative inline-block">
                Ready to Ride.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-[480px] leading-relaxed">
              Real ingredients, bold flavors, and a wood-fired crunch you can't resist. Fast delivery straight to your door.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold uppercase tracking-wide text-sm md:text-base transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
              >
                View Menu
              </a>
            </div>
            
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-border">
              <div className="flex -space-x-3">
                {["RK", "SM", "AK", "VJ"].map((initials, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-xs shadow-sm">
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-foreground">
                <span className="font-bold">500+</span> happy customers in Samalkha
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="relative"
          >
            <div className="relative aspect-square w-full max-w-[600px] mx-auto">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse-slow" />
              <img
                src={heroImg}
                alt="Delicious Pizza"
                className="w-full h-full object-cover rounded-full shadow-2xl border-8 border-background relative z-10"
              />
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute top-10 -right-4 md:-right-10 bg-background p-4 rounded-2xl shadow-xl z-20 border border-border flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-primary">
                  <Flame size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Top Rated</p>
                  <p className="font-display font-black text-foreground">100% Fresh</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 -left-4 md:-left-10 bg-background p-4 rounded-2xl shadow-xl z-20 border border-border flex items-center gap-3"
              >
                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Flame size={24} />
                </div>
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
