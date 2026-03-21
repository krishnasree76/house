import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const OfferBanner = () => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="container mx-auto px-4 py-8"
  >
    <div className="pastel-gradient-animated rounded-3xl p-8 md:p-12 text-center">
      <span className="text-xs font-semibold uppercase tracking-widest text-foreground/60">Limited Time</span>
      <h2 className="text-2xl md:text-4xl font-bold mt-2 tracking-tight" style={{ lineHeight: "1.1" }}>
        Up to 40% Off on Select Styles
      </h2>
      <p className="mt-3 text-sm md:text-base text-foreground/70 max-w-md mx-auto">
        Shop our curated collection of discounted pieces before they're gone.
      </p>
      <Link
        to="/shop"
        className="mt-6 inline-block rounded-full bg-foreground text-background px-8 py-3 text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]"
      >
        Shop Offers
      </Link>
    </div>
  </motion.section>
);

export default OfferBanner;
