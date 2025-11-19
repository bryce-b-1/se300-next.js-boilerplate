import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: [true, 'Please provide a userID'],
        unique: true
    },
    firstName: {
        type: String,
        required: [true, 'Please provide a first name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    passwordHash: {
        type: String,
        required: [true, 'Please provide a password']
    },
    
    // role: {
    //     type: String,
    //     required: [true, 'Please provide a role']
    // },
}, { versionKey: false });

//This line tells Mongoose to use your 'Users' collection
export default mongoose.models.User || mongoose.model('User', UserSchema, 'Users');
