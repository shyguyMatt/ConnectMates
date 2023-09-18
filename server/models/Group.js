const { Schema, model } = require('mongoose');

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    admin: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User',
        }
    ],
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    groupsize: {
        type: Number,
        default: 0
    },
    interests: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Interest'
        }
    ]
});

const Group = model('Group',groupSchema);
module.exports = Group;
