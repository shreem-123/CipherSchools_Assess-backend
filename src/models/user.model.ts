import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

export { User }