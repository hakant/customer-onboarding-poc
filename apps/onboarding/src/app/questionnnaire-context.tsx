import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionnaireState, questionnaireStateReducer } from "./services/questionnaire-service";

export const QuestionnaireContext = React.createContext(null);

function getInitialState(currentIntakeId: string): QuestionnaireState {
  const initialState: QuestionnaireState = {
    intake: {
      intakeId: currentIntakeId,
      currentQuestionId: undefined,
      currentAnswerCode: undefined,
      answers: []
    },
    questions: []
  };
  return initialState;
}

export function QuestionnaireStateProvider(props) {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [questionnaireState, dispatch] = useReducer(questionnaireStateReducer, getInitialState(id));

  useEffect(
    () => {
      axios.get(`/intakes/${id}`)
        .then(function (response) {
          const {intake, questions} = response.data;
          dispatch({ type: "initialize-state", intake, questions});
          setIsLoaded(true);
        })
        .catch(function (error) {
          setError(error);
          setIsLoaded(true);
        });
    }, [id]
  );

  const contextValue = {
    questionnaireState,
    dispatch,
  };

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <QuestionnaireContext.Provider value={contextValue} >
      { props.children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaireState(): { questionnaireState: QuestionnaireState, dispatch: React.Dispatch<unknown> } {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error(
      "useQuestionnaireState must be used within a QuestionnaireStateProvider. " +
      "Wrap a parent component in <QuestionnaireStateProvider> to fix this error."
    );
  }
  return context;
}
