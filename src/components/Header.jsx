import {
  ChevronDown,
  CircleUserRound,
  Home,
  MoveRight,
  Package,
  Search,
  ShoppingCart,
  Trash2,
  Truck,
  User,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Drawer from "./Drawer";
import { BrandLogoSvg } from "../assets/svg/";
function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const stockQty = 5;

  return (
    <>
      {/*navbar */}
      <div className="flex px-3 py-2 md:px-16 gap-3 items-center justify-between sticky top-0 z-50 bg-slate-50 text-xs sm:text-base border-b">
        <Link to="/">
          <img src={BrandLogoSvg} alt="brand name" />
        </Link>
        <form className="relative border-2 border-slate-300 rounded-lg w-full max-w-lg flex items-center">
          <input
            type="search"
            className="p-2 outline-none w-full bg-transparent text-slate-700"
            placeholder="Search..."
          />
          <button type="submit" className="mr-2">
            <Search color="gray" className="h-4 sm:h-auto" />
          </button>
          {/* search list */}
          <ul className="hidden absolute top-[45px] bg-gray-100 w-full border-2 rounded-lg overflow-hidden">
            <li className="p-2 hover:bg-gray-300 cursor-pointer">
              shoes for men
            </li>
            <li className="p-2 hover:bg-gray-300 cursor-pointer">
              shoes for men
            </li>
            <li className="p-2 hover:bg-gray-300 cursor-pointer">
              shoes for men
            </li>
            <li className="p-2 hover:bg-gray-300 cursor-pointer">
              shoes for men
            </li>
            <li className="p-2 hover:bg-gray-300 cursor-pointer">
              shoes for men
            </li>
          </ul>
        </form>

        <div className="flex gap-1 sm:gap-4 items-center relative ">
          <button
            className="relative cursor-pointer p-2 rounded-full hover:bg-violet-600 group"
            onClick={() => setDrawerOpen(true)}
          >
            <ShoppingCart className="h-5 sm:h-auto text-slate-700 group-hover:text-white" />
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-xl text-[10px] sm:text-sm text-center font-medium w-5"></span>
          </button>
          <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
            <div className="p-2 sm:p-6 flex flex-col justify-evenly sm:justify-between h-full ">
              <div className="flex items-center justify-between text-violet-700 pb-3 border-b-2 border-violet-300">
                <Truck className="h-8" />
                <MoveRight
                  onClick={() => setDrawerOpen(false)}
                  size={32}
                  strokeWidth={3}
                  className="p-1 text-xl rounded-lg hover:bg-violet-200 cursor-pointer h-8 sm:h-auto"
                />
              </div>
              <div className="basis-4/6 flex flex-col overflow-y-auto scrollbar-none ">
                {Array.from({ length: 10 }, (_, idx) => (
                  <div
                    className="flex justify-between items-center p-2 gap-2"
                    key={idx}
                  >
                    <div className="flex gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="product image"
                        className="h-16 w-16 md:w-24 object-cover object-center rounded"
                      />
                      <div className="flex flex-col justify-center">
                        <span className="line-clamp-1 text-slate-800 font-medium">
                          Nike Low Calf shoes
                        </span>
                        <span className="text-slate-500 text-sm">
                          Variant: red/lg
                        </span>
                      </div>
                    </div>
                    <div>
                      {stockQty > 0 ? (
                        <select
                          name="quantity"
                          className="px-3 border border-gray-300 rounded-lg bg-gray-100 outline-gray-500 font-medium text-slate-700 cursor-pointer text-xs'"
                        >
                          {Array.from(
                            { length: stockQty > 5 ? 5 : stockQty },
                            (_, idx) => (
                              <option
                                value={idx + 1}
                                key={idx}
                                className="font-medium text-slate-700"
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
                    <data value="" className="text-xs sm:text-sm font-medium">
                      Rs 25000
                    </data>
                    <Trash2
                      color="white"
                      size={28}
                      className="bg-red-500 p-1 rounded-full cursor-pointer h-7 sm:h-auto"
                    />
                  </div>
                ))}
              </div>

              <div className="basis-1/6 flex flex-col gap-5 border-t-2 border-violet-300 pt-1">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-800">Total</span>
                    <data>Rs 1500</data>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-800">
                      Shipping
                    </span>
                    <span className="text-sm text-slate-700">
                      Cost will appear on checkout
                    </span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="uppercase md:text-lg text-white font-bold bg-violet-800 w-full p-4 rounded-lg text-center hover:bg-violet-900"
                  onClick={() => setDrawerOpen(false)}
                >
                  checkout
                </Link>
              </div>
            </div>
          </Drawer>

          <div className="border rounded-full hover:bg-violet-600 group shadow bg-slate-200 relative">
            {isLoggedIn ? (
              <Link to="/dashboard" className="block w-7 sm:w-10 ">
                <img
                  src="https://www.thispersondoesnotexist.com"
                  alt="profile picture"
                  className="w-full object-cover rounded-full"
                />
              </Link>
            ) : (
              <Link to="/login" className="flex items-center sm:gap-2 p-2">
                <UserCircle className="hidden sm:block text-slate-700 group-hover:text-slate-50 h-4 sm:h-auto" />
                <span className="text-slate-700 font-medium group-hover:text-slate-50">
                  Login
                </span>
                <ChevronDown
                  size={16}
                  className="hidden sm:block group-hover:rotate-180 group-hover:text-slate-50 transition-transform duration-300 drop-shadow"
                />
              </Link>
            )}

            <div className="bg-transparent absolute top-full left-0 right-0 h-2"></div>
            {/* Dropdown Menu */}
            <ul className="invisible sm:flex flex-col absolute top-full right-0 mt-2 bg-slate-50 border rounded-lg group-hover:visible group-hover:opacity-100 opacity-0 transition-opacity duration-500 z-10 w-max">
              <li className="font-medium  flex items-center gap-4 text-sm p-4">
                <span className="cursor-default">New customer? </span>
                <Link to="signup" className="text-violet-700">
                  Signup
                </Link>
              </li>
              <li className="p-3 hover:bg-slate-200 rounded-lg text-sm">
                <Link to="/user" className="flex items-center gap-2">
                  <User size={18} />
                  My Profile
                </Link>
              </li>
              <li className="p-3  hover:bg-slate-200 rounded-lg text-sm">
                <Link to="/user/orders" className="flex items-center gap-2">
                  <Package size={18} />
                  Orders
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
