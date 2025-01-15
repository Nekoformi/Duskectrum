import { JSX } from 'preact/jsx-runtime';

export default function convertTextToElement(text: string): JSX.Element {
    return <>{text.split('').map((char) => (char !== '\n' ? char : <br />))}</>;
}
