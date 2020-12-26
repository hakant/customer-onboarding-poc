import React, { useState } from "react";

import styled from '@emotion/styled';
import { useNavigate } from "react-router-dom";

const StyledApp = styled.div`
    form {
      width: 500px;
      max-width: 600px;
    }
    .row {
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

export function Welcome() {
  const [sessionId, setSessionId] = useState(uuidv4());
  const navigate = useNavigate();

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function handleChange(e) {
    setSessionId(e.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(sessionId);
  }

  return (
    <StyledApp>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="sessionId">SessionId:</label>
          <input
            id="sessionId"
            type="text"
            value={sessionId}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <button onClick={() => { navigate(`/questionnaire/${sessionId}/question/1`); }}>
            Start Onboarding
          </button>
        </div>
      </form>
    </StyledApp>
  );
}

export default Welcome;
