import { Link } from "react-router-dom";
import { LayoutGrid, Zap } from "lucide-react";
import { ProductCard } from "../components";

function Home() {
  return (
    <>
      {/* banners */}
      <div className="grid grid-cols-3 grid-rows-2 gap-5 p-5 h-[65vh] ">
        <div className="col-span-2 row-span-2 rounded-xl overflow-hidden shadow-2xl ">
          <img
            src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="rounded-xl overflow-hidden shadow-xl ">
          <img
            src="https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="rounded-xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* categories */}
      <div className="hidden md:grid grid-cols-9 p-8 ">
        {Array.from({ length: 8 }).map((_, id) => (
          <Link to={`/products/${id}`} key={id}>
            <figure className="flex flex-col items-center">
              <div className="w-20 border-2 rounded-full overflow-hidden ">
                <img
                  src="https://www.thispersondoesnotexist.com"
                  alt="haha"
                  className="w-full rounded-full"
                />
              </div>
              <figcaption className="font-semibold text-sm text-nowrap mt-2 text-slate-700 ">
                Shoes
              </figcaption>
            </figure>
          </Link>
        ))}

        <Link to="/products">
          <figure className="flex flex-col items-center">
            <div className="w-20 h-20 border-2 rounded-full overflow-hidden flex justify-center items-center ">
              <LayoutGrid
                fillOpacity={0.8}
                fill="gray"
                strokeWidth={0}
                size={40}
              />
            </div>
            <figcaption className="font-semibold text-sm text-nowrap mt-2 text-slate-700 ">
              All Category
            </figcaption>
          </figure>
        </Link>
      </div>

      {/* flash sale */}
      <div className="bg-gray-100 p-16 flex flex-col gap-8 " id="sale">
        <div className="flex gap-4 items-center">
          <Zap
            className="rounded-full bg-black"
            fill="white"
            size={40}
            strokeWidth={1.5}
          />
          <h3 className="text-3xl text-slate-800 font-semibold ">Flash Sale</h3>
        </div>

        <div className="overflow-x-auto flex gap-5 pb-3 scrollBar">
          {Array.from({ length: 15 }).map((val, index) => (
            <Link key={index} to={`/products/${index}`}>
              <ProductCard
                imgUrl="https://source.unsplash.com/random/300X300"
                name="Product name and shit it is what it is fdgfsdg fdgfd gf d"
                price={1500}
                crossPrice={2000}
                rating={4.5}
                ratingCount={5}
                className="flex-shrink-0"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* latest products */}
      <div className="p-16 flex flex-col  gap-8">
        <h3 className="text-3xl text-slate-800 font-semibold ">
          Latest Products
        </h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {Array.from({ length: 10 }).map((val, i) => (
            <Link to={"/products/123"} key={i}>
              <ProductCard
                imgUrl="https://source.unsplash.com/random/300X300"
                name="Product name and shit it is what it is fdgfsdg fdgfd gf d"
                price={1500}
                crossPrice={2000}
                rating={4.5}
                ratingCount={5}
                className="w-28"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="h-60 bg-red-500 flex justify-center items-center bg-[url('https://source.unsplash.com/random/')] bg-no-repeat bg-cover bg-center bg-opacity-10">
        <span className="text-3xl font-bold text-slate-100 italic drop-shadow-2xl">
          "Let's Shop Beyond Boundries"
        </span>
      </div>
    </>
  );
}

export default Home;
