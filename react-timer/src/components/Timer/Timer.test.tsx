import { render, screen, fireEvent, act } from '@testing-library/react';

import Timer from './Timer';

describe('Timer', () => {
  beforeEach(() => render(<Timer />));

  test('should render timer container', () => {
    expect(screen.getByTestId('timer-container')).toBeInTheDocument();
  });

  test('should render instances of the TimerButton component', () => {
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  test('start and test Timer', async () => {
    const timeDisplay = screen.getByTestId('time-display');

    expect(timeDisplay.innerHTML).toEqual('25:00');

    fireEvent.click(screen.getByText('Start'), {
      exact: true,
    });

    await act(() => new Promise((r) => setTimeout(r, 4000)));

    fireEvent.click(screen.getByText('Stop'), {
      exact: true,
    });

    expect(timeDisplay.innerHTML).toEqual('24:56');

    fireEvent.click(screen.getByText('Reset'), {
      exact: true,
    });

    expect(timeDisplay.innerHTML).toEqual('25:00');
  });
});
