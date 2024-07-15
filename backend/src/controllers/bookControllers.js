const Book = require("../models/Book");

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
