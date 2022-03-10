import { musicSchemaInterface } from '../types/music';
import Music from '../schemas/Music';
import mainMenu from '../mainMenu';

class ListMusicMenuController {
    private musicList: musicSchemaInterface[] = [];

    async loadMusic(): Promise<musicSchemaInterface[]> {
        let musics = await Music.find().sort({media: -1});
        return musics;
    }

    async showMenu(): Promise<void> {
        this.musicList = await this.loadMusic();
        if(this.musicList.length > 0){
            this.printMusicsResulted();
            mainMenu();
        }else{
            this.noMusicToSelect();
        }
    }

    private printMusicsResulted(): void {
        let index: number = 0;
        let result: string;

        this.markLine();
        console.log("RANKING DE OPENINGS E ENDINGS");
        
        this.musicList.forEach(music => {
            result = `${index}) ${music.anime} -- ${music.musica} ( ${music.tipo} ${music.numero} ) | Nota: ${music.media}`;
            console.log(result);
            index++;
        });

        this.markLine();
    }

    private markLine(): void{
        console.log();
        console.log("--------------------------------------------------------");
    }

    private noMusicToSelect(): void {
        console.log('Você não tem músicas cadastradas!');
        console.log('');
        mainMenu();
    }
}

export default ListMusicMenuController;
