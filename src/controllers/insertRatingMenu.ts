import { prompt } from 'inquirer';
import { answerListInterface } from '../types/answers';
import { musicSchemaInterface } from '../types/music';
import { optionObject } from '../types/utility';
import Questions from '../utils/questions';
import User from '../schemas/User';
import Music from '../schemas/Music';
import mainMenu from '../mainMenu';

class InsertRatingMenuController {
    private questions: Questions = new Questions();
    private usersList: string[] = [];
    private musicList: optionObject<musicSchemaInterface>[] = [];
    private message: string = 'Escolha o usuário a dar a nota:';
    private cancelar: 'Cancelar' = 'Cancelar';

    async loadUsers(): Promise<string[]> {
        const users = await User.find();

        const usersName: string[] = users.map((user): string => {
            return user.name;
        });

        return usersName;
    }

    async loadMusic(): Promise<optionObject<musicSchemaInterface>[]> {
        const musics = await Music.find();

        const options: optionObject<musicSchemaInterface>[] = musics.map(
            (music: musicSchemaInterface): optionObject<musicSchemaInterface> => {
                const option: optionObject<musicSchemaInterface> = {
                    name: `${music.anime} - ${music.musica} ( ${music.tipo} ${music.numero} )`,
                    value: music,
                };

                return option;
            },
        );

        return options;
    }

    async showMenu(): Promise<void> {
        this.usersList = await this.loadUsers();
        this.usersList.push(this.cancelar);
        this.musicList = await this.loadMusic();

        const answer: answerListInterface = await prompt(this.questions.questionListMenu(this.message, this.usersList));

        if (this.isCanceled(answer, this.cancelar)) {
            mainMenu();
        }

        console.log(this.musicList);
    }

    private isCanceled(answer: answerListInterface, cancelar: 'Cancelar'): boolean {
        if (answer.option === cancelar) {
            return true;
        }
        return false;
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
