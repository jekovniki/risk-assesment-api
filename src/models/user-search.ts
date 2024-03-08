import mongoose, { Schema, Document } from 'mongoose';

export interface IUserSearchModel extends Document {
    user_id: string;
    search: string;
    ongoingScreening: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSearchSchema: Schema = new Schema({
    user_id: { type: String },
    search: { type: String},
    ongoingScreening: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUserSearchModel>('UserSearch', userSearchSchema);
