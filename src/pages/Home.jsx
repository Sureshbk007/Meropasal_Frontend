import { Link } from "react-router-dom";
import {
  CircleChevronLeft,
  CircleChevronRight,
  LayoutGrid,
  Zap,
} from "lucide-react";
import { Footer, Header, ProductCard } from "../components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { getHomePageData } from "../api";

function Home() {
  const [homeData, setHomeData] = useState({
    categories: [],
    flashSaleProducts: [],
    latestProducts: [],
  });
  useEffect(() => {
    (async () => {
      try {
        const response = await getHomePageData();
        setHomeData((prev) => ({
          ...prev,
          categories: response.data.data.categories || [],
          flashSaleProducts: response.data.data.saleProducts || [],
          latestProducts: response.data.data.latestProducts || [],
        }));
      } catch (error) {
        console.log("failed to fetch data");
      }
    })();
  }, []);

  let limitedCategories =
    homeData.categories.length > 8
      ? homeData.categories.slice(0, 8)
      : homeData.categories;
  return (
    <>
      <Header />
      {/* banners */}
      <div className="grid sm:grid-cols-3 lg:grid-rows-2 gap-2 p-2 max-h-[65vh] ">
        <div className="col-span-2 row-span-2 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://plus.unsplash.com/premium_photo-1677995700941-100976883af7?q=80&w=1523&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://plus.unsplash.com/premium_photo-1661585773166-e9423e96b2f3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* categories */}
      <div className="bg-gray-50 flex flex-wrap justify-center gap-2 lg:gap-14 px-1 py-4 lg:p-8 ">
        {limitedCategories.length > 0
          ? limitedCategories.map((category) => (
              <Link
                to={`/products?category=${category.name}`}
                key={category._id}
              >
                <figure className="flex flex-col items-center">
                  <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-full overflow-hidden bg-red-500  ">
                    <img
                      src={`${category.image?.imageUrl || ""}`}
                      alt={`${category.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="font-semibold text-xs lg:text-sm mt-2 text-slate-700 text-center text-wrap line-clamp-2">
                    {category.name}
                  </figcaption>
                </figure>
              </Link>
            ))
          : "loading..."}

        {homeData.categories.length > 8 && (
          <Link to="/categories" onClick={() => scrollTo(0, 0)}>
            <figure className="flex flex-col items-center">
              <div className="w-14 lg:w-20 aspect-square border-2 rounded-full overflow-hidden flex justify-center items-center ">
                <LayoutGrid
                  fillOpacity={0.5}
                  fill="gray"
                  strokeWidth={0}
                  size={30}
                />
              </div>
              <figcaption className="font-semibold text-xs lg:text-sm text-nowrap mt-2 text-slate-700 ">
                All Category
              </figcaption>
            </figure>
          </Link>
        )}
      </div>

      {/* flash sale */}
      {homeData.flashSaleProducts.length > 0 && (
        <div className="bg-gray-100 px-2 py-4 lg:px-16 lg:py-10 flex flex-col gap-3 lg:gap-8">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 lg:gap-4 items-center">
              <Zap
                fill="white"
                strokeWidth={1.5}
                className="rounded-full bg-black w-8 h-8 lg:w-10 lg:h-10"
              />
              <h3 className="text-xl lg:text-3xl text-slate-800 font-semibold ">
                Flash Sale
              </h3>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <CircleChevronLeft
                  className="custom-prev text-slate-800 cursor-pointer active:scale-90 transition-transform hover:scale-95"
                  size={35}
                />
              </div>
              <div>
                <CircleChevronRight
                  className="custom-next text-slate-800 cursor-pointer active:scale-90 transition-transform hover:scale-95"
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
              {homeData.flashSaleProducts.map((item, idx) => (
                <SwiperSlide key={item._id}>
                  <Link to={`/products/${item.slug}`}>
                    <ProductCard
                      imgUrl={item.images[0]?.imageUrl || ""}
                      name={item.title}
                      price={item.sellingPrice}
                      crossedPrice={item?.crossedPrice}
                      rating={item.rating}
                      ratingCount={5}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* latest products */}
      {homeData.latestProducts.length > 0 && (
        <section className="px-2 py-4 lg:px-16 lg:py-10 flex flex-col gap-1 lg:gap-8">
          <h3 className="text-xl lg:text-3xl text-slate-800 font-semibold text-start p-3 lg:p-0">
            Latest Products
          </h3>

          <div className="grid gap-y-5 lg:gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 justify-items-center ">
            {homeData.latestProducts.map((item) => (
              <Link to={`/products/${item.slug}`} key={item._id}>
                <ProductCard
                  imgUrl={item.images[0]?.imageUrl || ""}
                  name={item.title}
                  price={item.sellingPrice}
                  crossedPrice={item.crossedPrice}
                  rating={item.rating}
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="bannerGradient h-44 lg:h-60 flex justify-center items-center">
        <span className="text-xl lg:text-3xl font-bold text-slate-100 italic drop-shadow-2xl">
          "All You Need, Just a Click Away"
        </span>
      </div>

      <Footer />
    </>
  );
}

export default Home;
