import { prompt } from 'inquirer';
import User from '../schemas/User';
import { answerInsertUserMenuInterface } from '../types/answers';
import Questions from '../utils/questions';
import mainMenu from '../mainMenu';

class InsertUserMenuController {
    private questions: Questions = new Questions();
    private message: string = '';

    async showMenu(): Promise<void> {
        const answers: answerInsertUserMenuInterface = await prompt(
            this.questions.questionInputUserName<void>(this.message),
        );

        console.log(answers);
        
        // if (answers.salvar) {
        //     this.saveMusic(answers);
        // } else {
        //     this.doContinueOperation();
        // }
    }

    async doContinueOperation(): Promise<void> {
        // const answer: answerConfirmContinueMenu = await prompt(this.questions.questionConfirmContinueMenu());
        // if (answer.option) {
        //     this.showMenu();
        // } else {
        //     mainMenu();
        // }
    }

    // async saveMusic(data: answerInsertMusicMenuInterface): Promise<void> {
    //     try {
    //         const music = await Music.create({
    //             anime: data.anime,
    //             tipo: data.tipo,
    //             numero: data.numero,
    //             musica: data.musica,
    //             notas: [],
    //             media: 0,
    //         });

    //         music.save();
    //     } catch (e: any) {
    //         console.log(e.message);
    //     } finally {
    //         mainMenu();
    //     }
    // }
}

export default InsertUserMenuController;
