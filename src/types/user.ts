import { Document } from 'mongoose';

export interface userSchemaInterface extends Document {
    name: string;
}
