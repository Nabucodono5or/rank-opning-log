import { prompt } from 'inquirer';
import Questions from '../utils/questions';
class InsertMusicMenuController {
    private questions = new Questions();
    private options = ['opening', 'ending'];
    private message = 'Entre com as informações sobre a canção';

    async showMenu(): Promise<void> {
        const answers = await prompt(this.questions.questionInsertMusic(this.message, this.options));
        console.log(answers);
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
