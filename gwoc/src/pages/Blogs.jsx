import React, { useEffect, useState } from "react";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/blog/all").then((res) => setBlogs(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Blogs</h1>
      <div className="mt-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="border p-4 mt-2">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
