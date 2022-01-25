import { prompt } from 'inquirer';
import { answerListInterface } from '../types/answers';
import User from '../schemas/User';
import Questions from '../utils/questions';
import mainMenu from '../mainMenu';
// import mainMenu from '../mainMenu';

class InsertRatingMenuController {
    private questions: Questions = new Questions();
    private usersList: string[] = [];
    private message: string = 'Escolha o usuário a dar a nota:';

    async loadUsers(): Promise<string[]> {
        const users = await User.find();

        const usersName: string[] = users.map((user): string => {
            return user.name;
        });

        return usersName;
    }

    async showMenu(): Promise<void> {
        const cancelar: 'Cancelar' = 'Cancelar';

        this.usersList = await this.loadUsers();
        this.usersList.push(cancelar);

        const answer: answerListInterface = await prompt(this.questions.questionListMenu(this.message, this.usersList));
        console.log(answer);
        if (answer.option === cancelar) {
            mainMenu();
        }
    }

    // async doContinueOperation(): Promise<void> {
    //     const answer: answerConfirmContinueMenu = await prompt(
    //         this.questions.questionConfirmContinueMenu(this.messageConfirm),
    //     );
    //     if (answer.option) {
    //         this.showMenu();
    //     } else {
    //         mainMenu();
    //     }
    // }

    // async saveUser(data: answerInsertUserMenuInterface): Promise<void> {
    //     try {
    //         const user = await User.create({
    //             name: data.name,
    //         });

    //         user.save();
    //         console.log('Usuário Criado com Sucesso!');
    //     } catch (e: any) {
    //         console.log(e.message);
    //     } finally {
    //         mainMenu();
    //     }
    // }
}

export default InsertRatingMenuController;
