export default async function getSha(data: string, algorithm: string, base: number): Promise<string> {
    try {
        const buf = new TextEncoder().encode(data);
        const hash = await crypto.subtle.digest(algorithm, buf);
        const digit = Math.ceil(Math.log(256) / Math.log(base));

        return Array.from(new Uint8Array(hash))
            .map((val) => val.toString(base).padStart(digit, '0'))
            .join('');
    } catch (e) {
        console.error(e);

        return '';
    }
}
