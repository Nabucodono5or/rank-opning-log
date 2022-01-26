import { prompt } from 'inquirer';
import { answerListInterface, answerObjectListInterface } from '../types/answers';
import { musicSchemaInterface } from '../types/music';
import { optionObject, notasObject } from '../types/utility';
import Questions from '../utils/questions';
import User from '../schemas/User';
import Music from '../schemas/Music';
import mainMenu from '../mainMenu';

class InsertRatingMenuController {
    private questions: Questions = new Questions();
    private usersList: string[] = [];
    private musicList: optionObject<musicSchemaInterface>[] = [];
    private messageUser: string = 'Escolha o usuário a dar a nota:';
    private messageMusic: string = 'Escolha a música para dar a nota:';
    private cancelar: 'Cancelar' = 'Cancelar';

    async loadUsers(): Promise<string[]> {
        const users = await User.find();

        const usersName: string[] = users.map((user): string => {
            return user.name;
        });

        return usersName;
    }

    async loadMusic(): Promise<optionObject<musicSchemaInterface>[]> {
        let musics: musicSchemaInterface[] = await Music.find();

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

        const answerUser: answerListInterface = await prompt(
            this.questions.questionListMenu(this.messageUser, this.usersList),
        );

        if (this.isCanceled(answerUser, this.cancelar)) {
            mainMenu();
        }

        this.musicList = this.filterNotas(this.musicList, answerUser.option);

        const answerMusic: answerObjectListInterface<musicSchemaInterface> = await prompt(
            this.questions.questionListMenu(this.messageMusic, this.musicList),
        );

        // console.log(this.musicList);
        console.log(answerMusic);
        
    }

    private filterNotas(
        oldOptions: optionObject<musicSchemaInterface>[],
        userSelected: string,
    ): optionObject<musicSchemaInterface>[] {
        const newOptions: optionObject<musicSchemaInterface>[] = oldOptions.filter(
            (option: optionObject<musicSchemaInterface>) => {
                return !this.isUserAssigned(option.value.notas, userSelected);
            },
        );

        return newOptions;
    }

    private isUserAssigned(option: Array<notasObject>, userSelected: string): boolean {
        let result = false;
        option.forEach((op) => {
            if (op.user === userSelected) result = true;
        });

        return result;
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
