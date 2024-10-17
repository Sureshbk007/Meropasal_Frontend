import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Drawer, Footer, Header, ProductCard } from "../components";
import { SlidersHorizontal } from "lucide-react";
import { createPortal } from "react-dom";
import { getAllProducts } from "../api";
import calculateProgress from "../utils/calculateProgress";
import { setProgress } from "../store/slices/progressSlice";
import { useDispatch } from "react-redux";

function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarFilterOpen, setIsSidebarFilterOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    minPrice: "",
    maxPrice: "",
    rating: "",
    sortBy: "",
  });
  const [showAll, setShowAll] = useState({
    categories: false,
    brands: false,
  });

  const categories = useMemo(
    () => [...new Set(products.map((prod) => prod.category.name))],
    [products]
  );
  const brands = useMemo(
    () => [...new Set(products.map((prod) => prod.brand))],
    [products]
  );

  const limitCategories = showAll.categories
    ? categories
    : categories.slice(0, 8);
  const limitBrands = showAll.brands ? brands : brands.slice(0, 8);

  const searchParam = new URLSearchParams(location.search);
  const searchQuery = searchParam.get("q");

  useEffect(() => {
    scrollTo(0, 0);
    (async () => {
      try {
        const [response] = await calculateProgress(
          [getAllProducts(`${location.search}`)],
          (value) => dispatch(setProgress(value))
        );
        setProducts(response.data.data);
      } catch (error) {
        console.log("Failed to load products", error.message);
      }
    })();
  }, [location.search]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => {
      if (type === "checkbox") {
        const newValues = checked
          ? [...prevFilters[name], value]
          : prevFilters[name].filter((item) => item !== value);
        return { ...prevFilters, [name]: newValues };
      }
      return { ...prevFilters, [name]: value };
    });
  };

  const applyFilters = () => {
    const params = new URLSearchParams(location.search);

    if (filters.category.length > 0) {
      const existingCategories = params.getAll("category");
      filters.category.forEach((cat) => {
        if (!existingCategories.includes(cat)) {
          params.append("category", cat);
        }
      });
    } else {
      params.delete("category");
    }

    if (filters.brand.length > 0) {
      const existingBrands = params.getAll("brand");
      filters.brand.forEach((br) => {
        if (!existingBrands.includes(br)) {
          params.append("brand", br);
        }
      });
    } else {
      params.delete("brand");
    }

    if (filters.minPrice) {
      params.set("minPrice", filters.minPrice);
    } else {
      params.delete("minPrice");
    }

    if (filters.maxPrice) {
      params.set("maxPrice", filters.maxPrice);
    } else {
      params.delete("maxPrice");
    }

    if (filters.rating) {
      params.set("rating", filters.rating);
    } else {
      params.delete("rating");
    }

    if (filters.sortBy) {
      params.set("sortBy", filters.sortBy);
    } else {
      params.delete("sortBy");
    }

    navigate({ search: params.toString() });
  };

  useEffect(() => {
    if (filters.sortBy) {
      applyFilters();
    }
  }, [filters.sortBy]);

  const handleSortingChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const resetFilters = () => {
    const params = new URLSearchParams(location.search);

    const searchQuery = params.get("q");

    params.delete("category");
    params.delete("brand");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("rating");
    params.delete("sortBy");

    if (searchQuery) {
      params.set("q", searchQuery);
    }

    setFilters({
      category: [],
      brand: [],
      minPrice: "",
      maxPrice: "",
      rating: "",
      sortBy: "",
    });

    navigate({ search: params.toString() });
  };

  return (
    <>
      <Header />

      <div className="flex gap-2">
        <div className="hidden xl:basis-1/5 lg:flex flex-col gap-4 px-10 py-5 shadow-2xl">
          <h4 className="text-xl font-medium text-slate-800">Filters</h4>

          {/* price */}
          <div>
            <div className="text-lg text-slate-700 border-b-2 mb-2">Price</div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                name="minPrice"
                placeholder="min"
                min="0"
                value={filters.minPrice}
                className="border border-gray-400 p-1 w-20 outline-none rounded-lg text-sm"
                onChange={handleFilterChange}
              />
              <span>-</span>
              <input
                type="number"
                name="maxPrice"
                placeholder="max"
                min="0"
                value={filters.maxPrice}
                className="border border-gray-400 p-1 w-20 outline-none rounded-lg text-sm"
                onChange={handleFilterChange}
              />
            </div>
          </div>

          {/* categories */}
          {categories.length > 0 && (
            <div>
              <div className="text-lg text-slate-700 border-b-2 mb-2">
                Category
              </div>
              <ul className="text-slate-600 ">
                {limitCategories.map((category, idx) => (
                  <li key={idx}>
                    <label className="flex gap-2 items-center accent-violet-600 cursor-pointer hover:text-violet-600">
                      <input
                        type="checkbox"
                        name="category"
                        value={category}
                        checked={filters.category.includes(category)}
                        onChange={handleFilterChange}
                      />
                      <span>{category}</span>
                    </label>
                  </li>
                ))}
                {categories.length > 8 && (
                  <button
                    onClick={() =>
                      setShowAll((prev) => ({
                        ...prev,
                        categories: !prev.categories,
                      }))
                    }
                    className="text-violet-700"
                  >
                    {showAll.categories ? "- Show Less" : "+ Show More"}
                  </button>
                )}
              </ul>
            </div>
          )}

          {/* brand */}
          {brands.length > 0 && (
            <div>
              <div className="text-lg text-slate-700 border-b-2 mb-2">
                Brand
              </div>
              <ul className="text-slate-600 ">
                {limitBrands.map((brand) => (
                  <li key={brand}>
                    <label className="flex gap-2 items-center accent-violet-600 cursor-pointer hover:text-violet-600">
                      <input
                        type="checkbox"
                        name="brand"
                        value={brand}
                        checked={filters.brand.includes(brand)}
                        onChange={handleFilterChange}
                      />
                      <span>{brand}</span>
                    </label>
                  </li>
                ))}
                {brands.length > 8 && (
                  <button
                    onClick={() =>
                      setShowAll((prev) => ({
                        ...prev,
                        brands: !prev.brands,
                      }))
                    }
                    className="text-violet-700"
                  >
                    {showAll.brands ? "- Show Less" : "+ Show More"}
                  </button>
                )}
              </ul>
            </div>
          )}

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
                      <input
                        type="radio"
                        name="rating"
                        value={fullStars}
                        checked={filters.rating === fullStars.toString()}
                        onChange={handleFilterChange}
                      />
                      <div className="flex items-center">
                        <span className="text-sm">
                          {"⭐️".repeat(fullStars)}
                        </span>
                        <span className="text-xl">
                          {"☆".repeat(hollowStars)}
                        </span>
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

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={resetFilters}
              className="bg-slate-500 text-slate-50 px-4 py-2 rounded-lg"
            >
              Reset
            </button>
            <button
              onClick={applyFilters}
              className="bg-violet-800 text-slate-50 px-4 py-2 rounded-lg text-nowrap"
            >
              Apply Filters
            </button>
          </div>
        </div>

        <div className="xl:basis-4/5 p-5  flex flex-col gap-3 w-full">
          <div className="pb-2 border-b flex justify-between flex-col lg:flex-row gap-2">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-slate-600 text-sm lg:text-base">
                {searchQuery
                  ? "Showing results for " + `"${searchQuery}"`
                  : "All Products"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <span className="text-sm lg:text-base">Sort By:</span>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleSortingChange}
                  className="text-sm lg:text-base p-1 lg:p-2 rounded-xl border border-gray-400 bg-gray-50 outline-none cursor-pointer"
                >
                  <option value="" className="text-xs lg:text-base">
                    Select
                  </option>
                  <option value="latest" className="text-xs lg:text-base">
                    Latest
                  </option>
                  <option
                    value="priceLowToHigh"
                    className="text-xs lg:text-base"
                  >
                    Price: Low to High
                  </option>
                  <option
                    value="priceHighToLow"
                    className="text-xs lg:text-base"
                  >
                    Price: High to Low
                  </option>
                </select>
              </div>
              <SlidersHorizontal
                className="lg:hidden h-5 text-slate-800 hover:text-slate-500 cursor-pointer"
                onClick={() => setIsSidebarFilterOpen(true)}
              />
            </div>
          </div>
          {products.length === 0 ? (
            <div className="text-center text-slate-600">No products found</div>
          ) : (
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 justify-items-center ">
              {products.map((item) => (
                <Link key={item._id} to={`/products/${item.slug}`}>
                  <ProductCard
                    imgUrl={item.images[0].imageUrl}
                    name={item.title}
                    price={item.sellingPrice}
                    crossPrice={item?.crossedPrice}
                    rating={item.rating}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* sidebar filters */}
      {createPortal(
        <Drawer
          isOpen={isSidebarFilterOpen}
          onClose={() => setIsSidebarFilterOpen(false)}
          side="left"
        >
          <div className=" flex flex-col gap-4 p-5 h-full overflow-y-auto scrollbar-none">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-medium text-slate-800">Filters</h4>
              <span
                className="text-slate-600 font-bold text-lg hover:text-slate-400 cursor-pointer"
                onClick={() => setIsSidebarFilterOpen(false)}
              >
                X
              </span>
            </div>

            {/* price */}
            <div>
              <div className="text-lg text-slate-700 border-b-2 mb-2">
                Price
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="min"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="border border-gray-400 p-1 w-20 outline-none rounded-lg text-sm"
                />
                <span>-</span>
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="max"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="border border-gray-400 p-1 w-20 outline-none rounded-lg text-sm"
                />
              </div>
            </div>

            {/* categories */}
            {categories.length > 0 && (
              <div>
                <div className="text-lg text-slate-700 border-b-2 mb-2">
                  Category
                </div>
                <ul className="text-slate-600 ">
                  {limitCategories.map((category, idx) => (
                    <li key={idx}>
                      <label className="flex gap-2 items-center accent-violet-600 cursor-pointer hover:text-violet-600">
                        <input
                          type="checkbox"
                          name="category"
                          value={category}
                          checked={filters.category.includes(category)}
                          onChange={handleFilterChange}
                        />
                        <span>{category}</span>
                      </label>
                    </li>
                  ))}
                  {categories.length > 8 && (
                    <button
                      onClick={() =>
                        setShowAll((prev) => ({
                          ...prev,
                          categories: ![prev.categories],
                        }))
                      }
                      className="text-violet-700"
                    >
                      {showAll.categories ? "- Show Less" : "+ Show More"}
                    </button>
                  )}
                </ul>
              </div>
            )}

            {/* brand */}
            {brands.length > 0 && (
              <div>
                <div className="text-lg text-slate-700 border-b-2 mb-2">
                  Brand
                </div>
                <ul className="text-slate-600 ">
                  {limitBrands.map((brand) => (
                    <li key={brand}>
                      <label className="flex gap-2 items-center accent-violet-600 cursor-pointer hover:text-violet-600">
                        <input
                          type="checkbox"
                          name="brand"
                          value={brand}
                          checked={filters.brand.includes(brand)}
                          onChange={handleFilterChange}
                        />
                        <span>{brand}</span>
                      </label>
                    </li>
                  ))}
                  {brands.length > 8 && (
                    <button
                      onClick={() =>
                        setShowAll((prev) => ({
                          ...prev,
                          brands: ![prev.brands],
                        }))
                      }
                      className="text-violet-700"
                    >
                      {showAll.brands ? "- Show Less" : "+ Show More"}
                    </button>
                  )}
                </ul>
              </div>
            )}

            {/* Rating */}
            <div>
              <div className="text-lg text-slate-700 border-b-2 mb-2">
                Rating
              </div>
              <ul className="text-slate-600 flex flex-col gap-1">
                {Array.from({ length: 5 }, (_, idx) => {
                  const fullStars = 5 - idx;
                  const hollowStars = idx;
                  return (
                    <li key={idx}>
                      <label className="flex gap-2 items-center accent-violet-600 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={fullStars}
                          checked={filters.rating === fullStars.toString()}
                          onChange={handleFilterChange}
                        />
                        <div className="flex items-center">
                          <span className="text-sm">
                            {"⭐️".repeat(fullStars)}
                          </span>
                          <span className="text-xl">
                            {"☆".repeat(hollowStars)}
                          </span>
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

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  resetFilters();
                  setIsSidebarFilterOpen(false);
                }}
                className="bg-slate-500 text-slate-50 px-4 py-2 rounded-lg"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  applyFilters();
                  setIsSidebarFilterOpen(false);
                }}
                className="bg-violet-800 text-slate-50 px-4 py-2 rounded-lg"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </Drawer>,
        document.body
      )}
      <Footer />
    </>
  );
}

export default Products;
