import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuestionnaireState } from "./questionnaire-context";
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
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const { intakeId, currentQuestionId, currentAnswerCode } = questionnaireState.intake;
    const question = getQuestion(currentQuestionId, questionnaireState.questions);
    useEffect(() => {
        if (currentQuestionId === 'end') {
            setIsLoaded(false);
            axios.post(`/onboarding`, {
                intakeId: id
            }).then((response) => {
                const onboardingId = response.data;
                window.location.assign(`http://localhost:4201/onboarding/${onboardingId}`);
            }).catch((error) => {
                setError(error);
                setIsLoaded(true);
            });
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
        setIsLoaded(true);
    }, [currentQuestionId, id, location.pathname, navigate]);

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

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