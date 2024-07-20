import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function AdminDashboard() {
  const [banner, setbanner] = useState(null);

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bannerImage", banner);
    if (!banner) return;
  };
  return (
    <div>
      <form onSubmit={handleFileSubmit}>
        <label>
          <h1>Banners: </h1>
          <input
            type="file"
            onChange={(e) => setbanner(e.target.files)}
            multiple
          />
        </label>
        <button
          type="submit"
          name="bannerImage"
          className="border bg-green-500 text-white px-4 py-2  hover:cursor-pointer hover:opacity-50"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default AdminDashboard;
