import { useSearchParams } from "react-router-dom";

const allCategories = ["Kurta Sets", "Frocks", "Sarees", "Co-ord Sets"];

const CategoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("cat") || "";

  const handleCategoryChange = (cat: string) => {
    setSearchParams({ cat });
  };

  return (
    <div className="min-h-screen p-4 flex gap-6">
      
      {/* 🔥 FILTER SIDEBAR */}
      <div className="w-60">
        <h4 className="text-sm font-medium mb-3 uppercase">
          Category
        </h4>

        <div className="flex flex-col gap-2">
          {allCategories.map((c) => (
            <button
              key={c}
              onClick={() => handleCategoryChange(c)}
              className={`text-left text-sm py-2 px-3 rounded-lg ${
                category === c
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* 🛍️ PRODUCTS GRID */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">
          {category || "All Products"}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-md p-3 rounded-xl shadow"
            >
              <div className="h-40 bg-gray-200 rounded-lg mb-2"></div>

              <p className="text-sm font-medium">
                {category || "Product"} {i + 1}
              </p>

              <p className="text-sm text-gray-600">₹999</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;