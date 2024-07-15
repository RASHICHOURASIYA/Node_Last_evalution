const Review = require("../models/Review");

exports.getReviewsByBook = async (req, res) => {
    try {
        const reviews = await Review.find({ bookId: req.params.bookId }).populate('customerId');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
