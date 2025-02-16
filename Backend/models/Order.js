import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  items: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true 
      },
      productName: String,
      productImage: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: "Pending" 
  },
  invoicePath: {
    type: String
  }
}, 
{ timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;