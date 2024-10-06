import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Footer, Header, ProductCard, StarRating } from "../components";
import {
  CircleChevronLeft,
  CircleChevronRight,
  Home,
  ShoppingBag,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart, toggleCart } from "../store/slices/cartSlice";
import currencyFormat from "../utils/currencyFormat";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { getAllProducts, getProductDetails } from "../api";
import calculateProgress from "../utils/calculateProgress";
import { setProgress } from "../store/slices/progressSlice";

function ProductDetails() {
  const location = useLocation();
  const dispatch = useDispatch();
  const breadList = location.pathname.split("/").filter((data) => data);
  const [product, setProduct] = useState({
    _id: "",
    title: "",
    category: "",
    brand: "",
    description: "",
    sellingPrice: "",
    crossedPrice: "",
    isSale: "",
    stock: "",
    images: [],
    rating: "",
    sizes: [],
    colors: [],
    slug: "",
  });
  const [similarProducts, setSimilarProducts] = useState([]);
  const [currentLargeImage, setCurrentLargeImage] = useState("");
  const [cartSelect, setCartSelect] = useState({
    id: "",
    title: "",
    image: "",
    color: "",
    size: "",
    selectedQty: 1,
    stock: "",
    sellingPrice: "",
  });

  useEffect(() => {
    scrollTo(0, 0);
    (async () => {
      try {
        const [response] = await calculateProgress(
          [getProductDetails(breadList[1])],
          (value) => dispatch(setProgress(value))
        );
        const fetchedProduct = response.data.data;
        setProduct(fetchedProduct);
        setCartSelect({
          id: fetchedProduct._id,
          title: fetchedProduct.title,
          image: fetchedProduct.images[0]?.imageUrl || "",
          color: fetchedProduct.colors[0] || "",
          size: fetchedProduct.sizes[0] || "",
          selectedQty: 1,
          stock: fetchedProduct.stock,
          sellingPrice: fetchedProduct.sellingPrice,
        });

        setCurrentLargeImage(fetchedProduct.images[0].imageUrl);
        const similarProductsResponse = await getAllProducts(
          `?category=${fetchedProduct.category.name}`
        );
        const similarItems = similarProductsResponse.data.data.filter(
          (item) => item._id !== response.data.data._id
        );
        setSimilarProducts(similarItems);
      } catch (error) {
        console.log("Failed to fetch product details", error.message);
      }
    })();
  }, [breadList[1]]);

  const handleAddToCart = () => {
    dispatch(addToCart(cartSelect));
    dispatch(toggleCart(true));
  };

  const handleCartSelect = (e) => {
    const { name, value } = e.target;

    setCartSelect((prev) => ({
      ...prev,
      [name]: name === "selectedQty" ? Number(value) : value,
    }));
  };
  return (
    <>
      <Header />
      <main className="flex flex-col gap-4 px-2 lg:px-16 py-2 lg:py-5 text-sm lg:text-base">
        {/* breadcrumbs */}
        <nav className="flex items-center  whitespace-nowrap">
          <Link to="/">
            <Home size={20} className="text-slate-800 hover:text-gray-400" />
          </Link>
          {breadList.map((item, idx) => {
            if (!(idx === breadList.length - 1)) {
              return (
                <div key={idx}>
                  &nbsp; &gt; &nbsp;
                  <Link className="hover:text-gray-400" to="/products">
                    {item}
                  </Link>
                </div>
              );
            }
          })}
          <div className="text-gray-400 cursor-default line-clamp-1">
            &nbsp; &gt; &nbsp;
            {product.title}
          </div>
        </nav>

        <section className="flex gap-3 lg:gap-5 flex-col lg:flex-row">
          <div className="basis-1/2">
            <div className=" h-52 md:h-72 lg:h-96 rounded-lg overflow-hidden ">
              {product?.images && product.images.length > 0 && (
                <img
                  src={currentLargeImage}
                  alt={product.title}
                  className="h-full w-full object-contain object-center"
                />
              )}
            </div>
            <div className=" flex gap-2 lg:gap-5 mt-2 overflow-x-auto lg:p-2 scrollbar-none">
              {product.images.map((image, idx) => (
                <img
                  src={image.imageUrl}
                  key={idx}
                  alt={product.title}
                  className={`w-14 h-14 lg:w-24 lg:h-24 object-cover rounded cursor-pointer  ${
                    currentLargeImage === image.imageUrl
                      ? "border-violet-500 border-[3px]"
                      : "border-transparent"
                  } `}
                  onClick={() => setCurrentLargeImage(image.imageUrl)}
                />
              ))}
            </div>
          </div>

          <div className="basis-1/2 p-1 lg:p-2 pt-0 flex flex-col">
            <h1 className="text-slate-700 text-xl lg:text-2xl font-medium line-clamp-4 tracking-tighter lg:tracking-tight leading-tight md:leading-snug">
              {product.title}
            </h1>
            {/* rating */}
            <div className="flex pt-1 gap-1 items-center">
              <StarRating rating={product.rating} />
              <span className="text-slate-600 font-medium text-sm lg:text-lg">
                {product.rating === 0 ? (
                  <span className="text-brand text-sm ">No Ratings</span>
                ) : (
                  product.rating
                )}
              </span>
            </div>
            <div className="font-medium py-1 text-slate-500 ">
              Brand:
              <span className="pl-2 text-brand text-sm font-medium">
                {product.brand ? `${product.brand}` : "No Brand"}
              </span>
            </div>
            {/* price */}
            <div className="flex items-end gap-2 py-1">
              <data
                value={product.sellingPrice}
                className="text-lg lg:text-2xl font-semibold text-slate-700"
              >
                {currencyFormat(product.sellingPrice)}
              </data>
              <data value="2000" className="line-through opacity-50">
                {currencyFormat(product.crossedPrice)}
              </data>
              <span className="font-medium text-slate-600">
                {Math.ceil(
                  ((product.crossedPrice - product.sellingPrice) * 100) /
                    product.crossedPrice
                )}
                % off
              </span>
            </div>

            {/* colors */}
            {product.colors.length > 0 && (
              <div className="my-1 flex flex-col gap-1">
                <div className="lg:text-lg font-medium text-slate-500 lg:mb-1">
                  Color:
                  <span className="text-slate-700 font-medium ml-1 lg:ml-3">
                    {cartSelect.color}
                  </span>
                </div>
                <div className="flex gap-2 lg:gap-4 overflow-x-auto flex-wrap p-1">
                  {product.colors.map((color) => (
                    <label
                      className={`px-3 py-1 border border-slate-300 rounded-2xl bg-gray-100 cursor-pointer ${
                        cartSelect.color == color &&
                        "outline outline-violet-500 outline-2"
                      }`}
                      key={color}
                    >
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        className="hidden"
                        onChange={handleCartSelect}
                      />
                      <span className="text-xs lg:text-sm font-medium text-slate-800 ">
                        {color}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* size */}
            {product.sizes.length > 0 && (
              <div className="my-1 flex flex-col gap-1">
                <div className="lg:text-lg font-medium text-slate-500 mb-1">
                  Size:
                  <span className="text-slate-700 font-medium ml-1 lg:ml-3">
                    {cartSelect.size}
                  </span>
                </div>
                <div className="flex gap-2 lg:gap-4 overflow-x-auto p-1 flex-wrap">
                  {product.sizes.map((size) => (
                    <label
                      className={`px-3 py-1 border border-slate-300 rounded-2xl bg-gray-100 cursor-pointer ${
                        cartSelect.size == size &&
                        "outline outline-violet-500 outline-2"
                      }`}
                      key={size}
                    >
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        className="hidden"
                        onChange={handleCartSelect}
                      />
                      <span className="text-xs lg:text-sm font-medium text-slate-800 ">
                        {size}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex mt-2 lg:mt-4 items-center ">
              <span className="lg:text-lg font-medium text-slate-500 mr-2 lg:mr-5 ">
                Quantity:
              </span>

              {product?.stock > 0 ? (
                <select
                  name="selectedQty"
                  value={cartSelect.quantity}
                  onChange={handleCartSelect}
                  className="px-3 border border-gray-300 rounded-lg bg-gray-100 outline-violet-500 font-medium text-slate-700 cursor-pointer"
                >
                  {Array.from(
                    { length: Math.min(5, product.stock) },
                    (_, idx) => (
                      <option
                        value={idx + 1}
                        key={idx}
                        className="lg:font-medium text-slate-700"
                      >
                        {idx + 1}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <span className="text-white border bg-red-400 px-3 rounded-lg cursor-not-allowed">
                  Out of stock
                </span>
              )}
            </div>

            <div className="mt-4 lg:mt-8 font-medium">
              <button
                className="flex gap-2 justify-center items-center bg-violet-800 hover:bg-violet-900 text-white p-3 lg:p-5 rounded-xl w-full"
                onClick={handleAddToCart}
              >
                <ShoppingBag /> Add to Cart
              </button>
            </div>
          </div>
        </section>

        <details
          open
          className="text-sm lg:text-base cursor-pointer p-2 lg:p-5 bg-gray-100 rounded-lg outline-none"
        >
          <summary className="text-base lg:text-xl font-semibold text-slate-600 my-2 outline-none">
            Product Description
          </summary>
          <div>{product?.description}</div>
        </details>

        {similarProducts.length > 0 && (
          <div className="bg-gray-100 px-2 py-4 lg:px-5 lg:py-5 flex flex-col gap-3 lg:gap-8 rounded-lg">
            <div className="flex gap-2 lg:gap-4 items-center justify-between">
              <h3 className="text-xl lg:text-3xl text-slate-800 font-semibold ">
                Similar Products
              </h3>
              <div className="flex gap-2 items-center">
                <div>
                  <CircleChevronLeft
                    className="custom-prev text-slate-800 cursor-pointer active:scale-90 transition-transform"
                    size={35}
                  />
                </div>
                <div>
                  <CircleChevronRight
                    className="custom-next text-slate-800 cursor-pointer active:scale-90 transition-transform"
                    size={35}
                  />
                </div>
              </div>
            </div>
            <div>
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                navigation={{
                  prevEl: ".custom-prev",
                  nextEl: ".custom-next",
                }}
                className="mySwiper"
                modules={[Navigation]}
                breakpoints={{
                  0: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                  },
                  345: {
                    slidesPerView: 2.2,
                    spaceBetween: 10,
                  },
                  480: {
                    slidesPerView: 2.2,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  1025: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                  },
                }}
              >
                {similarProducts.map((item) => (
                  <SwiperSlide key={item._id}>
                    <Link to={`/products/${item.slug}`}>
                      <ProductCard
                        imgUrl={item.images[0]?.imageUrl}
                        name={item.title}
                        price={item.sellingPrice}
                        crossPrice={item.crossedPrice}
                        rating={item.rating}
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default ProductDetails;
