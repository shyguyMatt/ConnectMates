const { Schema } = require('mongoose');

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

module.exports = interestSchema;
