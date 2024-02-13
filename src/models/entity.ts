import mongoose, { Schema } from 'mongoose';

export interface IEntityModel {
    id: string;
    caption: string;
    schema: string;
    properties: {
        endDate: string[],
        holder: string[],
        startDate: string[],
        status: string[],
        post: string[],
        relative: string[] | undefined,
        relationship: string[] | undefined,
        person: string[] | undefined
    }
    referents: string[],
    datasets: string[] | undefined,
    first_seen: string,
    last_seen: string,
    last_change: string,
    target: boolean
}

const entitySchema: Schema = new Schema({
    id: { type: String, required: true },
    caption: { type: String, required: true },
    schema: { type: String, required: true },
    properties: {
        endDate: { type: Array<String> },
        holder: { type: Array<String> },
        startDate: { type: Array<String> },
        status: { type: Array<String> },
        post: { type: Array<String> }
    },
    referents: { type: Array<String>},
    datasets: { type: Array<String> },
    first_seen: { type: String },
    last_seen: { type: String },
    last_change: { type: String },
    target: { type: Boolean}
});

entitySchema.index({ id: 1 }, { unique: true });


export default mongoose.model<IEntityModel>('Entity', entitySchema);
