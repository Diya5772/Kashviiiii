import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SimilarProducts from "../components/SimmilarProduct";
import Navbar from "../components/navbar";
import Footer from '../components/Footer';

const ShowProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState({ rating: 0, comment: "" });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [hasSubmittedReview, setHasSubmittedReview] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/${id}`);
        const data = await response.json();
        setProduct(data);
        fetchReviews();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleMouseMove = (e) => {
    if (!isZooming) return;

    const image = e.currentTarget;
    const { left, top, width, height } = image.getBoundingClientRect();

    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setZoomPosition({ x, y });
  };




  const DetailRow = ({ label, value }) => (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  const renderProductDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <DetailRow label="Category" value={product.category} />
        <DetailRow label="Border" value={product.filters.border || "N/A"} />
        <DetailRow label="Border Type" value={product.filters["Border Type"] || "N/A"} />
        <DetailRow label="Fabric Purity" value={product.filters["Fabric Purity"] || "N/A"} />
        <DetailRow label="Material" value={product.filters.Material || "N/A"} />
        <DetailRow label="Occasion" value={product.filters.Occasion || "N/A"} />
      </div>
      <div className="space-y-4">
        <DetailRow label="Ornamentation" value={product.filters["Oranamentation Type"] || "N/A"} />
        <DetailRow label="Pattern" value={product.filters.Pattern || "N/A"} />
        <DetailRow label="Color" value={product.filters.Color || "N/A"} />
        <DetailRow label="Technique" value={product.filters.Technique || "N/A"} />
        <DetailRow label="Zari Color" value={product.filters["Zari Color"] || "N/A"} />
        <DetailRow label="Zari Type" value={product.filters["Zari Type"] || "N/A"} />
      </div>
    </div>
  );

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/carts/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1
        })
      });
      const data = await response.json();
      alert(data.message || "Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const addToWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/wishlist/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product._id
        })
      });
      const data = await response.json();
      alert(data.message || "Item added to wishlist!");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("Failed to add item to wishlist.");
    }
  };
  const checkUserReview = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/review/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const reviews = await response.json();
      const userReviewExists = reviews.some(review => {
        // Assuming the backend populates userId or includes a way to identify user's review
        return review.userId === JSON.parse(atob(token.split('.')[1])).id;
      });
      setHasSubmittedReview(userReviewExists);
    } catch (error) {
      console.error("Error checking user review:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/review/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to submit a review.");
      return;
    }

    if (hasSubmittedReview) {
      alert("You have already submitted a review for this product.");
      return;
    }

    if (userReview.rating === 0) {
      alert("Please select a rating.");
      return;
    }

    if (!userReview.comment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/review/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rating: userReview.rating,
          comment: userReview.comment
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit review.");
      }

      alert("Review submitted successfully!");
      setHasSubmittedReview(true);
      setUserReview({ rating: 0, comment: "" });
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(error.message);
    }
  };

  const updateReview = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/review/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rating: userReview.rating,
          comment: userReview.comment
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      alert("Review updated successfully!");
      fetchReviews();
    } catch (error) {
      console.error("Error updating review:", error);
      alert(error.message);
    }
  };

  const deleteReview = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (window.confirm("Are you sure you want to delete your review?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/review/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        alert("Review deleted successfully!");
        setHasSubmittedReview(false);
        setUserReview({ rating: 0, comment: "" });
        fetchReviews();
      } catch (error) {
        console.error("Error deleting review:", error);
        alert(error.message);
      }
    }
  };


  if (loading) {
    return <div className="text-center text-xl font-semibold mt-10">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center text-xl font-semibold mt-10">Product not found</div>;
  }

  return (
    <div className="bg-[#F8F3E5]"><Navbar />
      <div className="max-w-full mx-28 px-4 sm:px-6 lg:px-8 py-8 mt-24 ">
        <div className="text-sm breadcrumbs mb-4">
          <span className="text-gray-500">
            Home / {product.category} / {product.name}
          </span>
        </div>

        <div className="max-w-full mx-16 px-4 py-10 flex flex-col lg:flex-row items-start bg-[#F8F3E5] justify-between gap-12 mb-5">
  {/* Left Column - Product Images */}
  <div className="lg:w-1/2 space-y-6">
    {/* Main Image with Zoom */}
    <div className="relative overflow-hidden bg-white rounded-lg shadow-md"
         style={{ paddingBottom: "140%" }}>
      <div className="absolute inset-0 cursor-zoom-in"
           onMouseEnter={() => setIsZooming(true)}
           onMouseLeave={() => setIsZooming(false)}
           onMouseMove={handleMouseMove}>
        <img
          src={product.image ? product.image : "/api/placeholder/400/600"}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
          style={{
            filter: isZooming ? "brightness(0.9)" : "brightness(1)",
          }}
        />
        {isZooming && (
          <>
            {/* Zoom lens */}
            <div
              className="absolute w-40 h-24 border border-[#8B4513] bg-white/10 backdrop-blur-sm"
              style={{
                left: `${zoomPosition.x}%`,
                top: `${zoomPosition.y}%`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none"
              }}
            />
            {/* Zoomed view */}
            <div
              className="fixed left-[calc(50%+2rem)] top-1/2 w-[400px] h-[400px] 
                border border-[#8B4513] bg-white rounded-lg overflow-hidden shadow-xl"
              style={{
                transform: "translateY(-50%)",
                display: isZooming ? "block" : "none",
                zIndex: 50
              }}
            >
              <img
                src={product.image ? product.image : "/api/placeholder/400/600"}
                alt={`Zoomed view of ${product.name}`}
                className="absolute w-[400%] h-[400%] max-w-none"
                style={{
                  left: `${-zoomPosition.x * 4}%`,
                  top: `${-zoomPosition.y * 4}%`,
                  pointerEvents: "none"
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>

    {/* Thumbnails with decorative line */}
    <div className="relative">
      <div className="absolute -left-4 top-0 h-full flex flex-col justify-center">
        <div className="h-16 w-0.5 bg-[#8B4513]/30"></div>
        <div className="h-16 w-0.5 bg-[#8B4513]/30"></div>
      </div>
      <div className="flex gap-3 overflow-x-auto py-4 pl-8">
        {[product.image, ...(product.additionalImages || [])].map((img, index) => (
          <button
            key={index}
            className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden 
              ${selectedImageIndex === index ? "ring-2 ring-[#8B4513]" : ""}
              hover:ring-2 hover:ring-[#8B4513]/50 transition-all duration-200
              shadow-sm hover:shadow-md`}
            onClick={() => setSelectedImageIndex(index)}
          >
            <img
              src={img ? img : "/api/placeholder/80/80"}
              alt={`Product view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  </div>

  {/* Right Column - Product Info */}
  <div className="lg:w-1/2 space-y-8 pl-8">
    {/* Header */}
    <div className="space-y-4">
      <h2 className="text-sm uppercase tracking-wider text-[#8B4513]">
        SINGHANIA'S CHRONICLES
      </h2>
      <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 leading-tight">
        {product.name}
      </h1>
    </div>

    {/* Product Details */}
    <div className="relative">
      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 space-y-4">
        <div className="h-16 w-0.5 bg-[#8B4513]/30"></div>
        <div className="h-16 w-0.5 bg-[#8B4513]/30"></div>
      </div>
      
      <div className="pl-8 space-y-6">
        <p className="text-2xl font-serif text-[#8B4513]">
          Design No: {product.price?.toLocaleString()}
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          {product.description}
        </p>
        <p className="text-gray-600">
          Category: {product.category}
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-4 mt-8">
          <button
            onClick={addToCart}
            className="w-full bg-[#8B4513] text-white py-3 px-8 
              hover:bg-[#6d3610] transition-colors duration-300"
          >
            Add to Cart
          </button>
          <button
            onClick={addToWishlist}
            className="w-full border-2 border-[#8B4513] text-[#8B4513] 
              py-3 px-8 hover:bg-[#8B4513] hover:text-white 
              transition-colors duration-300"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>

    {/* Timestamp */}
    <div className="pl-8 text-sm text-gray-500">
      Last updated: {new Date("2025-02-19 12:29:04").toLocaleString()}
    </div>
  </div>
</div>

{/* Decorative line */}
<div className="w-full flex justify-center items-center py-4 bg-[#F8F3D9]">
  <div className="w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#8B4513] to-transparent"></div>
</div>
        <div className="mt-16">
          {/* Tabs Section */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("about")}
                className={`py-4 text-lg font-serif ${activeTab === "about"
                  ? "border-b-2 border-[#504B38]"
                  : "text-gray-500"
                  }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 text-lg font-serif ${activeTab === "reviews"
                  ? "border-b-2 border-[#504B38]"
                  : "text-gray-500"
                  }`}
              >
                Reviews
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="py-8">
            {activeTab === "about" && renderProductDetails()}

            {activeTab === "reviews" && (
              <div>
                {/* Review Submission Form */}
                <form onSubmit={submitReview} className="mb-8">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setUserReview((prev) => ({ ...prev, rating: star }))
                          }
                          className={`text-2xl ${star <= userReview.rating ? "text-white" : "text-gray-300"
                            }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Your Review</label>
                    <textarea
                      value={userReview.comment}
                      onChange={(e) =>
                        setUserReview((prev) => ({ ...prev, comment: e.target.value }))
                      }
                      className="w-full px-3 py-2 border rounded-md"
                      rows="4"
                      placeholder="Write your review here..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-amber-600 text-white px-6 py-2 rounded-md hover:bg-amber-700"
                  >
                    Submit Review
                  </button>
                </form>

                {/* Display Reviews */}
                <div className="space-y-6">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review._id} className="border-b pb-6">
                        <div className="flex items-center mb-2">
                          <div className="text-amber-400 mr-2">
                            {"★".repeat(review.rating)}
                            {"☆".repeat(5 - review.rating)}
                          </div>
                          <span className="text-gray-600">{review.userName}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      No reviews yet. Be the first to review!
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Your existing product details */}

            {/* Add Similar Products section */}
            {product && (
              <div className="mt-16">
                <SimilarProducts currentProduct={product} />
              </div>
            )}
          </div>
        </div>


      </div>
      <div>
  <Footer/>
</div>
    </div>
  );
};

export default ShowProduct;