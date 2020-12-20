import React from "react";
import { useRoutes } from 'react-router-dom';
import Question from "./question";
import Welcome from "./welcome";


export function App() {
  let element = useRoutes([
    { path: '/', element: <Welcome /> },
    {
      path: 'questions/:id',
      element: <Question />,
      // children: [
      //   { path: ':id', element: <Question /> },
      // ]
    }
  ]);

  return element;
}

export default App;
