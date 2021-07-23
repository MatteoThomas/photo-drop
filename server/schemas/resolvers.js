const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Category } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {

    },
    Mutation: {
    
    }
}


module.exports = resolvers;