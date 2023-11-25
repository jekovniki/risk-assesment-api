import mongoose, { Schema, Document } from 'mongoose';

export interface IUserModel extends Document {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUserModel>('User', userSchema);
