import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { StarRating } from "../components";

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
  ];

  const [selectedImage, setSelectedImage] = useState(images[0].url);

  const handleImageClick = (e) => {
    setSelectedImage(e.target.src);
  };
  return (
    <main className="p-10 pt-3">
      {/* breadcrumbs */}
      <nav className="mb-5 flex">
        <Link className="hover:text-gray-400" to="/">
          Home
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

      <section className="flex gap-5">
        <div className="basis-1/2 ">
          <div className="h-96 rounded-lg overflow-hidden">
            <img
              src={selectedImage}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className=" flex gap-5 mt-2 overflow-x-auto p-2 scrollBar">
            {images.map((image, idx) => (
              <img
                src={image.url}
                key={idx}
                alt=""
                className={`w-24 h-24 object-cover rounded cursor-pointer  ${
                  selectedImage === image.url
                    ? "border-gray-400 border-[5px]"
                    : "border-transparent"
                } `}
                onClick={handleImageClick}
              />
            ))}
          </div>
        </div>
        <div className="basis-1/2 p-2 pt-0">
          <h1 className="text-2xl font-medium line-clamp-2">
            Jordan High red Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Veritatis illo cumque quaerat voluptas eos harum expedita
            reprehenderit nesciunt nam ratione.
          </h1>
          <div className="flex items-start pt-1 gap-1">
            <StarRating rating={4.5} size={25} />
            <span className="text-slate-600 font-medium text-lg">4.5</span>
          </div>
          <div className="flex items-end gap-2">
            <data value={1500} className="text-xl font-semibold text-slate-600">
              Rs 1500
            </data>
            <data value="2000" className="line-through opacity-50">
              Rs 2000
            </data>
            <span className="font-medium text-slate-600">20% off</span>
          </div>
          <div>
            <span>Color</span>
            <div>
              <span>Red</span>
              <span>Green</span>
              <span>Blue</span>
              <span>Red</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
