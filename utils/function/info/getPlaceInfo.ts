export type getPlaceInfoRes = {
    position: {
        latitude: number;
        longitude: number;
        altitude: number | null;
    };
    movement: {
        direction: number | null;
        directionName: string | null;
        speed: number | null;
    };
    input: {
        coordinateAccuracy: number;
        altitudeAccuracy: number | null;
    };
};

const getDirection = (heading: number): string => {
    const buf = ['[N] North', '[NE] Northeast', '[E] East', '[SE] Southeast', '[S] South', '[SW] Southwest', '[W] West', '[NW] Northwest'];

    return buf[Math.round(heading / 45) % 8];
};

export default function getPlaceInfo(data: GeolocationPosition): getPlaceInfoRes {
    return {
        position: {
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
            altitude: data.coords.altitude,
        },
        movement: {
            direction: data.coords.heading,
            directionName: data.coords.heading ? getDirection(data.coords.heading) : null,
            speed: data.coords.speed,
        },
        input: {
            coordinateAccuracy: data.coords.accuracy,
            altitudeAccuracy: data.coords.altitudeAccuracy,
        },
    };
}
