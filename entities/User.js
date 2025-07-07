import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import RoleEnum from './Enums/Roles.js';


const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        isEnabled: {
            type: Boolean,
            default: true,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(RoleEnum),
            default: RoleEnum.USER,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

// Middleware to hash password before saving
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    } catch (error) {
        return next(error);
    }

    next();
}); 

UserSchema.methods.comparePassword = async function (candidatePassword) {
    try {   
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        return false;
    }
};


const User = mongoose.model('User', UserSchema);

export default User;