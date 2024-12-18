import {
  LogOut,
  MoveRight,
  Package,
  Search,
  Shield,
  ShoppingCart,
  Trash2,
  Truck,
  User,
  UserCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Drawer from "./Drawer";
import { logo } from "../assets/png/";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCartProductQty,
  removeFromCart,
  toggleCart,
} from "../store/slices/cartSlice";
import { logout } from "../store/slices/authSlice";
import currencyFormat from "../utils/currencyFormat";
import { useEffect, useRef, useState } from "react";
import { avatarJpg } from "../assets/jpg/index";
import ProgressBar from "./ProgressBar";
import { getAllProducts } from "../api";

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLogged);
  const userData = useSelector((state) => state.auth.user);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const orders = useSelector((state) => state.cart.orders);
  const [isUserOptionsOpen, setIsUserOptionsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [searchProducts, setSearchProducts] = useState([]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserOptionsOpen(false);
      }
    }

    if (isUserOptionsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserOptionsOpen]);

  const totalCartAmount = orders.reduce(
    (total, item) => total + item.selectedQty * item.sellingPrice,
    0
  );

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const timeoutId = setTimeout(async () => {
        const response = await getAllProducts(`?q=${searchQuery}&limit=10`);
        setSearchProducts(response.data.data);
      }, 350);

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery]);

  const handleLogout = async () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const userDropDownOptions = [
    {
      title: "My Account",
      icon: <User size={18} />,
      link: "/dashboard",
    },
    {
      title: "Orders",
      icon: <Package size={18} />,
      link: "/orders",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?q=${searchQuery}`);
  };

  const handleAutoCompleteSearch = (e) => {};
  return (
    <>
      <ProgressBar />
      {/*navbar */}
      <div className="flex px-3 py-2 md:px-16 gap-3 items-center justify-between sticky top-0 z-50 bg-slate-50 text-xs sm:text-base border-b">
        <Link to="/">
          <img src={logo} alt="brand name" className="max-h-12" />
        </Link>
        <form
          className="relative border-2 border-slate-300 rounded-lg w-full max-w-lg flex items-center"
          onSubmit={handleSearch}
        >
          <input
            type="search"
            className="p-2 outline-none w-full bg-transparent text-slate-700"
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="mr-2">
            <Search color="gray" className="h-4 sm:h-auto" />
          </button>
          {/* search list */}
          {searchProducts.length > 0 && (
            <ul className="absolute top-[45px] bg-gray-100 w-full border-2 rounded-lg overflow-hidden">
              {searchProducts.map((item) => (
                <li
                  className="p-2 hover:bg-gray-300 cursor-pointer"
                  key={item._id}
                >
                  <Link
                    to={`/products/${item.slug}`}
                    className="h-full w-full flex items-center gap-2"
                  >
                    <img
                      src={item.images[0].imageUrl}
                      alt={item.title}
                      className="w-8 h-8"
                    />
                    <span className="line-clamp-1 ">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>

        <div className="flex gap-1 sm:gap-4 items-center relative ">
          <button
            className="relative cursor-pointer p-2 rounded-full hover:bg-violet-600 group duration-200"
            onClick={() => dispatch(toggleCart(true))}
          >
            <ShoppingCart className="h-5 sm:h-auto text-slate-700 group-hover:text-white duration-200" />
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-xl text-[10px] sm:text-sm text-center font-medium w-5">
              {orders.length === 0 ? 0 : orders.length}
            </span>
          </button>

          {/* cart items */}
          <Drawer
            isOpen={isCartOpen}
            onClose={() => dispatch(toggleCart(false))}
          >
            {orders.length > 0 ? (
              <div className="p-2 sm:p-6 flex flex-col justify-evenly sm:justify-between h-full">
                <div className="flex items-center justify-between text-violet-700 pb-3 border-b-2 border-violet-300">
                  <Truck className="h-8" />
                  <MoveRight
                    onClick={() => dispatch(toggleCart(false))}
                    size={32}
                    strokeWidth={3}
                    className="p-1 text-xl rounded-lg hover:bg-violet-200 cursor-pointer h-8 sm:h-auto"
                  />
                </div>
                <div className="basis-4/6 flex flex-col overflow-y-auto scrollbar-none ">
                  {orders.map((order, idx) => (
                    <div
                      className="flex justify-between items-center p-2 gap-2"
                      key={idx}
                    >
                      <div className="flex gap-2">
                        <img
                          src={order.image}
                          alt="product image"
                          className="h-16 w-16 md:w-24 object-cover object-center rounded"
                        />
                        <div className="flex flex-col justify-center">
                          <span className="line-clamp-1 text-slate-800 font-medium max-w-80">
                            {order.title}
                          </span>
                          {(order.color || order.size) && (
                            <span className="text-slate-500 text-sm">
                              Variant: {order.color}/{order.size}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        {order.stock > 0 ? (
                          <select
                            name="quantity"
                            value={order.selectedQty}
                            onChange={(e) =>
                              dispatch(
                                changeCartProductQty({
                                  id: order.id,
                                  color: order?.color,
                                  size: order?.size,
                                  newQty: +e.target.value,
                                })
                              )
                            }
                            className="px-3 border border-gray-300 rounded-lg bg-gray-100 outline-violet-500 font-medium text-slate-700 cursor-pointer text-xs'"
                          >
                            {Array.from(
                              { length: Math.min(5, order.stock) },
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
                        {currencyFormat(order.sellingPrice * order.selectedQty)}
                      </data>
                      <Trash2
                        color="white"
                        size={28}
                        className="bg-red-500 p-1 rounded-full cursor-pointer h-7 sm:h-auto"
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              id: order.id,
                              color: order.color,
                              size: order.size,
                            })
                          )
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="basis-1/6 flex flex-col gap-5 border-t-2 border-violet-300 pt-1">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-800">
                        Total
                      </span>
                      <data>{currencyFormat(totalCartAmount)}</data>
                    </div>
                    <div className="flex justify-between items-center gap-10">
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
                  >
                    checkout
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-2 sm:p-6 w-96">
                <div className="flex items-center justify-between text-violet-700 p-3 border-b-2 border-violet-300">
                  <Truck className="h-8" />
                  <MoveRight
                    onClick={() => dispatch(toggleCart(false))}
                    size={32}
                    strokeWidth={3}
                    className="p-1 text-xl rounded-lg hover:bg-violet-200 cursor-pointer h-8 sm:h-auto"
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-lg font-medium text-slate-600">
                  Cart is Empty
                </div>
              </div>
            )}
          </Drawer>
          <div ref={dropdownRef}>
            <div className="border rounded-full hover:bg-violet-600 hover:border-violet-600 group shadow bg-slate-200 relative overflow-hidden duration-500">
              {isLoggedIn ? (
                <button
                  className="flex items-center sm:gap-2 h-10 w-10 cursor-pointer group-hover:bg-slate-50"
                  onClick={() => setIsUserOptionsOpen((prev) => !prev)}
                >
                  <img
                    src={userData?.avatar?.imageUrl || avatarJpg}
                    alt="profile image"
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center sm:gap-2 py-2 px-3"
                >
                  <UserCircle className="hidden sm:block text-slate-700 group-hover:text-slate-50 h-4 sm:h-auto duration-500" />
                  <span className="text-slate-700 font-medium group-hover:text-slate-50 duration-500">
                    Login
                  </span>
                </Link>
              )}
            </div>

            {/* Dropdown list */}
            {isLoggedIn && isUserOptionsOpen && (
              <ul className="sm:flex flex-col absolute top-full right-0 mt-2 bg-slate-50 border rounded-lg transition-opacity duration-500 z-50 w-max visible opacity-100 ">
                <li className="font-medium  flex items-center gap-4 text-sm p-4">
                  <span className="cursor-default">New customer? </span>
                  <Link to="/signup" className="text-violet-700">
                    Signup
                  </Link>
                </li>
                {userData.role === "ADMIN" && (
                  <li className="hover:bg-slate-200 rounded-lg text-sm">
                    <Link to="/admin" className="flex items-center gap-2 p-3">
                      <Shield />
                      Admin Panel
                    </Link>
                  </li>
                )}
                {userDropDownOptions.map((option, idx) => (
                  <li
                    className="hover:bg-slate-200 rounded-lg text-sm"
                    key={idx}
                  >
                    <Link
                      to={option.link}
                      className="flex items-center gap-2 p-3"
                    >
                      {option.icon}
                      {option.title}
                    </Link>
                  </li>
                ))}
                <li
                  className="p-3  hover:bg-slate-200 rounded-lg text-sm cursor-pointer"
                  onClick={handleLogout}
                >
                  <button className="flex items-center gap-2">
                    <LogOut size={18} />
                    Log Out
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
