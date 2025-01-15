import getTimeDisplay, { getTimeDisplayRes } from '@function/getTimeDisplay.ts';

export type getTimeInfoRes = getTimeDisplayRes;

export default function getTimeInfo(): getTimeInfoRes {
    return getTimeDisplay(new Date());
}
