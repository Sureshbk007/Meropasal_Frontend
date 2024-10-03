import React, { useEffect, useState } from "react";
import { LoginBannerSvg, GoogleSvg } from "../assets/svg/";
import { CircleAlert, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Header } from "../components";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useFormik } from "formik";
import { loginSchema } from "../utils/authValidator";
import axiosInstance from "../utils/axiosInstance";
import { lineSpinner } from "ldrs";
lineSpinner.register();

function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = async (values, { setErrors }) => {
    try {
      const response = await axiosInstance.post("/auth/login", values);
      const { user, token } = response.data.data;
      dispatch(login({ user, token }));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };

  const {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleFormSubmit,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <Header />
      <div className="flex">
        <div className="hidden md:flex items-center justify-center md:basis-1/2 p-10 bg-violet-500 ">
          <img
            src={LoginBannerSvg}
            alt="Login Banner image"
            className="max-w-[500px] w-full"
          />
        </div>

        <div className="w-full min-h-[70vh] md:basis-1/2 md:min-h-[90vh] flex flex-col items-center justify-center gap-3 bg-gray-50">
          <span className="text-2xl text-slate-600 font-semibold mb-5">
            Welcome back!
          </span>
          <form
            className="flex flex-col gap-3 min-w-72"
            onSubmit={handleSubmit}
          >
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
                    value={values.email}
                    className="outline-none px-2 bg-transparent text-sm w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="you@example.com"
                  />
                </div>
              </label>
              <span className="text-red-600 text-sm flex items-center">
                {errors.email && touched.email && (
                  <>
                    <CircleAlert className="h-3" />
                    {errors.email}
                  </>
                )}
              </span>
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
                      value={values.password}
                      className="outline-none px-2 bg-transparent text-sm w-full"
                      onChange={handleChange}
                      onBlur={handleBlur}
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
              <span className="text-red-600 text-sm flex items-center">
                {errors.password && touched.password && (
                  <>
                    <CircleAlert className="h-3" />
                    {errors.password}
                  </>
                )}
              </span>
              <Link to="#" className="text-sm text-violet-900 text-right">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-violet-700 text-white p-3 rounded-lg hover:bg-violet-900 flex justify-center items-center"
            >
              {isSubmitting ? (
                <l-line-spinner size="25" stroke="2" speed="1" color="white" />
              ) : (
                <span>Login</span>
              )}
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
