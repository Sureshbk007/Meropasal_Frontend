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

function Admin() {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tabsItems = [
    {
      label: "Home",
      component: <Home />,
    },
    {
      label: "Categories",
      component: <Categories />,
    },
    {
      label: "Products",
      component: <Products />,
    },
    {
      label: "Customers",
      component: <Customers />,
    },
    {
      label: "Orders",
      component: <Orders />,
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
      <aside className="w-1/5 flex flex-col justify-between shadow-lg">
        <div>
          <div className="flex justify-start items-center">
            <img
              src={logo}
              alt="logo"
              className="h-12 w-12 object-contain m-5"
            />
            <h2 className="text-slate-700 text-xl">MeroPasal</h2>
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
                  {tab.label}
                </li>
              </ul>
            ))}
        </div>
        <button
          className="bg-brand m-2 px-5 py-2 rounded-lg text-white mb-5 hover:bg-opacity-80"
          onClick={handleLogout}
        >
          Log out
        </button>
      </aside>
      <div className="w-4/5 p-5">{tabsItems[activeTab].component}</div>
    </div>
  );
}

export default Admin;
