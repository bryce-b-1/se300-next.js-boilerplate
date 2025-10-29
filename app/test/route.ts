/**
 * This is just a test file to see if the framework connects to MongoDB correctly.
 */

import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose'; // We need to import mongoose to define a model

/**
 * --- 1. Define a Schema ---
 * This tells Mongoose what the data looks like in your 'messages' collection.
 * Based on your screenshot, it has a single field called 'text' that is a String.
 */
const messageSchema = new mongoose.Schema({
  text: String
});


//--- 2. Create a Model ---
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema, 'messages');


// --- 3. The API Route Function ---
export async function GET(request: Request) {
    try {
        // Connect to the database
        await dbConnect();
        console.log('Successfully connected to MongoDB!');

        // --- 4. Fetch the Data ---
        // We use our new 'Message' model to find one document (any document)
        const messageDoc = await Message.findOne({});

        if (messageDoc) {
            // 5. Send the found data back as JSON
            return NextResponse.json(
                { message: messageDoc.text }, // Return the 'text' field
                { status: 200 }
            );
        } else {
            return NextResponse.json(
            { error: 'No message found in database.' },
            { status: 404 }
        );
        }

    }   catch (error) {
        console.error('Connection error:', error);
        return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
}