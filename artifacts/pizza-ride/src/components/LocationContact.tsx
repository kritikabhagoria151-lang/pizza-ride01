import { MapPin, Phone, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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
    <section id="location" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Find Us</h2>
            <h3 className="text-4xl md:text-5xl font-display font-black text-foreground mb-8">
              Drop By or <br/> Get It Delivered.
            </h3>
            
            <div className="space-y-8 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground mb-1">Samalkha Location</h4>
                  <p className="text-muted-foreground">
                    Main Market Road, Near Panipat<br />
                    Samalkha, Haryana 132101, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground mb-1">Call to Order</h4>
                  <p className="text-muted-foreground text-xl font-display font-bold">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground mb-1">Opening Hours</h4>
                  <p className="text-muted-foreground">
                    Mon - Sun: 11:00 AM - 11:00 PM<br />
                    <span className="text-primary font-medium text-sm">Late night delivery available till 1 AM on weekends</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm">
              <h4 className="font-bold text-xl text-foreground mb-4">Subscribe for Secret Deals</h4>
              <form className="flex gap-2" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your phone or email" 
                  className="flex-grow bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button 
                  type="submit"
                  className="bg-foreground text-background px-6 py-3 rounded-xl font-bold hover:bg-foreground/90 transition-colors"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Map/Image Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-full min-h-[400px] rounded-3xl overflow-hidden border-4 border-card shadow-lg"
          >
            <div className="absolute inset-0 bg-secondary/10 z-0"></div>
            {/* Fake map pattern */}
            <div className="absolute inset-0 opacity-20" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            
            <div className="absolute inset-0 flex items-center justify-center z-10 flex-col gap-4 p-8 text-center bg-background/50 backdrop-blur-sm">
              <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <MapPin size={40} />
              </div>
              <h3 className="font-display font-black text-3xl text-foreground drop-shadow-md">Samalkha, Haryana</h3>
              <p className="text-foreground font-medium max-w-sm">We're right in the heart of town. Drop by for a fresh slice or let us bring the heat to your door.</p>
              <button className="mt-4 bg-foreground text-background px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 transition-transform">
                Get Directions
              </button>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
