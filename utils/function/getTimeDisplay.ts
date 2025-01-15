import alignDigit from '@function/alignDigit.ts';

export type getTimeDisplayRes = {
    date: string;
    time: string;
    timeZone: string;
};

export default function getTimeDisplay(rec: Date): getTimeDisplayRes {
    const option = (digit: number) => {
        return {
            intDigit: digit,
            decDigit: 0,
        };
    };

    const year = alignDigit(rec.getFullYear(), option(4));
    const month = alignDigit(rec.getMonth() + 1, option(2));
    const date = alignDigit(rec.getDate(), option(2));
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].splice(rec.getDay(), 1);
    const hours = alignDigit(rec.getHours(), option(2));
    const minutes = alignDigit(rec.getMinutes(), option(2));
    const seconds = alignDigit(rec.getSeconds(), option(2));

    const timeZoneOffset = alignDigit((rec.getTimezoneOffset() / 60) * -100, {
        intDigit: 5,
        decDigit: 0,
        forcePositiveSymbol: true,
    });
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return {
        date: `${year}/${month}/${date} (${day})`,
        time: `${hours}:${minutes}:${seconds}`,
        timeZone: `GMT${timeZoneOffset} (${timeZone})`,
    };
}
