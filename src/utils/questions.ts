import { QuestionListInterface, QuestionInputInterface, QuestionsArray, QuestionConfirm } from '../types/questions';

class Questions {
    questionMainMenu<T>(message: string, options: Array<T>): QuestionListInterface<T>[] {
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

    questionConfirmContinueMenu(): QuestionConfirm[] {
        const question = [
            {
                type: 'confirm',
                name: 'option',
                message: 'Continuar operação?',
            },
        ];

        return question;
    }
}

export default Questions;
