import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import LoginModal from "@/components/LoginModal";
import ScrollToTop from "@/components/ScrollToTop";
const queryClient = new QueryClient();

const AppContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const toggleWishlist = (id: number) => setWishlist((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const addToCart = (id: number) => setCart((p) => [...p, id]);

  const shared = {
    wishlist,
    cart,
    onToggleWishlist: toggleWishlist,
    onAddToCart: addToCart,
    searchQuery,
    onSearchChange: setSearchQuery,
    onLoginOpen: () => setLoginOpen(true),
  };

  return (
    <>
      <Toaster />
      <Sonner />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index {...shared} />} />
        <Route path="/shop" element={<Shop {...shared} />} />
        <Route path="/product/:id" element={<ProductDetail {...shared} />} />
        <Route path="/wishlist" element={<Wishlist {...shared} />} />
        <Route path="/cart" element={<Cart cart={cart} wishlist={wishlist} onUpdateCart={setCart} searchQuery={searchQuery} onSearchChange={setSearchQuery} onLoginOpen={() => setLoginOpen(true)} />} />
        <Route path="/checkout" element={<Checkout cart={cart} wishlist={wishlist} onUpdateCart={setCart} searchQuery={searchQuery} onSearchChange={setSearchQuery} onLoginOpen={() => setLoginOpen(true)} />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
