import { JSX } from 'preact/jsx-runtime';

import { MultiTimeNotation } from '@function/multiTimeNotation.ts';
import TypeSelect from '@islands/Function/CalcBeatsPerMinute/MultiTimeTypeSelect.tsx';
import { Signal, useSignal } from '@preact/signals';

export type timeOutputProps = {
    data: Signal<MultiTimeNotation['display'][]>;
    outputType: Signal<number>;
    rhythmJump: Signal<number>;
};

export const TimeOutput = ({ data, outputType, rhythmJump }: timeOutputProps): JSX.Element => {
    return (
        <table class='fit'>
            <thead>
                <tr>
                    <th width='80px' class='center'>
                        1 / {rhythmJump.value}
                    </th>
                    <th>{['Time (.Milliseconds)', 'Time (:Frames)', 'Time (:Samplings)', 'Frames', 'Samplings'][outputType.value - 1]}</th>
                </tr>
            </thead>
            <tbody>
                {data.value.map((item, index) => (
                    <tr>
                        <td class='center'>{index % rhythmJump.value === 0 ? '●' : '○'}</td>
                        <td>{[item.timeData, item.timeCodeFrames, item.timeCodeSamplings, item.frames, item.samplings][outputType.value - 1]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export type multiTimeOutputProps = {
    id: string;
    data: Signal<MultiTimeNotation['display'][]>;
};

export default function MultiTimeOutput({ id, data }: multiTimeOutputProps): JSX.Element {
    const outputType = useSignal(1);
    const rhythmJump = useSignal(4);

    const BeatInput = (): JSX.Element => (
        <fieldset>
            <div>
                <div class='label'>Jump (1 / X):</div>
                <input
                    type='number'
                    placeholder='Jump'
                    value={rhythmJump.value}
                    onChange={(e) => {
                        rhythmJump.value = Math.round(Number(e.currentTarget.value));

                        if (rhythmJump.value < 0) rhythmJump.value = 0;
                    }}
                />
            </div>
        </fieldset>
    );

    return (
        <>
            <TypeSelect id={id} type={outputType} />
            <BeatInput />
            <TimeOutput data={data} outputType={outputType} rhythmJump={rhythmJump} />
        </>
    );
}
