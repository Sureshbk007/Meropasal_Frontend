import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { BrandLogoSvg } from "../assets/svg";

function Footer() {
  const currentDate = new Date().getFullYear();
  return (
    <div className="bg-gray-900 flex flex-col gap-5 text-slate-300 text-sm sm:text-base">
      <div className="p-5 lg:p-10 flex items-center justify-center sm:justify-between flex-wrap gap-5">
        <div className="flex flex-col items-center gap-2">
          <Link to="/">
            <img src={BrandLogoSvg} alt="brand name" />
          </Link>
          <p>"Let's Shop Beyond Boundries"</p>
        </div>
        <div className="flex  items-center gap-5 lg:gap-10">
          <Link className="block" to="/">
            Home
          </Link>
          <Link className="block" to="products">
            Products
          </Link>
          <Link className="block" to="login">
            Login
          </Link>
          <Link className="block" to="signup">
            Sign Up
          </Link>
        </div>
        <div className="flex items-center justify-center gap-10">
          <a href="https://facebook.com" target="_blank">
            <Facebook />
          </a>
          <a href="https://instagram.com" target="_blank">
            <Instagram />
          </a>
          <a href="https://youtube.com" target="_blank">
            <Youtube />
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center  font-medium h-16 border-t border-gray-600">
        &copy; {currentDate}, MeroPasal.com
      </div>
    </div>
  );
}

export default Footer;
