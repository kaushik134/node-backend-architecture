const mongoose = require('mongoose');

const connectDB = async () => {
    const options = {
        autoIndex: true, // Don't build indexes in production for performance, usually set to false but kept true for dev simplified
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
    };

    const connect = async () => {
        try {
            await mongoose.connect(process.env.MONGO_URI, options);
            console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        } catch (error) {
            console.error('MongoDB connection error:', error);
            // Retry connection after 5 seconds
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
