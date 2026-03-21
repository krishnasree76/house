import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Filters {
  category: string;
  sizes: string[];
  priceRange: [number, number];
  sort: string;
}

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
  open: boolean;
  onClose: () => void;
}

const allCategories = ["Kurta Sets", "Frocks", "Sarees", "Co-ord Sets"];
const allSizes = ["S", "M", "L", "XL", "Free Size"];
const sortOptions = [
  { value: "", label: "Default" },
  { value: "low", label: "Price: Low to High" },
  { value: "high", label: "Price: High to Low" },
];

const FilterSidebar = ({ filters, onChange, open, onClose }: Props) => {
  const toggleSize = (s: string) => {
    const sizes = filters.sizes.includes(s) ? filters.sizes.filter((x) => x !== s) : [...filters.sizes, s];
    onChange({ ...filters, sizes });
  };

  const content = (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button onClick={onClose} className="md:hidden p-1"><X className="h-5 w-5" /></button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Category</h4>
        <div className="flex flex-col gap-2">
          {allCategories.map((c) => (
            <button
              key={c}
              onClick={() => onChange({ ...filters, category: filters.category === c ? "" : c })}
              className={`text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${filters.category === c ? "bg-foreground text-background font-medium" : "hover:bg-muted/60"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Size</h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={`text-xs py-1.5 px-3 rounded-full border transition-colors ${filters.sizes.includes(s) ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/40"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Price Range</h4>
        <input
          type="range"
          min={500}
          max={10000}
          step={500}
          value={filters.priceRange[1]}
          onChange={(e) => onChange({ ...filters, priceRange: [500, Number(e.target.value)] })}
          className="w-full accent-foreground"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>₹500</span>
          <span>₹{filters.priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Sort */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Sort By</h4>
        <div className="flex flex-col gap-2">
          {sortOptions.map((o) => (
            <button
              key={o.value}
              onClick={() => onChange({ ...filters, sort: o.value })}
              className={`text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${filters.sort === o.value ? "bg-foreground text-background font-medium" : "hover:bg-muted/60"}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onChange({ category: "", sizes: [], priceRange: [500, 10000], sort: "" })}
        className="mt-2 text-sm text-primary underline underline-offset-4 hover:opacity-80"
      >
        Clear all filters
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <div className="glass rounded-2xl sticky top-24">{content}</div>
      </aside>

      {/* Mobile slide-up */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background rounded-t-3xl max-h-[80vh] overflow-y-auto"
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;
