import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  onAddToCart: (id: number) => void;
  onToggleWishlist: (id: number) => void;
  isWishlisted: boolean;
}

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted }: Props) => {
  const [imgHover, setImgHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-2xl overflow-hidden group"
    >
      <div
        className="relative aspect-[3/4] overflow-hidden"
        onMouseEnter={() => setImgHover(true)}
        onMouseLeave={() => setImgHover(false)}
      >
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${imgHover ? "scale-110" : "scale-100"}`}
        />
        {product.discount && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[11px] font-semibold px-2.5 py-1 rounded-full">
            {product.discount}% OFF
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleWishlist(product.id); }}
          className="absolute top-3 right-3 p-2 rounded-full glass hover:bg-white/80 transition-colors active:scale-95"
        >
          <Heart className={`h-4 w-4 transition-colors ${isWishlisted ? "fill-primary text-primary" : "text-foreground"}`} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium leading-tight line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-semibold">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddToCart(product.id); }}
          className="mt-3 w-full flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-2.5 text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
