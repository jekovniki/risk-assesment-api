import mongoose, { Schema, Document } from 'mongoose';

export interface IUserModel extends Document {
    googleId: string;
    email: string;
    password: string;
    role: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    createdAt: Date;
    updatedAt: Date;
    dateOfBirth: Date;
    lastLogin: Date;
    userDevice: string;
    firstName: string;
    lastName: string;
    companyId: string;
}

const userSchema: Schema = new Schema({
    googleId: { type: String, unique: true, sparse: true, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'], default: 'MALE' },
    role: { type: String, enum: ['USER', 'COMPANY_LEADER', 'ADMIN'], default: 'USER' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    dateOfBirth: {type: Date, default: Date.now },
    lastLogin: { type: Date, default: null },
    userDevice: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    companyId: { type: String, default: null },
});

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model<IUserModel>('User', userSchema);
