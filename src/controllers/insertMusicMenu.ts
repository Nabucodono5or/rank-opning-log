import { prompt } from 'inquirer';
import { answerInsertMusicMenuInterface } from '../types/answers';
import Questions from '../utils/questions';
import Music from '../schemas/Music';

class InsertMusicMenuController {
    private questions: Questions = new Questions();
    private options: string[] = ['opening', 'ending'];
    private message: string = 'Entre com as informações sobre a canção';

    async showMenu(): Promise<void> {
        const answers: answerInsertMusicMenuInterface = await prompt(
            this.questions.questionInsertMusic(this.message, this.options),
        );

        this.saveMusic(answers);
    }

    async saveMusic(data: answerInsertMusicMenuInterface): Promise<void> {
        try {
            const music = await Music.create({
                anime: data.anime,
                tipo: data.tipo,
                numero: data.numero,
                musica: data.musica,
                notas: [],
                media: 0,
            });

            music.save();
        } catch (e: any) {
            console.log(e.message);
        }
    }
}

export default InsertMusicMenuController;

// {
//     anime: string
//     tipo: "opening" | "ending" (opção)
//     numero: number (numero da opening ou ending)
//     musica:string
//     notas: [{user: "", nota: number}] (inicia vazio) #Esse usuário será criado na etapa de inserir notas e então adicionado a esse objeto. user será o valor selecionado
//     media: number
// }
