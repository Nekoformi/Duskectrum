import { JSX } from 'preact/jsx-runtime';

import { Signal } from '@preact/signals';

// Note: This is a temporary solution.

type multilingualContentProps = {
    language: string;
    signal: Signal;
    children: JSX.Element;
};

export default function MultilingualContent({ language, signal, children }: multilingualContentProps) {
    return <>{signal.value === language && children}</>;
}
