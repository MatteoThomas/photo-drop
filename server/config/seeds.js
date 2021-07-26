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

    await Post.deleteMany();

    const posts = await Post.insertMany([
        {
            title: '',
            description:
                '',
            image: '',
            category: categories[0]._id,
            likes: ''
        },
    ])
    console.log('post seeded');

    await User.deleteMany();

    await User.create({
        firstName: '',
        lastName: '',
        email: '',
        password: 'password12345',
        posts: [
            {
                posts: [posts[0]._id,]
            }
        ]
    });
    console.log('users seeded');

    process.exit();

});