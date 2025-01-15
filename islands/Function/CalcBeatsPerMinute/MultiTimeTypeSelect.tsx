import { JSX } from 'preact/jsx-runtime';

import { Signal } from '@preact/signals';

export type typeSelectProps = {
    id: string;
    type: Signal<number>;
};

export default function TypeSelect({ id, type }: typeSelectProps): JSX.Element {
    const setInputRadio = (index: number, label: string): JSX.Element => (
        <div>
            <input type='radio' id={`${id}_type_${index}`} onClick={() => (type.value = index)} checked={type.value === index} />
            <label for={`${id}_type_${index}`}>{label}</label>
        </div>
    );

    return (
        <fieldset class='list'>
            <div class='label'>Time Notation Type:</div>
            {setInputRadio(1, 'Time (.Milliseconds)')}
            {setInputRadio(2, 'Time (:Frames)')}
            {setInputRadio(3, 'Time (:Samplings)')}
            {setInputRadio(4, 'Frames')}
            {setInputRadio(5, 'Samplings')}
        </fieldset>
    );
}
