import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryScroller from "@/components/CategoryScroller";
import ProductCard from "@/components/ProductCard";
import OfferBanner from "@/components/OfferBanner";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

interface Props {
  wishlist: number[];
  cart: number[];
  onToggleWishlist: (id: number) => void;
  onAddToCart: (id: number) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onLoginOpen: () => void;
}

const Index = ({ wishlist, cart, onToggleWishlist, onAddToCart, searchQuery, onSearchChange, onLoginOpen }: Props) => {
  const trending = products.filter((p) => p.tag === "trending");
  const newArrivals = products.filter((p) => p.tag === "new");
  const offers = products.filter((p) => p.tag === "offer");

  const ProductGrid = ({ items, title }: { items: typeof products; title: string }) => {
    if (items.length === 0) return null;
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-6">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`}>
              <ProductCard
                product={p}
                onAddToCart={(id) => { onAddToCart(id); }}
                onToggleWishlist={(id) => { onToggleWishlist(id); }}
                isWishlisted={wishlist.includes(p.id)}
              />
            </Link>
          ))}
        </div>
      </motion.section>
    );
  };

  return (
    <div className="min-h-screen pastel-gradient-animated">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onLoginOpen={onLoginOpen}
        cartCount={cart.length}
        wishlistCount={wishlist.length}
      />

      <HeroCarousel />
      <CategoryScroller active="" onSelect={() => {}} />
      {/* <CategoryScroller /> */}

      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col gap-12">
          <ProductGrid items={trending} title="🔥 Trending Now" />
          {trending.length > 0 && offers.length > 0 && <OfferBanner />}
          <ProductGrid items={offers} title="💎 Special Offers" />
          <ProductGrid items={newArrivals} title="✨ New Arrivals" />

          {/* Shop All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-8"
          >
            <Link
              to="/shop"
              className="inline-block rounded-full bg-foreground text-background px-10 py-3.5 text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]"
            >
              Shop All Products →
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
