
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

        // async getPosts() {
        //     try {
        //         const posts = await Post.find().sort({ createdAt: -1 });
        //         return posts;
        //     } catch (err) {
        //         throw new Error(err);
        //     }
        // },
        // async getPost(_, { postId }) {
        //     try {
        //         const post = await Post.findById(postId);
        //         if (post) {
        //             return post;
        //         } else {
        //             throw new Error('Post not found');
        //         }
        //     } catch (err) {
        //         throw new Error(err);
        //     }
        // }
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

        savePhoto: async (parent, { photoData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedPhotos: photoData } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!')
        },

        removePhoto: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedPhotos: { photoId: args.photoId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!')
        },
    

    //     async createPost(_, { body }, context) {
    //         const user = signToken(context);

    //         if (body.trim() === '') {
    //             throw new Error('Post body must not be empty');
    //         }

    //         const newPost = new Post({
    //             title,
    //             body,
    //             image,
    //             user: user.id,
    //             username: user.username,
    //             createdAt: new Date().toISOString()
    //         });

    //         const post = await newPost.save();

    //         context.pubsub.publish('NEW_POST', {
    //             newPost: post
    //         });

    //         return post;
    //     },

    //     async deletePost(_, { postId }, context) {
    //         const user = signToken(context);

    //         try {
    //             const post = await Post.findById(postId);
    //             if (user.username === post.username) {
    //                 await post.delete();
    //                 return 'Post deleted successfully';
    //             } else {
    //                 throw new AuthenticationError('Action not allowed');
    //             }
    //         } catch (err) {
    //             throw new Error(err);
    //         }
    //     },

    //     async likePost(_, { postId }, context) {
    //         const { username } = signToken(context);

    //         const post = await Post.findById(postId);
    //         if (post) {
    //             if (post.likes.find((like) => like.username === username)) {
    //                 // Post already likes, unlike it
    //                 post.likes = post.likes.filter((like) => like.username !== username);
    //             } else {
    //                 // Not liked, like post
    //                 post.likes.push({
    //                     username,
    //                     createdAt: new Date().toISOString()
    //                 });
    //             }

    //             await post.save();
    //             return post;
    //         } else throw new UserInputError('Post not found');
    //     },

    //     createComment: async (_, { postId, body }, context) => {
    //         const { username } = signToken(context);
    //         if (body.trim() === '') {
    //             throw new UserInputError('Empty comment', {
    //                 errors: {
    //                     body: 'Comment body must not empty'
    //                 }
    //             });
    //         }

    //         const post = await Post.findById(postId);

    //         if (post) {
    //             post.comments.unshift({
    //                 body,
    //                 username,
    //                 createdAt: new Date().toISOString()
    //             });
    //             await post.save();
    //             return post;
    //         } else throw new UserInputError('Post not found');
    //     },

    //     async deleteComment(_, { postId, commentId }, context) {
    //         const { username } = signToken(context);

    //         const post = await Post.findById(postId);

    //         if (post) {
    //             const commentIndex = post.comments.findIndex((c) => c.id === commentId);

    //             if (post.comments[commentIndex].username === username) {
    //                 post.comments.splice(commentIndex, 1);
    //                 await post.save();
    //                 return post;
    //             } else {
    //                 throw new AuthenticationError('Action not allowed');
    //             }
    //         } else {
    //             throw new UserInputError('Post not found');
    //         }
    //     }
    }
    

}

module.exports = resolvers;