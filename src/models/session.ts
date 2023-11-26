import mongoose, { Schema, Document } from 'mongoose';

export interface ISessionModel extends Document {
    userId: string,
    role: number,
    expiration: Date,
}

const sessionSchema: Schema = new Schema({
    userId: { type: String, required: true },
    role: { type: String, enum: ['USER', 'COMPANY_LEADER', 'ADMIN'], default: 'USER' },
    expiration: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ISessionModel>('Session', sessionSchema);
