import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuestionnaireState } from "./questionnnaire-context";

const StyledHost = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
`;

const StyledActions = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 30px;
  button {
      padding: 10px 50px;
  }
`;

export default function QuestionnaireContainer() {
    const previousQuestionId = useRef(undefined);
    const navigate = useNavigate();
    const { questionnaireState, dispatch } = useQuestionnaireState();
    useEffect(() => {
        if (previousQuestionId.current && questionnaireState.currentQuestionId) {
            navigate("question/" + questionnaireState.currentQuestionId);
        }
        previousQuestionId.current = questionnaireState.currentQuestionId;
    }, [questionnaireState.currentQuestionId]);
    return (
        <StyledHost>
            <Outlet />
            <StyledActions>
                <button onClick={() => {
                    dispatch({ type: "previous-question" });
                }}>Previous</button>
                <button disabled={!questionnaireState.currentAnswerCode} onClick={() => {
                    dispatch({ type: "next-question" });
                }}>Next</button>
            </StyledActions>
        </StyledHost>
    );
}