import { QuestionsInterface } from '../types/questions';

class Questions {
    questionMainMenu<T>(message: string, options: Array<T>): QuestionsInterface<T> {
        const questions: QuestionsInterface<T> = [
            {
                type: 'list',
                name: 'option',
                message,
                choices: options,
            },
        ];

        return questions;
    }
}

export default Questions;
