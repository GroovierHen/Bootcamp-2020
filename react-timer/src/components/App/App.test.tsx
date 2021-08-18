import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  beforeEach(() => render(<App />));

  test('should render something in App component', () => {
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('should render the Timer Component', () => {
    expect(screen.getByTestId('timer-container')).toBeInTheDocument();
  });
});
