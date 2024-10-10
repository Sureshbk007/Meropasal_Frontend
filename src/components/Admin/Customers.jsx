function Customers() {
  const category = [
    {
      id: 1,
      name: "Watches",
      image:
        "https://cdn.blanxer.com/category_image/649bdead6d8fbbdc514712e1/649be1946d8fbbdc514715e1.png",
    },
    {
      id: 2,
      name: "Pants",
      image:
        "https://cdn.blanxer.com/category_image/649bdead6d8fbbdc514712e1/649be1946d8fbbdc514715e1.png",
    },
    {
      id: 3,
      name: "Bags",
      image:
        "https://cdn.blanxer.com/category_image/649bdead6d8fbbdc514712e1/649be1946d8fbbdc514715e1.png",
    },
    {
      id: 4,
      name: "Shirt",
      image:
        "https://cdn.blanxer.com/category_image/649bdead6d8fbbdc514712e1/649be1946d8fbbdc514715e1.png",
    },
    {
      id: 5,
      name: "Purse",
      image:
        "https://cdn.blanxer.com/category_image/649bdead6d8fbbdc514712e1/649be1946d8fbbdc514715e1.png",
    },
  ];
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-slate-500 text-lg">Customers</h1>
        <button className="text-slate-50 bg-brand cursor-pointer px-4 py-2 text-sm rounded-lg font-semibold hover:bg-opacity-80">
          Add Customer
        </button>
      </div>
      <div>
        <table className="w-full p-5 mt-5 text-slate-700 rounded-lg bg-slate-300 overflow-hidden">
          <thead>
            <tr>
              <th className="text-start p-3">#</th>
              <th className="text-start p-3">Name</th>
              <th className="text-start p-3">Email</th>
              <th className="text-start p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {category.length > 0 ? (
              category.map((cat, idx) => (
                <tr key={cat.id} className="hover:bg-slate-400 cursor-pointer">
                  <td className="pl-4">{idx + 1}</td>
                  <td className="pl-4">
                    <div className="flex gap-4 mt-4">
                      <span className="text-slate-600 font-semibold">
                        {cat.name}
                      </span>
                    </div>
                  </td>
                  <td className="pl-4">{cat.name}</td>
                  <td className="pl-4">{Date.now()}</td>
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

export default Customers;
