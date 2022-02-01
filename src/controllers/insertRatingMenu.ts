import { prompt } from 'inquirer';
import {
    answerListInterface,
    answerObjectListInterface,
    answerConfirmContinueMenu,
    answerInputNumber,
} from '../types/answers';
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
    private userSelected: string = '';
    private messageToConfirm: string = 'Confirmar escolha?';

    async loadUsers(): Promise<string[]> {
        const users = await User.find();

        const usersName: string[] = users.map((user): string => {
            return user.name;
        });

        return usersName;
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

    async saveNotas(data: musicSchemaInterface): Promise<void> {
        try {
            data.media = this.sumMediaOfNotas(data.notas);
            data.save();
            console.log(data);
            console.log('Nota inserida com Sucesso!');
        } catch (e: any) {
            console.log(e.message);
        } finally {
            mainMenu();
        }
    }

    async showMenu(): Promise<void> {
        this.usersList = await this.loadUsers();
        this.usersList.push(this.cancelar);
        this.musicList = await this.loadMusic();

        // Etapa do usuário
        const answerWithUserName: answerListInterface = await prompt(
            this.questions.questionListMenu(this.messageUser, this.usersList),
        );
        if (this.isCanceled(answerWithUserName, this.cancelar)) {
            mainMenu();
        } else {
            this.showMenuMusic(answerWithUserName);
        }
    }

    private async showMenuMusic(answerWithUserName: answerListInterface): Promise<void> {
        this.userSelected = answerWithUserName.option;

        this.musicList = this.filterNotas(this.musicList);

        const answerWithMusicObjectSelected: answerObjectListInterface<musicSchemaInterface> = await prompt(
            this.questions.questionListMenu(this.messageMusic, this.musicList),
        );

        console.log(answerWithMusicObjectSelected);

        if (await this.doContinueOperation()) {
            this.showMenuNotas(answerWithMusicObjectSelected);
        } else {
            this.showMenu();
        }
    }

    private async showMenuNotas(
        answerWithMusicObjectSelected: answerObjectListInterface<musicSchemaInterface>,
    ): Promise<void> {
        const musicObject: musicSchemaInterface = answerWithMusicObjectSelected.option;

        const answerWithNota: answerInputNumber = await prompt(
            this.questions.questionInputNumber('Entre com a sua nota: '),
        );
        const ratingOfUser: notasObject = { user: this.userSelected, nota: answerWithNota.nota };

        musicObject.notas.push(ratingOfUser);
        this.saveNotas(musicObject);
    }

    private filterNotas(oldOptionsOfMusic: optionObject<musicSchemaInterface>[]): optionObject<musicSchemaInterface>[] {
        const newOptionsOfMusic: optionObject<musicSchemaInterface>[] = oldOptionsOfMusic.filter(
            (option: optionObject<musicSchemaInterface>) => {
                return !this.isUserAssigned(option.value.notas);
            },
        );

        return newOptionsOfMusic;
    }

    private isUserAssigned(option: Array<notasObject>): boolean {
        let assigned = false;
        option.forEach((op) => {
            if (op.user === this.userSelected) assigned = true;
        });

        return assigned;
    }

    private isCanceled(answer: answerListInterface, cancelar: 'Cancelar'): boolean {
        if (answer.option === cancelar) {
            return true;
        }
        return false;
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

export default InsertRatingMenuController;
