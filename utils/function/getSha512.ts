import getSha from '@function/getSha.ts';

// deno-lint-ignore no-inferrable-types
export default async function getSha512(data: string, base: number = 16): Promise<string> {
    return await getSha(data, 'SHA-512', base);
}
