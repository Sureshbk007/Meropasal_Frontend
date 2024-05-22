import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../components";

function Products() {
  const [showAll, setShowAll] = useState({
    categories: false,
    brand: false,
  });

  const categories = [
    "apple",
    "mango",
    "litche",
    "potato",
    "tomato",
    "litche",
    "potato",
    "tomato",
    "litche",
    "potato",
    "tomato",
  ];
  const brands = [
    "brand1",
    "brand2",
    "brand3",
    "brand4",
    "brand5",
    "brand6",
    "brand7",
    "brand8",
    "brand9",
    "brand10",
  ];

  const toggleShowAll = (field) => {
    setShowAll((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const displayCategories = showAll.categories
    ? categories
    : categories.slice(0, 8);
  const displayBands = showAll.brand ? brands : brands.slice(0, 8);
  const searchQuery = "";
  return (
    <div className="flex gap-2">
      <div className="basis-1/5 flex flex-col gap-4 px-10 py-5 shadow-2xl">
        <h4 className="text-xl font-medium text-slate-800">Filters</h4>

        {/* price */}
        <div>
          <div className="text-lg text-slate-700 border-b-2 mb-2">Price</div>
          <div className="flex items-center gap-1">
            <input
              type="number"
              placeholder="Min"
              className="border border-gray-400 p-1 w-20 outline-none rounded-lg text-sm"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              className="border border-gray-400 p-1 w-20 outline-none rounded-lg text-sm"
            />
            <button className="bg-violet-800 text-slate-50 text-xs px-4 py-2 rounded-lg  ">
              Apply
            </button>
          </div>
        </div>

        {/* category */}
        <div>
          <div className="text-lg text-slate-700 border-b-2 mb-2">Category</div>
          {/* <hr /> */}
          <ul className="text-slate-600 ">
            {displayCategories.map((category, idx) => (
              <li key={idx}>
                <Link to="#" className="hover:text-violet-600">
                  {category}
                </Link>
              </li>
            ))}
            {categories.length > 8 && (
              <button
                onClick={() => toggleShowAll("categories")}
                className="text-violet-700"
              >
                {showAll.categories ? "- Show Less" : "+ Show More"}
              </button>
            )}
          </ul>
        </div>

        {/* brand */}
        <div>
          <div className="text-lg text-slate-700 border-b-2 mb-2">Brand</div>
          <ul className="text-slate-600 ">
            {displayBands.map((brand, idx) => (
              <li key={idx}>
                <label className="flex gap-2 items-center accent-violet-600 cursor-pointer hover:text-violet-600">
                  <input type="checkbox" name={brand} value={brand} />
                  <span>{brand}</span>
                </label>
              </li>
            ))}
            {brands.length > 8 && (
              <button
                onClick={() => toggleShowAll("brand")}
                className="text-violet-700"
              >
                {showAll.categories ? "- Show Less" : "+ Show More"}
              </button>
            )}
          </ul>
        </div>

        {/* Rating */}
        <div>
          <div className="text-lg text-slate-700 border-b-2 mb-2">Rating</div>
          <ul className="text-slate-600 flex flex-col gap-1">
            {Array.from({ length: 5 }, (_, idx) => {
              const fullStars = 5 - idx;
              const hollowStars = idx;
              return (
                <li key={idx}>
                  <label className="flex gap-2 items-center accent-violet-600 cursor-pointer">
                    <input type="radio" name="rating" value={fullStars} />
                    <div className="flex items-center">
                      <span className="text-sm">{"⭐️".repeat(fullStars)}</span>
                      <span className="text-xl">{"☆".repeat(hollowStars)}</span>
                      <span className="text-sm font-medium ml-1">
                        {fullStars}
                        {fullStars < 5 && "+"}
                      </span>
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="basis-4/5 p-5">
        <div className="pb-2 border-b flex justify-between">
          <div className="flex gap-3 items-center">
            <span className="text-slate-600">
              {searchQuery
                ? "Showing results for " + `"${searchQuery}"`
                : "All Products"}
            </span>
          </div>
          <div className="flex items-center gap-2 ">
            <span>Sort By:</span>
            <select
              name=""
              className="p-2 rounded-xl border border-gray-400 bg-gray-50 outline-none cursor-pointer"
            >
              <option value="">Newest</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
              <option value="ratingAsc">Rating: Low to high</option>
              <option value="ratingDesc">Rating: High to Low</option>
            </select>
          </div>
        </div>
        <div className="grid py-5 grid-cols-4 gap-10">
          {Array.from({ length: 16 }).map((_, idx) => (
            <Link key={idx} to={`/products/${idx}`}>
              <ProductCard
                imgUrl="https://source.unsplash.com/random/300X300"
                name="Product name and shit it is "
                price={1500}
                crossPrice={2000}
                rating={4.5}
                ratingCount={5}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
