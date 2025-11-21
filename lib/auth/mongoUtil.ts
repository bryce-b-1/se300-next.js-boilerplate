import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/User'; // <-- The only logic import we need!
import mongoose from 'mongoose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import UserModel from '../db-models/UserModel';



// test prints for mongoDatabase in the console
export async function printDatabaseInformation(){
    const mongoose = require('mongoose');
    
    try {
        console.log('DB connected');
    
        console.log("Connected DB name:", mongoose.connection.name);

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(
        "Collections in this DB:",
        collections.map((c: { name: any; }) => c.name)
        );
                    
        const allUsers = await UserModel.find({});
        console.log('All users in DB:', allUsers);
    } catch (error) {
        console.log("database information got cooked lmao")
    }
    
}