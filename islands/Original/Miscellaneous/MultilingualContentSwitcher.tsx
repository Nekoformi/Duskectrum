import { Signal } from '@preact/signals';

// Note: This is a temporary solution.

type multilingualContentSwitcherProps = {
    language: {
        name: string;
        code: string;
    }[];
    signal: Signal;
};

export default function MultilingualContentSwitcher({ language, signal }: multilingualContentSwitcherProps) {
    return (
        <div className='document'>
            <fieldset>
                <legend>This page can change language:</legend>
                {language.map((item) => <button onClick={() => (signal.value = item.code)}>{item.name}</button>)}
            </fieldset>
        </div>
    );
}
