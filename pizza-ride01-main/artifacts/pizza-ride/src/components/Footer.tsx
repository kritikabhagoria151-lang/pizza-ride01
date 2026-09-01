import { Pizza, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function Footer() {
  return (
    <footer className="bg-card text-foreground pt-16 pb-8 border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <motion.div
            className="md:col-span-2"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Link href="/" className="flex items-center gap-2 mb-6 inline-flex">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -6, 6, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="bg-primary text-primary-foreground p-2 rounded-full"
              >
                <Pizza size={24} />
              </motion.div>
              <span className="font-display font-bold text-2xl tracking-tight">
                Pizza Ride
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              Bringing the authentic wood-fired pizza experience to Samalkha. Fresh ingredients, bold flavors, fast delivery.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Our Menu", href: "#menu" },
                { label: "Why Choose Us", href: "#why-us" },
                { label: "Gallery", href: "#gallery" },
                { label: "Contact & Location", href: "#location" },
              ].map((link, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors relative group inline-block"
                  >
                    {link.label}
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Refund Policy", href: "#" },
              ].map((link, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors relative group inline-block"
                  >
                    {link.label}
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-muted-foreground text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Pizza Ride Samalkha. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="text-primary font-bold text-lg leading-none"
            >
              &hearts;
            </motion.span>{" "}
            for pizza lovers
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
