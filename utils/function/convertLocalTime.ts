import { time } from 'time';

export default function convertLocalTime(gmt: string | Date): Date {
    return new Date(time(typeof gmt === 'string' ? gmt : gmt.toString()).tz().t);
}
