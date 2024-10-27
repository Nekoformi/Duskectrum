export default function specialSplitString(text: string, split: string, boxStart: string, boxEnd: string): string[] {
    if (boxStart.length !== boxEnd.length) return [];

    const buf = text.split(split);
    const res = [];

    let rec = '';
    let boxIndex = -1;

    for (let i = 0; i < buf.length; i++) {
        if (boxIndex === -1) {
            rec += buf[i];

            const rem = boxStart.indexOf(buf[i].charAt(0));

            if (rem !== -1) {
                boxIndex = rem;

                rec = rec.slice(1);

                if (buf[i].endsWith(boxEnd[boxIndex])) {
                    boxIndex = -1;

                    rec = rec.slice(0, -1);
                }
            }
        } else {
            rec += split + buf[i];

            if (buf[i].endsWith(boxEnd[boxIndex])) {
                boxIndex = -1;

                rec = rec.slice(0, -1);
            }
        }

        if (boxIndex === -1 || i === buf.length - 1) {
            res.push(rec);

            rec = '';
        }
    }

    return res;
}
