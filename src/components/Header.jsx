import { CircleUserRound, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      {/* top navbar */}
      <div className="flex text-[8px] sm:text-sm justify-between px-20 py-2 bg-gray-100">
        <a href="/#sale">Sale!!</a>
        <nav className="flex gap-10">
          <Link to="#" className="text-slate-600">
            Refund
          </Link>
          <Link to="/contact" className="text-slate-600">
            Contact
          </Link>
          <Link to="/signup" className="font-medium whitespace-nowrap">
            Sign Up
          </Link>
          <Link to="/login" className="font-medium">
            Login
          </Link>
        </nav>
      </div>

      {/* mid navbar */}
      <div className="flex px-20 gap-32 items-center p-2 overflow-hidden">
        <Link to="/">
          <div className="border p-2 bg-brand text-white rounded-xl">
            MeroPasal
          </div>
        </Link>
        <form className="border-2 shadow-sm rounded-lg px-2 w-full flex">
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
            <ShoppingCart color="#475569" />
            <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-xl text-sm text-center font-medium w-5">
              20
            </span>
          </Link>
          <Link to="#">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src="https://www.thispersondoesnotexist.com/"
                alt="user profile"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
