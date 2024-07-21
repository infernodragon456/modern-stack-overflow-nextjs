import { Schema, models, model, Document } from "mongoose";

export interface ITag extends Document {
    name: string;
    description: string;
    questions: Array<Schema.Types.ObjectId>;
    followers: Array<Schema.Types.ObjectId>;
    createdAt: Date;
}

const tagSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});

const TagModel = models.Tag || model('Tag', tagSchema);

export default TagModel;