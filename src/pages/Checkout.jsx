import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex flex-col p-5">
      <h1 className="text-center text-3xl font-bold text-slate-800">
        MeroPasal
      </h1>
      <div className="flex p-10">
        <div className="basis-3/5 bg-red-500">
          <button onClick={goBack}>back</button>
        </div>
        <div className="basis-2/5 bg-green-500">right card</div>
      </div>
    </div>
  );
}

export default Checkout;
