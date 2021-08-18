import { render, screen } from '@testing-library/react';

import TimerButton from './TimerButton';

describe('TimerButton', () => {
  test('should render button', () => {
    render(
      <TimerButton buttonAction={jest.fn()} buttonValue="" disabled={false} />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
