import { findLanguageCodeDataFromCode, languageCodeDataRes } from '@function/data/getLanguageCodeData.ts';

export type getDeviceInfoRes = {
    type: string;
    system: string;
    browser: string;
    language: languageCodeDataRes;
};

const isIncludeText = (target: string, text: string): boolean => target.indexOf(text.toLowerCase()) > 0;
const isIncludeArrayText = (target: string, array: string[]): boolean => array.filter((text) => isIncludeText(target, text)).length > 0;

export const getDeviceType = (userAgent: string): string => {
    const ua = userAgent.toLowerCase();

    if (isIncludeArrayText(ua, ['iphone', 'ipod', 'android']) && isIncludeText(ua, 'mobile')) {
        return 'Mobile';
    } else if (isIncludeText(ua, 'ipad') || isIncludeText(ua, 'android')) {
        return 'Tablet';
    } else {
        return 'PC';
    }
};

export const getDeviceSystem = (userAgent: string): string => {
    const ua = userAgent.toLowerCase();

    if (isIncludeArrayText(ua, ['iphone', 'ipod', 'ipad'])) {
        return 'iOS';
    } else if (isIncludeText(ua, 'android')) {
        return 'Android';
    } else if (isIncludeText(ua, 'windows nt')) {
        return 'Microsoft Windows';
    } else if (isIncludeText(ua, 'mac os x')) {
        return 'macOS';
    } else if (isIncludeText(ua, 'linux')) {
        return 'Linux';
    } else {
        return 'Unknown';
    }
};

export const getDeviceBrowser = (userAgent: string): string => {
    const ua = userAgent.toLowerCase();

    if (isIncludeArrayText(ua, ['msie', 'trident'])) {
        return 'Internet Explorer';
    } else if (isIncludeArrayText(ua, ['edge', 'edga', 'edgios'])) {
        return 'Microsoft Edge';
    } else if (isIncludeArrayText(ua, ['chrome', 'crios'])) {
        return 'Google Chrome';
    } else if (isIncludeArrayText(ua, ['firefox', 'fxios'])) {
        return 'Mozilla Firefox';
    } else if (isIncludeArrayText(ua, ['opera', 'opr'])) {
        return 'Opera';
    } else if (isIncludeText(ua, 'safari')) {
        return 'Safari';
    } else if (isIncludeText(ua, 'samsungbrowser')) {
        return 'Samsung Internet Browser';
    } else if (isIncludeText(ua, 'ucbrowser')) {
        return 'UC Browser';
    } else {
        return 'Unknown';
    }
};

export const getDeviceLanguage = (navigator: Navigator): languageCodeDataRes => {
    const customLanguage = undefined;
    const browserLanguage = (navigator.languages && navigator.languages[0]) || navigator.language;

    return findLanguageCodeDataFromCode((customLanguage || browserLanguage || 'xx').split('-')[0].toLowerCase());
};

export default function getDeviceInfo(): getDeviceInfoRes {
    const ua = navigator.userAgent;

    return {
        type: getDeviceType(ua),
        system: getDeviceSystem(ua),
        browser: getDeviceBrowser(ua),
        language: getDeviceLanguage(navigator),
    };
}
