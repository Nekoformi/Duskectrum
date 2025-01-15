export type getDeviceOrientationInfoRes = {
    absolute: boolean;
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
};

export default function getDeviceOrientationInfo(deviceOrientationEvent: DeviceOrientationEvent): getDeviceOrientationInfoRes {
    return {
        absolute: deviceOrientationEvent.absolute,
        alpha: deviceOrientationEvent.alpha,
        beta: deviceOrientationEvent.beta,
        gamma: deviceOrientationEvent.gamma,
    };
}
