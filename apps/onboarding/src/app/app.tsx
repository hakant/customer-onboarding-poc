import React from "react";
import { useRoutes } from 'react-router-dom';
import Question from "./question";
import QuestionnaireContainer from "./questionnaire-container";
import { QuestionnaireStateProvider } from "./questionnnaire-context";
import Welcome from "./welcome";


export function App() {
  let element = useRoutes([
    { path: '/', element: <Welcome /> },
    {
      path: 'questionnaire',
      element:
        <QuestionnaireStateProvider>
          <QuestionnaireContainer />
        </QuestionnaireStateProvider>,
      children: [
        { path: 'question/:id', element: <Question /> },
      ]
    }
  ]);

  return element;
}

export default App;
