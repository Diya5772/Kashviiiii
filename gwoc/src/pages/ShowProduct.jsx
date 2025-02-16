import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/${id}`);
        const data = await response.json();
        setProduct(data);
        fetchSimilarProducts(data);
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

  const fetchSimilarProducts = async (currentProduct) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/similar?category=${currentProduct.category}&subCategory=${currentProduct.subCategory}&currentId=${currentProduct._id}`
      );
      const data = await response.json();
      setSimilarProducts(data);
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
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
        <DetailRow label="Border" value={product.filters.border||"N/A"} />
        <DetailRow label="Border Type" value={product.filters["Border Type"]||"N/A"} />
        <DetailRow label="Fabric Purity" value={product.filters["Fabric Purity"]||"N/A"} />
        <DetailRow label="Material" value={product.filters.Material||"N/A"} />
        <DetailRow label="Occasion" value={product.filters.Occasion||"N/A"} />
      </div>
      <div className="space-y-4">
        <DetailRow label="Ornamentation" value={product.filters["Oranamentation Type"]||"N/A"} />
        <DetailRow label="Pattern" value={product.filters.Pattern||"N/A"} />
        <DetailRow label="Color" value={product.filters.Color||"N/A"} />
        <DetailRow label="Technique" value={product.filters.Technique||"N/A"} />
        <DetailRow label="Zari Color" value={product.filters["Zari Color"]||"N/A"} />
        <DetailRow label="Zari Type" value={product.filters["Zari Type"]||"N/A"} />
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
      const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
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
      const response = await fetch(`http://localhost:5000/api/reviews/${id}`);
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
      const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
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
      const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
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
        const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-sm breadcrumbs mb-4">
        <span className="text-gray-500">
          Home / {product.category} / {product.name}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 space-y-4">
          <div 
            className="relative overflow-hidden bg-gray-100 rounded-lg"
            style={{ paddingBottom: "140%" }}
          >
            <div
              className="absolute inset-0 cursor-zoom-in"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.image ? product.image : "/api/placeholder/400/600"}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-200"
                style={{
                  filter: isZooming ? "brightness(0.3)" : "brightness(1)",
                }}
              />
              {isZooming && (
                <div
                  className="absolute w-48 h-48 border-2 border-amber-500 rounded-full overflow-hidden"
                  style={{
                    left: `${zoomPosition.x}%`,
                    top: `${zoomPosition.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
<img
  src={product.image ? product.image : "/api/placeholder/400/600"}
  alt={product.name}
  className="absolute w-[400%] h-[400%] max-w-none"
  style={{
    left: `${-zoomPosition.x * 4}%`,
    top: `${-zoomPosition.y * 4}%`,
  }}
/>

                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {[product.image, ...(product.additionalImages || [])].map((img, index) => (
              <button
                key={index}
                className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
                  selectedImageIndex === index ? "ring-2 ring-amber-500" : ""
                }`}
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

        <div className="lg:w-1/2">
          <h1 className="text-3xl font-serif text-gray-900 mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-amber-800 mb-4">Design No:{product.price.toLocaleString()}</p>
          <p className="text-gray-600 mb-6">Description  :{product.description}</p>

          <div className="space-y-2 mb-6">
            <p className="text-gray-600">Category  : {product.category}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={addToCart}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 px-6 rounded-md hover:from-amber-700 hover:to-amber-800 transition-all duration-200 font-serif text-lg"
            >
              Add to Cart
            </button>
            <button
              onClick={addToWishlist}
              className="w-full border-2 border-amber-600 text-amber-700 py-3 px-6 rounded-md hover:bg-amber-50 transition-colors duration-200 font-serif text-lg"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("about")}
              className={`py-4 text-lg font-serif ${
                activeTab === "about"
                  ? "border-b-2 border-amber-600 text-amber-800"
                  : "text-gray-500 hover:text-amber-600"
              }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 text-lg font-serif ${
                activeTab === "reviews"
                  ? "border-b-2 border-amber-600 text-amber-800"
                  : "text-gray-500 hover:text-amber-600"
              }`}
            >
              Reviews
            </button>
          </div>
        </div>

        <div className="py-8">
          {activeTab === "about" && renderProductDetails()}

          {activeTab === "reviews" && (
            <div>
              <form onSubmit={submitReview} className="mb-8">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Rating</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserReview({ ...userReview, rating: star })}
                        className={`text-2xl ${
                          star <= userReview.rating ? "text-amber-400" : "text-gray-300"
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
                    onChange={(e) => setUserReview({ ...userReview, comment: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    rows="4"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-amber-600 text-white px-6 py-2 rounded-md hover:bg-amber-700"
                >
                  Submit Review
                </button>
              </form>

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
                  <p className="text-center text-gray-500">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      
    </div>
  );
};

export default ShowProduct;