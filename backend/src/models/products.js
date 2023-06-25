// Import the Mongoose module
const mongoose = require('mongoose');

// Define the product schema using the mongoose.Schema class
const productSchema = mongoose.Schema({
    id: {
        type: Number,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// Export the mongoose model for the 'Product' collection, using the defined productSchema
module.exports = mongoose.model('Product', productSchema);
