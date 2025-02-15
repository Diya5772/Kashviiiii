import { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState({});
    const token = localStorage.getItem("token"); // Retrieve token from local storage

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/carts", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log("Fetched Cart:", response.data); // Debugging

                setCart(response.data.cart); // Adjust based on API response structure

                if (response.data.cart?.items?.length > 0) {
                    fetchProductImages(response.data.cart.items);
                }
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCart();
    }, []);

    // Fetch product images separately by productId
    const fetchProductImages = async (items) => {
        try {
            const productIds = items.map(item => item.productId);
            const response = await axios.post("http://localhost:5000/api/products/getImages", {
                productIds
            });

            console.log("Fetched Product Images:", response.data); // Debugging

            setProducts(response.data); // Expecting { productId: imageUrl }
        } catch (error) {
            console.error("Error fetching product images:", error);
        }
    };

    return (
        <div>
            <h2>My Cart</h2>
            {cart && cart.items?.length > 0 ? (
                cart.items.map(item => (
                    <div key={item.productId}>
                        <img 
                            src={products[item.productId] || "https://via.placeholder.com/150"}  
                            alt={item.name} 
                            style={{ width: "100px" }}
                        />
                        <p>{item.name}</p>
                        <p>Price: {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                ))
            ) : (
                <p>Cart is empty</p>
            )}
        </div>
    );
};

export default Cart;
