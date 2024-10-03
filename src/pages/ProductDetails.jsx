import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
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

function ProductDetails() {
  const location = useLocation();
  const dispatch = useDispatch();
  const breadList = location.pathname.split("/").filter((data) => data);

  const [product, setProduct] = useState({
    id: Date.now(),
    name: "Jordan nike air 150",
    images: [
      {
        url: "https://fastly.picsum.photos/id/866/1280/720.jpg?hmac=kfyiYNokOFMcfgqjn74ycjuYX5nBOtmyoVYS7JXvweM",
        name: "product",
      },
      {
        url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "product",
      },
      {
        url: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "product",
      },
      {
        url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "product",
      },
    ],
    colors: ["red", "blue", "green", "orange"],
    sizes: ["sm", "m", "lg", "xl", "2xl"],
    stockQty: 10,
    rating: 2.5,
    price: 1300,
    crossedPrice: 1500,
  });

  const [selectedImage, setSelectedImage] = useState(product.images[0].url);
  const [cartSelect, setCartSelect] = useState({
    id: Date.now(),
    name: product.name,
    img: product.images[0].url,
    color: product.colors[0],
    size: product.sizes[1],
    selectedQty: 1,
    stockQty: product.stockQty,
    price: product.price,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageClick = (e) => {
    setSelectedImage(e.target.src);
  };

  const handleCartSelectChange = (e) => {
    const value =
      e.target.name === "selectedQty"
        ? parseInt(e.target.value)
        : e.target.value;
    setCartSelect({ ...cartSelect, [e.target.name]: value });
  };

  const handleAddtoCart = () => {
    dispatch(addToCart(cartSelect));
    dispatch(toggleCart(true));
  };

  return (
    <>
      <Header />
      <main className="flex flex-col gap-4 px-2 lg:px-16 py-2 lg:py-5 text-sm lg:text-base">
        {/* breadcrumbs */}
        <nav className="flex items-center">
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
          <div className="text-gray-400 cursor-default">
            &nbsp; &gt; &nbsp;
            {product.name}
          </div>
        </nav>

        <section className="flex gap-3 lg:gap-5 flex-col lg:flex-row">
          <div className="basis-1/2">
            <div className=" h-52 md:h-72 lg:h-96 rounded-lg overflow-hidden ">
              <img
                src={selectedImage}
                alt="Product image"
                className="h-full w-full object-contain object-center"
              />
            </div>
            <div className=" flex gap-2 lg:gap-5 mt-2 overflow-x-auto lg:p-2 scrollbar-none lg:scrollbar-show">
              {product.images.map((image, idx) => (
                <img
                  src={image.url}
                  key={idx}
                  alt="product image list"
                  className={`w-14 h-14 lg:w-24 lg:h-24 object-cover rounded cursor-pointer  ${
                    selectedImage === image.url
                      ? "border-violet-500 border-[3px]"
                      : "border-transparent"
                  } `}
                  onClick={handleImageClick}
                />
              ))}
            </div>
          </div>

          <div className="basis-1/2 p-1 lg:p-2 pt-0 flex flex-col">
            <h1 className="text-slate-700 text-xl lg:text-2xl font-medium line-clamp-4 tracking-tighter lg:tracking-tight leading-tight md:leading-snug">
              {product.name}
            </h1>
            {/* rating */}
            <div className="flex pt-1 gap-1 items-center">
              <StarRating rating={product.rating} />
              <span className="text-slate-600 font-medium text-sm lg:text-lg">
                {product.rating}
              </span>
            </div>
            {/* price */}
            <div className="flex items-end gap-2 py-2">
              <data
                value={product.price}
                className="text-lg lg:text-2xl font-semibold text-slate-700"
              >
                {currencyFormat(product.price)}
              </data>
              <data value="2000" className="line-through opacity-50">
                {currencyFormat(product.crossedPrice)}
              </data>
              <span className="font-medium text-slate-600">
                {Math.ceil(
                  ((product.crossedPrice - product.price) * 100) /
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
                <div className="flex gap-2 lg:gap-4 overflow-x-auto flex-wrap p-1 lg:p-2">
                  {product.colors.map((color) => (
                    <label
                      className={`px-3 py-1 border border-slate-300 rounded-2xl bg-gray-100 cursor-pointer ${
                        color === cartSelect.color &&
                        "outline outline-violet-500 outline-2"
                      }`}
                      key={color}
                    >
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        className="hidden"
                        onChange={handleCartSelectChange}
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
                <div className="flex gap-2 lg:gap-4 overflow-x-auto p-1 lg:p-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <label
                      className={`px-3 py-1 border border-slate-300 rounded-2xl bg-gray-100 cursor-pointer ${
                        size === cartSelect.size &&
                        "outline outline-violet-500 outline-2"
                      }`}
                      key={size}
                    >
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        className="hidden"
                        onChange={handleCartSelectChange}
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

              {product.stockQty > 0 ? (
                <select
                  name="selectedQty"
                  value={cartSelect.quantity}
                  onChange={handleCartSelectChange}
                  className="px-3 border border-gray-300 rounded-lg bg-gray-100 outline-violet-500 font-medium text-slate-700 cursor-pointer"
                >
                  {Array.from(
                    { length: product.stockQty > 5 ? 5 : product.stockQty },
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
                onClick={handleAddtoCart}
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
            Product Details
          </summary>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            et accusantium quae pariatur qui vel ipsam. Exercitationem,
            consectetur, molestias esse porro sapiente accusamus earum iure
            nesciunt dolorem dolores enim distinctio ut animi. Officia odio ad
            unde minus sed delectus laborum alias nostrum explicabo tempora
            maiores ut inventore, minima asperiores? Neque? Lorem ipsum, dolor
            sit amet consectetur adipisicing elit. Earum quibusdam accusantium
            ex nemo? Laudantium, assumenda voluptates optio repellat voluptatum
            neque quis omnis laboriosam voluptatibus totam dolore voluptas
            expedita corrupti eos repellendus nostrum error nemo minima aut
            porro adipisci sit! A, voluptates. Laboriosam possimus ad vel,
            perferendis enim reprehenderit dignissimos doloremque. At
            repudiandae ipsa, sit modi ullam distinctio fugiat maiores nihil,
            tempora optio perspiciatis a corrupti illo est! Fugiat, sunt.
            Debitis neque corporis soluta consequatur nam exercitationem
            sapiente, accusantium est enim ullam alias doloremque atque deserunt
            nostrum provident nulla quae illum dignissimos totam recusandae
            laborum et deleniti! Iure eius facilis laboriosam
          </div>
        </details>

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
              {Array.from({ length: 7 }).map((_, idx) => (
                <SwiperSlide key={idx}>
                  <Link to={`/products/${idx}`}>
                    <ProductCard
                      imgUrl="https://via.placeholder.com/150/92c952"
                      name="Product name and shit it is what it is fdgfsdg fdgfd gf d"
                      price={1500}
                      crossPrice={2000}
                      rating={4.5}
                      ratingCount={5}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ProductDetails;
