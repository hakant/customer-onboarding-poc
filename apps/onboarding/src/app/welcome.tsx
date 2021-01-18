import React, { useState } from "react";
import axios from 'axios';

import styled from '@emotion/styled';
import { useNavigate } from "react-router-dom";

const StyledApp = styled.div`
    .row {
      width: 500px;
      max-width: 600px;
      padding: 10px;
    }
    label {
      margin-right: 25px;
    }
    button {
      min-width: 100%;
      padding: 10px 50px;
      text-align: center;
    }
    input {
      min-width: 100%;
      text-align: center;
      margin: 8px 0;
      border: 1px solid #ccc;
      box-shadow: inset 0 1px 3px #ddd;
      border-radius: 4px;
      box-sizing: border-box;
      padding-left: 20px;
      padding-right: 20px;
      padding-top: 12px;
      padding-bottom: 12px;
    }
`;

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <StyledApp>
      <div className="row">
        <button onClick={() => {
          axios.post('/intakes', {})
            .then(function (response) {
              const newIntakeId = response.data;
              navigate(`/questionnaire/${newIntakeId}/question/1`);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}>
          Start Onboarding
          </button>
      </div>
    </StyledApp>
  );
}
