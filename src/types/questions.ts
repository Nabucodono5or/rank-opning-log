export type QuestionListInterface<T> = {
    type: string;
    name: string;
    message: string;
    choices: Array<T>;
};

export type QuestionInputInterface = {
    type: string;
    name: string;
    message: string;
};

export type QuestionConfirm = {
    type: string;
    name: string;
    message: string;
};

export type QuestionInputNumberInterface = {
    type: string;
    nota: string;
    message: string;    
}

export type QuestionsArray<T> = (QuestionConfirm | QuestionInputInterface | QuestionListInterface<T>)[];
