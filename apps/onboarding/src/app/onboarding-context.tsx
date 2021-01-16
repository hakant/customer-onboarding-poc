import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const OnboardingContext = React.createContext(null);

export interface OnboardingState {
  onboardingId: string,
  intakeId: string,
  idCheckWorkflows: IdCheckWorkflow[]
}

export interface IdCheckWorkflow {
  id: string,
  status: IdCheckStatus
}

enum IdCheckStatus {
  Initial,
  PhotosUploaded,
  IdCheckStarted,
  IdCheckTimedOut,
  IdCheckFailed,
  IdCheckSuccessful
}

function getInitialState(currentIntakeId: string): OnboardingState {
  const initialState: OnboardingState = {
    onboardingId: null,
    intakeId: currentIntakeId,
    idCheckWorkflows: []
  };
  return initialState;
}

export function OnboardingStateProvider(props) {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [onboardingState, setOnboardingState] = useState(getInitialState(id));

  useEffect(
    () => {
      axios.get<any, { data: OnboardingState }>(`/onboarding/${id}`)
        .then((response) => {
          setOnboardingState(response.data);
          setIsLoaded(true);
        })
        .catch((error) => {
          setError(error);
          setIsLoaded(true);
        });
    }, []
  );

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <OnboardingContext.Provider value={onboardingState} >
      { props.children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingState(): { onboardingState: OnboardingState } {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      "useOnboardingState must be used within a OnboardingStateProvider. " +
      "Wrap a parent component in <OnboardingStateProvider> to fix this error."
    );
  }
  return context;
}
