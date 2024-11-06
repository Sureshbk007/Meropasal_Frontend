import { Trash2 } from "lucide-react";
import currencyFormat from "../../utils/currencyFormat";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../api";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await getAllOrders();
        setOrders(response.data.data);
      } catch (error) {
        console.log("failed to fetch orders");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleOrderChange = () => {};

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-slate-500 text-lg">Products</h1>
        {/* <button className="text-slate-50 bg-brand cursor-pointer px-4 py-2 text-sm rounded-lg font-semibold hover:bg-opacity-80">
          Add Order
        </button> */}
      </div>
      <div>
        <table className="w-full p-5 mt-5 text-slate-700 rounded-lg bg-slate-200 overflow-hidden">
          <thead>
            <tr>
              <th className="text-start p-3">#</th>
              <th className="text-start p-3">Customer Name</th>
              <th className="text-start p-3">Quantity</th>
              <th className="text-start p-3">Total Price</th>
              <th className="text-start p-3">Payment Status</th>
              <th className="text-start p-3">Payment Method</th>
              <th className="text-start p-3">Status</th>
              <th className="text-start p-3">Created</th>
              <th className="text-start p-3">Actions</th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={9} className="p-5 text-center animate-pulse">
                  loading...
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, idx) => (
                  <tr
                    key={order.orderId}
                    className="hover:bg-slate-400 cursor-pointer"
                  >
                    <td className="pl-4">{idx + 1}</td>
                    <td className="pl-4">
                      <div className="p-2 pl-0">
                        <span className="text-slate-600 font-semibold capitalize">
                          {order.shippingDetails.recipientName}
                        </span>
                      </div>
                    </td>
                    <td className="pl-4">
                      {order.products.reduce(
                        (acc, curr) => acc + curr.quantity,
                        0
                      )}
                    </td>
                    <td className="pl-4">
                      {currencyFormat(order.totalAmount)}
                    </td>
                    <td className="pl-4">{order.payment.paymentStatus}</td>
                    <td className="pl-4">{order.payment.paymentMethod}</td>
                    <td className="pl-4">
                      <select
                        name="status"
                        value={order.status}
                        onChange={handleOrderChange}
                        className="bg-slate-50 border rounded-lg p-1 cursor-pointer"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPING">SHIPPING</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="RETURNED">RETURNED</option>
                      </select>
                    </td>
                    <td className="pl-4">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="pl-4">
                      <Trash2 className="text-red-500" size={20} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No Category to show</td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default Orders;
