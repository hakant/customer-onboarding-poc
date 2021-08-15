import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    line-height: 1.7em;

    .action {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 50px;
    }

    button {
      padding: 10px 50px;
    }
`;

export default function Welcome() {
    const navigate = useNavigate();
    return (
        <Container>
            <section>
            Thank you. You've answered all the questions. Now it's time to open your account!
            </section>
            <section className="action">
                <button onClick={() => { navigate('./mobile-phone') }}>
                    Open Account
                </button>
            </section>
        </Container>
    );
}