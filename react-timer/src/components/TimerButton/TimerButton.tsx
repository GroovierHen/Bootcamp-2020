import { FC } from 'react';

import './TimerButton.css';

type Props = {
  buttonAction: () => void;
  buttonValue: string;
  disabled: boolean;
};

const TimerButton: FC<Props> = ({ buttonAction, buttonValue, disabled }) => (
  <button onClick={buttonAction} disabled={disabled}>
    {buttonValue}
  </button>
);

export default TimerButton;
