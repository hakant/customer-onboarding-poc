import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuestionnaireState } from "./questionnnaire-context";
import { getQuestion } from './services/questionnaire-service';

const StyledQuestion = styled.div`
  width: 100%;
  min-width: 150px;
  div.option {
    padding: 10px 0;
    margin: 10px 0;
    text-align: center;
    background-color: white;
    color: black;
    border: 2px solid black;
  }
  div.option.selected {
    background-color: #11C8CE;
  }
`;

export default function Question() {
  const { id } = useParams();
  const { questionnaireState, dispatch } = useQuestionnaireState();
  const { currentAnswerCode } = questionnaireState.intake;
  const question = getQuestion(id, questionnaireState.questions);


  useEffect(() => {
    dispatch({ type: "set-current-question", questionId: id });
  }, [id]);

  return (
    <StyledQuestion>
      <h1>{question.text}</h1>
      { question.options.map(o => (
        <div
          key={o.code}
          className={`option ${o.code === currentAnswerCode ? "selected" : ''}`}
          onClick={() => {
            dispatch({ type: "set-current-answer", answerCode: o.code });
          }}>
          {o.text}
        </div>
      ))}
    </StyledQuestion>
  );
}