import { Pizza, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card text-foreground pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 inline-flex">
              <div className="bg-primary text-primary-foreground p-2 rounded-full">
                <Pizza size={24} />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">
                Pizza Ride
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              Bringing the authentic wood-fired pizza experience to Samalkha. Fresh ingredients, bold flavors, fast delivery.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#menu" className="text-muted-foreground hover:text-primary transition-colors">Our Menu</a></li>
              <li><a href="#why-us" className="text-muted-foreground hover:text-primary transition-colors">Why Choose Us</a></li>
              <li><a href="#gallery" className="text-muted-foreground hover:text-primary transition-colors">Gallery</a></li>
              <li><a href="#location" className="text-muted-foreground hover:text-primary transition-colors">Contact & Location</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Pizza Ride Samalkha. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <span className="text-primary font-bold text-lg leading-none">&hearts;</span> for pizza lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
