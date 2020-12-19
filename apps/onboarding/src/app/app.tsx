import React, { useState } from "react";

import styled from '@emotion/styled';

const StyledApp = styled.div`
  font-family: sans-serif;
  min-width: 300px;
  margin: 50px auto;

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #143055;
    color: white;
    padding: 5px;
    border-radius: 3px;
  }

  main {
    display: flex;
    justify-content: center;
    padding: 36px 36px;
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
  }
`;

export function App() {
  const [sessionId, setSessionId] = useState(uuidv4());

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
      <header className="flex">
        <h1>Welcome to Customer Onboarding POC</h1>
      </header>
      <main>
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
            <input
              type="submit"
              className="btn btn-primary"
              value="Start Onboarding"
            />
          </div>
        </form>
      </main>
    </StyledApp>
  );
}

export default App;
