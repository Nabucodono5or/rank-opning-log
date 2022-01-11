import { Schema, model } from 'mongoose';
import { musicSchemaInterface } from '../types/music';

const musicSchema: Schema<musicSchemaInterface> = new Schema<musicSchemaInterface>({
    anime: { type: String, required: true },
    tipo: { type: [String], required: true },
    numero: { type: Number, required: true },
    musica: String,
    notas: [
        {
            user: String,
            nota: Number,
        },
    ],
    media: Number,
});

export default model<musicSchemaInterface>('Music', musicSchema);

// {
//     anime: string
//     tipo: "opening" | "ending" (opção)
//     numero: number (numero da opening ou ending)
//     musica:string
//     notas: [{user: "", nota: number}] (inicia vazio) #Esse usuário será criado na etapa de inserir notas e então adicionado a esse objeto. user será o valor selecionado
//     media: number
// }
