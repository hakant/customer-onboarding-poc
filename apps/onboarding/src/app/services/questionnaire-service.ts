import questionnaire, { QuestionModel } from '../questionnaire/questionnaire'

const questionnaireSize = questionnaire.length;

export function getQuestion(id: string): QuestionModel | undefined {
    return questionnaire.find(q => q.id === id);
}

function getFirstQuestion(): QuestionModel {
    return questionnaire[0];
}

function getNextQuestion(currentQuestionId: string): QuestionModel {
    const currentIndex = questionnaire.findIndex(q => q.id === currentQuestionId);
    const nextIndex = currentIndex + 1;
    return questionnaireSize > nextIndex ?
        questionnaire[nextIndex] :
        questionnaire[currentIndex];
}

function getPreviousQuestion(currentQuestionId: string): QuestionModel {
    const currentIndex = questionnaire.findIndex(q => q.id === currentQuestionId);
    const nextIndex = currentIndex - 1;
    return nextIndex > -1 ?
        questionnaire[nextIndex] :
        questionnaire[currentIndex];
}

export function questionnaireStateReducer(state, action) {
    switch (action.type) {
        case "reset":
            return {
                currentQuestionId: getFirstQuestion().id,
                answers: []
            };
        case "set-question-id": {
            const { questionId } = action;
            const question = getQuestion(questionId);
            return {
                ...state,
                currentQuestionId: question?.id ?? getFirstQuestion().id 
            };
        }
        case "next-question":
            return {
                ...state,
                currentQuestionId: getNextQuestion(state.currentQuestionId).id
            }
        case "previous-question":
            return {
                ...state,
                currentQuestionId: getPreviousQuestion(state.currentQuestionId).id
            }
        default:
            throw new Error("Unhandled action " + action.type);
    }
}