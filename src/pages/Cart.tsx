import { motion } from "framer-motion";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, Product } from "@/data/products";

interface Props {
  cart: number[];
  wishlist: number[];
  onUpdateCart: (cart: number[]) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onLoginOpen: () => void;
}

interface CartItem {
  product: Product;
  qty: number;
}

const Cart = ({ cart, wishlist, onUpdateCart, searchQuery, onSearchChange, onLoginOpen }: Props) => {
  // Group cart items by id
  const cartItems: CartItem[] = [];
  const counted: Record<number, number> = {};
  cart.forEach((id) => { counted[id] = (counted[id] || 0) + 1; });
  Object.entries(counted).forEach(([id, qty]) => {
    const product = products.find((p) => p.id === Number(id));
    if (product) cartItems.push({ product, qty });
  });

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const savings = cartItems.reduce((sum, item) => {
    if (item.product.originalPrice) return sum + (item.product.originalPrice - item.product.price) * item.qty;
    return sum;
  }, 0);

  const updateQty = (id: number, delta: number) => {
    const newCart = [...cart];
    if (delta > 0) {
      newCart.push(id);
    } else {
      const idx = newCart.lastIndexOf(id);
      if (idx !== -1) newCart.splice(idx, 1);
    }
    onUpdateCart(newCart);
  };

  const removeItem = (id: number) => {
    onUpdateCart(cart.filter((x) => x !== id));
  };

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
          <ShoppingBag className="inline h-6 w-6 mr-2" /> Shopping Cart ({cartItems.reduce((s, i) => s + i.qty, 0)})
        </motion.h1>

        {cartItems.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-lg text-muted-foreground">Your cart is empty</p>
            <Link to="/shop" className="mt-4 inline-block rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]">
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cartItems.map((item, i) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="glass rounded-2xl overflow-hidden flex"
                >
                  <Link to={`/product/${item.product.id}`} className="w-28 md:w-36 flex-shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="text-sm font-medium leading-tight hover:underline">{item.product.name}</h3>
                      </Link>
                      <div className="flex items-baseline gap-2 mt-1.5">
                        <span className="text-base font-semibold">₹{item.product.price.toLocaleString()}</span>
                        {item.product.originalPrice && <span className="text-xs text-muted-foreground line-through">₹{item.product.originalPrice.toLocaleString()}</span>}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.product.id, -1)} className="p-1.5 rounded-full border border-border hover:border-foreground/40 transition-colors active:scale-95">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center tabular-nums">{item.qty}</span>
                        <button onClick={() => updateQty(item.product.id, 1)} className="p-1.5 rounded-full border border-border hover:border-foreground/40 transition-colors active:scale-95">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.product.id)} className="p-2 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors active:scale-95">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-6 h-fit sticky top-24"
            >
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{total.toLocaleString()}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>You Save</span>
                    <span className="font-medium">-₹{savings.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-primary">{total > 1999 ? "Free" : "₹99"}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">₹{(total + (total > 1999 ? 0 : 99)).toLocaleString()}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="mt-6 w-full flex items-center justify-center rounded-full bg-foreground text-background py-3.5 text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]"
              >
                Proceed to Checkout
              </Link>
              <Link to="/shop" className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
