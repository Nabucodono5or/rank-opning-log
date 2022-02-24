import { prompt } from 'inquirer';
import { answerObjectListInterface, answerConfirmContinueMenu, answerInputNumber } from '../types/answers';
import { musicSchemaInterface } from '../types/music';
import { userSchemaInterface } from '../types/user';
import { optionObject, notasObject } from '../types/utility';
import Questions from '../utils/questions';
import User from '../schemas/User';
import Music from '../schemas/Music';
import mainMenu from '../mainMenu';

class UpdateRatingMenuController {
    private questions: Questions = new Questions();
    private usersList: optionObject<userSchemaInterface>[] = [];
    private musicList: optionObject<musicSchemaInterface>[] = [];
    private messageUser: string = 'Escolha o usuário que irá atualiza à nota:';
    private messageMusic: string = 'Escolha a música para para atualizar à nota:';
    private userSelected: userSchemaInterface = new User();
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

    async loadMusic(): Promise<optionObject<musicSchemaInterface>[]> {
        let musics: musicSchemaInterface[] = await Music.find();

        const musicsFormattedToOptions: optionObject<musicSchemaInterface>[] = musics.map(
            (music: musicSchemaInterface): optionObject<musicSchemaInterface> => {
                const option: optionObject<musicSchemaInterface> = {
                    name: `${music.anime} - ${music.musica} ( ${music.tipo} ${music.numero} )`,
                    value: music,
                };

                return option;
            },
        );

        return musicsFormattedToOptions;
    }

    async showMenu(): Promise<void> {
        this.usersList = await this.loadUsers();
        this.musicList = await this.loadMusic();

        const answerWithUserName: answerObjectListInterface<userSchemaInterface> = await prompt(
            this.questions.questionListMenu(this.messageUser, this.usersList),
        );

        if (await this.doContinueOperation()) {
            this.showMenuMusic(answerWithUserName);
        } else {
            mainMenu();
        }
    }

    private async showMenuMusic(answerWithUserName: answerObjectListInterface<userSchemaInterface>): Promise<void> {
        this.userSelected = answerWithUserName.option;

        this.musicList = this.filterNotas(this.musicList);

        if (this.musicList.length > 0) {
            this.selectMusicMenu();
        } else {
            this.noMusicToSelect();
        }
    }

    private async selectMusicMenu(): Promise<void> {
        const answerWithMusicObjectSelected: answerObjectListInterface<musicSchemaInterface> = await prompt(
            this.questions.questionListMenu(this.messageMusic, this.musicList),
        );

        if (await this.doContinueOperation()) {
            this.insertNotaMenu(answerWithMusicObjectSelected.option);
        } else {
            this.showMenu();
        }
    }

    private async insertNotaMenu(musicSelected: musicSchemaInterface): Promise<void> {
        try {
            this.musicSelected = musicSelected;
            const myNota: notasObject = this.getMyNota();

            await this.updatedNota(myNota);
            this.saveNotas();
        } catch (e: any) {
            console.log(e.message);
        }
    }

    async saveNotas(): Promise<void> {
        try {
            this.musicSelected.media = this.sumMediaOfNotas(this.musicSelected.notas);
            await this.musicSelected.save();
            console.log('Nota atualizada com Sucesso!');
        } catch (e: any) {
            console.log(e.message);
        } finally {
            mainMenu();
        }
    }

    private noMusicToSelect(): void {
        console.log('Você não tem músicas votadas!');
        console.log('');
        mainMenu();
    }

    private getMyNota(): notasObject {
        const notas: notasObject[] = this.musicSelected.notas;
        let nota: notasObject = {} as notasObject;

        notas.forEach((notaObject) => {
            if (notaObject.user === this.userSelected.name) {
                nota = notaObject;
            }
        });

        return nota;
    }

    private async updatedNota(myOldNota: notasObject): Promise<notasObject> {
        let notaToBeUpdated: notasObject = myOldNota;

        const answerWithNota: answerInputNumber = await prompt(
            this.questions.questionInputNumber(`Entre com a sua nova nota (${myOldNota.nota}): `),
        );

        notaToBeUpdated.nota = answerWithNota.nota;
        return notaToBeUpdated;
    }

    private filterNotas(oldOptionsOfMusic: optionObject<musicSchemaInterface>[]): optionObject<musicSchemaInterface>[] {
        const newOptionsOfMusic: optionObject<musicSchemaInterface>[] = oldOptionsOfMusic.filter(
            (option: optionObject<musicSchemaInterface>) => {
                return this.isUserAssigned(option.value.notas);
            },
        );

        return newOptionsOfMusic;
    }

    private isUserAssigned(option: Array<notasObject>): boolean {
        let assigned = false;
        option.forEach((op) => {
            if (op.user === this.userSelected.name) assigned = true;
        });

        return assigned;
    }

    private sumMediaOfNotas(users: notasObject[]): number {
        let media = 0;
        users.map((user) => {
            media += user.nota;
        });

        media = media / users.length;
        return media;
    }

    private async doContinueOperation(): Promise<boolean> {
        const answer: answerConfirmContinueMenu = await prompt(
            this.questions.questionConfirmContinueMenu(this.messageToConfirm),
        );

        return answer.option;
    }
}

export default UpdateRatingMenuController;
