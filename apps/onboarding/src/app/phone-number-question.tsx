import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
import { useOnboardingState } from "./onboarding-context";
import axios from "axios";

const Container = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    line-height: 1.7em;
`;

const StyledQuestion = styled.div`
  width: 100%;
  min-width: 150px;
  input {
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
    background-color: rgba(0,0,0,.04);
    padding: 12px;
    color: #000;
    font-size: 16px;
  }
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

export default function PhoneNumberQuestion() {
    const { id } = useParams();
    const { onboardingState, setOnboardingState } = useOnboardingState();
    const [answer, setAnswer] = useState<string>();
    const navigate = useNavigate();

    useEffect(() => {
        setAnswer(onboardingState.contactPhoneNumber);
    }, [onboardingState.contactPhoneNumber]);

    return (
        <Container>
            <p>
                What is your mobile telephone number?
            </p>
            <StyledQuestion>
                <input type="text" value={answer ?? ''} onChange={(event) => setAnswer(event.target.value)} placeholder="telephone number" />
            </StyledQuestion>
            <StyledActions>
                <button onClick={() => {
                    navigate("../");
                }}>Previous</button>
                <button onClick={() => {
                    axios.put(`/onboarding/${id}/contactPhoneNumber/${answer}`)
                        .then(function () {
                            setOnboardingState((currentState) => ({
                                ...currentState,
                                contactPhoneNumber: answer
                            }));
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    navigate("../overview");
                }}>Next</button>
            </StyledActions>
        </Container>
    )
}