import { prompt } from 'inquirer';
import { answerObjectListInterface, answerConfirmContinueMenu, answerListInterface } from '../types/answers';
import { musicSchemaInterface } from '../types/music';
import { optionObject } from '../types/utility';
import { Types } from 'mongoose';
import Questions from '../utils/questions';
import Music from '../schemas/Music';
import mainMenu from '../mainMenu';

class UpdateMusicMenuController {
    private questions: Questions = new Questions();
    private musicList: optionObject<musicSchemaInterface>[] = [];
    private messageMusic: string = 'Escolha a música para para atualizar à nota:';
    private musicSelected: musicSchemaInterface | null = new Music();
    private messageToConfirm: string = 'Confirmar escolha?';
    private messageListProperty: string = 'Escolha o item a ser alterado';

    async loadMusic(): Promise<optionObject<musicSchemaInterface>[]> {
        let musics: musicSchemaInterface[] = await Music.find();

        const musicsFormattedToOptions: optionObject<musicSchemaInterface>[] = musics.map(
            (music: musicSchemaInterface): optionObject<musicSchemaInterface> => {
                const option: optionObject<musicSchemaInterface> = {
                    name: `${music.anime} - ${music.musica} ( ${music.tipo} ${music.numero} )`,
                    value: music.id,
                };

                return option;
            },
        );

        return musicsFormattedToOptions;
    }

    async showMenu(): Promise<void> {
        this.musicList = await this.loadMusic();

        if (this.musicList.length > 0) {
            const answerWithMusicObjectSelected: answerObjectListInterface<Types.ObjectId> = await prompt(
                this.questions.questionListMenu(this.messageMusic, this.musicList),
            );

            if (await this.doContinueOperation()) {
                this.selectMusicProprietyMenu(answerWithMusicObjectSelected);
            } else {
                this.showMenu();
            }
        } else {
            this.noMusicToSelect();
        }
    }

    private async selectMusicProprietyMenu(musicId: answerObjectListInterface<Types.ObjectId>): Promise<void> {
        try {
            this.musicSelected = await Music.findById(musicId.option);
            const options = this.generateOptionsForProperty();

            const answer: answerObjectListInterface<number> = await prompt(
                this.questions.questionListMenu(this.messageListProperty, options),
            );

            this.updateMusicProperty(answer);
        } catch (e: any) {
            console.log(e.message);
        }
    }

    private generateOptionsForProperty(): optionObject<number>[] {
        const { anime, tipo, numero, musica } = this.musicSelected
            ? this.musicSelected
            : { anime: '', tipo: [], numero: 0, musica: '' };

        const options: optionObject<number>[] = [
            {
                name: `Anime que apresenta essa canção: (${anime})`,
                value: 1,
            },
            {
                name: `O tipo (${tipo})`,
                value: 2,
            },
            {
                name: `Número da opening ou ending no anime (${numero})`,
                value: 3,
            },
            {
                name: `Título da música (${musica})`,
                value: 4,
            },
        ];

        return options;
    }

    private updateMusicProperty(answer: answerObjectListInterface<number>): void {
        switch (answer.option) {
            case 1:
                console.log('escolhida a opção 1');
                break;
            case 2:
                console.log('escolhida a opção 2');
                break;
            case 3:
                console.log('escolhida a opção 3');
                break;
            case 4:
                console.log('escolhida a opção 4');
                break;
        }
    }

    private noMusicToSelect(): void {
        console.log('Você não tem músicas atualizar!');
        console.log('');
        mainMenu();
    }

    private async doContinueOperation(): Promise<boolean> {
        const answer: answerConfirmContinueMenu = await prompt(
            this.questions.questionConfirmContinueMenu(this.messageToConfirm),
        );

        return answer.option;
    }
}

export default UpdateMusicMenuController;
