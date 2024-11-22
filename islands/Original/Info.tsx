import { useEffect } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';

import Link from '@components/Common/Link.tsx';
import getAllInfo from '@function/info/getAllInfo.ts';
import getDeviceInfo from '@function/info/getDeviceInfo.ts';
import getTimeInfo from '@function/info/getTimeInfo.ts';
import normalizeVariableName from '@function/normalizeVariableName.ts';
import { useSignal } from '@preact/signals';

export default function Info(): JSX.Element {
    const timeInfo = useSignal(getTimeInfo());
    const deviceInfo = getDeviceInfo();

    let intervalId: number;

    useEffect(() => {
        if (!intervalId) intervalId = setInterval(() => (timeInfo.value = getTimeInfo()), 10);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <p>
            {`${timeInfo.value.date} ${timeInfo.value.time} ${timeInfo.value.timeZone}`}
            <br />
            {`Type: ${deviceInfo.type} | System: ${deviceInfo.system} | Browser: ${deviceInfo.browser}`}
            {' ... '}
            <Link href='/info'>More</Link>
        </p>
    );
}

export function InfoAdvance(): JSX.Element {
    const info = useSignal(getAllInfo({}));

    let intervalId: number;
    let watchId: number;

    useEffect(() => {
        if (!intervalId) intervalId = setInterval(() => (info.value = getAllInfo({ prevRes: info.value })), 10);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        watchId = navigator.geolocation.watchPosition(
            (rec) => (info.value = getAllInfo({ prevRes: info.value, geolocationPosition: rec })),
            (err) => (info.value = getAllInfo({ prevRes: info.value, geolocationPositionError: err })),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
        );

        addEventListener('devicemotion', (rec) => (info.value = getAllInfo({ prevRes: info.value, deviceMotionEvent: rec })), false);
        addEventListener('deviceorientation', (rec) => (info.value = getAllInfo({ prevRes: info.value, deviceOrientationEvent: rec })), false);

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    const setObjectData = (data: object): JSX.Element => {
        const rec = Object.entries(data);
        const res: JSX.Element[] = [];

        for (const [key, val] of rec) {
            if (typeof val === 'object') {
                if (val !== null) {
                    res.push(
                        <>
                            <li>{normalizeVariableName(key)}:</li>
                            {setObjectData(val)}
                        </>,
                    );
                } else {
                    res.push(
                        <li>
                            {normalizeVariableName(key)}:&nbsp;<span class='gray_tc'>NULL</span>
                        </li>,
                    );
                }
            } else {
                res.push(
                    <li>
                        {normalizeVariableName(key)}:&nbsp;<span class='lime_tc'>{val}</span>
                    </li>,
                );
            }
        }

        return <ul>{res}</ul>;
    };

    return setObjectData(info.value);
}
