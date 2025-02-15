import { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/carts", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Fetched Cart:", response.data);
                setCart(response.data.cart);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCart();
    }, []);

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/carts/remove/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setCart(prevCart => ({
                ...prevCart,
                items: prevCart.items.filter(item => item.productId !== productId)
            }));

            console.log(`Removed item ${productId} from cart.`);
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold text-amber-800 mb-8 font-serif">My Cart</h2>
            
            {cart && cart.items?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cart.items.map(item => (
                        <div 
                            key={item.productId}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-sm mx-auto"
                        >
                            <img 
                                src={`http://localhost:5000${item.productImage}`} 
                                alt={item.name} 
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-serif">{item.name}</h3>
                                <p className="text-xl font-bold text-amber-700 mb-6 font-serif">₹{item.price.toLocaleString()}</p>
                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                <button
                                    onClick={() => removeFromCart(item.productId)}
                                    className="mt-4 px-6 py-3 border border-red-500 text-red-700 rounded-md hover:bg-red-50 transition-colors duration-200 font-serif"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-amber-800 font-serif">Your cart is empty</p>
                    <p className="text-amber-600 mt-2 font-serif">Add items to your cart to proceed with checkout</p>
                </div>
            )}
        </div>
    );
};

export default Cart;
