import { useState, useCallback } from 'react';

import TimerButton from '../TimerButton/TimerButton';
import useInterval from '../../hooks/useInterval';

import './Timer.css';

const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isOn, setIsOn] = useState(false);

  const startTimer = useCallback(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    }
    if (seconds === 0) {
      if (minutes === 0) {
        setIsOn(false);
      } else {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }
    setIsOn(true);
  }, [seconds, minutes]);

  const stopTimer = useCallback(() => {
    setIsOn(false);
  }, []);

  const resetTimer = useCallback(() => {
    setMinutes(25);
    setSeconds(0);
  }, []);

  useInterval(startTimer, isOn ? 1000 : null);

  return (
    <div className="timer-container" data-testid="timer-container">
      <div className="time-display" data-testid="time-display">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className="timer-button-container">
        <TimerButton
          buttonAction={startTimer}
          buttonValue="Start"
          disabled={isOn}
        />
        <TimerButton
          buttonAction={stopTimer}
          buttonValue="Stop"
          disabled={!isOn}
        />
        <TimerButton
          buttonAction={resetTimer}
          buttonValue="Reset"
          disabled={isOn}
        />
      </div>
    </div>
  );
};

export default Timer;
