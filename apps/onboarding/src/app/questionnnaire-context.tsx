import React, { useContext, useReducer } from "react";
import { QuestionnaireState, questionnaireStateReducer } from "./services/questionnaire-service";

export const QuestionnaireContext = React.createContext(null);

export function QuestionnaireStateProvider(props) {
  const [questionnaireState, dispatch] = useReducer(questionnaireStateReducer, {
    currentQuestionId: undefined,
    currentAnswerCode: undefined,
    answers: []
  });

  const contextValue = {
    questionnaireState,
    dispatch,
  };

  return (
    <QuestionnaireContext.Provider value={contextValue} >
      { props.children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaireState(): { questionnaireState: QuestionnaireState, dispatch: any } {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error(
      "useQuestionnaireState must be used within a QuestionnaireStateProvider. " +
      "Wrap a parent component in <QuestionnaireStateProvider> to fix this error."
    );
  }
  return context;
}
