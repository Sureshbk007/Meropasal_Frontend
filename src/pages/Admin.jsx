import React, { useState } from "react";
import { logo } from "../assets/png";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Categories,
  Products,
  Customers,
  Orders,
} from "../components/Admin";
import {
  LayoutGrid,
  Home as House,
  Box,
  Users,
  ShoppingBasket,
} from "lucide-react";

function Admin() {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tabsItems = [
    {
      label: "Home",
      component: <Home />,
      icon: <House size="20" />,
    },
    {
      label: "Categories",
      component: <Categories />,
      icon: <LayoutGrid size="20" />,
    },
    {
      label: "Products",
      component: <Products />,
      icon: <Box />,
    },
    {
      label: "Customers",
      component: <Customers />,
      icon: <Users />,
    },
    {
      label: "Orders",
      component: <Orders />,
      icon: <ShoppingBasket />,
    },
  ];

  const handleLogout = async () => {
    navigate("/");
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <div className="flex h-screen">
      <aside className="w-1/5 flex flex-col justify-between shadow-lg p-2">
        <div>
          <div className="flex justify-start items-center flex-col md:flex-row m-2 md:m-0">
            <img
              src={logo}
              alt="logo"
              className="h-8 w-8 md:h-12 md:w-12 object-contain m-2 md:m-5"
            />
            <h2 className="text-slate-700 text-xs md:text-sm lg:text-xl">
              MeroPasal
            </h2>
          </div>
          {tabsItems.length > 0 &&
            tabsItems.map((tab, idx) => (
              <ul key={idx}>
                <li
                  onClick={() => setActiveTab(idx)}
                  className={`cursor-pointer p-4 hover:bg-slate-200 text-semibold ${
                    idx === activeTab && "bg-slate-200"
                  }`}
                >
                  <div
                    className="flex justify-center md:justify-start items-center gap-2 "
                    title={tab.label}
                  >
                    <span>{tab.icon}</span>
                    <span className="hidden md:block">{tab.label}</span>
                  </div>
                </li>
              </ul>
            ))}
        </div>
        <button
          className="bg-red-600 py-2 rounded-lg text-slate-50 mb-5 hover:bg-opacity-80 text-sm md:text-lg text-nowrap"
          onClick={handleLogout}
        >
          Log out
        </button>
      </aside>
      <div className="w-4/5 p-5 overflow-x-auto">
        {tabsItems[activeTab].component}
      </div>
    </div>
  );
}

export default Admin;
