import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;


let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    // Skip connection setup during the Vercel build
    if (process.env.NEXT_BUILD_ID) {
        console.log('NOTICE: Skipping DB connection during Vercel Build...');
        return; 
    }

    if (cached.conn) {
        return cached.conn;
    }
    
    // MONGODB_URI check is now critical BEFORE connection attempt
    if (!MONGODB_URI) {
        throw new Error(
            'MONGODB_URI is missing. Please define it in Vercel Environment Variables or your local .env.local file.'
        );
    }

    if (!cached.promise) {
        const opts = {
        bufferCommands: false,
        };

        // Use MONGODB_URI! to assert it's defined since we checked above
        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
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

export default dbConnect;