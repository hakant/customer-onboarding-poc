import React, { useState } from "react";

import styled from '@emotion/styled';

const StyledApp = styled.div`
  font-family: sans-serif;
  min-width: 300px;
  margin: 50px auto;

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  header {
    background-color: #143055;
    color: white;
    padding: 5px;
    border-radius: 3px;
  }

  main {
    padding: 36px 36px;
    label {
      margin-right: 36px;
    }
    input {
      width: 50%;
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
        <h1>Welcome to Customer Onboarding POC!</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="sessionId">SessionId</label>
            <input
              id="sessionId"
              type="text"
              value={sessionId}
              onChange={handleChange}
            />
          </div>
          <div>
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
