import mongoose, { Schema, Document } from 'mongoose';

export interface IPepModel extends Document {
  name: string;
  history: {
    year: string;
    position: string;
    category: string;
    institution: string;
  }[];
}

const pepSchema: Schema = new Schema({
  name: { type: String, required: true },
  history: [
    {
      year: { type: String },
      position: { type: String },
      category: { type: String },
      institution: { type: String },
    },
  ],
});

export default mongoose.model<IPepModel>('PEP', pepSchema);
