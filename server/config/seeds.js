const db = require('./connection');
const { User, Post, Category } = require('../models');

db.once('open', async () => {
    await Category.deleteMany();

    const categories = await Category.insertMany([
        { cat: 'Nature' },
        { cat: 'Architecture' },
        { cat: 'Health & Wellness' },
        { cat: 'Animals' },
        { cat: 'Food' }
    ]);

    console.log('categories seeded')

});