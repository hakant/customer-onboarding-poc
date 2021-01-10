import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuestionnaireState } from "./questionnnaire-context";
import { getQuestion } from "./services/questionnaire-service";

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
    const location = useLocation();
    const previousQuestionId = useRef(undefined);
    const { id } = useParams();
    const navigate = useNavigate();
    const { questionnaireState, dispatch } = useQuestionnaireState();
    const { intakeId, currentQuestionId, currentAnswerCode } = questionnaireState.intake;
    const question = getQuestion(currentQuestionId, questionnaireState.questions);
    useEffect(() => {
        if (currentQuestionId === 'end') {
            navigate(`/open-account-dashboard/${intakeId}`);
            return;
        }
        if (location.pathname.indexOf('/question/') < 0) {
            // if question is not specified, route to the current question that we know
            navigate(`question/${currentQuestionId}`);
        }
        if (previousQuestionId.current && currentQuestionId) {
            navigate(`question/${currentQuestionId}`);
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
                <button disabled={!currentAnswerCode && question?.options.length > 0} onClick={() => {
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