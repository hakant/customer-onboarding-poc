import questionnaire, { QuestionModel } from '../questionnaire/questionnaire'

const questionnaireSize = questionnaire.length;
export interface Answer {
    questionId: string,
    answerCode: string
}
export interface QuestionnaireState {
    currentIntakeId: string,
    currentQuestionId: string,
    currentAnswerCode: string,
    answers: Answer[]
}

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

function mergeNewAnswer(answer: Answer, answers: Answer[]) {
    const newAnswers = answers.filter(a => a.questionId !== answer.questionId);
    if (answer.answerCode) {
        newAnswers.push(answer);
    }
    return newAnswers;
}

export function questionnaireStateReducer(state: QuestionnaireState, action): QuestionnaireState {
    switch (action.type) {
        case "set-current-question": {
            const { questionId } = action;
            const question = getQuestion(questionId) ?? getFirstQuestion();
            const answerCode = state.answers.find(a => a.questionId === questionId)?.answerCode;

            return {
                ...state,
                currentQuestionId: question.id,
                currentAnswerCode: answerCode,
                answers: mergeNewAnswer({ questionId: question.id, answerCode }, state.answers)
            };
        }
        case "set-current-answer": {
            const { answerCode } = action;
            return {
                ...state,
                currentAnswerCode: answerCode
            };
        }
        case "next-question": {
            const { currentQuestionId, currentAnswerCode } = state;
            const newAnswers = mergeNewAnswer({
                questionId: currentQuestionId,
                answerCode: currentAnswerCode
            }, state.answers);

            const nextQuestionId = getNextQuestion(state.currentQuestionId).id;
            return {
                ...state,
                answers: newAnswers,
                currentQuestionId: nextQuestionId,
                currentAnswerCode: newAnswers.find(a => a.questionId === nextQuestionId)?.answerCode
            };
        }
        case "previous-question": {
            const previousQuestionId = getPreviousQuestion(state.currentQuestionId).id;
            return {
                ...state,
                currentQuestionId: previousQuestionId,
                currentAnswerCode: state.answers.find(a => a.questionId === previousQuestionId)?.answerCode
            }
        }
        default:
            throw new Error("Unhandled action " + action.type);
    }
}