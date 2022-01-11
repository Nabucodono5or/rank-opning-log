import { prompt } from 'inquirer';
import Questions from './utils/questions';
import InsertMusicMenu from './controllers/insertMusicMenu';

const questions: Questions = new Questions();
const message: string = 'Escolha uma opção: ';
const options: Array<string> = [
    'Inserir música',
    'Criar usuário',
    'Inserir nota',
    'Atualizar nota',
    'Remover nota',
    'Atualizar musica',
    'Remover musica',
    'Listar musica',
];

const mainMenu = async (): Promise<void> => {
    const answers = await prompt(questions.questionMainMenu(message, options));

    if (answers.option === options[0]) {
        const insertMusicMenu = new InsertMusicMenu();
        insertMusicMenu.showMenu();
    };
    
    if (answers.option === options[1]) console.log(options[1]);
    if (answers.option === options[2]) console.log(options[2]);
    if (answers.option === options[3]) console.log(options[3]);
    if (answers.option === options[4]) console.log(options[4]);
    if (answers.option === options[5]) console.log(options[5]);
    if (answers.option === options[6]) console.log(options[6]);
    if (answers.option === options[7]) console.log(options[7]);
};

export default mainMenu;
