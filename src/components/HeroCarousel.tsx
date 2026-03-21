import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  { image: hero1, title: "New Season Arrivals", subtitle: "Discover our latest kurta collection" },
  { image: hero2, title: "Timeless Elegance", subtitle: "Handcrafted sarees for every occasion" },
  { image: hero3, title: "Effortless Style", subtitle: "Contemporary co-ord sets you'll love" },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const go = (dir: number) => setCurrent((p) => (p + dir + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
    src={slides[current].image}
    className="w-full h-full object-cover blur-xl scale-110 opacity-50"
  />

  {/* Main image */}
  <img
    src={slides[current].image}
    alt={slides[current].title}
    className="absolute inset-0 w-full h-full object-contain"
  />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-12 left-0 right-0 text-center px-4">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-5xl font-semibold text-white tracking-tight"
              style={{ lineHeight: "1.1" }}
            >
              {slides[current].title}
            </motion.h2>
            <motion.p
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-3 text-base md:text-lg text-white/85"
            >
              {slides[current].subtitle}
            </motion.p>
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link
                to="/shop"
                className="mt-6 inline-block rounded-full bg-white text-foreground px-8 py-3 text-sm font-medium hover:bg-white/90 transition-colors active:scale-[0.97]"
              >
                Shop Now
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={() => go(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass text-foreground hover:bg-white/70 transition-colors" aria-label="Previous">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={() => go(1)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass text-foreground hover:bg-white/70 transition-colors" aria-label="Next">
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-white" : "w-2 bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
