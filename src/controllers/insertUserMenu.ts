import { prompt } from 'inquirer';
import User from '../schemas/User';
import { answerInsertUserMenuInterface, answerConfirmContinueMenu } from '../types/answers';
import Questions from '../utils/questions';
import mainMenu from '../mainMenu';

class InsertUserMenuController {
    private questions: Questions = new Questions();
    private message: string = 'Nome de Usuário:';
    private messageConfirm: string = 'Continuar operações?';

    async showMenu(): Promise<void> {
        const answers: answerInsertUserMenuInterface = await prompt(
            this.questions.questionInputUserName<void>(this.message),
        );

        if (answers.salvar) {
            this.saveUser(answers);
        } else {
            this.doContinueOperation();
        }
    }

    async doContinueOperation(): Promise<void> {
        const answer: answerConfirmContinueMenu = await prompt(
            this.questions.questionConfirmContinueMenu(this.messageConfirm),
        );
        if (answer.option) {
            this.showMenu();
        } else {
            mainMenu();
        }
    }

    async saveUser(data: answerInsertUserMenuInterface): Promise<void> {
        try {
            const user = await User.create({
                name: data.name,
            });

            user.save();
            console.log('Usuário Criado com Sucesso!');
        } catch (e: any) {
            console.log(e.message);
        } finally {
            mainMenu();
        }
    }
}

export default InsertUserMenuController;
