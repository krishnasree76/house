import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
interface ShopProps {
  wishlist: number[];
  cart: number[];
  onToggleWishlist: (id: number) => void;
  onAddToCart: (id: number) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onLoginOpen: () => void;
}

const Shop = ({ wishlist, cart, onToggleWishlist, onAddToCart, searchQuery, onSearchChange, onLoginOpen }: ShopProps) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "",
    sizes: [] as string[],
    priceRange: [500, 10000] as [number, number],
    sort: "",
  });

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filters.category && p.category !== filters.category) return false;
      if (filters.sizes.length > 0 && !p.size.some((s) => filters.sizes.includes(s))) return false;
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;
      return true;
    });
    if (filters.sort === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (filters.sort === "high") result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [searchQuery, filters]);
  useEffect(() => {
  const catFromURL = searchParams.get("cat") || "";

  if (catFromURL && catFromURL !== filters.category) {
    setFilters((prev) => ({
      ...prev,
      category: catFromURL,
    }));
  }
}, [searchParams]);

  return (
    <div className="min-h-screen pastel-gradient-animated">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onLoginOpen={onLoginOpen}
        cartCount={cart.length}
        wishlistCount={wishlist.length}
      />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">All Products</h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} products</p>
        </motion.div>

        <div className="flex gap-8">
          <FilterSidebar
  filters={filters}
  onChange={(newFilters) => {
    setFilters(newFilters);

    // 🔥 sync category with URL
    if (newFilters.category) {
      setSearchParams({ cat: newFilters.category });
    } else {
      setSearchParams({});
    }
  }}
  open={filterOpen}
  onClose={() => setFilterOpen(false)}
/>

          <div className="flex-1 flex flex-col gap-6">
            <button
              onClick={() => setFilterOpen(true)}
              className="md:hidden flex items-center gap-2 self-end rounded-full glass px-4 py-2 text-sm font-medium hover:bg-white/70 transition-colors active:scale-[0.97]"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filtered.map((p) => (
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
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">No products found matching your filters.</p>
                <button
                  onClick={() => setFilters({ category: "", sizes: [], priceRange: [500, 10000], sort: "" })}
                  className="mt-4 text-sm text-primary underline underline-offset-4"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
