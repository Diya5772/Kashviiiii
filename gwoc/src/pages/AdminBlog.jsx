import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", content: "", image: null });

  useEffect(() => {
    axios.get("http://localhost:5000/api/blog/all").then((res) => setBlogs(res.data));
  }, []);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Kashviii"); // Replace with your Cloudinary preset

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dowlh9mli/image/upload", formData);
      return res.data.secure_url; // Cloudinary URL
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleAddBlog = async () => {
    let imageUrl = "";

    if (newBlog.image) {
      imageUrl = await handleImageUpload(newBlog.image);
      if (!imageUrl) {
        alert("Image upload failed!");
        return;
      }
    }

    await axios.post("http://localhost:5000/api/blog/add", { ...newBlog, image: imageUrl });
    setNewBlog({ title: "", content: "", image: null });
    window.location.reload();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Blog Panel</h1>

      {/* Add Blog Form */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Title"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Content"
          value={newBlog.content}
          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
          className="border p-2 w-full mt-2"
        />
        <input
          type="file"
          onChange={(e) => setNewBlog({ ...newBlog, image: e.target.files[0] })}
          className="mt-2"
        />
        <button onClick={handleAddBlog} className="bg-blue-500 text-white px-4 py-2 mt-2">
          Add Blog
        </button>
      </div>
    </div>
  );
};

export default AdminBlog;
