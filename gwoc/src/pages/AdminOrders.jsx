import { useState, useEffect } from "react";
import axios from "axios";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/api/admin/order", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(response.data.orders);
            setError(null);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.patch(
                `http://localhost:5000/api/admin/order/${orderId}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            // Update orders in state
            setOrders(orders.map(order => 
                order._id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("Failed to update order status");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <p className="text-gray-600 text-lg">Loading orders...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">All Orders</h2>

            {orders.length > 0 ? (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order._id} className="bg-white shadow-lg rounded-lg p-6">
                            {/* Order Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="font-bold text-lg">Order #{order._id}</p>
                                    <p className="text-gray-600">
                                        Date: {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600">
                                        Customer: {order.user?.name || 'N/A'}
                                    </p>
                                    <p className="text-gray-600">
                                        Email: {order.user?.email || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                        className="border rounded px-3 py-1"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="mt-4">
                                <h3 className="font-semibold mb-2">Order Items:</h3>
                                <div className="space-y-4">
                                    {order.items.map(item => (
                                        <div key={item.productId} className="flex items-center gap-4 border-t pt-4">
                                            <img
                                                src={`http://localhost:5000${item.productImage}`}
                                                alt={item.productName}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <p className="font-semibold">{item.productName}</p>
                                                <p className="text-gray-600">
                                                    Price: ₹{item.price.toLocaleString()}
                                                </p>
                                                <p className="text-gray-600">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Total */}
                            <div className="mt-4 pt-4 border-t">
                                <p className="text-xl font-bold">
                                    Total Amount: ₹{order.totalAmount?.toLocaleString() || '0'}
                                </p>
                                <p className="text-gray-600">
                                    Status: <span className="font-semibold">{order.status}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white shadow rounded-lg p-6 text-center">
                    <p className="text-gray-600 text-lg">No orders received yet.</p>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;