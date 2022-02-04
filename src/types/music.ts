import { Document } from 'mongoose';
import { notasObject } from '../types/utility';

export interface musicSchemaInterface extends Document {
    anime: string;
    tipo: string[];
    numero: number;
    musica: string;
    notas: {user: string, nota: number}[];
    media: number;
}

// {
//     anime: { type: String, required: true },
//     tipo: { type: [String], required: true },
//     numero: { type: Number, required: true },
//     musica: String,
//     notas: [
//         {
//             user: String,
//             nota: Number,
//         },
//     ],
//     media: Number,
// }
