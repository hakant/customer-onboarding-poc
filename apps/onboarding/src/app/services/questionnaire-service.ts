import questionnaire, { QuestionModel } from '../questionnaire/questionnaire'

export function getQuestion(id: string): QuestionModel | undefined {
    return questionnaire.find(q => q.id === id);
}