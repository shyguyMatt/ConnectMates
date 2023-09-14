const { AuthenticationError } = require('apollo-server-express')
const { Group, Interest, User } = require('../models');
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        hello: () => 'Hello, GraphQL!',

        users: async () => {
            return User.find()
        },

        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },
    },

    Mutation: {
        addUser: async (parent, body) => {
            const user = await User.create(body);

            if(!user) {
                return
            }

            const token = signToken(user);

            return{ token, user }
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('No user with this email or password found!')
            }

            const correctPw = await user.isCorrectPassword(password)

            if (!correctPw) {
                throw new AuthenticationError('No user with this email or password found!')
            }

            const token = signToken(user);
            return { token, user };
        },

        addInterest: async (parent, { userId, interest }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                {
                    $addToSet: { interests: interest }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },

        removeUser: async (parent, { userId }) => {
            return User.findOneAndDelete({ _id: userId });
        },

        removeInterest: async (parent, { userId, interest }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $pull: { interests: interest } },
                { new: true }
            );
        },
    },
};

module.exports = resolvers;
