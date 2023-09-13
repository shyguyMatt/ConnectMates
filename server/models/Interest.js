const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const User = require('./User');
const interestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    interestedUsers: [User.schema]
});

const Interest = mongoose.model('Interest', interestSchema);

module.exports = Interest;