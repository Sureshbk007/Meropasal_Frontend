import { CircleAlert, Trash2, XIcon } from "lucide-react";
import currencyFormat from "../../utils/currencyFormat";
import { useEffect, useState } from "react";
import { createProduct, getAllCategory, getAllProducts } from "../../api";
import Modal from "../Modal";
function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [formDataErrors, setFormDataErrors] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data.data);
        const catResponse = await getAllCategory();
        setCategories(catResponse.data.data);
      } catch (error) {
        console.log("Failed to fetch products", error);
      }
    })();
  }, []);

  const handleModalClose = () => setIsModalOpen(false);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.sellingPrice ||
      !formData.stock ||
      !formData.category
    ) {
      setFormDataErrors({
        ...formDataErrors,
        title: !formData.title ? "Title is required" : "",
        description: !formData.description ? "Description is required" : "",
        sellingPrice: !formData.sellingPrice ? "Selling Price is required" : "",
        stock: !formData.stock ? "Stock is required" : "",
        category: !formData.category ? "Category is required" : "",
      });
      return;
    }

    try {
      setIsLoading(true);

      const formDataToSend = new FormData();

      if (formData.productImg && formData.productImg.length > 0) {
        formData.productImg.forEach((img) => {
          formDataToSend.append("productImg[]", img);
        });
      }
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("sellingPrice", formData.sellingPrice);
      formDataToSend.append("crossedPrice", formData.crossedPrice);
      formDataToSend.append("purchasedPrice", formData.purchasedPrice);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("brand", formData.brand);
      formDataToSend.append("isSale", formData.isSale);
      formDataToSend.append("isActive", formData.isActive);
      formData.sizes
        .split(",")
        .map((size) => size.trim())
        .forEach((size) => {
          formDataToSend.append("sizes[]", size);
        });
      formData.colors
        .split(",")
        .map((color) => size.trim())
        .forEach((color) => {
          formDataToSend.append("colors[]", color);
        });

      // Make an API request to add the product to your backend
      // await createProduct(productData);
      // console.log(productData);
      // // Reset form after successful submission
      // setFormData({
      //   title: "",
      //   description: "",
      //   sellingPrice: "",
      //   crossedPrice: "",
      //   purchasedPrice: "",
      //   stock: "",
      //   category: "",
      //   brand: "",
      //   isSale: false,
      //   productImg: [],
      //   sizes: "",
      //   colors: "",
      //   isActive: true,
      // });

      // // Clear any errors
      // setFormDataErrors({});
      // alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "productImg") {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        [name]: files,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-slate-500 text-lg">Products</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-slate-50 bg-brand cursor-pointer px-4 py-2 text-sm rounded-lg font-semibold hover:bg-opacity-80"
        >
          Add Product
        </button>
        <Modal isModalOpen={isModalOpen} handleClose={handleModalClose}>
          <div className="relative bg-white w-[90vw] h-[90vh] p-2 rounded-lg overflow-auto scrollbar-show">
            <button
              onClick={handleModalClose}
              className="absolute top-3 right-3 hover:bg-red-600 rounded-full p-[2px] group transition-all"
            >
              <XIcon
                size={25}
                strokeWidth={3}
                className="text-brand group-hover:text-slate-50 transition-all"
              />
            </button>
            <form className="p-1 text-slate-600" onSubmit={handleAddProduct}>
              <h2 className="text-lg  font-semibold text-slate-600">
                Add Product
              </h2>
              <div className="flex gap-5 flex-col md:flex-row">
                <div className="flex-1">
                  <div>
                    <label>
                      <p className="mt-3">
                        Product Title<span className="text-orange-600">*</span>
                      </p>
                      <input
                        type="text"
                        name="title"
                        placeholder="eg: Brown cargo pants"
                        value={formData?.title}
                        onChange={handleFormChange}
                        className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                      />
                    </label>
                    <span className="text-red-600 text-sm flex items-center">
                      {formDataErrors.title && (
                        <>
                          <CircleAlert className="h-3" />
                          {formDataErrors.title}
                        </>
                      )}
                    </span>
                  </div>
                  <div>
                    <label>
                      <p className="mt-3">
                        Product Description
                        <span className="text-orange-600">*</span>
                      </p>
                      <textarea
                        placeholder="Your content goes here"
                        rows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                      ></textarea>
                    </label>
                    <span className="text-red-600 text-sm flex items-center">
                      {formDataErrors.description && (
                        <>
                          <CircleAlert className="h-3" />
                          {formDataErrors.description}
                        </>
                      )}
                    </span>
                  </div>
                  <div>
                    <label>
                      <p className="mt-3">
                        Selling Price<span className="text-orange-600">*</span>
                      </p>
                      <input
                        type="number"
                        name="sellingPrice"
                        value={formData?.sellingPrice}
                        onChange={handleFormChange}
                        className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                      />
                    </label>
                    <span className="text-red-600 text-sm flex items-center">
                      {formDataErrors.sellingPrice && (
                        <>
                          <CircleAlert className="h-3" />
                          {formDataErrors.sellingPrice}
                        </>
                      )}
                    </span>
                  </div>
                  <div>
                    <label>
                      <p className="mt-3 line-through">Crossed Price</p>
                      <input
                        type="number"
                        name="crossedPrice"
                        value={formData?.crossedPrice}
                        onChange={handleFormChange}
                        className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                      />
                    </label>
                    <span className="text-red-600 text-sm flex items-center">
                      {formDataErrors.crossedPrice && (
                        <>
                          <CircleAlert className="h-3" />
                          {formDataErrors.crossedPrice}
                        </>
                      )}
                    </span>
                  </div>
                  <div>
                    <label>
                      <p className="mt-3 ">Purchased Price per Unit</p>
                      <input
                        type="number"
                        name="purchasedPrice"
                        value={formData?.purchasedPrice}
                        onChange={handleFormChange}
                        className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                      />
                    </label>
                    <span className="text-red-600 text-sm flex items-center">
                      {formDataErrors.purchasedPrice && (
                        <>
                          <CircleAlert className="h-3" />
                          {formDataErrors.purchasedPrice}
                        </>
                      )}
                    </span>
                  </div>
                  <div>
                    <label>
                      <p className="mt-3">
                        Stock<span className="text-orange-600">*</span>
                      </p>
                      <input
                        type="number"
                        name="stock"
                        value={formData?.stock}
                        onChange={handleFormChange}
                        className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                      />
                    </label>
                    <span className="text-red-600 text-sm flex items-center">
                      {formDataErrors.stock && (
                        <>
                          <CircleAlert className="h-3" />
                          {formDataErrors.stock}
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <div>
                    <label>
                      <p className="mt-3">
                        Category<span className="text-orange-600">*</span>
                      </p>
                      <select
                        name="category"
                        value={formData?.category || ""}
                        onChange={handleFormChange}
                        className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                      >
                        <option value="">Select a category</option>
                        {categories.length > 0 &&
                          categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                      </select>
                    </label>
                    <span className="text-red-600 text-sm flex items-center">
                      {formDataErrors.title && (
                        <>
                          <CircleAlert className="h-3" />
                          {formDataErrors.title}
                        </>
                      )}
                    </span>
                  </div>
                  <div>
                    <label>
                      <p className="mt-3">brand</p>
                      <input
                        type="text"
                        name="brand"
                        placeholder="eg: Nike"
                        value={formData?.brand}
                        onChange={handleFormChange}
                        className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                      />
                    </label>
                  </div>
                  <div>
                    <p className="mt-3">Is Sale?</p>
                    <div className="flex gap-5">
                      <label className="flex gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="isSale"
                          value={true}
                          onChange={handleFormChange}
                          className="accent-brand"
                        />
                        <span>true</span>
                      </label>
                      <label className="flex gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="isSale"
                          value={false}
                          onChange={handleFormChange}
                          className="accent-brand"
                        />
                        <span>false</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label>
                      <p className="mt-3">
                        Images{" "}
                        <span className="text-xs">(Select multiple)</span>
                      </p>
                      <input
                        type="file"
                        name="productImg"
                        onChange={handleFormChange}
                        multiple
                        className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      <p className="mt-3">Sizes</p>
                      <input
                        type="text"
                        name="sizes"
                        placeholder="M , L , XL , 2XL"
                        onChange={handleFormChange}
                        className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      <p className="mt-3">Colors</p>
                      <input
                        type="text"
                        name="colors"
                        placeholder="Red , Blue , White , Black"
                        onChange={handleFormChange}
                        className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                      />
                    </label>
                  </div>
                  <div className="flex gap-2 flex-col md:flex-row md:gap-20 md:items-end mt-5">
                    <div>
                      <p>Is Active?</p>
                      <div className="flex gap-5">
                        <label className="flex gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="isActive"
                            value={true}
                            onChange={handleFormChange}
                            className="accent-brand"
                          />
                          <span>true</span>
                        </label>
                        <label className="flex gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="isActive"
                            value={false}
                            onChange={handleFormChange}
                            className="accent-brand"
                          />
                          <span>false</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className=" bg-brand text-slate-50 py-3 w-full rounded-lg hover:bg-opacity-90"
                    >
                      {isLoading ? (
                        <l-line-spinner
                          size="25"
                          stroke="2"
                          speed="1"
                          color="white"
                        />
                      ) : (
                        <span>Add Product</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <div>
        {isLoading ? (
          "Loading..."
        ) : (
          <table className="w-full p-5 mt-5 text-slate-700 rounded-lg bg-slate-200 overflow-hidden">
            <thead>
              <tr>
                <th className="text-start p-3">#</th>
                <th className="text-start p-3">Name</th>
                <th className="text-start p-3">Price</th>
                <th className="text-start p-3">Inventory</th>
                <th className="text-start p-3">Status</th>
                <th className="text-start p-3">Created</th>
                <th className="text-start p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.length > 0 ? (
                products.map((product, idx) => (
                  <tr
                    key={product._id}
                    className="hover:bg-slate-400 cursor-pointer"
                  >
                    <td className="pl-4">{idx + 1}</td>
                    <td className="pl-4">
                      <div className="flex gap-4 mt-4">
                        <img
                          src={product.images[0].imageUrl}
                          alt={product.title}
                          className="h-12 rounded-lg"
                        />
                        <span className="text-slate-600 font-semibold">
                          {product.title}
                        </span>
                      </div>
                    </td>
                    <td className="pl-4">
                      {currencyFormat(product.sellingPrice)}
                    </td>
                    <td className="pl-4">{product.stock}</td>
                    <td className="pl-4">{product.isActive}</td>
                    <td className="pl-4">{product.createdAt}</td>
                    <td className="pl-4">
                      <Trash2 className="text-red-500" size={20} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center">
                    No Products to show, add Product
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Products;
