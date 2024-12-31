
// database/mongoConfig.js
import mongoose from 'mongoose';

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/task'; // Replace with your MongoDB URI

// Mongoose connection function
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
