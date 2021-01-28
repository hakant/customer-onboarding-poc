import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingState } from "./onboarding-context";
import { IdCheckStatus } from '@customer-onboarding/data';

const TodoBox = styled.div`
    height: 54px;
    padding: 8px 18px;
    margin: 30px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 16px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0,0,0,.1);
    span.label {
        width: 50%;
        margin-left: 20px;
    }
    .badge {
        display: inline-block;
        margin-left: 20px;
        width: 120px;
        padding: .25em 2em;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: .25rem;
        color: #fff;

        &.Initial {
            background-color: #6c757d;
        }

        &.PhotosUploaded {
            background-color: #17a2b8;
        }

        &.IdCheckStarted {
            background-color: #007bff;
        }

        &.IdCheckSuccessful {
            background-color: #28a745;
        }

        &.IdCheckFailed,
        &.IdCheckTimedOut {
            background-color: #dc3545;
        }
    }
`;

export default function OnboardingDashboard() {
    const { onboardingState } = useOnboardingState();
    const navigate = useNavigate();
    return (
        <div className='dashboard'>
            <p>Please complete the following tasks to open your account:</p>
            {
                onboardingState.idCheckWorkflows.map((w, i) => (
                    <TodoBox key={w.idCheckWorkflowId} onClick={() => {
                        navigate(`start-id-check/${onboardingState.onboardingId}/${w.idCheckWorkflowId}`);
                    }}>
                        <span className="label">
                            {i === 0 ? "Your Id Check: " : "Your Partner's Id Check: "}
                        </span>
                        <span className={"badge " + w.status}>
                            {GetStatusDisplayName(w.status)}
                        </span>
                    </TodoBox>
                ))
            }
        </div>
    );
}

function GetStatusDisplayName(status: IdCheckStatus): string {
    switch (status) {
        case IdCheckStatus.Initial: return "Not Started";
        case IdCheckStatus.PhotosUploaded: return "Photos uploaded...";
        case IdCheckStatus.IdCheckStarted: return "Id check in progress...";
        case IdCheckStatus.IdCheckSuccessful: return "Id check completed.";
        case IdCheckStatus.IdCheckFailed:
        case IdCheckStatus.IdCheckTimedOut: {
            return "Id check failed.";
        }
    }
}