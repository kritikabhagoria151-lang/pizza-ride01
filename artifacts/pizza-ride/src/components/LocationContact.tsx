import { MapPin, Phone, Clock, Send, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const contactItems = [
  {
    icon: MapPin,
    color: "bg-primary/10 text-primary",
    title: "Jurasi Saraf Khas Location",
    content: (
      <p className="text-muted-foreground">
        6279+3QG, Jurasi Saraf Khas<br />
        Haryana, India
      </p>
    ),
  },
  {
    icon: Phone,
    color: "bg-primary/10 text-primary",
    title: "Call Us",
    content: (
      <p className="text-muted-foreground text-xl font-display font-bold">
        +91 72068 87688
      </p>
    ),
  },
  {
    icon: Clock,
    color: "bg-primary/10 text-primary",
    title: "Opening Hours",
    content: (
      <p className="text-muted-foreground">Mon - Sun: 12:00 PM – 12:00 AM</p>
    ),
  },
  {
    icon: Star,
    color: "bg-yellow-400/20 text-yellow-500",
    title: "Special FREE Delivery 🎉",
    content: (
      <p className="text-muted-foreground">
        Free delivery for{" "}
        <span className="font-bold text-primary">PIET College Students!</span>
        <br />
        Every Bite is a Joy Ride 🍕
      </p>
    ),
  },
];

export default function LocationContact() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({
      title: "Subscribed!",
      description: "You'll be the first to know about our secret deals.",
    });
    setEmail("");
  };

  return (
    <section id="location" className="py-24 bg-background border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Details */}
          <div className="flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-secondary font-bold tracking-widest uppercase text-sm mb-3"
            >
              Find Us
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-black text-foreground mb-8"
            >
              Drop By or <br /> Get It Delivered.
            </motion.h3>

            {/* Contact items — staggered */}
            <div className="space-y-8 mb-10">
              {contactItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.color}`}
                  >
                    <item.icon size={24} />
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-lg text-foreground mb-1">{item.title}</h4>
                    {item.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Subscribe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm"
            >
              <h4 className="font-bold text-xl text-foreground mb-4">Subscribe for Secret Deals</h4>
              <form className="flex gap-2" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your phone or email"
                  className="flex-grow bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-foreground text-background px-6 py-3 rounded-xl font-bold hover:bg-foreground/90 transition-colors"
                >
                  <Send size={20} />
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-full min-h-[400px] rounded-3xl overflow-hidden border-4 border-card shadow-lg"
          >
             <iframe
               title="Pizza Ride location map"
               src="https://www.google.com/maps?q=6279%2B3QG%20Jurasi%20Saraf%20Khas%2C%20Haryana&output=embed"
               className="absolute inset-0 h-full w-full border-0"
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
             />
             <div className="absolute inset-0 bg-secondary/10 z-0 pointer-events-none" />
            <div
               className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
             <div className="absolute inset-0 flex items-center justify-center z-10 flex-col gap-4 p-8 text-center bg-background/50 backdrop-blur-sm pointer-events-none">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-xl"
              >
                <MapPin size={40} />
              </motion.div>
              <h3 className="font-display font-black text-3xl text-foreground drop-shadow-md">
                6279+3QG, Jurasi Saraf Khas
              </h3>
              <p className="text-foreground font-medium max-w-sm">
                Find Pizza Ride at Jurasi Saraf Khas, Haryana. Drop by for a fresh slice or let us bring the heat to your door.
              </p>
              <motion.a
                href="https://www.google.com/maps/search/?api=1&query=6279%2B3QG%20Jurasi%20Saraf%20Khas%2C%20Haryana"
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="pointer-events-auto mt-4 bg-foreground text-background px-6 py-3 rounded-full font-bold shadow-md transition-colors"
              >
                Get Directions
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
