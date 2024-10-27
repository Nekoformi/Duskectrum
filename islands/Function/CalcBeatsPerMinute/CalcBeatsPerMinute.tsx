import { JSX } from 'preact/jsx-runtime';

import { MultiTimeNotation } from '@function/multiTimeNotation.ts';
import MultiTimeInput from '@islands/Function/CalcBeatsPerMinute/MultiTimeInput.tsx';
import MultiTimeOutput from '@islands/Function/CalcBeatsPerMinute/MultiTimeOutput.tsx';
import Frame from '@myFrame';
import { useSignal } from '@preact/signals';

export default function CalcBeatsPerMinute() {
    const input = {
        bpm: useSignal(120),
        offset: useSignal(new MultiTimeNotation()),
        length: useSignal(new MultiTimeNotation()),
    };

    const output = {
        data: useSignal([new MultiTimeNotation().display]),
    };

    input.length.value.addMinutes(5);

    const generateTempoList = () => {
        const tempo = (60 / input.bpm.value) * 1000; // ms
        const buf = new MultiTimeNotation(input.offset.value);

        output.data.value = [];

        while (input.length.value.difference(buf).total.milliseconds >= 0) {
            output.data.value.push({
                timeData: buf.display.timeData,
                timeCodeFrames: buf.display.timeCodeFrames,
                timeCodeSamplings: buf.display.timeCodeSamplings,
                frames: buf.display.frames,
                samplings: buf.display.samplings,
            });

            buf.addMilliseconds(tempo);
        }
    };

    const BeatInput = (): JSX.Element => (
        <fieldset>
            <div>
                <div class='label'>Beat [BPM]:</div>
                <input type='number' placeholder='BPM' value={input.bpm.value} onChange={(e) => (input.bpm.value = Number(e.currentTarget.value))} />
            </div>
        </fieldset>
    );

    return (
        <>
            <div class='content flex'>
                <Frame title='Input' width='50%' height='100%' frameStyle='card' frameType={['setMaximize']} className='document'>
                    <>
                        <h2>Input</h2>

                        <fieldset>
                            <button onClick={() => generateTempoList()}>Generate</button>
                        </fieldset>

                        <h3>Index</h3>

                        <BeatInput />

                        <h3>Offset</h3>

                        <MultiTimeInput id='offset' signal={input.offset} />

                        <h3>Length</h3>

                        <MultiTimeInput id='length' signal={input.length} />
                    </>
                </Frame>

                <Frame title='Output' width='50%' height='100%' frameStyle='card' frameType={['setMaximize']} className='document'>
                    <>
                        <h2>Output</h2>

                        <MultiTimeOutput id='output' data={output.data} />
                    </>
                </Frame>
            </div>
        </>
    );
}
