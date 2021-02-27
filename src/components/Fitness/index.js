import React, { useEffect, useState } from 'react';
import { clearAllIntervals } from '../../utils/TimeHelper';
import TimerDisplay from '../TimerDisplay';
import { Button, CellsTitle, Slider } from 'react-weui';
import './Fitness.scss';
import GitHub from '../Github';

let schedule = [];
let totalSeconds = 0;
const initPlan = {
  training: 10,
  rest: 5,
  repeat: 11,
};

const Fitness = () => {
  const [plan, setPlan] = useState(initPlan);
  const [touchedAt, setTouchedAt] = useState(null);
  const [nextCountDown, setNextCountDown] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleOnChange = (value, name) => {
    setPlan({
      ...plan,
      [name]: value,
    });
  };

  const handleClickStart = () => {
    // window.alert.play();

    schedule = [];
    for (let i = 0; i < plan.repeat; i++) {
      schedule.push(parseInt(plan.rest));
      schedule.push(parseInt(plan.training));
    }
    setTouchedAt(new Date().getTime());
    totalSeconds = schedule.reduce((sum, x) => sum + x, 0);

    let temp = totalSeconds;
    setInterval(() => {
      const value = (100 - (temp-- / totalSeconds) * 100).toFixed(0);

      if (parseInt(value) === 0) {
        setProgress(1);
      } else {
        setProgress(value);
      }
    }, 1000);
  };

  const handleClickCancel = () => {
    clearAllIntervals();

    schedule = [];
    setPlan(initPlan);
    setTouchedAt(null);
    setNextCountDown(0);
    setProgress(0);
  };

  const handleResetCallback = () => {
    setNextCountDown(0);
    if (schedule.length === 0) {
      setProgress(0);
      setTouchedAt(null);
    } else {
      setTouchedAt(new Date().getTime());
    }
  };

  const startNextCountDown = (touchedAt) => {
    if (schedule.length === 0) {
      clearAllIntervals();
      return;
    }

    let next = schedule.shift();
    setNextCountDown(parseInt(next));
  };

  useEffect(() => {
    startNextCountDown(touchedAt);
  }, [touchedAt]);

  return (
    <>
      <div className="fitness-container">
        <GitHub gitUrl={'https://github.com/vikbert/masanfit'} />
        <section>
          <Button type={'default'} style={{ position: 'relative', padding: 0 }}>
            <div id="display-wrapper" style={{ width: progress + '%' }}></div>
            <TimerDisplay
              counterInSeconds={nextCountDown}
              resetOption={handleResetCallback}
            />
          </Button>
        </section>
        <section>
          <CellsTitle>
            <div className={'slide-value'}>{plan.training + 's'}</div>
            Trainingsdauer
          </CellsTitle>

          <Slider
            min={0}
            max={60}
            step={5}
            value={plan.training}
            onChange={(value) => handleOnChange(value, 'training')}
          />

          <CellsTitle>
            <div className={'slide-value'}>{plan.rest + 's'}</div>
            Pausezeit
          </CellsTitle>
          <Slider
            min={0}
            max={60}
            step={5}
            value={plan.rest}
            onChange={(value) => handleOnChange(value, 'rest')}
          />

          <CellsTitle>
            <div className={'slide-value'}>{plan.repeat + 'x'}</div>
            Wiederholungen
          </CellsTitle>
          <Slider
            min={1}
            max={20}
            step={1}
            value={plan.repeat}
            onChange={(value) => handleOnChange(value, 'repeat')}
          />
        </section>
        <section className={'confirm-section'}>
          {touchedAt === null ? (
            <Button type="primary" onClick={handleClickStart}>
              Starten
            </Button>
          ) : (
            <Button type="warn" onClick={handleClickCancel}>
              Cancel
            </Button>
          )}
        </section>
      </div>
    </>
  );
};
export default Fitness;
