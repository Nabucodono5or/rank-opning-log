export type QuestionsInterface<T> = [
    {
        type: string;
        name: string;
        message: string;
        choices: Array<T>;
    },
];
