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

            const answer: answerListInterface = await prompt(
                this.questions.questionListMenu(this.messageListProperty, options),
            );

            console.log(answer);
        } catch (e: any) {
            console.log(e.message);
        }
    }

    private generateOptionsForProperty(): Array<string> {
        const { anime, tipo, numero, musica } = this.musicSelected
            ? this.musicSelected
            : { anime: '', tipo: [], numero: 0, musica: '' };

        const options: Array<string> = [
            `Anime que apresenta essa canção: (${anime})`,
            `O tipo (${tipo})`,
            `Número da opening ou ending no anime (${numero})`,
            `Título da música (${musica})`,
        ];

        return options;
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
