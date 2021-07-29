
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError, UserInputError } = require('apollo-server-express');

const resolvers = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },

    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },

    Mutation: {

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        async createPost(_, { body }, context) {
            const user = checkAuth(context);

            if (body.trim() === '') {
                throw new Error('Post body must not be empty');
            }

            const newPost = new Post({
                title,
                body,
                image,
                user: user.id,
                userName: user.userName,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();

            context.pubsub.publish('NEW_POST', {
                newPost: post
            });

            return post;
        },

        async deletePost(_, { postId }, context) {
            const user = checkAuth(context);

            try {
                const post = await Post.findById(postId);
                if (user.userName === post.userName) {
                    await post.delete();
                    return 'Post deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },

        async likePost(_, { postId }, context) {
            const { userName } = checkAuth(context);

            const post = await Post.findById(postId);
            if (post) {
                if (post.likes.find((like) => like.userName === userName)) {
                    // Post already likes, unlike it
                    post.likes = post.likes.filter((like) => like.userName !== userName);
                } else {
                    // Not liked, like post
                    post.likes.push({
                        userName,
                        createdAt: new Date().toISOString()
                    });
                }

                await post.save();
                return post;
            } else throw new UserInputError('Post not found');
        },

        createComment: async (_, { postId, body }, context) => {
            const { userName } = signToken(context);
            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not empty'
                    }
                });
            }

            const post = await Post.findById(postId);

            if (post) {
                post.comments.unshift({
                    body,
                    userName,
                    createdAt: new Date().toISOString()
                });
                await post.save();
                return post;
            } else throw new UserInputError('Post not found');
        },

        async deleteComment(_, { postId, commentId }, context) {
            const { userName } = signToken(context);

            const post = await Post.findById(postId);

            if (post) {
                const commentIndex = post.comments.findIndex((c) => c.id === commentId);

                if (post.comments[commentIndex].userName === userName) {
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } else {
                throw new UserInputError('Post not found');
            }
        }
    }

}

module.exports = resolvers;
