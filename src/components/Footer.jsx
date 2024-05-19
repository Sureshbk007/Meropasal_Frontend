import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const currentDate = new Date().getFullYear();
  return (
    <div className="bg-gray-900 flex flex-col justify-between text-slate-300">
      <div className="flex flex-wrap gap-5 justify-around p-8">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-2xl font-semibold">MeroPasal.com</h3>
          <p>"Let's Shop Beyond Boundries"</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
