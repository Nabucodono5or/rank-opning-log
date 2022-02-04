import { prompt } from 'inquirer';
import { answerObjectListInterface, answerConfirmContinueMenu, answerInputNumber } from '../types/answers';
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
    private musicSelected: musicSchemaInterface = new Music();
    private messageToConfirm: string = 'Confirmar escolha?';

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
        const music: musicSchemaInterface | null = await Music.findById(musicId.option);
        console.log(music);
        // const answerWithMusicObjectSelected: answerObjectListInterface<musicSchemaInterface> = await prompt(
        //     this.questions.questionListMenu(this.messageMusic, this.musicList),
        // );
    }

    private noMusicToSelect(): void {
        console.log('Você não tem músicas remover!');
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
