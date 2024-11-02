import { CircleAlert, MoveLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { esewaPng, vanPng } from "../assets/png/";
import { useDispatch, useSelector } from "react-redux";
import { clearCartProducts, toggleCart } from "../store/slices/cartSlice";
import currencyFormat from "../utils/currencyFormat";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { createOrder } from "../api";
import esewaCall from "../utils/esewaCall";
import "ldrs/lineSpinner";

function Checkout() {
  const navigate = useNavigate();
  const orders = useSelector((state) => state.cart.orders);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const paidOrder = new URLSearchParams(location.search).get("order");

  useEffect(() => {
    if (paidOrder) {
      if (paidOrder === "success") {
        toast.success("Order created Successfully");
        navigate("/");
        setTimeout(() => {
          dispatch(clearCartProducts());
        }, 500);
      } else if (paidOrder === "failed") {
        toast.error("Failed to created Order");
        navigate("/checkout");
      }
      return;
    }
  }, [paidOrder, navigate, dispatch]);

  useEffect(() => {
    dispatch(toggleCart(false));
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      const formattedOrders = orders.map((order) => ({
        productId: order.id,
        price: order.sellingPrice,
        quantity: order.selectedQty,
        size: order.size || "",
        color: order.color || "",
      }));

      const orderData = {
        products: formattedOrders,
        shippingDetails: {
          recipientName: values.fullName,
          contactNumber: values.phoneNumber,
          email: values.email || "",
          city: values.city,
          address: values.address,
          landmark: values.landmark || "",
        },
        paymentMethod: values.paymentMethod,
      };

      const response = await createOrder(orderData);
      if (values.paymentMethod === "ESEWA") {
        esewaCall(response.data.data);
        return;
      }
      toast.success(response.data.message);
      navigate("/");
      setTimeout(() => {
        dispatch(clearCartProducts());
      }, 500);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const { values, errors, handleSubmit, handleChange, handleBlur, touched } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        phoneNumber: "",
        city: "",
        address: "",
        landmark: "",
        paymentMethod: "COD",
      },
      validationSchema: Yup.object().shape({
        fullName: Yup.string().required("Full name is required"),
        email: Yup.string()
          .trim()
          .required("Email is required")
          .email("Invalid email address"),
        phoneNumber: Yup.string().trim().required("Phone number is required"),
        city: Yup.string().trim().required("City or District is required"),
        address: Yup.string().trim().required("Address is required"),
      }),
      onSubmit: handleFormSubmit,
    });

  const delivaryCharge = 100;
  let totalCartAmount =
    orders.reduce(
      (total, item) => total + item.selectedQty * item.sellingPrice,
      0
    ) + delivaryCharge;

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="flex flex-col mx-4 my-10 sm:mx-8 lg:mx-28 text-slate-700 gap-10">
        <h1 className="text-center text-3xl font-bold text-slate-800">
          MeroPasal
        </h1>
        <form
          className="flex flex-col md:flex-row gap-10"
          onSubmit={handleSubmit}
        >
          <div className="basis-3/5 flex flex-col gap-8 order-last md:order-none">
            <div className="flex items-center gap-3">
              <MoveLeft
                onClick={goBack}
                size={32}
                strokeWidth={3}
                className="p-1 text-xl rounded-lg hover:bg-violet-200 cursor-pointer text-violet-700"
              />
              <h3 className="text-2xl font-bold text-slate-800">Checkout</h3>
            </div>
            {/* general information */}
            <div className="flex flex-col gap-2">
              <h4 className="font-bold">1. General Information</h4>

              <div className="flex gap-3 flex-col lg:flex-row">
                {/* fullname */}
                <div className="basis-1/2 flex flex-col">
                  <label className="flex flex-col">
                    <div>
                      <span className="font-medium">Full Name</span>
                      <span className="text-red-400 text-sm">*</span>
                    </div>
                    <input
                      type="text"
                      placeholder="eg: Ram Bahadur"
                      name="fullName"
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="border outline-violet-500 px-2 py-1 border-gray-300 rounded w-full"
                    />
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
                {/* email */}
                <div className="basis-1/2 flex flex-col">
                  <label className="flex flex-col">
                    <div>
                      <span className="font-medium">Email</span>
                      <span className="text-red-400 text-sm">*</span>
                    </div>
                    <input
                      type="email"
                      placeholder="eg: you@example.com"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="border outline-violet-500 px-2 py-1 border-gray-300 rounded w-full"
                    />
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
              </div>

              {/* Phone Number */}
              <div className="basis-1/2 flex flex-col">
                <label className="flex flex-col">
                  <div>
                    <span className="font-medium">Phone Number</span>
                    <span className="text-red-400 text-sm">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="eg: 9874563210"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border outline-violet-500 px-2 py-1 border-gray-300 rounded w-full"
                  />
                </label>
                <span className="text-red-600 text-sm flex items-center">
                  {errors.phoneNumber && touched.phoneNumber && (
                    <>
                      <CircleAlert className="h-3" />
                      {errors.phoneNumber}
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* delivery address */}
            <div className="flex flex-col gap-2">
              <h4 className="font-bold">2. Delivery Address</h4>

              {/* City/ District */}
              <div className="basis-1/2 flex flex-col">
                <label className="flex flex-col">
                  <div>
                    <span className="font-medium">City / District</span>
                    <span className="text-red-400 text-sm">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="eg: Kalanki, Kathmandu"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border outline-violet-500 px-2 py-1 border-gray-300 rounded w-full"
                  />
                </label>
                <span className="text-red-600 text-sm flex items-center">
                  {errors.city && touched.city && (
                    <>
                      <CircleAlert className="h-3" />
                      {errors.city}
                    </>
                  )}
                </span>
              </div>

              <div className="flex gap-3 flex-col md:flex-row">
                {/* Address */}
                <div className="basis-1/2 flex flex-col">
                  <label className="flex flex-col">
                    <div>
                      <span className="font-medium">Address</span>
                      <span className="text-red-400 text-sm">*</span>
                    </div>
                    <input
                      type="text"
                      placeholder="eg: MaKalu, kalanki-14, kathmandu"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="border outline-violet-500 px-2 py-1 border-gray-300 rounded w-full"
                    />
                  </label>
                  <span className="text-red-600 text-sm flex items-center">
                    {errors.address && touched.address && (
                      <>
                        <CircleAlert className="h-3" />
                        {errors.address}
                      </>
                    )}
                  </span>
                </div>

                {/* landmark */}
                <label className="basis-1/2 flex flex-col">
                  <span className="font-medium">Landmark</span>
                  <input
                    type="text"
                    placeholder="eg: kalanki mandir"
                    name="landmark"
                    value={values.landmark}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border outline-violet-500 px-2 py-1 border-gray-300 rounded w-full"
                  />
                </label>
              </div>
            </div>

            {/* payment methods */}
            <div className="flex flex-col gap-2">
              <h4 className="font-bold">3. Payment Methods</h4>
              <div className="flex items-center gap-5">
                <label
                  className={`flex items-center justify-center border-2 border-gray-300 shadow-lg p-3 rounded-lg h-20 bg-slate-100 cursor-pointer ${
                    values.paymentMethod === "COD" &&
                    "outline outline-violet-500"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center">
                    <img src={vanPng} alt="van image" className="h-7 lg:h-9" />
                    <span className="text-sm">Cash on delivery</span>
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="hidden"
                      value="COD"
                      onChange={handleChange}
                      checked={values.paymentMethod === "COD"}
                    />
                  </div>
                </label>
                <label
                  className={`flex flex-col items-center justify-center border-2 border-gray-300 shadow-lg p-3 rounded-lg bg-green-600 h-20 cursor-pointer ${
                    values.paymentMethod === "ESEWA" &&
                    "outline outline-violet-500"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center ">
                    <img
                      src={esewaPng}
                      alt="esewa logo"
                      className="h-7 lg:h-9"
                    />
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="hidden"
                    value="ESEWA"
                    onChange={handleChange}
                    checked={values.paymentMethod === "ESEWA"}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="basis-2/5 md:min-w-[370px] flex flex-col h-full gap-3 p-4 shadow-xl border-2 border-gray-300 rounded-lg">
            <h3 className="font-semibold text-center">Order Summary</h3>
            <div className="flex flex-col gap-3">
              {orders.map((order, idx) => (
                <div className="flex justify-between" key={idx}>
                  <div className="flex gap-3">
                    <img
                      src={order.image}
                      alt={order.name}
                      className="h-20 w-20 object-cover object-center rounded"
                    />
                    <div className="flex flex-col text-sm">
                      <span className="font-medium">{order.name}</span>
                      {(order.color || order.size) && (
                        <span className="text-slate-500">
                          Variant: {order?.color}/{order?.size}
                        </span>
                      )}
                      <div>
                        <span className="font-medium">
                          Rs {order.sellingPrice}
                        </span>
                        <span className="text-slate-400">
                          {" "}
                          x {order.selectedQty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <data className="font-medium">
                    {currencyFormat(order.selectedQty * order.sellingPrice)}
                  </data>
                </div>
              ))}
            </div>

            <div className="border-t-2 pt-2 flex flex-col gap-5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="">Sub-total</span>
                  <data className="font-medium">
                    {currencyFormat(totalCartAmount)}
                  </data>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery Charge</span>
                  <data className="font-medium uppercase">
                    {currencyFormat(delivaryCharge)}
                  </data>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span className="font-medium">
                    {currencyFormat(totalCartAmount)}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                disabled={orders.length < 1 || isLoading}
                className="disabled:opacity-50 disabled:cursor-not-allowed hidden md:block bg-violet-800 hover:bg-violet-900 w-full p-3 text-white font-medium rounded-lg"
              >
                {isLoading ? (
                  <l-line-spinner
                    size="25"
                    stroke="2"
                    speed="1"
                    color="white"
                  />
                ) : (
                  <span>Place Order</span>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={orders.length < 1 || isLoading}
            className="disabled:opacity-50 disabled:cursor-not-allowed block md:hidden bg-violet-800 hover:bg-violet-900 w-full p-3 text-white font-medium rounded-lg order-last"
          >
            {isLoading ? (
              <l-line-spinner size="25" stroke="2" speed="1" color="white" />
            ) : (
              <span>Place Order</span>
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default Checkout;
