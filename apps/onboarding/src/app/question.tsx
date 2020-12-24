import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuestionnaireState } from "./questionnnaire-context";
import { getQuestion } from './services/questionnaire-service';

export default function Question() {
  const { id } = useParams();
  const { questionnaireState, dispatch } = useQuestionnaireState();
  useEffect(() => {
    dispatch({ type: "set-question-id", questionId: id });
  }, [id]);
  const question = getQuestion(id);
  return (
    <div id="question">
      <h1>{question.text}</h1>
      { question.options.map(o => (
        <div key={o.code}>{o.text}</div>
      ))}
    </div>
  );
}