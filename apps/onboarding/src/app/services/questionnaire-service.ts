
export type QuestionModel = {
    id: string;
    text: string;
    options: { text: string, code: string }[]
}
export interface Intake {
    intakeId: string,
    currentQuestionId: string,
    currentAnswerCode: string,
    answers: Answer[]
}
export interface Answer {
    questionId: string,
    answerCode: string
}
export interface QuestionnaireState {
    intake: Intake,
    questions: QuestionModel[]
}

export function getQuestion(id: string, questions: QuestionModel[]): QuestionModel | undefined {
    return questions.find(q => q.id === id);
}

function getFirstQuestion(questions: QuestionModel[]): QuestionModel {
    return questions[0];
}

function getNextQuestion(currentQuestionId: string, questions: QuestionModel[]): QuestionModel {
    const currentIndex = questions.findIndex(q => q.id === currentQuestionId);
    const nextIndex = currentIndex + 1;
    return questions.length > nextIndex ?
        questions[nextIndex] :
        questions[currentIndex];
}

function getPreviousQuestion(currentQuestionId: string, questions: QuestionModel[]): QuestionModel {
    const currentIndex = questions.findIndex(q => q.id === currentQuestionId);
    const nextIndex = currentIndex - 1;
    return nextIndex > -1 ?
        questions[nextIndex] :
        questions[currentIndex];
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
        case "initialize-state": {
            const { intake, questions } = action;
            return {
                intake: intake,
                questions: questions
            };
        }
        case "set-current-question": {
            const { questionId } = action;
            const question = getQuestion(questionId, state.questions) ?? getFirstQuestion(state.questions);
            const answerCode = state.intake.answers.find(a => a.questionId === questionId)?.answerCode;

            return {
                ...state,
                intake: {
                    ...state.intake,
                    currentQuestionId: question.id,
                    currentAnswerCode: answerCode,
                    answers: mergeNewAnswer({ questionId: question.id, answerCode }, state.intake.answers)
                }
            };
        }
        case "set-current-answer": {
            const { answerCode } = action;
            return {
                ...state,
                intake: {
                    ...state.intake,
                    currentAnswerCode: answerCode
                }
            };
        }
        case "next-question": {
            const { currentQuestionId, currentAnswerCode } = state.intake;
            const newAnswers = mergeNewAnswer({
                questionId: currentQuestionId,
                answerCode: currentAnswerCode
            }, state.intake.answers);

            const nextQuestionId = getNextQuestion(state.intake.currentQuestionId, state.questions).id;
            return {
                ...state,
                intake: {
                    ...state.intake,
                    answers: newAnswers,
                    currentQuestionId: nextQuestionId,
                    currentAnswerCode: newAnswers.find(a => a.questionId === nextQuestionId)?.answerCode
                }
            };
        }
        case "previous-question": {
            const previousQuestionId = getPreviousQuestion(state.intake.currentQuestionId, state.questions).id;
            return {
                ...state,
                intake: {
                    ...state.intake,
                    currentQuestionId: previousQuestionId,
                    currentAnswerCode: state.intake.answers.find(a => a.questionId === previousQuestionId)?.answerCode
                }
            }
        }
        default:
            throw new Error("Unhandled action " + action.type);
    }
}