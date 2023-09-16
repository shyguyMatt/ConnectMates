const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        interests: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Interest',
            }
        ]
    }
);


userSchema.pre('save', async function(next) {
    if(this.isNew || this.isModified('password')){
        const salty = 10;
        this.password = await bcrypt.hash(this.password, salty);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};
const User = model('User', userSchema);

module.exports = User;