// import { motion } from "framer-motion";
// import catKurta from "@/assets/cat-kurta.jpg";
// import catFrock from "@/assets/cat-frock.jpg";
// import catSaree from "@/assets/cat-saree.jpg";
// import catCoord from "@/assets/cat-coord.jpg";

// const categories = [
//   { name: "Kurta Sets", image: catKurta },
//   { name: "Frocks", image: catFrock },
//   { name: "Sarees", image: catSaree },
//   { name: "Co-ord Sets", image: catCoord },
// ];

// interface Props {
//   active: string;
//   onSelect: (cat: string) => void;
// }

// const CategoryScroller = ({ active, onSelect }: Props) => {
//   return (
//     <motion.section
//       initial={{ opacity: 0, y: 16 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.2 }}
//       transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//       className="py-8"
//     >
//       <div className="container mx-auto px-4">
//         <h2 className="text-lg font-semibold tracking-tight text-center mb-6">Shop by Category</h2>
//         <div className="flex gap-6 md:gap-10 overflow-x-auto scrollbar-hide snap-x snap-mandatory justify-center pb-2">
//           {categories.map((cat) => (
//             <button
//               key={cat.name}
//               onClick={() => onSelect(active === cat.name ? "" : cat.name)}
//               className="flex flex-col items-center gap-2 flex-shrink-0 snap-center group"
//             >
//               <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 transition-all duration-300 ${active === cat.name ? "border-primary shadow-lg shadow-primary/20 scale-105" : "border-transparent group-hover:border-primary/40"}`}>
//                 <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
//               </div>
//               <span className={`text-xs md:text-sm font-medium transition-colors ${active === cat.name ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
//                 {cat.name}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </motion.section>
//   );
// };

// export default CategoryScroller;

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import catKurta from "@/assets/cat-kurta.jpg";
import catFrock from "@/assets/cat-frock.jpg";
import catSaree from "@/assets/cat-saree.jpg";
import catCoord from "@/assets/cat-coord.jpg";

const categories = [
  { name: "Kurta Sets", image: catKurta },
  { name: "Frocks", image: catFrock },
  { name: "Sarees", image: catSaree },
  { name: "Co-ord Sets", image: catCoord },
];

interface Props {
  active: string;
  onSelect: (cat: string) => void;
}

const CategoryScroller = ({ active, onSelect }: Props) => {
  const navigate = useNavigate();

  const handleClick = (cat: string) => {
    const selected = active === cat ? "" : cat;

    // keep your existing UI selection logic
    onSelect(selected);

    // 🔥 navigate to /shop with category
    if (selected) {
      navigate(`/shop?cat=${encodeURIComponent(cat)}`);
    } else {
      navigate(`/shop`);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-8"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-lg font-semibold tracking-tight text-center mb-6">
          Shop by Category
        </h2>

        <div className="flex gap-6 md:gap-10 overflow-x-auto scrollbar-hide snap-x snap-mandatory justify-center pb-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleClick(cat.name)}   
              className="flex flex-col items-center gap-2 flex-shrink-0 snap-center group"
            >
              <div
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                  active === cat.name
                    ? "border-primary shadow-lg shadow-primary/20 scale-105"
                    : "border-transparent group-hover:border-primary/40"
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <span
                className={`text-xs md:text-sm font-medium transition-colors ${
                  active === cat.name
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CategoryScroller;