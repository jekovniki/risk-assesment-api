import mongoose, { Schema, Document } from 'mongoose';

export interface IOrganizationModel extends Document {
    name: string;
    country: string;
    type: "Limited Company" | "Joint Stock Company" | "Other";
    createdAt: Date;
    updatedAt: Date;
    approved: Boolean;
}

const organizationSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    type: { type: String, enum: ['Limited Company', 'Joint Stock Company', 'Other'], default: 'Limited Company' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    approved: { type: Boolean, default: true},
});

organizationSchema.index({ name: 1 }, { unique: true });

export default mongoose.model<IOrganizationModel>('Organization', organizationSchema);
