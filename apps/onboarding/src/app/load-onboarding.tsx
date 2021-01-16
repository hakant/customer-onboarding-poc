import React, { useEffect, useState } from "react";
import axios from 'axios';

import { useNavigate, useParams } from "react-router-dom";

export function LoadOnboarding() {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.post(`/onboarding`, {
            intakeId: id
        }).then((response) => {
            const onboardingId = response.data;
            navigate(`/onboarding/${onboardingId}`);
        }).catch((error) => {
            setError(error);
            setIsLoaded(true);
        });
    });

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }
}

export default LoadOnboarding;
