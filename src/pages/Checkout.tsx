import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

interface Props {
  cart: number[];
  wishlist: number[];
  onUpdateCart: (cart: number[]) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onLoginOpen: () => void;
}

const Checkout = ({ cart, wishlist, onUpdateCart, searchQuery, onSearchChange, onLoginOpen }: Props) => {
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);

  const counted: Record<number, number> = {};
  cart.forEach((id) => { counted[id] = (counted[id] || 0) + 1; });
  const cartItems = Object.entries(counted).map(([id, qty]) => ({
    product: products.find((p) => p.id === Number(id))!,
    qty,
  })).filter((i) => i.product);

  const total = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = total > 1999 ? 0 : 99;

  if (placed) {
    return (
      <div className="min-h-screen pastel-gradient-animated">
        <Navbar searchQuery={searchQuery} onSearchChange={onSearchChange} onLoginOpen={onLoginOpen} cartCount={0} wishlistCount={wishlist.length} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="container mx-auto px-4 py-20 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">Thank you for shopping with House of Nera. We'll send you updates on your order.</p>
          <div className="flex gap-3 justify-center mt-8">
            <Link to="/orders" className="rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]">
              View Orders
            </Link>
            <Link to="/" className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted/60 transition-colors active:scale-[0.97]">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen pastel-gradient-animated">
      <Navbar searchQuery={searchQuery} onSearchChange={onSearchChange} onLoginOpen={onLoginOpen} cartCount={cart.length} wishlistCount={wishlist.length} />

      <div className="container mx-auto px-4 py-8">
        <Link to="/cart" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Cart
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-semibold tracking-tight mb-8"
        >
          Checkout
        </motion.h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={(e) => { e.preventDefault(); setPlaced(true); onUpdateCart([]); }}
            className="flex flex-col gap-6"
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="text-base font-semibold mb-4">Shipping Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="First Name" required className="col-span-1 rounded-xl bg-muted/60 border-0 py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="Last Name" required className="col-span-1 rounded-xl bg-muted/60 border-0 py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="Email" type="email" required className="col-span-2 rounded-xl bg-muted/60 border-0 py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="Phone" type="tel" required className="col-span-2 rounded-xl bg-muted/60 border-0 py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="Address" required className="col-span-2 rounded-xl bg-muted/60 border-0 py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="City" required className="rounded-xl bg-muted/60 border-0 py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="PIN Code" required className="rounded-xl bg-muted/60 border-0 py-3 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-base font-semibold mb-4">Payment Method</h3>
              <div className="flex flex-col gap-2">
                {["Cash on Delivery", "UPI Payment", "Credit / Debit Card"].map((m) => (
                  <label key={m} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors cursor-pointer">
                    <input type="radio" name="payment" value={m} defaultChecked={m === "Cash on Delivery"} className="accent-foreground" />
                    <span className="text-sm">{m}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="rounded-full bg-foreground text-background py-3.5 text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]"
            >
              Place Order — ₹{(total + shipping).toLocaleString()}
            </button>
          </motion.form>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-2xl p-6 h-fit sticky top-24"
          >
            <h3 className="text-base font-semibold mb-4">Order Summary ({cartItems.reduce((s, i) => s + i.qty, 0)} items)</h3>
            <div className="flex flex-col gap-4 max-h-80 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <img src={item.product.image} alt={item.product.name} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                  </div>
                  <span className="text-sm font-medium">₹{(item.product.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-4 flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-primary">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                <span>Total</span>
                <span>₹{(total + shipping).toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
