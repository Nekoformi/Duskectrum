export type getDeviceMotionInfoRes = {
    acceleration: {
        x: number | null;
        y: number | null;
        z: number | null;
    } | null;
    accelerationIncludingGravity: {
        x: number | null;
        y: number | null;
        z: number | null;
    } | null;
};

export default function getDeviceMotionInfo(deviceMotionEvent: DeviceMotionEvent): getDeviceMotionInfoRes {
    return {
        acceleration: deviceMotionEvent.acceleration
            ? {
                x: deviceMotionEvent.acceleration.x,
                y: deviceMotionEvent.acceleration.y,
                z: deviceMotionEvent.acceleration.z,
            }
            : null,
        accelerationIncludingGravity: deviceMotionEvent.accelerationIncludingGravity
            ? {
                x: deviceMotionEvent.accelerationIncludingGravity.x,
                y: deviceMotionEvent.accelerationIncludingGravity.y,
                z: deviceMotionEvent.accelerationIncludingGravity.z,
            }
            : null,
    };
}
