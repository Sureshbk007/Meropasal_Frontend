import React, { useEffect } from "react";
import { Footer, Header } from "../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Categories() {
  // const categories = [
  //   {
  //     id: 1,
  //     name: "accusamus beatae ad facilis cum similique qui sunt",
  //     img: "https://via.placeholder.com/600/92c952",
  //   },
  //   {
  //     id: 2,
  //     name: "reprehenderit est deserunt velit ipsam",
  //     img: "https://via.placeholder.com/600/771796",
  //   },
  //   {
  //     id: 3,
  //     name: "accusamus beatae ad facilis cum similique qui sunt",
  //     img: "https://via.placeholder.com/600/92c952",
  //   },
  //   {
  //     id: 4,
  //     name: "reprehenderit est deserunt velit ipsam",
  //     img: "https://via.placeholder.com/600/771796",
  //   },
  //   {
  //     id: 5,
  //     name: "accusamus beatae ad facilis cum similique qui sunt",
  //     img: "https://via.placeholder.com/600/92c952",
  //   },
  //   {
  //     id: 6,
  //     name: "reprehenderit est deserunt velit ipsam",
  //     img: "https://via.placeholder.com/600/771796",
  //   },
  //   {
  //     id: 7,
  //     name: "reprehenderit est deserunt velit ipsam",
  //     img: "https://via.placeholder.com/600/771796",
  //   },
  //   {
  //     id: 8,
  //     name: "accusamus beatae ad facilis cum similique qui sunt",
  //     img: "https://via.placeholder.com/600/92c952",
  //   },
  //   {
  //     id: 9,
  //     name: "reprehenderit est deserunt velit ipsam",
  //     img: "https://via.placeholder.com/600/771796",
  //   },
  // ];
  const categories = useSelector((state) => state.store.categories);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <div className="bg-gray-50 py-4 px-4 lg:px-16 min-h-screen">
        <h3 className="text-xl lg:text-3xl text-slate-800 font-semibold ">
          Categories
        </h3>
        <div className=" flex flex-wrap my-4 gap-2 lg:gap-14 ">
          {categories.map((category) => (
            <Link to={`/products?category=${category.id}`} key={category.id}>
              <figure className="flex flex-col items-center">
                <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-full overflow-hidden ">
                  <img
                    src={`${category.image}`}
                    alt={`${category.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="font-semibold text-xs lg:text-sm mt-2 text-slate-700 text-center text-wrap line-clamp-2">
                  {category.name}
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Categories;
