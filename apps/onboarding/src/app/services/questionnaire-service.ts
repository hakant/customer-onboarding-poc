import questionnaire, { QuestionModel } from '../questionnaire/questionnaire'

export function getQuestion(id: string): QuestionModel | undefined {
    return questionnaire.find(q => q.id === id);
}

export function questionnaireStateReducer(state, action) {
    switch (action.type) {
        case "reset":
            return {
                currentQuestionId: 1,
                answers: []
            };
        case "set-question-id": {
            const { questionId } = action;
            return {
                ...state,
                currentQuestionId: parseInt(questionId)
            };
        }
        case "next-question":
            return {
                ...state,
                currentQuestionId: state.currentQuestionId + 1
            }
        case "previous-question":
            return {
                ...state,
                currentQuestionId: state.currentQuestionId - 1 ?? 1
            }
        default:
            throw new Error("Unhandled action " + action.type);
    }
}