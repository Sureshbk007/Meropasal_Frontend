import React, { useEffect, useState } from "react";
import { Footer, Header } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { CircleAlert, Mail, User } from "lucide-react";
import { userUpdate } from "../api";
import { toast } from "react-toastify";
import "ldrs/lineSpinner";
import { login } from "../store/slices/authSlice";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    fullName: "",
    image: "",
    imageFile: null,
  });
  const [errors, setErrors] = useState({
    fullName: "",
  });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setUserData({
        fullName: user.fullName || "",
        image: user.avatar?.imageUrl || "",
        imageFile: null,
      });
    }
  }, [user]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!userData.fullName.trim()) {
      setErrors((prev) => ({ ...prev, fullName: "Fullname cannot be empty" }));
      return;
    }

    const formData = new FormData();
    formData.append("fullName", userData.fullName);
    if (userData.imageFile) {
      formData.append("avatar", userData.imageFile);
    }

    try {
      setLoading(true);
      const response = await userUpdate(formData);
      const user = response.data.data;
      const token = localStorage.getItem("token");
      dispatch(login({ user, token }));
      toast.success("Account Updated Successfully");
    } catch (error) {
      toast.error("Failed to update accoun. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData((prev) => ({ ...prev, imageFile: file }));

      // For preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <Header />
      <div className="p-5 md:px-16 md:py-10 h-screen">
        <form
          className="flex flex-col gap-4 m-0 md:mx-80 justify-start"
          onSubmit={handleFormSubmit}
        >
          <label className="flex justify-center cursor-pointer">
            <img
              src={userData?.image}
              alt="Profile image"
              className="h-32 w-32 md:h-40 md:w-40 object-cover rounded-full"
            />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
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
                  value={userData.fullName}
                  className="outline-none px-2 bg-transparent text-sm w-full"
                  onChange={handleChange}
                />
              </div>
            </label>
            <span className="text-red-600 text-sm flex items-center">
              {errors.fullName && (
                <>
                  <CircleAlert className="h-3" />
                  {errors.fullName}
                </>
              )}
            </span>
          </div>

          <div>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-slate-500">Email</span>
              <div className="flex items-center pl-2 py-1 rounded-lg bg-slate-300 ">
                <Mail
                  className="bg-slate-50 p-2 rounded-lg"
                  color="#475569"
                  size={32}
                />
                <input
                  readOnly
                  value={user.email}
                  className="hover:cursor-not-allowed outline-none px-2 bg-transparent text-sm w-full"
                />
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-violet-700 text-white p-3 rounded-lg hover:bg-violet-900 flex justify-center items-center mt-2"
          >
            {loading ? (
              <l-line-spinner size="25" stroke="2" speed="1" color="white" />
            ) : (
              <span>Update</span>
            )}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
