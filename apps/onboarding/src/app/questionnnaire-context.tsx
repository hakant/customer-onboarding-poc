import React, { useContext, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { QuestionnaireState, questionnaireStateReducer } from "./services/questionnaire-service";

export const QuestionnaireContext = React.createContext(null);

function getInitialState(currentIntakeId: string): QuestionnaireState {
  const defaultState: QuestionnaireState = {
    currentIntakeId: currentIntakeId,
    currentQuestionId: undefined,
    currentAnswerCode: undefined,
    answers: []
  };

  let initialState: QuestionnaireState;
  try {
    initialState = JSON.parse(localStorage.getItem("questionnaire-state")) ?? defaultState;
  } catch {
    console.error("The questionnaire-state could not be parsed.");
    initialState = defaultState;
  }

  if (initialState.currentIntakeId !== currentIntakeId) {
    initialState = defaultState;
  }

  return initialState;
}

export function QuestionnaireStateProvider(props) {
  const { id } = useParams();
  const [questionnaireState, dispatch] = useReducer(questionnaireStateReducer, getInitialState(id));

  useEffect(
    () => localStorage.setItem("questionnaire-state", JSON.stringify(questionnaireState)),
    [questionnaireState]
  );

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
