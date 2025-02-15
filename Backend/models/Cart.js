import axios from "axios";
import { useEffect, useState } from "react";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/carts", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log("Cart Data:", response.data); // Debugging log
                setCart(response.data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCart();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>

            {cart && cart.items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cart.items.map((item) => (
                        <div key={item.productId} className="border p-4 rounded-lg shadow-lg">
                            <img 
                                src={`http://localhost:5000${item.image}`} 
                                alt={item.name} 
                                className="w-full h-40 object-cover rounded-lg"
                                onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                            />
                            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                            <p className="text-gray-700">Quantity: {item.quantity}</p>
                            <p className="text-gray-900 font-bold">Price: ₹{item.price}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
