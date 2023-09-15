
const { Schema, model } = require('mongoose');

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
);

const Interest = model('Interest', interestSchema)

module.exports = Interest;
