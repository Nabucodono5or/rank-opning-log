import { prompt } from 'inquirer';
import { musicSchemaInterface } from '../types/music';
import { answerObjectListInterface, answerConfirmContinueMenu } from '../types/answers';
import { optionObject } from '../types/utility';
import { Types } from 'mongoose';
import Questions from '../utils/questions';
import Music from '../schemas/Music';
import mainMenu from '../mainMenu';

class RemoveMusicMenuController {
    private questions: Questions = new Questions();
    private musicList: optionObject<musicSchemaInterface>[] = [];
    private messageMusic: string = 'Escolha a música para à ser removida:';
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
                this.removeMusic(answerWithMusicObjectSelected);
            } else {
                this.showMenu();
            }
        } else {
            this.noMusicToSelect();
        }
    }

    private async removeMusic(answer: answerObjectListInterface<Types.ObjectId>){
        try {
            await Music.findByIdAndDelete(answer.option);
            console.log("Musica deletada com sucesso");
        } catch (e: any) {
            console.log(e.message);
        }finally{
            this.backToMainMenu();
        }
    }

    private noMusicToSelect(): void {
        console.log('Você não tem músicas atualizar!');
        console.log('');
        mainMenu();
    }

    private backToMainMenu(): void {
        mainMenu();
    }

    private async doContinueOperation(): Promise<boolean> {
        const answer: answerConfirmContinueMenu = await prompt(
            this.questions.questionConfirmContinueMenu(this.messageToConfirm),
        );

        return answer.option;
    }
}

export default RemoveMusicMenuController;
