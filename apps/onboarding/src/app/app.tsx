import React from "react";
import {
  useRoutes
} from 'react-router-dom';

import Welcome from "./welcome";


export function App() {
  let element = useRoutes([
    { path: '/', element: <Welcome /> }
    // {
    //   path: 'customers',
    //   element: <Customers />,
    //   children: [
    //     { path: '/', element: <CustomersIndex /> },
    //     { path: ':id', element: <CustomerProfile /> },
    //   ]
    // }
  ]);

  return element;
}

export default App;
