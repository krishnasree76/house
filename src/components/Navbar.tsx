import { useState } from "react";
import { Search, User, Package, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";


interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onLoginOpen: () => void;
  cartCount: number;
  wishlistCount: number;
}

const Navbar = ({ searchQuery, onSearchChange, onLoginOpen, cartCount, wishlistCount }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between gap-4 py-3 px-4">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="House of Nera" className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-full bg-muted/60 border-0 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1">
          <button
  onClick={() => navigate("/profile")}
  className="p-2.5 rounded-full hover:bg-muted/60 transition-colors"
  aria-label="Profile"
>
  <User className="h-5 w-5" />
</button>
          <Link to="/orders" className="p-2.5 rounded-full hover:bg-muted/60 transition-colors" aria-label="Orders">
            <Package className="h-5 w-5" />
          </Link>
          <Link to="/wishlist" className="relative p-2.5 rounded-full hover:bg-muted/60 transition-colors" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium">{wishlistCount}</span>}
          </Link>
          <Link to="/cart" className="relative p-2.5 rounded-full hover:bg-muted/60 transition-colors" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium">{cartCount}</span>}
          </Link>
          <button onClick={onLoginOpen} className="ml-2 rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]">
            Login
          </button>
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-full bg-muted/60 border-0 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-border/50"
          >
            <div className="flex flex-col gap-1 p-4">
              <button
  onClick={() => {
    navigate("/profile");
    setMobileOpen(false);
  }}
  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/60 transition-colors"
>
  <User className="h-5 w-5" /> Profile
</button>
              <Link to="/orders" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/60 transition-colors">
                <Package className="h-5 w-5" /> Orders
              </Link>
              <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/60 transition-colors">
                <Heart className="h-5 w-5" /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
              <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/60 transition-colors">
                <ShoppingBag className="h-5 w-5" /> Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
              <button onClick={() => { onLoginOpen(); setMobileOpen(false); }} className="mt-2 rounded-full bg-foreground text-background py-3 text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]">
                Login / Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
