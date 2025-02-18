import { useState, useEffect } from "react";
import axios from "axios";
import { Send } from "lucide-react"; // Import the Send icon

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    const adminPhoneNumber = "9461458024"; // Admin phone number

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/order", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(response.data.orders);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError("Failed to load orders");
            setLoading(false);
        }
    };

    const sendOrderDetailsToAdmin = (order) => {
        const orderDetails = `
            New Order Placed:
            Order ID: ${order._id.substring(0, 8)}
            Customer: ${order.user.name}
            Email: ${order.user.email}
            Phone: ${order.user.phone}
            Order Items:
            ${order.items.map(item => `Product: ${item.productName}, Quantity: ${item.quantity}`).join('\n')}
            Total Amount: ₹${order.totalAmount}
            Status: ${order.status}
        `;

        const whatsappMessage = encodeURIComponent(orderDetails);
        const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${whatsappMessage}`;
        window.open(whatsappUrl, "_blank");
    };

    if (loading) {
        return <div className="text-center py-16">Loading orders...</div>;
    }

    if (error) {
        return <div className="text-center py-16 text-red-600">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold text-amber-800 mb-8 font-serif">My Orders</h2>

            {orders.length > 0 ? (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        Order #{order._id.substring(0, 8)}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Placed on: {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => sendOrderDetailsToAdmin(order)}
                                    className="bg-[#3F4F44] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90"
                                >
                                    <Send className="h-5 w-5" />
                                    Send to WhatsApp
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {order.items.map((item) => (
                                    <div key={item.productId} className="border rounded-lg p-4">
                                        <img
                                            src={item.productImage}
                                            alt={item.productName}
                                            className="w-full h-48 object-cover rounded-lg mb-4"
                                        />
                                        <h4 className="font-semibold text-gray-900">{item.productName}</h4>
                                        <p className="text-sm text-gray-600">Design #: {item.productId.substring(0, 6)}</p>
                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t">
                                <p className="text-gray-600">
                                    Status: <span className="font-semibold text-amber-800">{order.status}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-amber-800 font-serif">No orders yet</p>
                    <p className="text-amber-600 mt-2 font-serif">Your ordered items will appear here</p>
                </div>
            )}
        </div>
    );
};

export default Orders;
