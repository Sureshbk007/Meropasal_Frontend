import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Footer, Header, ProductCard, StarRating } from "../components";
import { Home } from "lucide-react";

function ProductDetails() {
  const { slug } = useParams();
  const location = useLocation();
  const breadList = location.pathname.split("/").filter((data) => data);

  const images = [
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
    {
      url: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "product",
    },
    {
      url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
  ];

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const [selectedImage, setSelectedImage] = useState(images[0].url);
  const colors = ["red", "blue", "green", "orange"];
  const sizes = ["sm", "m", "lg", "xl", "2xl"];
  const stockQty = 10;
  const [cartSelect, setCartSelect] = useState({
    color: colors[0],
    size: sizes[1],
    quantity: 1,
  });

  const handleImageClick = (e) => {
    setSelectedImage(e.target.src);
  };

  const handleCartSelectChange = (e) => {
    setCartSelect({ ...cartSelect, [e.target.name]: e.target.value });
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
            {slug}
          </div>
        </nav>

        <section className="flex gap-3 lg:gap-5 flex-col lg:flex-row">
          <div className="basis-1/2">
            <div className=" h-52 md:h-72 lg:h-96 rounded-lg overflow-hidden border shadow-md bg-gray-100">
              <img
                src={selectedImage}
                alt="Product image"
                className="h-full w-full object-contain object-center"
              />
            </div>
            <div className=" flex gap-2 lg:gap-5 mt-2 overflow-x-auto lg:p-2 scrollBarHidden">
              {images.map((image, idx) => (
                <img
                  src={image.url}
                  key={idx}
                  alt=""
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

          <div className="basis-1/2 p-1 lg:p-2 pt-0 flex flex-col lg:gap-1 overflow-auto">
            <h1 className="text-xl lg:text-2xl font-medium line-clamp-4 tracking-tighter lg:tracking-tight leading-tight md:leading-snug">
              Jordan High red Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Veritatis illo cumque quaerat voluptas eos harum expedita
              reprehenderit nesciunt nam ratione.
            </h1>
            {/* rating */}
            <div className="flex pt-1 gap-1 items-center">
              <StarRating rating={4.5} />
              <span className="text-slate-600 font-medium text-sm lg:text-lg">
                4.5
              </span>
            </div>
            {/* price */}
            <div className="flex items-end gap-2 py-2">
              <data
                value={1500}
                className="text-xl lg:text-3xl font-semibold text-violet-700"
              >
                Rs 1500
              </data>
              <data value="2000" className="line-through opacity-50">
                Rs 2000
              </data>
              <span className="font-medium text-slate-600">20% off</span>
            </div>

            {/* colors */}
            {colors.length > 0 && (
              <div className="my-1 flex flex-col gap-1">
                <div className="lg:text-lg font-medium text-slate-500 lg:mb-1">
                  Color:
                  <span className="text-slate-700 font-medium ml-1 lg:ml-3">
                    {cartSelect.color}
                  </span>
                </div>
                <div className="flex gap-2 lg:gap-4 overflow-x-auto scrollBar p-1 lg:p-2">
                  {colors.map((color) => (
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
            {sizes.length > 0 && (
              <div className="my-1 flex flex-col gap-1">
                <div className="lg:text-lg font-medium text-slate-500 mb-1">
                  Size:
                  <span className="text-slate-700 font-medium ml-1 lg:ml-3">
                    {cartSelect.size}
                  </span>
                </div>
                <div className="flex gap-2 lg:gap-4 overflow-x-auto scrollBar p-1 lg:p-2">
                  {sizes.map((size) => (
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

              {stockQty > 0 ? (
                <select
                  name="quantity"
                  value={cartSelect.quantity}
                  onChange={handleCartSelectChange}
                  className="px-3 border border-gray-300 rounded-lg bg-gray-100 outline-violet-500 font-medium text-slate-700 cursor-pointer"
                >
                  {Array.from(
                    { length: stockQty > 5 ? 5 : stockQty },
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

            <div className="flex gap-4 mt-4 lg:mt-8 font-medium">
              <button className="border bg-blue-500 hover:bg-blue-700 text-white p-3 lg:p-4 basis-1/2 rounded-xl">
                Buy Now
              </button>
              <button className="bg-violet-800 hover:bg-violet-900 text-white p-3 lg:p-4 basis-1/2 rounded-xl">
                Add to Cart
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

        <div className="bg-gray-100 px-2 py-4 lg:px-5 lg:py-5 flex flex-col gap-3 lg:gap-8">
          <div className="flex gap-2 lg:gap-4 items-center">
            <h3 className="text-xl lg:text-3xl text-slate-800 font-semibold ">
              Similar Products
            </h3>
          </div>

          <div className="overflow-x-auto flex gap-1 lg:gap-5 pb-3 scrollBarHidden">
            {Array.from({ length: 15 }).map((_, idx) => (
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
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ProductDetails;
