// Import the Mongoose module
const mongoose = require('mongoose');

// Define the user schema using the mongoose.Schema class
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Export the mongoose model for the 'User' collection, using the defined userSchema
module.exports = mongoose.model('User', userSchema);
