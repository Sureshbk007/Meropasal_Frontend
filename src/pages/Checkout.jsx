import { MoveLeft } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { esewaPng, vanPng } from "../assets/png/";

function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    city: "",
    address: "",
    landmark: "",
    paymentMethod: "COD",
  });

  const handleFormData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex flex-col mx-28 my-10 text-slate-700">
      <h1 className="text-center text-3xl font-bold text-slate-800">
        MeroPasal
      </h1>
      <form className="flex gap-10">
        <div className="basis-3/5 flex flex-col gap-8">
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

            <div className="flex gap-3">
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
                    value={formData.fullName}
                    onChange={handleFormData}
                    className="border outline-violet-500 px-2 py-1 border-gray-300 rounded w-full"
                  />
                </label>
                {/* <span className="text-red-600 text-sm">
                  This field is required
                </span> */}
              </div>
              {/* email */}
              <div className="basis-1/2 flex flex-col">
                <label className="flex flex-col">
                  <div>
                    <span className="font-medium">Email</span>
                  </div>
                  <input
                    type="email"
                    placeholder="eg: you@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleFormData}
                    className="border outline-violet-500 px-2 py-1 border-gray-300 rounded"
                  />
                </label>
                {/* <span className="text-red-600 text-sm">
                  Invalid email address
                </span> */}
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
                  value={formData.phoneNumber}
                  onChange={handleFormData}
                  className="border outline-violet-500 px-2 py-1 border-gray-300 rounded w-full"
                />
              </label>
              {/* <span className="text-red-600 text-sm">
                This field is required
              </span> */}
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
                  placeholder="eg: Ram Bahadur"
                  name="city"
                  value={formData.city}
                  onChange={handleFormData}
                  className="border outline-violet-500 px-2 py-1 border-gray-300 rounded w-full"
                />
              </label>
              {/* <span className="text-red-600 text-sm">
                This field is required
              </span> */}
            </div>

            <div className="flex gap-3">
              {/* Address */}
              <div className="basis-1/2 flex flex-col">
                <label className="flex flex-col">
                  <div>
                    <span className="font-medium">Address</span>
                    <span className="text-red-400 text-sm">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="eg: kalanki-14, kathmandu"
                    name="address"
                    value={formData.address}
                    onChange={handleFormData}
                    className="border outline-violet-500 px-2 py-1 border-gray-300 rounded w-full"
                  />
                </label>
                {/* <span className="text-red-600 text-sm">
                  This field is required
                </span> */}
              </div>

              {/* landmark */}
              <label className="basis-1/2 flex flex-col">
                <span className="font-medium">Landmark</span>
                <input
                  type="text"
                  placeholder="eg: kalanki mandir"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleFormData}
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
                  formData.paymentMethod === "COD" &&
                  "outline outline-violet-500"
                }`}
              >
                <div className="flex flex-col items-center justify-center">
                  <img src={vanPng} alt="van image" className="h-9" />
                  <span className="text-sm">Cash on delivery</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="hidden"
                    value="COD"
                    onChange={handleFormData}
                  />
                </div>
              </label>
              <label
                className={`flex flex-col items-center justify-center border-2 border-gray-300 shadow-lg p-3 rounded-lg bg-green-600 h-20 cursor-pointer ${
                  formData.paymentMethod === "esewa" &&
                  "outline outline-violet-500"
                }`}
              >
                <div className="flex flex-col items-center justify-center ">
                  <img src={esewaPng} alt="esewa logo" className="h-9" />
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  className="hidden"
                  value="esewa"
                  onChange={handleFormData}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="basis-2/5 flex flex-col h-full gap-3 p-4 shadow-xl border-2 border-gray-300 rounded-lg">
          <h3 className="font-semibold text-center">Order Summary</h3>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }, (_, idx) => (
              <div className="flex justify-between" key={idx}>
                <div className="flex gap-3">
                  <img
                    src="https://via.placeholder.com/150/92c952"
                    alt="product image"
                    className="h-20 w-20 object-cover object-center rounded"
                  />
                  <div className="flex flex-col text-sm">
                    <span className="font-medium">Nike air jordan</span>
                    <span className="text-slate-500">Variant: red/large</span>
                    <div>
                      <span className="font-medium">Rs 250</span>
                      <span className="text-slate-400"> x 1</span>
                    </div>
                  </div>
                </div>
                <data className="font-medium">Rs 1200</data>
              </div>
            ))}
          </div>

          <div className="border-t-2 pt-2 flex flex-col gap-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="">Sub-total</span>
                <data className="font-medium">Rs 17000</data>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery Charge</span>
                <data className="font-medium uppercase">Free</data>
              </div>
              <div className="flex items-center justify-between">
                <span>Total</span>
                <data className="font-medium">Rs 17000</data>
              </div>
            </div>
            <button
              type="submit"
              className="bg-violet-800 hover:bg-violet-900 w-full p-3 text-white font-medium rounded-lg"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
