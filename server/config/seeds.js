const db = require('./connection');
const { User, Interest, Group } = require('../models');

db.once('open', async () => {
    await Interest.deleteMany();

    const interests = await Interest.insertMany([
        {name: 'AI', description: 'simulation of human intelligence with computers'},
        {name: 'Front-End', description: 'creation and designing of the User Interface and Experience'},
        {name: 'Back-End', description: 'building/maintaining data processing and actions'},
        {name: 'Mathematics', description: 'science of numbers and operations'},

    ]);
    console.log('interests seeded!');

    await User.deleteMany();

    await User.create({
        name: 'billy123',
        email: 'a@b.com',
        password: 'qwertyuiop',
        interests: [interests[0]._id],

    });
    console.log('Users seeded!');
    process.exit();
});
