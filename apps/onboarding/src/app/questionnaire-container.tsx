import styled from "@emotion/styled";
import axios from "axios";
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
    const { intakeId, currentQuestionId, currentAnswerCode } = questionnaireState.intake;
    useEffect(() => {
        if (previousQuestionId.current && currentQuestionId) {
            navigate("question/" + currentQuestionId);
        }
        previousQuestionId.current = currentQuestionId;
    }, [currentQuestionId]);
    return (
        <StyledHost>
            <Outlet />
            <StyledActions>
                <button onClick={() => {
                    dispatch({ type: "previous-question" });
                }}>Previous</button>
                <button disabled={!currentAnswerCode} onClick={() => {
                    axios.put(`/intakes/${intakeId}`, {
                        questionId: currentQuestionId,
                        answer: currentAnswerCode
                    })
                        .then(function () {
                            dispatch({ type: "next-question" });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }}>Next</button>
            </StyledActions>
        </StyledHost>
    );
}