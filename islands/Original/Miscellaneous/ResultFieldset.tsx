import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';

type resultFieldsetProps = {
    label: string;
    children: string;
};

export default function ResultFieldset({ label, children }: resultFieldsetProps) {
    const signal = useSignal(children);

    useEffect(() => {
        signal.value = children;
    }, [children]);

    return (
        <fieldset>
            <div class='label'>{label}:</div>
            <textarea value={signal.value} onChange={(e) => (signal.value = e.currentTarget.value)}></textarea>
            <button onClick={() => navigator.clipboard.writeText(signal.value)}>Copy</button>
            <button onClick={() => (signal.value = '')}>Clear</button>
            <button onClick={() => (signal.value = children)}>Revert</button>
        </fieldset>
    );
}
