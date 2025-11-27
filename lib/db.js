import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Check for environment variable inside the function (lazy evaluation)
  const MONGODB_URI = process.env.MONGODB_CONNECT_URI;

  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_CONNECT_URI environment variable. ' +
      'In Vercel, make sure it\'s set in Project Settings > Environment Variables. ' +
      'For local development, add it to your .env.local file.'
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
