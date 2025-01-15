import getDeviceInfo, { getDeviceInfoRes } from '@function/info/getDeviceInfo.ts';
import getDeviceMotionInfo, { getDeviceMotionInfoRes } from '@function/info/getDeviceMotionInfo.ts';
import getDeviceOrientationInfo, { getDeviceOrientationInfoRes } from '@function/info/getDeviceOrientationInfo.ts';
import getPlaceInfo, { getPlaceInfoRes } from '@function/info/getPlaceInfo.ts';
import getTimeInfo, { getTimeInfoRes } from '@function/info/getTimeInfo.ts';

export type getAllInfoRec = {
    prevRes?: getAllInfoRes;
    geolocationPosition?: GeolocationPosition | null;
    geolocationPositionError?: GeolocationPositionError | null;
    deviceMotionEvent?: DeviceMotionEvent | null;
    deviceOrientationEvent?: DeviceOrientationEvent | null;
};

export type getAllInfoRes = {
    time: getTimeInfoRes;
    device: getDeviceInfoRes;
    place: getPlaceInfoRes | string;
    acceleration: getDeviceMotionInfoRes | string;
    orientation: getDeviceOrientationInfoRes | string;
};

export default function getAllInfo(rec: getAllInfoRec): getAllInfoRes {
    const timeInfo = getTimeInfo();
    const deviceInfo = getDeviceInfo();
    const placeInfo = rec.geolocationPosition
        ? getPlaceInfo(rec.geolocationPosition)
        : rec.geolocationPositionError
        ? `Error: ${rec.geolocationPositionError.message}`
        : rec.prevRes
        ? rec.prevRes.place
        : 'Loading...';
    const accelerationInfo = rec.deviceMotionEvent ? getDeviceMotionInfo(rec.deviceMotionEvent) : rec.prevRes ? rec.prevRes.acceleration : 'Loading...';
    const orientationInfo = rec.deviceOrientationEvent
        ? getDeviceOrientationInfo(rec.deviceOrientationEvent)
        : rec.prevRes
        ? rec.prevRes.orientation
        : 'Loading...';

    return {
        time: timeInfo,
        device: deviceInfo,
        place: placeInfo,
        acceleration: accelerationInfo,
        orientation: orientationInfo,
    };
}
