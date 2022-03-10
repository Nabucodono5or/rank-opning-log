import { musicSchemaInterface } from '../types/music';
import Music from '../schemas/Music';
import mainMenu from '../mainMenu';

class ListMusicMenuController {
    private musicList: musicSchemaInterface[] = [];

    async loadMusic(): Promise<musicSchemaInterface[]> {
        let musics = await Music.find().sort('media');
        return musics;
    }

    async showMenu(): Promise<void> {
        this.musicList = await this.loadMusic();
        this.printMusicsResulted();
    }

    private printMusicsResulted(): void {
        this.musicList.forEach((music) => {
            console.log(music);
        });
    }

    private noMusicToSelect(): void {
        console.log('Você não tem músicas cadastradas!');
        console.log('');
        mainMenu();
    }
}

export default ListMusicMenuController;
