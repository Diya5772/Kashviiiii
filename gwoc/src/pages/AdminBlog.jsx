import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", content: "", image: null });
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/blog/all").then((res) => setBlogs(res.data));
  }, []);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Kashviii");

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dowlh9mli/image/upload", formData);
      return res.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleAddOrUpdateBlog = async () => {
    let imageUrl = editingBlog?.image || "";

    if (newBlog.image && typeof newBlog.image !== "string") {
      imageUrl = await handleImageUpload(newBlog.image);
      if (!imageUrl) {
        alert("Image upload failed!");
        return;
      }
    }

    if (editingBlog) {
      await axios.put(`http://localhost:5000/api/blog/update/${editingBlog._id}`, {
        title: newBlog.title,
        content: newBlog.content,
        image: imageUrl,
      });
      setEditingBlog(null);
    } else {
      await axios.post("http://localhost:5000/api/blog/add", { ...newBlog, image: imageUrl });
    }

    setNewBlog({ title: "", content: "", image: null });
    window.location.reload();
  };

  const handleEdit = (blog) => {
    setNewBlog({ title: blog.title, content: blog.content, image: blog.image });
    setEditingBlog(blog);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/blog/delete/${id}`);
    setBlogs(blogs.filter((blog) => blog._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Blog Panel</h1>

      {/* Add/Edit Blog Form */}
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
        <button onClick={handleAddOrUpdateBlog} className="bg-blue-500 text-white px-4 py-2 mt-2">
          {editingBlog ? "Update Blog" : "Add Blog"}
        </button>
      </div>

      {/* Blog List */}
      <div className="mt-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="border p-4 mb-4 rounded">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p>{blog.content}</p>
            {blog.image && <img src={blog.image} alt={blog.title} className="mt-2 w-32 h-32 object-cover" />}
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleEdit(blog)} className="bg-green-500 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(blog._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;