export default function normalizeVariableName(name: string): string {
    const res = name.split('');

    const lowerCase = /^[a-z]$/g;
    const upperCase = /^[A-Z]$/g;
    const alphabet = /^[a-zA-Z]$/g;
    const number = /^[0-9]$/g;
    const symbol = /^[ \-]$/g;

    for (let i = 0; i < res.length; i++) {
        const char = res[i];

        if (i === 0) {
            if (char.match(lowerCase)) res[i] = char.toUpperCase();
        } else {
            const preChar = res[i - 1];

            if (
                (preChar.match(lowerCase) && char.match(upperCase)) ||
                (preChar.match(alphabet) && char.match(number)) ||
                (preChar.match(number) && preChar.match(alphabet))
            ) {
                res.splice(i, 0, ' ');
            } else if (char === '_') {
                res[i] = '-';
            } else if (preChar.match(symbol) && char.match(lowerCase)) {
                res[i] = char.toUpperCase();
            }
        }
    }

    return res.join('');
}
