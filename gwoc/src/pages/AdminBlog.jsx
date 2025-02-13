import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/blog/all").then((res) => setBlogs(res.data));
  }, []);

  const handleAddBlog = async () => {
    await axios.post("http://localhost:5000/api/blog/add", newBlog);
    setNewBlog({ title: "", content: "" });
    window.location.reload();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/blog/delete/${id}`);
    setBlogs(blogs.filter((blog) => blog._id !== id));
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
        <button onClick={handleAddBlog} className="bg-blue-500 text-white px-4 py-2 mt-2">
          Add Blog
        </button>
      </div>

      {/* List of Blogs */}
      <div className="mt-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="border p-4 mt-2">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p>{blog.content}</p>
            <button
              onClick={() => handleDelete(blog._id)}
              className="bg-red-500 text-white px-4 py-1 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;
