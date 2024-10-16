import { CircleAlert, Trash2, XIcon } from "lucide-react";
import currencyFormat from "../../utils/currencyFormat";
import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getAllCategory,
  getAllProducts,
  updateProduct,
} from "../../api";
import Modal from "../Modal";
import { toast } from "react-toastify";
import Drawer from "../Drawer";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sellingPrice: "",
    crossedPrice: "",
    purchasedPrice: "",
    stock: "",
    category: "",
    brand: "",
    isSale: false,
    isActive: true,
    productImg: [],
    sizes: "",
    colors: "",
  });
  const [formDataErrors, setFormDataErrors] = useState({});
  const [updateFormData, setUpdateFormData] = useState({
    id: "",
    title: "",
    description: "",
    sellingPrice: "",
    crossedPrice: "",
    purchasedPrice: "",
    stock: "",
    category: "",
    brand: "",
    isSale: false,
    isActive: true,
    productImg: [],
    sizes: "",
    colors: "",
  });
  const [updateFormErrors, setUpdateFormErrors] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllProducts("?isActive");
        setProducts(response.data.data);
        const catResponse = await getAllCategory();
        setCategories(catResponse.data.data);
      } catch (error) {
        console.log("Failed to fetch products", error);
      }
    })();
  }, []);

  const handleModalClose = () => setIsModalOpen(false);
  const handleDrawerClose = () => setIsDrawerOpen(false);
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "productImg") {
      const files = e.target.files;
      setFormData((prev) => ({
        ...prev,
        [name]: [...files],
      }));
    } else if (name === "isSale" || name === "isActive") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "true",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
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
      for (const key in formData) {
        if (key !== "productImg" && key !== "sizes" && key !== "colors") {
          formDataToSend.append(key, formData[key]);
        }
      }
      formData.productImg.forEach((image) => {
        formDataToSend.append("productImg", image);
      });

      formData.sizes
        .split(",")
        .map((size) => size.trim())
        .forEach((size) => {
          formDataToSend.append("sizes", size);
        });
      formData.colors
        .split(",")
        .map((color) => color.trim())
        .forEach((color) => {
          formDataToSend.append("colors", color);
        });

      const response = await createProduct(formDataToSend);
      setProducts((prev) => [response.data.data, ...prev]);
      toast.success(response.data.message);
      handleModalClose();
      setFormData({
        title: "",
        description: "",
        sellingPrice: "",
        crossedPrice: "",
        purchasedPrice: "",
        stock: "",
        category: "",
        brand: "",
        isSale: false,
        productImg: [],
        sizes: "",
        colors: "",
        isActive: true,
      });
      setFormDataErrors({});
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleProductDelete = async (e, id) => {
    e.stopPropagation();
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      const loadingToastId = toast.loading("Deleting product...");
      try {
        const response = await deleteProduct(id);
        setProducts((prev) =>
          prev.filter((pro) => pro._id !== response.data.data._id)
        );
        toast.update(loadingToastId, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (error) {
        if (error.response && error.response.data.message) {
          toast.update(loadingToastId, {
            render: error.response.data.message,
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      }
    }
  };
  const handleRowClick = (id) => {
    const currentProduct = products.find((pro) => pro._id === id);
    setUpdateFormData({
      id: currentProduct._id,
      title: currentProduct.title,
      description: currentProduct.description,
      sellingPrice: currentProduct.sellingPrice,
      crossedPrice: currentProduct.crossedPrice || "",
      purchasedPrice: currentProduct.purchasedPrice || "",
      stock: currentProduct.stock,
      category: currentProduct.category._id,
      brand: currentProduct.brand || "",
      isSale: currentProduct.isSale,
      isActive: currentProduct.isActive,
      productImg: [],
      sizes: currentProduct.sizes.join(",") || "",
      colors: currentProduct.colors.join(",") || "",
    });

    setIsDrawerOpen(true);
  };

  const handleProductUpdateChange = (e) => {
    const { name, value } = e.target;
    if (name === "productImg") {
      const files = e.target.files;
      setUpdateFormData((prev) => ({
        ...prev,
        [name]: [...files],
      }));
    } else if (name === "isSale" || name === "isActive") {
      setUpdateFormData((prev) => ({
        ...prev,
        [name]: value === "true",
      }));
    } else {
      setUpdateFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleProductUpdate = async (e) => {
    e.preventDefault();

    if (
      !updateFormData.title ||
      !updateFormData.description ||
      !updateFormData.sellingPrice ||
      !updateFormData.stock ||
      !updateFormData.category
    ) {
      setUpdateFormErrors({
        ...updateFormErrors,
        title: !updateFormData.title ? "Title is required" : "",
        description: !updateFormData.description
          ? "Description is required"
          : "",
        sellingPrice: !updateFormData.sellingPrice
          ? "Selling Price is required"
          : "",
        stock: !updateFormData.stock ? "Stock is required" : "",
        category: !updateFormData.category ? "Category is required" : "",
      });
      return;
    }

    try {
      setIsLoading(true);

      const formDataToSend = new FormData();
      for (const key in updateFormData) {
        if (key !== "productImg" && key !== "sizes" && key !== "colors") {
          formDataToSend.append(key, updateFormData[key]);
        }
      }
      if (updateFormData.productImg)
        updateFormData.productImg.forEach((image) => {
          formDataToSend.append("productImg", image);
        });

      if (updateFormData.sizes)
        updateFormData.sizes
          .split(",")
          .map((size) => size.trim())
          .forEach((size) => {
            formDataToSend.append("sizes", size);
          });
      if (updateFormData.colors)
        updateFormData.colors
          .split(",")
          .map((color) => color.trim())
          .forEach((color) => {
            formDataToSend.append("colors", color);
          });

      const response = await updateProduct(updateFormData.id, formDataToSend);
      setProducts((prev) =>
        prev.map((pro) =>
          pro._id === updateFormData.id ? response.data.data : pro
        )
      );
      toast.success(response.data.message);
      setIsDrawerOpen(false);
      setUpdateFormData({
        id: "",
        title: "",
        description: "",
        sellingPrice: "",
        crossedPrice: "",
        purchasedPrice: "",
        stock: "",
        category: "",
        brand: "",
        isSale: false,
        productImg: [],
        sizes: "",
        colors: "",
        isActive: true,
      });
      setUpdateFormErrors({});
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
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
                          checked={formData.isSale === true}
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
                          checked={formData.isSale === false}
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
                            checked={formData.isActive === true}
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
                            checked={formData.isActive === false}
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
              {products.length > 0 ? (
                products.map((product, idx) => (
                  <tr
                    key={product._id}
                    className="hover:bg-slate-400 cursor-pointer"
                    onClick={() => handleRowClick(product._id)}
                  >
                    <td className="text-center">{idx + 1}</td>
                    <td className="p-2">
                      <div className="flex gap-4">
                        <img
                          src={product.images[0].imageUrl}
                          alt={product.title}
                          className="h-12 w-12 object-cover rounded-lg"
                        />
                        <span className="text-slate-600 font-semibold line-clamp-2 w-80 ">
                          {product.title}
                        </span>
                      </div>
                    </td>
                    <td className="text-center">
                      {currencyFormat(product.sellingPrice)}
                    </td>
                    <td className="text-center">{product.stock}</td>
                    <td className="text-center">
                      {product.isActive === true ? "true" : "false"}
                    </td>
                    <td className="pl-4">
                      {new Date(product.createdAt).toLocaleDateString("en-Us", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="pl-4">
                      <Trash2
                        className="text-red-500"
                        size={20}
                        onClick={(e) => handleProductDelete(e, product._id)}
                      />
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
      <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose}>
        <div className="relative p-4 w-[80vw] h-full scrollbar-show overflow-y-auto">
          <form className="p-1 text-slate-600" onSubmit={handleProductUpdate}>
            <div className="flex items-center  justify-between">
              <h2 className="text-slate-600 font-semibold text-lg">
                Product Details
              </h2>
              <button
                type="button"
                onClick={handleDrawerClose}
                className=" hover:bg-red-600 rounded-full p-[2px] group transition-all"
              >
                <XIcon
                  size={25}
                  strokeWidth={3}
                  className="text-brand group-hover:text-slate-50 transition-all"
                />
              </button>
            </div>
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
                      value={updateFormData.title}
                      onChange={handleProductUpdateChange}
                      className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                    />
                  </label>
                  <span className="text-red-600 text-sm flex items-center">
                    {updateFormErrors.title && (
                      <>
                        <CircleAlert className="h-3" />
                        {updateFormErrors.title}
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
                      value={updateFormData.description}
                      onChange={handleProductUpdateChange}
                      className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                    ></textarea>
                  </label>
                  <span className="text-red-600 text-sm flex items-center">
                    {updateFormErrors.description && (
                      <>
                        <CircleAlert className="h-3" />
                        {updateFormErrors.description}
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
                      value={updateFormData.sellingPrice}
                      onChange={handleProductUpdateChange}
                      className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                    />
                  </label>
                  <span className="text-red-600 text-sm flex items-center">
                    {updateFormErrors.sellingPrice && (
                      <>
                        <CircleAlert className="h-3" />
                        {updateFormErrors.sellingPrice}
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
                      value={updateFormData.crossedPrice}
                      onChange={handleProductUpdateChange}
                      className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                    />
                  </label>
                  <span className="text-red-600 text-sm flex items-center">
                    {updateFormErrors.crossedPrice && (
                      <>
                        <CircleAlert className="h-3" />
                        {updateFormErrors.crossedPrice}
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
                      value={updateFormData.purchasedPrice}
                      onChange={handleProductUpdateChange}
                      className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                    />
                  </label>
                  <span className="text-red-600 text-sm flex items-center">
                    {updateFormErrors.purchasedPrice && (
                      <>
                        <CircleAlert className="h-3" />
                        {updateFormErrors.purchasedPrice}
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
                      value={updateFormData.stock}
                      onChange={handleProductUpdateChange}
                      className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                    />
                  </label>
                  <span className="text-red-600 text-sm flex items-center">
                    {updateFormErrors.stock && (
                      <>
                        <CircleAlert className="h-3" />
                        {updateFormErrors.stock}
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
                      value={updateFormData.category}
                      onChange={handleProductUpdateChange}
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
                    {updateFormErrors.title && (
                      <>
                        <CircleAlert className="h-3" />
                        {updateFormErrors.title}
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
                      value={updateFormData.brand}
                      onChange={handleProductUpdateChange}
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
                        checked={updateFormData.isSale === true}
                        onChange={handleProductUpdateChange}
                        className="accent-brand"
                      />
                      <span>true</span>
                    </label>
                    <label className="flex gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="isSale"
                        value={false}
                        checked={updateFormData.isSale === false}
                        onChange={handleProductUpdateChange}
                        className="accent-brand"
                      />
                      <span>false</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label>
                    <p className="mt-3">
                      New Images{" "}
                      <span className="text-xs">(Select multiple)</span>
                    </p>
                    <input
                      type="file"
                      name="productImg"
                      onChange={handleProductUpdateChange}
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
                      value={updateFormData.sizes}
                      placeholder="M , L , XL , 2XL"
                      onChange={handleProductUpdateChange}
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
                      value={updateFormData.colors}
                      placeholder="Red , Blue , White , Black"
                      onChange={handleProductUpdateChange}
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
                          checked={updateFormData.isActive === true}
                          onChange={handleProductUpdateChange}
                          className="accent-brand"
                        />
                        <span>true</span>
                      </label>
                      <label className="flex gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="isActive"
                          value={false}
                          checked={updateFormData.isActive === false}
                          onChange={handleProductUpdateChange}
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
                      <span>Update Product</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  );
}

export default Products;
