import { IS_PRINT_MODE } from '@data/dev.ts';

// Note: The size should be specified in units of [px].

export type frameOption = {
    safe: number;
    margin: number;
    border: number;
    padding: number;
    font: number;
    colorBackground: string;
    colorHide: string;
    colorTopLeft: string;
    colorTopRight: string;
    colorBottomLeft: string;
    colorBottomRight: string;
};

export const defaultFrameOption: frameOption = {
    safe: 4,
    margin: 4,
    border: 2,
    padding: 8,
    font: 16,
    colorBackground: !IS_PRINT_MODE ? '#111e' : '#fffe',
    colorHide: !IS_PRINT_MODE ? '#444e' : '#ccce',
    colorTopLeft: '#0f8',
    colorTopRight: '#0ff',
    colorBottomLeft: '#088',
    colorBottomRight: '#08f',
};

// deno-lint-ignore ban-types
const overwriteDefaultFrameOption = (rec: {}): frameOption => {
    const res: frameOption = Object.assign({}, defaultFrameOption);

    Object.assign(res, rec);

    return res;
};

export const customMonoColorFrameOption = (color: string): frameOption =>
    overwriteDefaultFrameOption({
        colorTopLeft: color,
        colorTopRight: color,
        colorBottomLeft: color,
        colorBottomRight: color,
    });

export type frameButtonOption = {
    margin: number;
    padding: number;
    colorText: string;
    colorBackground: string;
};

export const defaultFrameButtonOption: frameButtonOption = {
    margin: 4,
    padding: 8,
    colorText: '#000',
    colorBackground: '#0ff',
};

// deno-lint-ignore ban-types
const overwriteDefaultFrameButtonOption = (rec: {}): frameButtonOption => {
    const res: frameButtonOption = Object.assign({}, defaultFrameButtonOption);

    Object.assign(res, rec);

    return res;
};

export const customMonoColorFrameButtonOption = (color: string): frameButtonOption =>
    overwriteDefaultFrameButtonOption({
        colorBackground: color,
    });
