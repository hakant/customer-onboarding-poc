import { PersonalDetails } from "@customer-onboarding/data";
import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOnboardingState } from "./onboarding-context";

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

export default function PersonalDetailsForm() {
    const { onboardingId, idCheckIndex } = useParams();
    const { onboardingState, setOnboardingState } = useOnboardingState();
    const [personalDetails, setPersonalDetails] = useState<PersonalDetails>();
    const navigate = useNavigate();

    useEffect(() => {
        setPersonalDetails(onboardingState.personalDetails[parseInt(idCheckIndex) - 1]);
    }, [onboardingState.personalDetails, idCheckIndex]);

    return (
        <Container>
            <p>
                Please complete the form below and click submit
            </p>
            <StyledQuestion>
                <input type="text" value={personalDetails?.name ?? ''}
                    onChange={(event) => setPersonalDetails({
                        ...personalDetails,
                        name: event.target.value
                    })}
                    placeholder="Name" />
                <input type="text" value={personalDetails?.surname ?? ''}
                    onChange={(event) => setPersonalDetails({
                        ...personalDetails,
                        surname: event.target.value
                    })}
                    placeholder="Surname" />
                <input type="text" value={personalDetails?.socialSecurityNumber ?? ''}
                    onChange={(event) => setPersonalDetails({
                        ...personalDetails,
                        socialSecurityNumber: event.target.value
                    })}
                    placeholder="Social Security Number" />
            </StyledQuestion>
            <StyledActions>
                <button onClick={() => {
                    navigate("../../../overview");
                }}>Previous</button>
                <button onClick={() => {
                    axios.put(`/onboarding/${onboardingId}/personalDetails/${idCheckIndex}`, personalDetails)
                        .then(function (response) {
                            setOnboardingState((currentState) => ({
                                ...currentState,
                                personalDetails: response.data.onboardingWorkflow.personalDetails
                            }));
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    navigate("../../../overview");
                }}>Next</button>
            </StyledActions>
        </Container>
    )
}