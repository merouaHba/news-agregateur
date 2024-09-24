const mongoose = require('mongoose');

// Define the Article Schema
const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide an article title'],
        maxlength: 200,
        minlength: 10,
    },
    link: {
        type: String,
        required: [true, 'Please provide the article link'],
        unique: true,
        trim: true,
        validate: {
            validator: (value) => {
                // URL validation
                try {
                    new URL(value);
                    return true;
                } catch (err) {
                    return false;
                }
            },
            message: 'Please provide a valid URL',
        },
    },
    pubDate: {
        type: Date,
        required: [true, 'Please provide the publication date'],
    },
    category: {
        type: String,
        maxlength: 50,
        required: [true, 'Please provide a category for the article'],
    },
    description: {
        type: String,
        required: [true, 'Please provide an article description'],
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create text index for full-text search on title and description fields
ArticleSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Article', ArticleSchema);
