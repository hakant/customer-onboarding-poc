import styled from '@emotion/styled';
import { Outlet, useRoutes } from 'react-router-dom';
import { OnboardingStateProvider } from './onboarding-context';
import OnboardingDashboard from "./onboarding-dashboard";
import PersonalDetailsForm from './personal-details-form';
import PhoneNumberQuestion from './phone-number-question';
import StartIdCheck from './start-id-check';
import Welcome from './welcome';


const StyledHost = styled.div`
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
  }
`;

export function Host() {
  return (
    <StyledHost>
      <header className="flex">
        <h1>Customer Onboarding POC</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </StyledHost>
  );
}

export default function App() {
  const element = useRoutes([
    {
      path: '/',
      element: <Host />,
      children: [
        {
          path: 'onboarding/:id',
          element:
            <OnboardingStateProvider>
              <Outlet />
            </OnboardingStateProvider>,
          children: [
            { path: '', element: <Welcome /> },
            { path: 'mobile-phone', element: <PhoneNumberQuestion /> },
            { path: 'overview', element: <OnboardingDashboard /> },
            { path: 'start-id-check/:onboardingId/:idCheckId/:idCheckIndex', element: <StartIdCheck /> },
            { path: 'personal-details/:onboardingId/:idCheckIndex', element: <PersonalDetailsForm /> },
          ]
        }
      ]
    }
  ]);

  return element;
}
