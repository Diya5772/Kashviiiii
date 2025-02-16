import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// Ensure invoices directory exists
const invoicesDir = path.join(__dirname, '../invoices');
if (!fs.existsSync(invoicesDir)) {
  fs.mkdirSync(invoicesDir, { recursive: true });
}

// Helper function to generate invoice PDF
const generateInvoice = async (order) => {
  return new Promise((resolve, reject) => {
    try {
      const invoicePath = path.join(invoicesDir, `invoice-${order._id}.pdf`);
      const doc = new PDFDocument({ margin: 50 });
      
      // Pipe the PDF into the file
      doc.pipe(fs.createWriteStream(invoicePath));
      
      // Add company letterhead
      doc.fontSize(20).text('Your Company Name', { align: 'center' });
      doc.fontSize(10).text('123 Business Road, City, Country', { align: 'center' });
      doc.moveDown();
      
      // Add invoice header
      doc.fontSize(18).text('INVOICE', { align: 'center' });
      doc.moveDown();
      
      // Add order details
      doc.fontSize(12).text(`Invoice Number: INV-${order._id.toString().substring(0, 8)}`);
      doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
      doc.text(`Order ID: ${order._id}`);
      doc.text(`Customer ID: ${order.userId}`);
      doc.moveDown();
      
      // Add items table
      doc.fontSize(12).text('Items:', { underline: true });
      doc.moveDown(0.5);
      
      // Table headers
      const tableTop = doc.y;
      const itemX = 50;
      const designX = 200;
      const quantityX = 300;
      const priceX = 400;
      const totalX = 500;
      
      doc.font('Helvetica-Bold');
      doc.text('Item', itemX, tableTop);
      doc.text('Design #', designX, tableTop);
      doc.text('Qty', quantityX, tableTop);
      doc.text('Price', priceX, tableTop);
      doc.text('Total', totalX, tableTop);
      doc.moveDown();
      
      // Table rows
      doc.font('Helvetica');
      let totalAmount = 0;
      let totalParcels = 0;
      
      order.items.forEach(item => {
        const y = doc.y;
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        totalParcels += item.quantity;
        
        doc.text(item.productName.substring(0, 25), itemX, y);
        doc.text(item.productId.toString().substring(0, 6), designX, y);
        doc.text(item.quantity.toString(), quantityX, y);
        doc.text(`₹${item.price.toLocaleString()}`, priceX, y);
        doc.text(`₹${itemTotal.toLocaleString()}`, totalX, y);
        doc.moveDown();
      });
      
      // Add summary
      doc.moveDown();
      const summaryX = 400;
      doc.font('Helvetica-Bold');
      doc.text('Total Parcels:', summaryX);
      doc.text('Total Amount:', summaryX);
      
      doc.font('Helvetica-Bold');
      doc.text(totalParcels.toString(), totalX, doc.y - 12);
      doc.text(`₹${totalAmount.toLocaleString()}`, totalX);
      
      // Add footer
      doc.moveDown(4);
      doc.fontSize(10).text('Thank you for your business!', { align: 'center' });
      
      // Finalize the PDF
      doc.end();
      
      resolve({
        path: invoicePath,
        filename: path.basename(invoicePath)
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Create Order from Cart with Invoice Generation
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }
    
    // Calculate total amount
    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    );
    
    // Create new order
    const newOrder = new Order({
      userId,
      items: cart.items,
      totalAmount
    });
    
    await newOrder.save();
    
    // Generate invoice
    const invoice = await generateInvoice(newOrder);
    
    // Store invoice path in order (optional)
    newOrder.invoicePath = invoice.path;
    await newOrder.save();
    
    // Clear cart after order is created
    cart.items = [];
    await cart.save();
    
    res.status(201).json({ 
      message: "Order placed successfully and invoice generated", 
      order: newOrder,
      invoiceFilename: invoice.filename
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Server error while creating order" });
  }
});

// Get User's Orders
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 }); // Most recent first
    
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Server error while fetching orders" });
  }
});
// In your Express backend routes
router.get('/admin', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

router.patch('/admin/:orderId', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.orderId,
            { status: req.body.status },
            { new: true }
        );
        res.json({ order });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status' });
    }
});
// Download invoice
router.get("/:orderId/invoice", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      userId: req.user.id
    });
    
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    const invoicePath = path.join(invoicesDir, `invoice-${order._id}.pdf`);
    
    if (!fs.existsSync(invoicePath)) {
      // Generate invoice if it doesn't exist
      await generateInvoice(order);
    }
    
    res.download(invoicePath, `invoice-${order._id}.pdf`);
  } catch (error) {
    console.error("Error downloading invoice:", error);
    res.status(500).json({ error: "Server error while downloading invoice" });
  }
});

export default router;