import { prompt } from 'inquirer';

class InsertMusicMenuController {
    private questions = [
        {
            type: 'input',
            name: 'anime',
            message: 'Anime que apresenta essa canção:',
        },
        {
            type: 'list',
            name: 'tipo',
            message: 'Qual o tipo:',
            choices: ['opening', 'ending'],
        },
        {
            type: 'input',
            name: 'numero',
            message: 'Número da opening ou ending no anime:',
        },
        {
            type: 'input',
            name: 'musica',
            message: 'Título da música:',
        },
        {
            type: 'confirm',
            name: 'salvar',
            message: 'Confirmar informações?',
        },
    ];

    private message = 'Entre com as informações sobre a canção';

    async showMenu(): Promise<void> {
        const answers = await prompt(this.questions);
        console.log(answers);
    }
}

export default InsertMusicMenuController

// {
//     anime: string
//     tipo: "opening" | "ending" (opção)
//     numero: number (numero da opening ou ending)
//     musica:string
//     notas: [{user: "", nota: number}] (inicia vazio) #Esse usuário será criado na etapa de inserir notas e então adicionado a esse objeto. user será o valor selecionado
//     media: number
// }
