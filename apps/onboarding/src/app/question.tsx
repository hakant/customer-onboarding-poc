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
`;

export default function Question() {
  const { id } = useParams();
  const { questionnaireState, dispatch } = useQuestionnaireState();
  useEffect(() => {
    dispatch({ type: "set-question-id", questionId: id });
  }, [id]);
  const question = getQuestion(id);
  return (
    <StyledQuestion>
      <h1>{question.text}</h1>
      { question.options.map(o => (
        <div className='option' key={o.code}>
          {o.text}
        </div>
      ))}
    </StyledQuestion>
  );
}