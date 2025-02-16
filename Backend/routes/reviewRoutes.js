import express from 'express';
import Review from '../models/Review.js';
import { verifyUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Submit a review (Ensures a user submits only one review per product)
router.post('/:id', verifyUser, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { id: productId } = req.params;

    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required.' });
    }

    const existingReview = await Review.findOne({ productId, userId: req.user.id });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product.' });
    }

    const newReview = new Review({
      productId,
      userId: req.user.id,
      userName: req.user.name,
      rating,
      comment
    });

    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all reviews for a product
router.get('/:id', async (req, res) => {
  try {
    const { id: productId } = req.params;
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a review
router.put('/:id', verifyUser, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { id: productId } = req.params;

    const review = await Review.findOne({ productId, userId: req.user.id });
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    res.status(200).json({ message: 'Review updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a review
router.delete('/:id', verifyUser, async (req, res) => {
  try {
    const { id: productId } = req.params;

    const review = await Review.findOneAndDelete({ productId, userId: req.user.id });
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    res.status(200).json({ message: 'Review deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
