import { useState } from "react";
import { SignupBannerSvg, GoogleSvg } from "../assets/svg/";
import {
  CircleAlert,
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Header } from "../components";
import { useFormik } from "formik";
import { registrationSchema } from "../utils/authValidator";
import { toast } from "react-toastify";

function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (values, { setErrors }) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const data = await response.json();
        throw data;
      }
      const data = await response.json();
      toast.success(data.message);
      navigate("/login");
    } catch (err) {
      if (err.errors) setErrors(err.errors);
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
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: registrationSchema,
    onSubmit: handleFormSubmit,
  });

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <Header />
      <div className="flex">
        <div className="w-full min-h-[70vh] md:basis-1/2 md:min-h-[90vh] flex flex-col items-center justify-center gap-3 bg-gray-50 p-5">
          <span className="text-2xl text-slate-600 font-semibold mb-5">
            Create your account
          </span>
          <form
            className="flex flex-col gap-4 min-w-80"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-slate-500">
                  Full Name
                </span>
                <div className="flex items-center pl-2 py-1 rounded-lg bg-slate-200  ">
                  <User
                    className="bg-slate-50 p-2 rounded-lg"
                    color="#475569"
                    size={32}
                  />
                  <input
                    type="text"
                    name="fullName"
                    value={values.fullName}
                    className="outline-none px-2 bg-transparent text-sm w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ram Bahadur"
                  />
                </div>
              </label>
              <span className="text-red-600 text-sm flex items-center">
                {errors.fullName && touched.fullName && (
                  <>
                    <CircleAlert className="h-3" />
                    {errors.fullName}
                  </>
                )}
              </span>
            </div>

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
                      placeholder="****************"
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
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-violet-700 text-white p-3 rounded-lg hover:bg-violet-900 flex justify-center items-center"
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span>Sign Up</span>
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
            <img src={GoogleSvg} alt="google logo" className="w-7" /> Sign up
            with Google
          </Link>
          <div className="text-slate-500">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="text-violet-800 font-medium hover:text-violet-400"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center basis-1/2 p-10 bg-violet-500 ">
          <img
            src={SignupBannerSvg}
            alt="Signup Banner image"
            className="max-w-[500px] w-full"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
