import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderProcessing, setOrderProcessing] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, [token]);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/api/carts", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(response.data.cart);
            setError(null);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setError("Failed to load your cart. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        
        try {
            const response = await axios.put(
                `http://localhost:5000/api/carts/update/${productId}`,
                { quantity: newQuantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            if (response.data.success) {
                fetchCart(); // Refresh cart after successful update
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
            alert("Failed to update quantity. Please try again.");
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/carts/remove/${productId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                fetchCart(); // Refresh cart after removal
                setSelectedItems(selectedItems.filter(id => id !== productId));
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
            alert("Failed to remove item. Please try again.");
        }
    };

    const toggleItemSelection = (productId) => {
        setSelectedItems(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            } else {
                return [...prev, productId];
            }
        });
    };

    const placeOrder = async () => {
        if (selectedItems.length === 0) {
            alert("Please select items to order");
            return;
        }

        try {
            setOrderProcessing(true);
            
            const response = await axios.post(
                "http://localhost:5000/api/order/create", 
                { 
                    items: selectedItems
                }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 201) {
                alert("Order placed successfully!");
                fetchCart(); // Refresh cart
                setSelectedItems([]); // Clear selections
                navigate('/orders'); // Redirect to orders page
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setOrderProcessing(false);
        }
    };

    if (loading) {
        return <div className="text-center py-16"><p>Loading your cart...</p></div>;
    }

    if (error) {
        return <div className="text-center py-16 text-red-600">{error}</div>;
    }
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Navbar/>
            <h2 className="text-3xl font-bold text-amber-800 mb-8 mt-24 font-serif">My Cart</h2>
            
            {cart && cart.items?.length > 0 ? (
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left side - Cart items */}
                    <div className="md:w-1/2">
                        <div className="grid grid-cols-1 gap-4">
                            {cart.items.map(item => (
                                <div 
                                    key={item.productId}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(item.productId)}
                                            onChange={() => toggleItemSelection(item.productId)}
                                            className="w-5 h-5 text-amber-600"
                                        />
                                        <img 
                                            src={item.productImage} 
                                            alt={item.productName} 
                                            className="w-24 h-24 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 font-serif">{item.productName}</h4>
                                            <p className="text-sm text-gray-600">Design #: {item.productId.substring(0, 6)}</p>
                                            <div className="flex items-center mt-2">
                                                <button 
                                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                    className="bg-gray-200 px-2 py-1 rounded-l hover:bg-gray-300"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="bg-gray-100 px-3 py-1">
                                                    {item.quantity}
                                                </span>
                                                <button 
                                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                    className="bg-gray-200 px-2 py-1 rounded-r hover:bg-gray-300"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.productId)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Right side - Order summary */}
                    <div className="md:w-1/2">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4 text-amber-800 font-serif">Order Summary</h3>
                            
                            <div className="mt-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-700">Selected Items:</span>
                                    <span className="font-medium">{selectedItems.length}</span>
                                </div>
                                
                                <button 
                                    onClick={placeOrder}
                                    disabled={orderProcessing || selectedItems.length === 0} 
                                    className={`w-full py-3 bg-amber-700 text-white font-bold rounded-lg hover:bg-amber-800 transition duration-300 font-serif ${
                                        (orderProcessing || selectedItems.length === 0) ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {orderProcessing ? 'Processing...' : 'Place Order'}
                                </button>
                            </div>
                        </div>
                    </div>
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