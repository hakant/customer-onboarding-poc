import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuestionnaireState } from "./questionnnaire-context";

export default function QuestionnaireContainer() {
    const navigate = useNavigate();
    const { questionnaireState, dispatch } = useQuestionnaireState();
    useEffect(() => {
        if (questionnaireState.currentQuestionId) {
            navigate("question/" + questionnaireState.currentQuestionId);
        }
    }, [questionnaireState.currentQuestionId]);
    return (
        <>
            <Outlet />
            <button onClick={() => {
                dispatch({ type: "previous-question" });
            }}>Previous</button>
            <button onClick={() => {
                dispatch({ type: "next-question" });
            }}>Next</button>
        </>
    );
}