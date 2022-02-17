import {
    QuestionListInterface,
    QuestionsArray,
    QuestionConfirm,
    QuestionInputNumberInterface,
} from '../types/questions';

class Questions {
    questionListMenu<T>(message: string, options: Array<T>): QuestionListInterface<T>[] {
        const questions: QuestionListInterface<T>[] = [
            {
                type: 'list',
                name: 'option',
                message,
                choices: options,
            },
        ];

        return questions;
    }

    questionInsertMusic<T>(message: string, options: Array<T>): QuestionsArray<T> {
        const questions: QuestionsArray<T> = [
            {
                type: 'input',
                name: 'anime',
                message: 'Anime que apresenta essa canção:',
            },
            {
                type: 'list',
                name: 'tipo',
                message: 'Qual o tipo:',
                choices: options,
            },
            {
                type: 'input',
                name: 'numero',
                message: 'Número da opening ou ending no anime:',
            },
            {
                type: 'input',
                name: 'musica',
                message: 'Título da música:',
            },
            {
                type: 'confirm',
                name: 'salvar',
                message: 'Confirmar informações?',
            },
        ];

        return questions;
    }

    questionConfirmContinueMenu(message: string): QuestionConfirm[] {
        const question = [
            {
                type: 'confirm',
                name: 'option',
                message,
            },
        ];

        return question;
    }

    questionInputUserName<T>(message: string): QuestionsArray<T> {
        const question: QuestionsArray<T> = [
            {
                type: 'input',
                name: 'name',
                message,
            },
            {
                type: 'confirm',
                name: 'salvar',
                message: 'Confirmar informações?',
            },
        ];

        return question;
    }

    questionInputNumber(message: string): QuestionInputNumberInterface[] {
        const question: QuestionInputNumberInterface[] = [
            {
                type: 'number',
                nota: 'nota',
                message,
            },
        ];

        return question;
    }
}

export default Questions;
