import React, { useEffect, useState } from "react";
import axios from "axios";

const FashionBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [expanded, setExpanded] = useState(false);  // State to handle read more toggle

  useEffect(() => {
    axios.get("http://localhost:5000/api/blog/all")
      .then(res => setBlogs(res.data))
      .catch(err => console.error("Error fetching blogs:", err));
  }, []);

  const Categories = ({ categories }) => (
    <div className="flex gap-2 mb-2">
      {categories.map((category, index) => (
        <span
          key={index}
          className={`text-sm ${index === 0 ? 'text-purple-500' : 'text-gray-800'}`}
        >
          {index > 0 && "| "}
          {category}
        </span>
      ))}
    </div>
  );

  const handleReadMore = (blog) => {
    setExpanded((prevState) => !prevState); // Toggle expanded state
    setSelectedBlog(blog); // Set the selected blog
  };

  return (
    <div className="max-w-7xl mx-auto p-6 ml-16">
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
        rel="stylesheet"
      /> {/* Import Playfair Display font */}

      <div className="flex flex-col gap-8">
        {blogs.map((blog, index) => (
          <div key={blog._id}>
            <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
              <div className="w-full md:w-2/5">
                <div className="w-full h-72">
                  <img
                    src={blog.image || "/default-blog-image.jpg"}
                    alt="Blog Cover"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "/default-blog-image.jpg"; }}
                  />
                </div>
              </div>
              <div className="w-full md:w-3/5">
                <h2 style={{ fontFamily: 'Playfair Display, serif' }} className="text-3xl font-bold mb-4">
                  {blog.title}
                </h2> {/* Inline style applied for Playfair Display */}
                <p className="text-gray-700 mb-6">
                  {blog.excerpt || blog.content.substring(0, 150)}...
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleReadMore(blog)} // Toggle the read more state
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                  >
                    <span>{expanded ? "Read Less" : "Read More"}</span>
                  </button>
                </div>
              </div>
            </div>
            {index < blogs.length - 1 && (
              <div className="w-full h-px bg-gray-200 bg-opacity-50 mb-8" />
            )}
          </div>
        ))}
      </div>

      {selectedBlog && expanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 rounded-xl p-8 shadow-lg max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setExpanded(false)} // Close the expanded view
              className="absolute top-4 right-4 text-lg font-bold text-gray-700"
            >
              ✕
            </button>
            <img
              src={selectedBlog.image || "/default-blog-image.jpg"}
              alt="Blog Cover"
              className="w-full h-[500px] object-cover mb-4 rounded-lg"
            />
            <h2 style={{ fontFamily: 'Playfair Display, serif' }} className="text-4xl font-bold mb-3">
              {selectedBlog.title}
            </h2> {/* Inline style applied for Playfair Display */}
            <p className="text-gray-500 mb-4">
              {new Date(selectedBlog.date).toLocaleDateString()}
            </p>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {selectedBlog.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FashionBlog;
