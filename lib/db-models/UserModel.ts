import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userID: {
        type: Number,
        required: [true, 'Please provide a userID'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    passwordHash: {
        type: String,
        required: [true, 'Please provide a password']
    }
});

//This line tells Mongoose to use your 'Users' collection
export default mongoose.models.User || mongoose.model('User', UserSchema, 'Users');
