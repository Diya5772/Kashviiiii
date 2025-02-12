import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import FaHeart from '../assets/assets/heart-solid.svg';
import FaRegular from '../assets/assets/heart_icon.svg';
import { assets } from '../assets/assets/frontend_assets/assets';

const ProductItem = ({ name, _id, image, price, description, category, subcategory, size, date }) => {
  const { addToCart, toggleLike, likedItems = [] } = useContext(ShopContext);
  const isLiked = likedItems.includes(_id); // ✅ Use `_id` instead of `id`

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={image?.[0] || "/placeholder.jpg"} alt={name} className="w-full h-40 object-cover rounded" />
      <p className="mt-2 font-medium text-lg">{name}</p>
      <p className="text-gray-600">${price}</p>
      <div className="flex justify-between mt-2">
        <button onClick={() => toggleLike(_id)} aria-label="Like this product">
          {isLiked ? (
            <img src={FaHeart} alt="Liked" className="w-6 h-6 text-red-500" />
          ) : (
            <img src={FaRegular} alt="Like" className="w-6 h-6" />
          )}
        </button>
        <button onClick={() => addToCart({ _id, name, image, price, description, category, subcategory, size: size?.[0] || "M", date })}>
          <img src={assets.cart_icon} alt="Cart" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};


const Collection = () => {
  const { products = [] } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t px-4 sm:px-10">
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <h1>ALL COLLECTION</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
     {filteredProducts.length > 0 ? (
  filteredProducts.map((item) => <ProductItem key={item._id} {...item} />)
) : (
  <p className="text-gray-500 text-center">No products found. Try adjusting the filters.</p>
)}

        </div>
      </div>
    </div>
  );
};

const PopularCollection = () => {
  const { products = [], likes = {} } = useContext(ShopContext);
const popularProducts = products
  .filter((product) => likes[product._id] > 0)
  .sort((a, b) => likes[b._id] - likes[a._id]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">Popular Collection</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mt-4">
        {popularProducts.map((item, index) => (
<ProductItem key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Collection;
export { PopularCollection };
