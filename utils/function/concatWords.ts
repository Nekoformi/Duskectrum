export default function concatWords(words: string[]): string {
    const rec = words.filter((item) => item && item !== '');

    if (rec.length > 1) {
        return rec
            .map((word, index) => {
                if (index === rec.length - 2) {
                    return `${word} and `;
                } else if (index === rec.length - 1) {
                    return word;
                } else {
                    return `${word}, `;
                }
            })
            .join('');
    } else if (rec.length === 1) {
        return rec[0];
    } else {
        return '';
    }
}
