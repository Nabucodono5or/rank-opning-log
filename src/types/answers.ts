export type answerListInterface = {
    option: string;
};

export type answerConfirmContinueMenu = {
    option: boolean;
};

export type answerInsertMusicMenuInterface = {
    anime: string;
    tipo: string;
    numero: string;
    musica: string;
    salvar: boolean;
};

export type answerInsertUserMenuInterface = {
    name: string;
    salvar: boolean;
};

export type answerObjectListInterface<T> = {
    option: T;
};

export type answerInputNumber = {
    nota: number;
};
