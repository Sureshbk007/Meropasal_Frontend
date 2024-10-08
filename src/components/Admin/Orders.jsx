import { Trash2 } from "lucide-react";
import currencyFormat from "../../utils/currencyFormat";
function Orders() {
  const category = [
    {
      id: 1,
      name: "Watches",
      image:
        "https://cdn.blanxer.com/category_image/649bdead6d8fbbdc514712e1/649be1946d8fbbdc514715e1.png",
      price: 2000,
      inventory: 5,
      status: "Active",
      created: "jan 20, 2022",
    },
    {
      id: 2,
      name: "Pants",
      image:
        "https://cdn.blanxer.com/category_image/649bdead6d8fbbdc514712e1/649be1946d8fbbdc514715e1.png",
      price: 2000,
      inventory: 5,
      status: "Active",
      created: "jan 20, 2022",
    },
    {
      id: 3,
      name: "Bags",
      image:
        "https://cdn.blanxer.com/category_image/649bdead6d8fbbdc514712e1/649be1946d8fbbdc514715e1.png",
      price: 2000,
      inventory: 5,
      status: "Active",
      created: "jan 20, 2022",
    },
  ];
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-slate-500 text-lg">Products</h1>
        <button className="text-slate-50 bg-brand cursor-pointer px-4 py-2 text-sm rounded-lg font-semibold hover:bg-opacity-80">
          Add Product
        </button>
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
          <tbody>
            {category.length > 0 ? (
              category.map((cat, idx) => (
                <tr key={cat.id} className="hover:bg-slate-400 cursor-pointer">
                  <td className="pl-4">{idx + 1}</td>
                  <td className="pl-4">
                    <div className="p-2 pl-0">
                      <span className="text-slate-600 font-semibold">
                        {cat.name}
                      </span>
                    </div>
                  </td>
                  <td className="pl-4">5</td>
                  <td className="pl-4">{currencyFormat(cat.price)}</td>
                  <td className="pl-4">unpaid</td>
                  <td className="pl-4">COD</td>
                  <td className="pl-4">Pending</td>
                  <td className="pl-4">Jan 7, 2024</td>
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
        </table>
      </div>
    </div>
  );
}

export default Orders;
