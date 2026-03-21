import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  size: string[];
  tag?: "trending" | "new" | "offer";
}

export const products: Product[] = [
  { id: 1, name: "Rose Embroidered Kurta Set", price: 2499, originalPrice: 3999, discount: 38, image: product1, category: "Kurta Sets", size: ["S", "M", "L", "XL"], tag: "trending" },
  { id: 2, name: "Lavender Bloom Frock", price: 1899, image: product2, category: "Frocks", size: ["S", "M", "L"], tag: "new" },
  { id: 3, name: "Mint Silk Saree", price: 4299, originalPrice: 5499, discount: 22, image: product3, category: "Sarees", size: ["Free Size"], tag: "trending" },
  { id: 4, name: "Ivory Linen Co-ord Set", price: 2199, image: product4, category: "Co-ord Sets", size: ["S", "M", "L", "XL"], tag: "new" },
  { id: 5, name: "Royal Blue Kurta", price: 2799, originalPrice: 3499, discount: 20, image: product5, category: "Kurta Sets", size: ["M", "L", "XL"], tag: "offer" },
  { id: 6, name: "Peach Anarkali Frock", price: 3199, image: product6, category: "Frocks", size: ["S", "M", "L"], tag: "new" },
  { id: 7, name: "Red Silk Kanjeevaram Saree", price: 5999, originalPrice: 7499, discount: 20, image: product7, category: "Sarees", size: ["Free Size"], tag: "offer" },
  { id: 8, name: "Rosewood Co-ord Set", price: 1999, originalPrice: 2799, discount: 29, image: product8, category: "Co-ord Sets", size: ["S", "M", "L"], tag: "trending" },
];
