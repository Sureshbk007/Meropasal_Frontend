import { Trash2, XIcon, XCircle, CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getAllProducts,
  updateCategory,
} from "../../api";
import Modal from "../Modal";
import Drawer from "../Drawer";
import { toast } from "react-toastify";
import "ldrs/lineSpinner";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    categoryName: "",
    categoryImage: null,
  });
  const [formDataErrors, setFormDataErrors] = useState({
    categoryName: "",
    categoryImage: null,
  });
  const [updateFormData, setUpdateFormData] = useState({
    categoryName: "",
    categoryImage: null,
  });
  const [updateFormErrors, setUpdateFormErrors] = useState({
    categoryName: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getAllCategory();
      setCategories(response.data.data);
    })();
  }, []);

  const handleModalClose = () => setIsModalOpen(false);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  const handleRowClick = (id) => {
    const currentCat = categories.find((cat) => cat._id === id);
    setUpdateFormData({
      id: currentCat._id,
      categoryName: currentCat.name,
      categoryImage: null,
    });
    setIsDrawerOpen(true);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!(formData.categoryName.trim().length > 0)) {
      return setFormDataErrors((prev) => ({
        ...prev,
        categoryName: "Category Name is required",
      }));
    }
    const categoryNameConflict = categories.findIndex(
      (cat) => cat.name.toLowerCase() === formData.categoryName.toLowerCase()
    );
    if (categoryNameConflict > -1) {
      return setFormDataErrors((prev) => ({
        ...prev,
        categoryName: "Category Name already exist",
      }));
    }
    if (!formData.categoryImage) {
      return setFormDataErrors((prev) => ({
        ...prev,
        categoryImage: "Category image is required",
      }));
    }

    try {
      setIsLoading(true);
      let formDataToSend = new FormData();
      formDataToSend.append("name", formData.categoryName);
      formDataToSend.append("categoryImg", formData.categoryImage);
      const response = await createCategory(formDataToSend);
      setCategories((prevCategories) => [
        response.data.data,
        ...prevCategories,
      ]);
      toast.success(response.data.data.message);
      setIsModalOpen(false);
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, categoryImage: file }));
    }
  };
  const handleUpdateImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdateFormData((prev) => ({ ...prev, categoryImage: file }));
    }
  };
  const handleCategoryDelete = async (e, id, name) => {
    e.stopPropagation();
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      const loadingToastId = toast.loading("Deleting category...");
      try {
        const hasProductsWithCategory = await getAllProducts(
          `?category=${name}&limit=1`
        );
        if (hasProductsWithCategory.data.data.length > 0) {
          return toast.update(loadingToastId, {
            render: "Products exists for this category",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
        const response = await deleteCategory(id);
        setCategories((prev) =>
          prev.filter((cat) => cat._id !== response.data.data._id)
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

  const handleCategoryUpdate = async (e) => {
    e.preventDefault();

    if (!(updateFormData.categoryName.trim().length > 0)) {
      return setUpdateFormErrors((prev) => ({
        ...prev,
        categoryName: "Category Name is required",
      }));
    }

    // Check for name conflict excluding the current category
    const nameConflict = categories.findIndex(
      (cat) =>
        cat.name.toLowerCase() === updateFormData.categoryName.toLowerCase() &&
        cat._id !== updateFormData.id
    );
    if (nameConflict > -1) {
      return setUpdateFormErrors((prev) => ({
        ...prev,
        categoryName: "Category Name already exists",
      }));
    }

    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("name", updateFormData.categoryName);
      if (updateFormData.categoryImage) {
        formDataToSend.append("categoryImg", updateFormData.categoryImage);
      }

      const response = await updateCategory(updateFormData.id, formDataToSend);

      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat._id === updateFormData.id ? response.data.data : cat
        )
      );

      toast.success("Category updated successfully!");
      setIsDrawerOpen(false);
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while updating the category.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-semibold text-slate-500 text-lg">Categories</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-slate-50 bg-brand cursor-pointer px-4 py-2 text-sm rounded-lg font-semibold hover:bg-opacity-80"
        >
          Add Category
        </button>

        <Modal isModalOpen={isModalOpen} handleClose={handleModalClose}>
          <div className="relative bg-white w-80 p-2 rounded-lg">
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
            <form className="p-1 text-slate-600" onSubmit={handleAddCategory}>
              <h2 className="text-lg  font-semibold text-slate-600">
                Add Category
              </h2>
              <div className="flex flex-col gap-20">
                <div>
                  <label>
                    <p className="mt-3">
                      Category Name<span className="text-orange-600">*</span>
                    </p>
                    <input
                      type="text"
                      name="categoryName"
                      value={formData.categoryName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                      className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                    />
                  </label>
                  <span className="text-red-600 text-sm flex items-center">
                    {formDataErrors.categoryName && (
                      <>
                        <CircleAlert className="h-3" />
                        {formDataErrors.categoryName}
                      </>
                    )}
                  </span>
                  <label>
                    <p className="mt-3">
                      Category Image<span className="text-orange-600">*</span>
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full mt-1"
                      name="categoryImg"
                      onChange={handleImageSelect}
                    />
                  </label>
                  <span className="text-red-600 text-sm flex items-center">
                    {formDataErrors.categoryImage && (
                      <>
                        <CircleAlert className="h-3" />
                        {formDataErrors.categoryImage}
                      </>
                    )}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-brand text-slate-50 p-2 rounded-lg hover:bg-opacity-90"
                >
                  {isLoading ? (
                    <l-line-spinner
                      size="25"
                      stroke="2"
                      speed="1"
                      color="white"
                    />
                  ) : (
                    <span>Save</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <div>
        <table className="w-full p-5 mt-5 text-slate-700 rounded-lg bg-slate-200 overflow-hidden">
          <thead>
            <tr>
              <th className="text-start p-3">#</th>
              <th className="text-start p-3">Name</th>
              <th className="text-start p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat, idx) => (
                <tr
                  key={cat._id}
                  className="hover:bg-slate-400 cursor-pointer"
                  onClick={() => handleRowClick(cat._id)}
                >
                  <td className="pl-4">{idx + 1}</td>
                  <td className="pl-4">
                    <div className="flex gap-4 mt-4">
                      <img
                        src={cat.image.imageUrl}
                        alt={cat.name}
                        className="h-12 w-12 object-cover rounded-lg"
                      />
                      <span className="text-slate-600 font-semibold">
                        {cat.name}
                      </span>
                    </div>
                  </td>
                  <td className="pl-4">
                    <Trash2
                      onClick={(e) =>
                        handleCategoryDelete(e, cat._id, cat.name)
                      }
                      className="text-red-600 h-10 w-10 p-[10px]"
                      size={20}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-5 text-center">
                  No Category to show, add category
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose}>
          <div className="relative md:min-w-96 p-4">
            <div className="flex items-center  justify-between">
              <h2 className="text-slate-600 font-semibold text-lg">
                Category Details
              </h2>
              <button
                onClick={handleDrawerClose}
                className=" hover:bg-gray-500 rounded-full p-[2px] group transition-all"
              >
                <XIcon
                  size={25}
                  strokeWidth={3}
                  className="text-brand group-hover:text-slate-50 transition-all"
                />
              </button>
            </div>
            <form onSubmit={handleCategoryUpdate}>
              <div className="flex flex-col gap-20">
                <div>
                  <label>
                    <p className="mt-3">
                      Category Name<span className="text-orange-600">*</span>
                    </p>
                    <input
                      type="text"
                      name="categoryName"
                      value={updateFormData.categoryName}
                      onChange={(e) =>
                        setUpdateFormData((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                      className="border border-1 outline-brand w-full p-1 pl-2 rounded mt-1 bg-slate-100"
                    />
                  </label>
                  <span className="text-red-600 text-sm flex items-center">
                    {updateFormErrors.categoryName && (
                      <>
                        <CircleAlert className="h-3" />
                        {updateFormErrors.categoryName}
                      </>
                    )}
                  </span>
                  <label>
                    <p className="mt-3">
                      New Category Image
                      <span className="text-orange-600">*</span>
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full mt-1"
                      onChange={handleUpdateImageSelect}
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-brand text-slate-50 p-2 rounded-lg hover:bg-opacity-90"
                >
                  {isLoading ? (
                    <l-line-spinner
                      size="25"
                      stroke="2"
                      speed="1"
                      color="white"
                    />
                  ) : (
                    <span>Update</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Drawer>
      </div>
    </>
  );
}

export default Categories;
