import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
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

const Wishlist = ({ wishlist, cart, onToggleWishlist, onAddToCart, searchQuery, onSearchChange, onLoginOpen }: Props) => {
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen pastel-gradient-animated">
      <Navbar searchQuery={searchQuery} onSearchChange={onSearchChange} onLoginOpen={onLoginOpen} cartCount={cart.length} wishlistCount={wishlist.length} />

      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl md:text-3xl font-semibold tracking-tight mb-8"
        >
          <Heart className="inline h-6 w-6 mr-2" /> My Wishlist ({items.length})
        </motion.h1>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-lg text-muted-foreground">Your wishlist is empty</p>
            <Link to="/shop" className="mt-4 inline-block rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]">
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-2xl overflow-hidden flex"
              >
                <Link to={`/product/${p.id}`} className="w-32 flex-shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${p.id}`}>
                      <h3 className="text-sm font-medium leading-tight hover:underline">{p.name}</h3>
                    </Link>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-base font-semibold">₹{p.price.toLocaleString()}</span>
                      {p.originalPrice && <span className="text-xs text-muted-foreground line-through">₹{p.originalPrice.toLocaleString()}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => onAddToCart(p.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-foreground text-background py-2 text-xs font-medium hover:opacity-90 transition-opacity active:scale-[0.97]"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
                    </button>
                    <button
                      onClick={() => onToggleWishlist(p.id)}
                      className="p-2 rounded-full border border-border hover:border-destructive hover:text-destructive transition-colors active:scale-95"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
