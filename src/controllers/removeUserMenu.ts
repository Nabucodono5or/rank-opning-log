import { prompt } from 'inquirer';
import { answerObjectListInterface, answerConfirmContinueMenu } from '../types/answers';
import { musicSchemaInterface } from '../types/music';
import { userSchemaInterface } from '../types/user';
import { optionObject, notasObject } from '../types/utility';
import Questions from '../utils/questions';
import User from '../schemas/User';
import Music from '../schemas/Music';
import mainMenu from '../mainMenu';

class RemoveUserMenuController {
    private questions: Questions = new Questions();
    private usersList: optionObject<userSchemaInterface>[] = [];
    private musicList: musicSchemaInterface[] = [];
    private messageUser: string = 'Escolha o usuário que irá Remover:';
    private userNameSelected: string = "";
    private musicSelected: musicSchemaInterface = new Music();
    private messageToConfirm: string = 'Confirmar escolha?';

    async loadUsers(): Promise<optionObject<userSchemaInterface>[]> {
        const users = await User.find();

        const usersFormattedToOptions: optionObject<userSchemaInterface>[] = users.map(
            (user: userSchemaInterface): optionObject<userSchemaInterface> => {
                const option: optionObject<userSchemaInterface> = {
                    name: `${user.name}`,
                    value: user,
                };

                return option;
            },
        );

        return usersFormattedToOptions;
    }

    //Filtrar pelo usuário
    async loadMusic(name: string): Promise<musicSchemaInterface[]> {
        let musics: musicSchemaInterface[] = await Music.find({ 'notas.user': name });

        return musics;
    }

    async showMenu(): Promise<void> {
        this.usersList = await this.loadUsers();

        const answerWithUserName: answerObjectListInterface<userSchemaInterface> = await prompt(
            this.questions.questionListMenu(this.messageUser, this.usersList),
        );

        if (await this.doContinueOperation()) {
            await this.updateMusics(answerWithUserName.option);
            await this.removeUser(answerWithUserName.option);
            console.log("Usuário removido com sucesso!!");
            mainMenu();
        } else {
            mainMenu();
        }
    }


    private async updateMusics(user: userSchemaInterface): Promise<void> {
        this.musicList = await this.loadMusic(user.name);
        this.musicList.forEach(async (music) => {
            await this.updateNotas(music, user.name);
        });
    }

    private async updateNotas(music: musicSchemaInterface, user: string): Promise<musicSchemaInterface> {
        const notas = music.notas.filter((nota) => {
                return nota.user != user;
        });

        music.notas = notas;
        music.media = this.sumMediaOfNotas(notas);
        
        try {
            await music.save();
            
        } catch (e: any) {
            console.log(e.message);
        }

        return music;
    }

    private async removeUser(user: userSchemaInterface): Promise<void> {
        try {
            user.remove();
        } catch (e: any) {
            console.log(e.message);
        }
    }

    private sumMediaOfNotas(users: Array<notasObject>): number {
        let media = 0;

        if (users.length > 0) {
            users.map((user) => {
                media += user.nota;
            });

            media = media / users.length;
        }

        return media;
    }

    private async doContinueOperation(): Promise<boolean> {
        const answer: answerConfirmContinueMenu = await prompt(
            this.questions.questionConfirmContinueMenu(this.messageToConfirm),
        );

        return answer.option;
    }
}

export default RemoveUserMenuController;
