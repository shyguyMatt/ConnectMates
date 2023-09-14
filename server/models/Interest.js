
const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const interestSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
    },
    {
        id: false,
    }
);
const Interest = mongoose.model('Interest', interestSchema);
module.exports = interestSchema;
module.exports = Interest;
