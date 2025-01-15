const patterns = [
    ['<', '&lt;'],
    ['>', '&gt;'],
    ['&', '&amp;'],
    ['"', '&quot;'],
    ["'", '&#x27;'],
    ['`', '&#x60;'],
];

const getRegExp = (i: number) => new RegExp(`(${patterns.map((item) => item[i]).join('|')})`, 'g');

const replaceChar = (match: string, before: number, after: number) => {
    const rec = patterns.find((item) => item[before] === match);

    return rec ? rec[after] : match;
};

export function escapeHtml(text: string): string {
    return text.replace(getRegExp(0), (match) => replaceChar(match, 0, 1));
}

export function unescapeHtml(text: string): string {
    return text.replace(getRegExp(1), (match) => replaceChar(match, 1, 0));
}
