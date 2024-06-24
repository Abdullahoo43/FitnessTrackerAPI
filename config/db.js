const mongoose = require('mongoose');

const connectDB = async () =>
{
    try
    {
        await mongoose.connect("mongodb://localhost:27017/FitnessTracker");

        console.log('Connection established');
    }
    catch(error)
    {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectDB
