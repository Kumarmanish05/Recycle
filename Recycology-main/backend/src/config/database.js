import mongoose from 'mongoose';

const DEFAULT_MONGODB_URI = 'mongodb://127.0.0.1:27017/recyweb';

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

  if (!process.env.MONGODB_URI) {
    console.warn(
      `MONGODB_URI is not set. Falling back to local MongoDB at ${DEFAULT_MONGODB_URI}`
    );
  }

  try {
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};
