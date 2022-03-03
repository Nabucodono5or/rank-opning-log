import { prompt } from 'inquirer';
import Questions from './utils/questions';
import { answerListInterface } from './types/answers';
import InsertMusicMenu from './controllers/insertMusicMenu';
import InsertUserMenu from './controllers/insertUserMenu';
import InsertRatingMenu from './controllers/insertRatingMenu';
import UpdateRatingMenuController from './controllers/updateRatingMenu';
import RemoveRatingMenuController from './controllers/removeNotaMenu';
import UpdateMusicMenuController from './controllers/updateMusicMenu';
import RemoveMusicMenuController from './controllers/removeMusicMenu';
import RemoveUserMenuController from './controllers/removeUserMenu';
import mongoose from 'mongoose';

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
    'Remover usuário',
    'Listar musica',
    'Sair',
];

const mainMenu = async (): Promise<void> => {
    const answers: answerListInterface = await prompt(questions.questionListMenu(message, options));

    if (answers.option === options[0]) {
        const insertMusicMenu = new InsertMusicMenu();
        insertMusicMenu.showMenu();
    }

    if (answers.option === options[1]) {
        const insertUserMenuController = new InsertUserMenu();
        insertUserMenuController.showMenu();
    }

    if (answers.option === options[2]) {
        const insertRatingMenuController = new InsertRatingMenu();
        insertRatingMenuController.showMenu();
    }

    if (answers.option === options[3]) {
        const updateRatingMenuController = new UpdateRatingMenuController();
        updateRatingMenuController.showMenu();
    }

    if (answers.option === options[4]) {
        const removeRatingMenuController = new RemoveRatingMenuController();
        removeRatingMenuController.showMenu();
    }

    if (answers.option === options[5]) {
        const updateMusicMenuController = new UpdateMusicMenuController();
        updateMusicMenuController.showMenu();
    }

    if (answers.option === options[6]){
        const removeMusicMenuController = new RemoveMusicMenuController();
        removeMusicMenuController.showMenu();
    } 

    if (answers.option === options[7]) {
        const removeUserMenuController = new RemoveUserMenuController();
        removeUserMenuController.showMenu();
    }
    if (answers.option === options[8]) mongoose.connection.close();
};

export default mainMenu;
