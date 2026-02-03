const mongoose = require('mongoose');

const connectDB = async () => {
    const options = {
        autoIndex: true, 
        maxPoolSize: 10, 
        serverSelectionTimeoutMS: 5000, 
        socketTimeoutMS: 45000, 
        family: 4, 
    };

    const connect = async () => {
        try {
            await mongoose.connect(process.env.MONGO_URI, options);
            console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        } catch (error) {
            console.error('MongoDB connection error:', error);
            
            setTimeout(connect, 5000);
        }
    };

    await connect();

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected! Retrying...');
        connect();
    });

    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });
};

module.exports = connectDB;
