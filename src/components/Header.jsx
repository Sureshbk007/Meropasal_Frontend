import {
  ChevronDown,
  CircleUserRound,
  Home,
  Package,
  Search,
  ShoppingCart,
  User,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      {/*navbar */}
      <div className="flex px-20 gap-16 items-center p-2  sticky top-0 z-50 bg-slate-50 border-b">
        <Link to="/">
          <div className="border p-2 bg-brand text-white rounded-xl">
            MeroPasal
          </div>
        </Link>
        <Link to="/">
          <Home strokeWidth={1.5} className="hover:opacity-50" />
        </Link>
        <form className="border-2 border-slate-300 rounded-lg px-2 w-full flex">
          <input
            type="search"
            className="p-2 outline-none w-full bg-transparent text-slate-700"
            placeholder="Search..."
          />
          <button type="submit" className="flex justify-center items-center ">
            <Search color="gray" />
          </button>
        </form>
        <div className="flex gap-6 items-center">
          <Link className="relative" to="#">
            <ShoppingCart color="#334155" />
            <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-xl text-sm text-center font-medium w-5">
              20
            </span>
          </Link>

          <Link to="login">
            <div className="border rounded-full hover:bg-violet-600 group shadow bg-slate-200 relative">
              {isLoggedIn ? (
                <div>
                  <img
                    src="https://www.thispersondoesnotexist.com"
                    alt="profile picture"
                    className="w-20 object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 p-2">
                  <UserCircle className="text-slate-700 group-hover:text-slate-50" />
                  <span className="text-slate-700 font-medium group-hover:text-slate-50">
                    Login
                  </span>
                  <ChevronDown
                    size={16}
                    className="group-hover:rotate-180 group-hover:text-slate-50 transition-transform duration-300 drop-shadow"
                  />
                </div>
              )}

              <div className="bg-transparent absolute top-full left-0 right-0 h-2"></div>
              {/* Dropdown Menu */}
              <ul className="absolute top-full right-0 mt-2 bg-slate-50 border rounded-lg flex flex-col invisible group-hover:visible group-hover:opacity-100 opacity-0 transition-opacity duration-300 z-10 w-max">
                <li className="font-medium  flex items-center gap-4 text-sm p-4">
                  <span className="cursor-default">New customer? </span>
                  <Link to="signup" className="text-violet-700">
                    Signup
                  </Link>
                </li>
                <li className="p-3 hover:bg-slate-200 rounded-lg text-sm">
                  <Link to="#" className="flex items-center gap-2">
                    <User size={18} />
                    My Profile
                  </Link>
                </li>
                <li className="p-3  hover:bg-slate-200 rounded-lg text-sm">
                  <Link to="#" className="flex items-center gap-2">
                    <Package size={18} />
                    Orders
                  </Link>
                </li>
              </ul>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
