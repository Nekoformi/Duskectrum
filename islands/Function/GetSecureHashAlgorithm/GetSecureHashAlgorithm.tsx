import getSha256 from '@function/getSha256.ts';
import getSha384 from '@function/getSha384.ts';
import getSha512 from '@function/getSha512.ts';
import ResultFieldset from '@islands/Original/Miscellaneous/ResultFieldset.tsx';
import { useSignal } from '@preact/signals';

export default function GetSecureHashAlgorithm() {
    const input = useSignal('');

    const output = {
        sha256: useSignal(''),
        sha384: useSignal(''),
        sha512: useSignal(''),
    };

    const update = async () => {
        output.sha256.value = await getSha256(input.value);
        output.sha384.value = await getSha384(input.value);
        output.sha512.value = await getSha512(input.value);
    };

    return (
        <>
            <h2>Input</h2>

            <fieldset>
                <div class='label'>Text:</div>
                <input type='text' placeholder='Hello, world!' onChange={(e) => (input.value = e.currentTarget.value)} />
                <button onClick={() => update()}>Generate</button>
            </fieldset>

            <h2>Output</h2>

            <ResultFieldset label='SHA-256'>{output.sha256.value}</ResultFieldset>
            <ResultFieldset label='SHA-384'>{output.sha384.value}</ResultFieldset>
            <ResultFieldset label='SHA-512'>{output.sha512.value}</ResultFieldset>
        </>
    );
}
