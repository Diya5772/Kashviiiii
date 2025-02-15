import React, { useEffect, useState } from "react";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blog/all")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="border p-4 rounded-lg shadow-lg bg-white">
            {/* Image Display */}
            {blog.image ? (
              <img 
                src={blog.image} 
                alt="Blog Cover" 
                className="w-full h-48 object-cover rounded-md mb-2"
                onError={(e) => { e.target.src = "/default-blog-image.jpg"; }} // Fallback image
              />
            ) : (
              <img 
                src="/default-blog-image.jpg" 
                alt="Default Cover" 
                className="w-full h-48 object-cover rounded-md mb-2"
              />
            )}
            
            {/* Blog Details */}
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="text-gray-700">{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
