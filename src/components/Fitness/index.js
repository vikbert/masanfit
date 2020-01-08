import React, {useEffect, useState} from 'react';
import {clearAllIntervals} from "../../utils/TimeHelper";
import TimerDisplay from "../TimerDisplay";
import {Button, CellsTitle, Slider} from "react-weui";
import styled from "styled-components";

const SliderValue = styled.div`
  display: inline-block;
  width: 52px;
  font-size: 25px;
  font-weight: 500;
  //padding-right: 8px;
`;

const ConfirmSection = styled.section`
  margin-top: 40px;
`;

let schedule = [];
const initPlan = {
    training: 30,
    rest: 10,
    repeat: 3,
};

const Fitness = () => {
    const [plan, setPlan] = useState(initPlan);
    const [touchedAt, setTouchedAt] = useState(null);
    const [nextCountDown, setNextCountDown] = useState(0);

    const handleOnChange = (value, name) => {
        setPlan({
            ...plan,
            [name]: value,
        });
    };

    const handleClickStart = () => {
        window.alert.play();

        schedule = [];
        for (let i = 0; i < plan.repeat; i++) {
            schedule.push(parseInt(plan.training));
            schedule.push(parseInt(plan.rest));
        }
        setTouchedAt((new Date()).getTime());
    };

    const handleClickCancel = () => {
        clearAllIntervals();

        schedule = [];
        setPlan(initPlan);
        setTouchedAt(null);
        setNextCountDown(0);
    };

    const handleResetCallback = () => {
        setNextCountDown(0);
        if (schedule.length === 0) {
            setTouchedAt(null);
        } else {
            setTouchedAt((new Date()).getTime());
        }
    };

    const startNextCountDown = (touchedAt) => {
        if (schedule.length === 0) {
            return;
        }

        let next = schedule.shift();
        setNextCountDown(parseInt(next));
    };

    useEffect(() => {
        startNextCountDown(touchedAt);
    }, [touchedAt]);

    return (
        <div className="container fitness">
            <Button type={'default'}>
                <TimerDisplay
                    counterInSeconds={nextCountDown}
                    resetOption={handleResetCallback}
                />
            </Button>

            <section>
                <CellsTitle>
                    <SliderValue>{plan.training + 's'}</SliderValue>
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
                    <SliderValue>{plan.rest + 's'}</SliderValue>
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
                    <SliderValue>{plan.repeat + 'x'}</SliderValue>
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
            <ConfirmSection>
                {touchedAt === null
                    ? <Button type="primary" onClick={handleClickStart}>Starten</Button>
                    : <Button type="warn" onClick={handleClickCancel}>Cancel</Button>
                }
            </ConfirmSection>
        </div>
    );

};
export default Fitness;
