import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        required: true,
    },
    otp:{
        type: String,
        default: 0,
    },
    },
    {
        timestamps: true,
        versionKey: false,
    }
    )

const User = mongoose.model('users', UserSchema);
export default User;