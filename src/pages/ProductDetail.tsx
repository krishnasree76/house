// import { useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Heart, ShoppingBag, ChevronLeft, Minus, Plus } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { products } from "@/data/products";

// interface Props {
//   wishlist: number[];
//   cart: number[];
//   onToggleWishlist: (id: number) => void;
//   onAddToCart: (id: number) => void;
//   searchQuery: string;
//   onSearchChange: (q: string) => void;
//   onLoginOpen: () => void;
// }

// const ProductDetail = ({ wishlist, cart, onToggleWishlist, onAddToCart, searchQuery, onSearchChange, onLoginOpen }: Props) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const product = products.find((p) => p.id === Number(id));
//   const [selectedSize, setSelectedSize] = useState<string>("");
//   const [qty, setQty] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(product.image);
// const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
// const [showZoom, setShowZoom] = useState(false);
// const images = [product.image, product.image, product.image, product.image];
// const [activeIndex, setActiveIndex] = useState(0);

//   if (!product) {
//     return (
//       <div className="min-h-screen pastel-gradient-animated">
//         <Navbar searchQuery={searchQuery} onSearchChange={onSearchChange} onLoginOpen={onLoginOpen} cartCount={cart.length} wishlistCount={wishlist.length} />
//         <div className="container mx-auto px-4 py-20 text-center">
//           <p className="text-lg text-muted-foreground">Product not found.</p>
//           <Link to="/shop" className="mt-4 inline-block text-sm text-primary underline underline-offset-4">Back to Shop</Link>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const isWishlisted = wishlist.includes(product.id);
//   const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     for (let i = 0; i < qty; i++) onAddToCart(product.id);
//   };
//   const scrollRef = React.useRef<HTMLDivElement>(null);
//   const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
//   const scrollPosition = e.currentTarget.scrollLeft;
//   const width = e.currentTarget.offsetWidth;
//   const index = Math.round(scrollPosition / width);
//   setActiveIndex(index);
// };
// const scrollToIndex = (index: number) => {
//   if (scrollRef.current) {
//     const width = scrollRef.current.offsetWidth;
//     scrollRef.current.scrollTo({ left: index * width, behavior: "smooth" });
//   }
// };

//   return (
//     <div className="min-h-screen pastel-gradient-animated">
//       <Navbar searchQuery={searchQuery} onSearchChange={onSearchChange} onLoginOpen={onLoginOpen} cartCount={cart.length} wishlistCount={wishlist.length} />

//       <div className="container mx-auto px-4 py-6">
//         <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
//           <ChevronLeft className="h-4 w-4" /> Back
//         </button>

//         <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
//   {/* IMAGE SECTION */}
//   <div className="flex flex-col gap-4">
//     <div className="relative group">
//       {/* 1. Manually Scrollable Carousel */}
//       <div 
//         className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-0 rounded-3xl border bg-white"
//         onScroll={handleScroll}
//         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//       >
//         {images.map((img, index) => (
//           <div 
//             key={index} 
//             className="min-w-full snap-center aspect-[3/4] relative overflow-hidden"
//           >
//             {/* Desktop Hover Zoom Container */}
//             <div
//               className="w-full h-full cursor-zoom-in"
//               onMouseMove={(e) => {
//                 const rect = e.currentTarget.getBoundingClientRect();
//                 const x = ((e.clientX - rect.left) / rect.width) * 100;
//                 const y = ((e.clientY - rect.top) / rect.height) * 100;
//                 setLensPosition({ x, y });
//                 setShowZoom(true);
//               }}
//               onMouseLeave={() => setShowZoom(false)}
//             >
//               <img
//                 src={img}
//                 alt={`${product.name} ${index}`}
//                 className="w-full h-full object-cover"
//               />
              
//               {/* Desktop Zoom Overlay (Side-by-side) */}
//               {showZoom && (
//                 <div className="hidden md:block absolute top-0 left-[105%] w-full h-full z-50 border rounded-2xl overflow-hidden bg-white shadow-xl pointer-events-none">
//                   <div
//                     className="w-full h-full bg-no-repeat"
//                     style={{
//                       backgroundImage: `url(${img})`,
//                       backgroundSize: "250%",
//                       backgroundPosition: `${lensPosition.x}% ${lensPosition.y}%`,
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 2. Pagination Dots (Mobile/Tablet Visibility) */}
//       <div className="flex justify-center gap-2 mt-4 md:hidden">
//         {images.map((_, i) => (
//           <div 
//             key={i} 
//             className={`h-1.5 transition-all rounded-full ${activeIndex === i ? "w-6 bg-foreground" : "w-1.5 bg-muted"}`} 
//           />
//         ))}
//       </div>

//       {/* 3. Desktop Thumbnails (Click to Scroll) */}
//       <div className="hidden md:flex gap-3 mt-4">
//         {images.map((img, index) => (
//           <button
//             key={index}
//             onClick={() => {
//               const container = document.querySelector('.snap-x');
//               container?.scrollTo({ left: index * (container as HTMLElement).offsetWidth, behavior: 'smooth' });
//             }}
//             className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
//               activeIndex === index ? "border-foreground scale-105" : "border-transparent opacity-70"
//             }`}
//           >
//             <img src={img} className="w-full h-full object-cover" />
//           </button>
//         ))}
//       </div>
//     </div>
//   </div>

//           {/* Details */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
//             className="flex flex-col justify-center"
//           >
//             <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{product.category}</span>
//             <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-2" style={{ lineHeight: "1.15" }}>{product.name}</h1>

//             <div className="flex items-baseline gap-3 mt-4">
//               <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
//               {product.originalPrice && (
//                 <span className="text-base text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
//               )}
//               {product.discount && (
//                 <span className="text-sm font-medium text-primary">{product.discount}% off</span>
//               )}
//             </div>

//             <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
//               A beautifully crafted piece from our {product.category.toLowerCase()} collection. Made with premium fabrics and meticulous attention to detail, perfect for any special occasion.
//             </p>

//             {/* Size */}
//             <div className="mt-6">
//               <h3 className="text-sm font-medium mb-3">Select Size</h3>
//               <div className="flex flex-wrap gap-2">
//                 {product.size.map((s) => (
//                   <button
//                     key={s}
//                     onClick={() => setSelectedSize(s)}
//                     className={`px-4 py-2 text-sm rounded-full border transition-colors active:scale-95 ${selectedSize === s ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/40"}`}
//                   >
//                     {s}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity */}
//             <div className="mt-6">
//               <h3 className="text-sm font-medium mb-3">Quantity</h3>
//               <div className="flex items-center gap-3">
//                 <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 rounded-full border border-border hover:border-foreground/40 transition-colors active:scale-95">
//                   <Minus className="h-4 w-4" />
//                 </button>
//                 <span className="text-base font-medium w-8 text-center tabular-nums">{qty}</span>
//                 <button onClick={() => setQty((q) => q + 1)} className="p-2 rounded-full border border-border hover:border-foreground/40 transition-colors active:scale-95">
//                   <Plus className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex gap-3 mt-8">
//               <button
//                 onClick={handleAddToCart}
//                 className="flex-1 flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-3.5 text-sm font-medium hover:opacity-90 transition-opacity active:scale-[0.97]"
//               >
//                 <ShoppingBag className="h-4 w-4" /> Add to Cart
//               </button>
//               <button
//                 onClick={() => onToggleWishlist(product.id)}
//                 className={`p-3.5 rounded-full border transition-colors active:scale-95 ${isWishlisted ? "bg-primary/10 border-primary" : "border-border hover:border-foreground/40"}`}
//               >
//                 <Heart className={`h-5 w-5 ${isWishlisted ? "fill-primary text-primary" : ""}`} />
//               </button>
//             </div>
//           </motion.div>
//         </div>

//         {/* Related products */}
//         {related.length > 0 && (
//           <motion.section
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.1 }}
//             transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//             className="mt-16"
//           >
//             <h2 className="text-xl font-semibold tracking-tight mb-6">You May Also Like</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//               {related.map((p) => (
//                 <Link key={p.id} to={`/product/${p.id}`}>
//                   <div className="glass rounded-2xl overflow-hidden group">
//                     <div className="aspect-[3/4] overflow-hidden">
//                       <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                     </div>
//                     <div className="p-3">
//                       <h3 className="text-sm font-medium line-clamp-1">{p.name}</h3>
//                       <span className="text-sm font-semibold mt-1 block">₹{p.price.toLocaleString()}</span>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </motion.section>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default ProductDetail;
import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, Minus, Plus, Search } from "lucide-react";
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

const ProductDetail = ({ wishlist, cart, onToggleWishlist, onAddToCart, searchQuery, onSearchChange, onLoginOpen }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // In a real app, products would have an array of images. Defaulting to 4 of the same for now.
  const images = product ? [product.image, product.image, product.image, product.image] : [];

  if (!product) {
    return (
      <div className="min-h-screen pastel-gradient-animated">
        <Navbar searchQuery={searchQuery} onSearchChange={onSearchChange} onLoginOpen={onLoginOpen} cartCount={cart.length} wishlistCount={wishlist.length} />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-lg text-muted-foreground">Product not found.</p>
          <Link to="/shop" className="mt-4 inline-block text-sm text-primary underline underline-offset-4">Back to Shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollPosition = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({ left: index * width, behavior: "smooth" });
    }
  };

  const isWishlisted = wishlist.includes(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    for (let i = 0; i < qty; i++) onAddToCart(product.id);
  };

  return (
    <div className="min-h-screen pastel-gradient-animated">
      <Navbar searchQuery={searchQuery} onSearchChange={onSearchChange} onLoginOpen={onLoginOpen} cartCount={cart.length} wishlistCount={wishlist.length} />

      <div className="container mx-auto px-4 py-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ChevronLeft className="h-4 w-4" /> Back
        </button>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* IMAGE SECTION */}
          <div className="flex flex-col gap-4">
            <div className="relative group/container">
              
              {/* Desktop Navigation Arrows */}
              <button 
                onClick={() => scrollToIndex(activeIndex - 1)}
                className={`hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all active:scale-90 ${activeIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <button 
                onClick={() => scrollToIndex(activeIndex + 1)}
                className={`hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all active:scale-90 ${activeIndex === images.length - 1 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Manually Scrollable Carousel */}
              <div 
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar rounded-3xl border bg-white cursor-zoom-in"
                onScroll={handleScroll}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {images.map((img, index) => (
                  <div 
                    key={index} 
                    className="min-w-full snap-center aspect-[3/4] relative overflow-hidden"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      const y = ((e.clientY - rect.top) / rect.height) * 100;
                      setLensPosition({ x, y });
                      setShowZoom(true);
                    }}
                    onMouseLeave={() => setShowZoom(false)}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Zoom Icon Indicator */}
                    <div className="absolute bottom-4 right-4 bg-white/50 backdrop-blur-md p-2 rounded-full md:block hidden">
                      <Search className="h-4 w-4 text-foreground/70" />
                    </div>

                    {/* Discount Badge */}
                    {product.discount && (
                      <span className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full z-10">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Side-by-Side Zoom Preview (Desktop Only) */}
              {showZoom && (
                <div className="hidden md:block absolute top-0 left-[105%] w-full h-full z-[100] border-2 border-white rounded-3xl overflow-hidden bg-white shadow-2xl pointer-events-none">
                  <div
                    className="w-full h-full transition-transform duration-75"
                    style={{
                      backgroundImage: `url(${images[activeIndex]})`,
                      backgroundSize: "250%",
                      backgroundPosition: `${lensPosition.x}% ${lensPosition.y}%`,
                      backgroundRepeat: "no-repeat"
                    }}
                  />
                </div>
              )}
            </div>

            {/* Pagination Indicators / Thumbnails */}
            <div className="flex justify-center md:justify-start gap-2 mt-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  className={`relative h-16 w-12 md:h-20 md:w-16 rounded-lg overflow-hidden border-2 transition-all ${
                    activeIndex === i ? "border-foreground scale-105" : "border-transparent opacity-50"
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{product.category}</span>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-2">{product.name}</h1>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-base text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              A beautifully crafted piece from our {product.category.toLowerCase()} collection. Made with premium fabrics and meticulous attention to detail.
            </p>

            {/* Size Selector */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.size.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 text-sm rounded-full border transition-all active:scale-95 ${selectedSize === s ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/40"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 rounded-full border border-border hover:border-foreground/40 transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-base font-medium w-8 text-center">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="p-2 rounded-full border border-border hover:border-foreground/40 transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-3.5 text-sm font-medium hover:opacity-90 transition-all active:scale-[0.97]"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3.5 rounded-full border transition-all active:scale-95 ${isWishlisted ? "bg-primary/10 border-primary" : "border-border hover:border-foreground/40"}`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-primary text-primary" : ""}`} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related Products Section */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-semibold tracking-tight mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`}>
                  <div className="group">
                    <div className="aspect-[3/4] overflow-hidden rounded-2xl border">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="mt-3">
                      <h3 className="text-sm font-medium truncate">{p.name}</h3>
                      <span className="text-sm font-semibold">₹{p.price.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
