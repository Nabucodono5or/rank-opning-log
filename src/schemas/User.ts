import { Schema, model } from 'mongoose';
import { userSchemaInterface } from '../types/user';

const userSchema: Schema<userSchemaInterface> = new Schema<userSchemaInterface>({
    name: { type: String, required: true },
});

export default model<userSchemaInterface>('User', userSchema);
