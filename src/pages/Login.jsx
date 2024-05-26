import React, { useState } from "react";
import { LoginBannerSvg, GoogleSvg } from "../assets/svg/";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer, Header } from "../components";
function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleLogin = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <Header />
      <div className="flex">
        <div className="basis-1/2 p-20 bg-violet-500">
          <img src={LoginBannerSvg} alt="Login Banner image" />
        </div>
        <div className="basis-1/2 flex flex-col items-center justify-center gap-3 bg-gray-50">
          <span className="text-2xl text-slate-600 font-semibold">
            Welcome back!
          </span>
          <form className="flex flex-col gap-3   min-w-72">
            <div>
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-slate-500">
                  Email
                </span>
                <div className="flex items-center pl-2 py-1 rounded-lg bg-slate-200">
                  <Mail
                    className="bg-slate-50 p-2 rounded-lg"
                    color="#475569"
                    size={32}
                  />
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    className="outline-none px-2 bg-transparent text-sm w-full"
                    onChange={handleLogin}
                    placeholder="you@example.com"
                  />
                </div>
              </label>
              {/* <span className="text-red-600 text-sm">
              Incorrect email address
            </span> */}
            </div>

            <div className="flex flex-col gap-1">
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-slate-500">
                  Password
                </span>
                <div className="flex items-center justify-between px-2 py-1 rounded-lg bg-slate-200">
                  <div className="flex items-center flex-1">
                    <Lock
                      className="bg-slate-50 p-2 rounded-lg"
                      color="#475569"
                      size={32}
                    />
                    <input
                      type={`${isPasswordVisible ? "text" : "password"}`}
                      name="password"
                      value={loginData.password}
                      className="outline-none px-2 bg-transparent text-sm w-full"
                      onChange={handleLogin}
                      placeholder="**************"
                    />
                  </div>
                  {isPasswordVisible ? (
                    <Eye
                      color="#475569"
                      onClick={handlePasswordVisibility}
                      className="cursor-pointer"
                    />
                  ) : (
                    <EyeOff
                      color="#475569"
                      onClick={handlePasswordVisibility}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </label>
              {/* <span className="text-red-600 text-sm">Incorrect password</span> */}
              <Link to="#" className="text-sm text-violet-900 text-right">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="bg-violet-700 text-white p-3 rounded-lg hover:bg-violet-900"
            >
              Login
            </button>
          </form>
          <span className="text-slate-500 text-sm before:content-['-_'] after:content-['_-'] ">
            or
          </span>
          <Link
            to="#"
            className="flex items-center gap-2 text-slate-500 hover:bg-gray-200 px-2 py-1 rounded"
          >
            <img src={GoogleSvg} alt="google logo" className="w-7" /> Login with
            Google
          </Link>
          <div className="text-slate-500">
            <span>Don't have an account? </span>
            <Link
              to="/signup"
              className="text-violet-800 font-medium hover:text-violet-400"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
