const { AuthenticationError } = require('apollo-server-express')
const { Group, Interest, User } = require('../models');
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        hello: () => 'Hello, GraphQL!',

        users: async () => {
            return User.find().populate('interests');
        },

        userByInterest: async (parent, { interests }) => {
            return User.find({ interests: { $all: interests} }).populate('interests');
        },

        groupByInterest: async (parent, { interests }) => {
            return Group.find({ interests: { $all : interests} }).populate('interests')
        },

        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId }).populate('interests');
        },

        interests: async () => {
            return Interest.find()
        },

        findAdminGroups: async (parent, { userId }) => {
            return Group.find({ admin: { $in: userId }}).populate('users').populate('admin').populate('interests');
        },

        findMemberGroups: async (parent, { userId }) => {
            return Group.find({ users: { $in: userId }}).populate('users').populate('admin').populate('interests');
        }
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
            return User.findByIdAndUpdate(userId,
                { $push: { interests: interest } },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('interests');
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

        changeBio: async (parent, { userId, newBio }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                { bio: newBio }
            )
        },

        createGroup: async (parent, {userId, groupName, interests}) => {
            return Group.create({
                name: groupName,
                admin: userId,
                interests: interests,
        })
        }
    },
};

module.exports = resolvers;
