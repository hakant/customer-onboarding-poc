import React, { useState } from "react";
import QRCode from "qrcode.react";
import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    line-height: 1.7em;
`;

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

const StyledActions = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 30px;
  button {
      padding: 10px 50px;
  }
`;

export default function StartIdCheck() {
    const { onboardingId, idCheckId, idCheckIndex } = useParams();
    const [answer, setAnswer] = useState<string>();
    const [displayLink, setDisplayLink] = useState(false);
    const navigate = useNavigate();

    if (displayLink) {
        return (
            <QRCode value={`http://localhost:4201/id-check/${onboardingId}/${idCheckId}/${idCheckIndex}`} />
        )
    }

    return (
        <Container>
            <p>
                We recommend that you use your mobile phone camera to scan your passport.
                Do you want to continue with this device or switch to another device?
            </p>
            <StyledQuestion>
                <div className={`option ${answer === "stay" ? "selected" : ''}`}
                    onClick={() => {
                        setAnswer("stay");
                    }}>
                    Continue with this device
                </div>
                <div className={`option ${answer === "switch" ? "selected" : ''}`}
                    onClick={() => {
                        setAnswer("switch");
                    }}>
                    Switch to another device
                </div>
            </StyledQuestion>
            <StyledActions>
                <button onClick={() => {
                    navigate("../../../");
                }}>Previous</button>
                <button disabled={!answer} onClick={() => {
                    if (answer === "stay") {
                        window.location.assign(`http://localhost:4201/id-check/${onboardingId}/${idCheckId}/${idCheckIndex}`);
                    } else {
                        setDisplayLink(true);
                    }
                }}>Next</button>
            </StyledActions>
        </Container>
    )
}