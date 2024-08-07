import { Link } from "react-router-dom";
import { LayoutGrid, Zap } from "lucide-react";
import { Footer, Header, ProductCard } from "../components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";

function Home() {
  const totalCategories = [
    {
      albumId: 1,
      id: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952",
    },
    {
      albumId: 1,
      id: 2,
      title: "reprehenderit est deserunt velit ipsam",
      url: "https://via.placeholder.com/600/771796",
      thumbnailUrl: "https://via.placeholder.com/150/771796",
    },
    {
      albumId: 1,
      id: 3,
      title: "officia porro iure quia iusto qui ipsa ut modi",
      url: "https://via.placeholder.com/600/24f355",
      thumbnailUrl: "https://via.placeholder.com/150/24f355",
    },
    {
      albumId: 1,
      id: 4,
      title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      url: "https://via.placeholder.com/600/d32776",
      thumbnailUrl: "https://via.placeholder.com/150/d32776",
    },
    {
      albumId: 1,
      id: 5,
      title: "natus nisi omnis corporis facere molestiae rerum in",
      url: "https://via.placeholder.com/600/f66b97",
      thumbnailUrl: "https://via.placeholder.com/150/f66b97",
    },
    {
      albumId: 1,
      id: 6,
      title: "accusamus ea aliquid et amet sequi nemo",
      url: "https://via.placeholder.com/600/56a8c2",
      thumbnailUrl: "https://via.placeholder.com/150/56a8c2",
    },
    {
      albumId: 1,
      id: 7,
      title: "officia delectus consequatur vero aut veniam explicabo molestias",
      url: "https://via.placeholder.com/600/b0f7cc",
      thumbnailUrl: "https://via.placeholder.com/150/b0f7cc",
    },
    {
      albumId: 1,
      id: 8,
      title: "aut porro officiis laborum odit ea laudantium corporis",
      url: "https://via.placeholder.com/600/54176f",
      thumbnailUrl: "https://via.placeholder.com/150/54176f",
    },
    {
      albumId: 1,
      id: 9,
      title: "qui eius qui autem sed",
      url: "https://via.placeholder.com/600/51aa97",
      thumbnailUrl: "https://via.placeholder.com/150/51aa97",
    },
    {
      albumId: 1,
      id: 10,
      title: "beatae et provident et ut vel",
      url: "https://via.placeholder.com/600/810b14",
      thumbnailUrl: "https://via.placeholder.com/150/810b14",
    },
    {
      albumId: 1,
      id: 11,
      title: "nihil at amet non hic quia qui",
      url: "https://via.placeholder.com/600/1ee8a4",
      thumbnailUrl: "https://via.placeholder.com/150/1ee8a4",
    },
    {
      albumId: 1,
      id: 12,
      title:
        "mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
      url: "https://via.placeholder.com/600/66b7d2",
      thumbnailUrl: "https://via.placeholder.com/150/66b7d2",
    },
    {
      albumId: 1,
      id: 13,
      title: "repudiandae iusto deleniti rerum",
      url: "https://via.placeholder.com/600/197d29",
      thumbnailUrl: "https://via.placeholder.com/150/197d29",
    },
    {
      albumId: 1,
      id: 14,
      title: "est necessitatibus architecto ut laborum",
      url: "https://via.placeholder.com/600/61a65",
      thumbnailUrl: "https://via.placeholder.com/150/61a65",
    },
    {
      albumId: 1,
      id: 15,
      title: "harum dicta similique quis dolore earum ex qui",
      url: "https://via.placeholder.com/600/f9cee5",
      thumbnailUrl: "https://via.placeholder.com/150/f9cee5",
    },
    {
      albumId: 1,
      id: 16,
      title:
        "iusto sunt nobis quasi veritatis quas expedita voluptatum deserunt",
      url: "https://via.placeholder.com/600/fdf73e",
      thumbnailUrl: "https://via.placeholder.com/150/fdf73e",
    },
    {
      albumId: 1,
      id: 17,
      title: "natus doloribus necessitatibus ipsa",
      url: "https://via.placeholder.com/600/9c184f",
      thumbnailUrl: "https://via.placeholder.com/150/9c184f",
    },
    {
      albumId: 1,
      id: 18,
      title: "laboriosam odit nam necessitatibus et illum dolores reiciendis",
      url: "https://via.placeholder.com/600/1fe46f",
      thumbnailUrl: "https://via.placeholder.com/150/1fe46f",
    },
    {
      albumId: 1,
      id: 19,
      title: "perferendis nesciunt eveniet et optio a",
      url: "https://via.placeholder.com/600/56acb2",
      thumbnailUrl: "https://via.placeholder.com/150/56acb2",
    },
    {
      albumId: 1,
      id: 20,
      title:
        "assumenda voluptatem laboriosam enim consequatur veniam placeat reiciendis error",
      url: "https://via.placeholder.com/600/8985dc",
      thumbnailUrl: "https://via.placeholder.com/150/8985dc",
    },
  ];

  let categories =
    totalCategories.length > 8 ? totalCategories.slice(0, 8) : totalCategories;

  const products = useSelector((state) => state.store.products);
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
      <div className="bg-gray-50 flex flex-wrap justify-center gap-2 lg:gap-14 px-1 py-4 lg:p-8">
        {categories.map((category) => (
          <Link to={`/products/${category.id}`} key={category.id}>
            <figure className="flex flex-col items-center">
              <div className="w-14 lg:w-20 rounded-full overflow-hidden ">
                <img
                  src={`${category.url}`}
                  alt={`${category.title}`}
                  className="w-full"
                />
              </div>
              <figcaption className="font-semibold text-xs lg:text-sm mt-2 text-slate-700 text-center text-wrap line-clamp-2">
                {`Category${category.id}`}
              </figcaption>
            </figure>
          </Link>
        ))}

        {totalCategories.length > 8 && (
          <Link to="/products">
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
      <div className="bg-gray-100 px-2 py-4 lg:px-16 lg:py-10 flex flex-col gap-3 lg:gap-8">
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

        <Carousel
          className="p-2 z-40"
          swipeable
          draggable={false}
          removeArrowOnDeviceType={["mobile"]}
          responsive={{
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 5,
              slidesToSlide: 4,
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 4.5,
              slidesToSlide: 4,
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 2.2,
              slidesToSlide: 5,
            },
          }}
        >
          {/* {Array.from({ length: 15 }).map((_, idx) => (
            <Link key={idx} to={`/products/${idx}`}>
              <ProductCard
                imgUrl="https://via.placeholder.com/150/92c952"
                name="Product name and shit it is what it is fdgfsdg fdgfd gf d"
                price={1500}
                crossPrice={2000}
                rating={4.5}
                ratingCount={5}
              />
            </Link>
          ))} */}
          {products.map((product) => (
            <Link key={product._id} to={`/products/${product.slug}`}>
              <ProductCard
                imgUrl={product.variants[0].images[0].imageUrl}
                name={product.title}
                price={product.variants[0].price}
                crossPrice={product.variants[0]?.crossPrice}
                rating={product.ratings[0]?.value || 0}
                ratingCount={5}
              />
            </Link>
          ))}
        </Carousel>
      </div>

      {/* latest products */}
      <section className="px-2 py-4 lg:px-16 lg:py-10 flex flex-col gap-1 lg:gap-8">
        <h3 className="text-xl lg:text-3xl text-slate-800 font-semibold text-start p-3 lg:p-0">
          Latest Products
        </h3>

        <div className="grid gap-y-5 lg:gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 justify-items-center ">
          {Array.from({ length: 10 }).map((_, i) => (
            <Link to={"/products/123"} key={i}>
              <ProductCard
                imgUrl="https://via.placeholder.com/150/92c952"
                name="Product name and shit it is what it is fdgfsdg fdgfd gf d"
                price={1500}
                crossPrice={2000}
                rating={4.5}
                ratingCount={5}
              />
            </Link>
          ))}
        </div>
      </section>

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
