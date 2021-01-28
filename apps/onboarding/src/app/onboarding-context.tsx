import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OnboardingState } from '@customer-onboarding/data';

export const OnboardingContext = React.createContext(null);

export function OnboardingStateProvider(props) {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [onboardingState, setOnboardingState] = useState(null);

  type OnboardingStateResponse = { data: { onboardingWorkflow: OnboardingState } };

  useEffect(
    () => {
      axios.get<any, OnboardingStateResponse>(`/onboarding/${id}`)
        .then((response) => {
          setOnboardingState(response.data.onboardingWorkflow);
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

  const contextValue = {
    onboardingState,
  };

  return (
    <OnboardingContext.Provider value={contextValue} >
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
