import React, {useState} from 'react';
import styled from 'styled-components';
import {Article, Button, ButtonArea, CellsTitle, Page, Slider} from 'react-weui';

const SliderValue = styled.span`
  font-size: 30px;
  font-weight: 500;
  padding-right: 8px;
`;

function App() {
    const [training, setTraining] = useState(30);
    const [rest, setRest] = useState(10);
    const [repeat, setRepeat] = useState(3);

    const clickOnStart = () => {
        window.alert.play();
    };

    return (
        <Page>
            <Article>
                <section>
                    <h1>If it doesn't challenge you, it doesn´t change you.</h1>
                </section>
                <section>
                    <CellsTitle>
                        <SliderValue>{training + 's'}</SliderValue>
                        Trainingsdauer
                    </CellsTitle>

                    <Slider
                        min={0}
                        max={60}
                        step={5}
                        value={training}
                        onChange={(value) => setTraining(value)}
                    />

                    <CellsTitle>
                        <SliderValue>{rest + 's'}</SliderValue>
                        Pausezeit
                    </CellsTitle>
                    <Slider
                        min={0}
                        max={60}
                        step={5}
                        value={rest}
                        onChange={(value) => setRest(value)}
                    />

                    <CellsTitle>
                        <SliderValue>{repeat + 'x'}</SliderValue>
                        Wiederholungen
                    </CellsTitle>
                    <Slider
                        min={1}
                        max={20}
                        step={1}
                        value={repeat}
                        onChange={(value) => setRepeat(value)}
                    />
                </section>
                <section>
                    <ButtonArea>
                        <Button type="primary" onClick={clickOnStart}>Starten</Button>
                    </ButtonArea>
                </section>
            </Article>
        </Page>
    );
}

export default App;
