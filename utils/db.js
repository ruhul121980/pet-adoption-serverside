import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Load database connection URI from environment variable
    const uri = process.env.MONGODB_URI;
    // console.log("uri ", uri)
    if (!uri) {
      throw new Error('Please define the MONGO_URI environment variable');
    }

    await mongoose.connect(uri); 
    console.log('MongoDB connected successfully!');

    // Access the 'petworld_db' database and 'users' collection
    return  mongoose.connection.useDb('petworld_db');// returning single db to use


  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process on connection error
  }
};

export default connectDB;

