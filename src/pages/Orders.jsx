import React, { useEffect, useState } from "react";
import { getUserOrders } from "../api";
import "ldrs/lineSpinner";
import { Footer, Header } from "../components";
import currencyFormat from "../utils/currencyFormat";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await getUserOrders();
        setOrders(response.data.data);
      } catch (error) {
        if (error.response && error.response.data.message)
          toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleRedirect = (slug) => {
    navigate(`/products/${slug}`);
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <div className="h-[80vh] flex justify-center items-center">
          <l-line-spinner size="25" stroke="2" speed="1" color="black" />
        </div>
      ) : (
        <div className="min-h-[80vh]  px-2 py-4 lg:px-16 lg:py-5 ">
          <h1 className="text-xl lg:text-3xl text-slate-800 font-semibold ">
            Your Orders
          </h1>
          <div className="flex flex-col gap-4 my-8">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.orderId} className=" bg-gray-100 rounded-xl">
                  <div className="grid grid-cols-4 font-semibold text-sm p-8 border-b border-slate-300">
                    <div>
                      <h3 className="text-slate-400">Order Number</h3>
                      <p className="text-slate-700">{order.orderId}</p>
                    </div>
                    <div>
                      <h3 className="text-slate-400">Order Date</h3>
                      <p className="text-slate-700">
                        {new Date(order.createdAt).toLocaleDateString("en-Us", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-slate-400">Delivery Date</h3>
                      <p className="text-slate-700">
                        {new Date(
                          new Date(order.createdAt).setDate(
                            new Date(order.createdAt).getDate() + 3
                          )
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-slate-400">Ship To</h3>
                      <p
                        className="line-clamp-1 text-slate-700"
                        title={order.shippingDetails.address}
                      >{`${order.shippingDetails.address},${order.shippingDetails.city}`}</p>
                    </div>
                  </div>
                  {order.products.map((product, idx) => (
                    <div
                      key={idx}
                      className="flex hover:bg-slate-200 cursor-pointer"
                      onClick={() => handleRedirect(product?.productId.slug)}
                    >
                      <div className="h-40 w-36 md:p-5 p-2">
                        <img
                          src={product.productId?.images[0].imageUrl}
                          alt={product.productId?.title}
                          className="h-full w-full object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col gap-4 md:flex-row justify-evenly w-full p-4 flex-wrap ">
                        <div>
                          <h3 className="font-semibold text-slate-700 line-clamp-2 w-60 md:w-80">
                            {product.productId.title}
                          </h3>
                          {product.size && (
                            <p className="text-slate-400 font-medium">
                              size :
                              <span className="text-slate-700 ml-1">
                                {product.size}
                              </span>
                            </p>
                          )}
                          {product.color && (
                            <p className="text-slate-400 font-medium">
                              color :
                              <span className="text-slate-700 ml-1">
                                {product.color}
                              </span>
                            </p>
                          )}
                          <p className="text-slate-400 font-medium">
                            quantity :
                            <span className="text-slate-700 ml-1">
                              {product.quantity}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 font-medium">
                            Status :
                            <span className="text-slate-700 ml-1">
                              {order.status}
                            </span>
                          </p>
                          <p className="text-slate-400 font-medium">
                            Payment Method :
                            <span className="text-slate-700 ml-1">
                              {order.payment.paymentMethod}
                            </span>
                          </p>
                          <p className="text-slate-400 font-medium">
                            Payment Status :
                            <span className="text-slate-700 ml-1">
                              {order.payment.paymentStatus}
                            </span>
                          </p>
                        </div>
                        <div className="font-semibold text-slate-700 mr-10">
                          {currencyFormat(product.price * product.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="font-semibold flex items-center gap-2 px-8 py-4 border-t border-slate-300">
                    <h3 className="text-slate-400 text-sm">Total Amount:</h3>
                    <p className="text-slate-700 text-base">
                      {currencyFormat(order.totalAmount)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div>No Orders Yet</div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Orders;
